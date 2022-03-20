<template>
  <Header :headerData="headerData" v-if="status === 'ADMIN' || status === 'USER' || status === 'BANNED'"></Header>

  <div class="container" v-if="status === 'ADMIN' || status === 'USER'">
    <Sidebar></Sidebar>

    <div class="content">
      <h2 class="label">Ожидаемые задачи</h2>

      <div class="wrap mobile-wrap">
        <div class="task-item">
          <h3 class="label">Задача</h3>
          <input type="text" v-model="taskLabel" class="global-input">
        </div>
        <div class="task-item">
          <h3 class="label">Часы</h3>
          <input type="text" v-model="taskHours"  class="global-input">
        </div>
        <div class="task-item">
          <h3 class="label">Дата</h3>
          <Calendar @enter-date="onDayClick"></Calendar>
        </div>
      </div>
      <a href="#" class="button" @click.prevent="addTask">Добавить</a>


      <Table
        :tableData="table.tableData"
        :tableLabel="table.tableLabel"
        :tasksID="table.tasksID"
        :addDelete="1"
        class="mt60"
        @delete-task="deleteTask"
        v-if="table.tableData.length > 0"
      ></Table>
      <h2 class="label" v-else>Вы пока не добавили занятия.</h2>
    </div>

  </div>

  <banned-error v-else-if="status === 'BANNED'"></banned-error>

  <auth-error v-else></auth-error>

  <Footer></Footer>
</template>

<script setup>
  import Header from '../components/Header.vue'
  import Sidebar from '../components/Sidebar.vue'
  import Footer from '../components/Footer.vue'
  import Table from '../components/Table.vue'
  import Calendar from '../components/Calendar.vue'
  import AuthError from '../components/AuthError.vue'
  import BannedError from '../components/BannedError.vue'
  import userHandler from '../handlers/userHandler.js'
  import taskHandler from '../handlers/taskHandler.js'
  import dateHandler from '../handlers/dateHandler.js'



  import {ref, onBeforeMount} from 'vue'
  import { useCookies } from 'vue3-cookies'

  const table = ref({
    tableLabel: ['Задача', 'Ожидаемое время', 'Дата'],
    tableData: [],
    tasksID: []
  })

  const headerData = ref({})

  const userID = ref()

  const taskLabel = ref()
  const taskHours = ref()
  const taskDate = ref()
  const upComingTasks = ref()
  const status = ref('USER')
  const dateNow = ref(new Date().getTime())

  const {cookies} = useCookies()

  const addTask = async () => {

    if(taskLabel.value.length > 3 && taskHours.value > 0 && taskHours.value && taskDate.value) {

      const task = {
        label: taskLabel.value,
        hours: Number(taskHours.value),
        date: taskDate.value
      }

      const dataTask = await taskHandler.addTask(cookies.get('userToken'), task)
      table.value.tableData.unshift([
        dataTask.newTask.label,
        dataTask.newTask.primordialHours,
        dateHandler.dotsDate(dataTask.newTask.date)
      ])

      table.value.tasksID.unshift(dataTask.newTask.taskID)
    }
  }

  const onDayClick = day => {
    taskDate.value = day.id
  }


  const createTaskArray = arr => {
    return arr.map(item => {
      return [
        item.label,
        item.hours,
        dateHandler.dotsDate(item.date)
      ]
    })
  }


  const deleteTask = async taskID => {
    const deletedTask = await taskHandler.deleteTask(cookies.get('userToken'), taskID)

    table.value.tableData = createTaskArray(upComingTasks.value.filter(item => item.taskID !== taskID))
    table.value.tasksID = table.value.tasksID.filter(item => item !== taskID)

    alert('Задание успешно удалено')
  }

  const checkUser = async () => {
    if(cookies.get('userToken')) {
      const userInf = await userHandler.getUser(cookies.get('userToken'))
      status.value = userInf.status
    } else {
      status.value = 'UNAUTH'
    }
  }

  onBeforeMount(async() => {
    checkUser()
    headerData.value.avatarURL = localStorage.getItem('avatarURL')
    headerData.value.status = localStorage.getItem('status')


    const tasks = await taskHandler.getTasks(cookies.get('userToken'), dateNow.value)
    upComingTasks.value = tasks.filter(item => !item.isCompleted)
    table.value.tableData = createTaskArray(upComingTasks.value)

    table.value.tasksID = upComingTasks.value.map(item => item.taskID)

  })

</script>

<style lang="scss" scoped>
  @import '../assets/styles/global.scss';
  @import '../assets/styles/variables.scss';

  .task-item{
    margin-right: 36px;
    a.calendar-button{
      background: #fff;
      border-radius: 4px;
      box-shadow: 0px 0px 8px rgba(134, 118, 254, 0.25);
      display: block;
      padding: 3px 13px;
    }
  }
  h2.label{
    margin-top: 40px;
  }


</style>
