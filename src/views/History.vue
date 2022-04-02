<template>
  <Header :headerData="headerData" v-if="status === 'ADMIN' || status === 'USER' || status === 'BANNED'"></Header>

  <div class="container" v-if="status === 'ADMIN' || status === 'USER'">
    <Sidebar></Sidebar>

    <div class="content">

      <div class="wrap jcb aic">
        <h2 class="label m0">История</h2>
        <div class="date">Период: c <span>{{firstDate}}</span> по <span>{{secondDate}}</span></div>
      </div>

      <arrows
        @next-week="enterNext"
        @prev-week="enterPrev"
      ></arrows>

      <Table :tableData="table.tableData" :tableLabel="table.tableLabel" class="mt60"></Table>
    </div>

  </div>

  <banned-error v-else-if="status === 'BANNED'"></banned-error>

  <auth-error v-else></auth-error>

  <Footer></Footer>
</template>

<script setup>
  import Header from '../components/Header.vue'
  import Sidebar from '../components/Sidebar.vue'
  import Table from '../components/Table.vue'
  import Footer from '../components/Footer.vue'
  import AuthError from '../components/AuthError.vue'
  import BannedError from '../components/BannedError.vue'
  import Arrows from '../components/Arrows.vue'

  import taskHandler from '../handlers/taskHandler.js'
  import userHandler from '../handlers/userHandler.js'
  import dateHandler from '../handlers/dateHandler.js'

  import {ref, onBeforeMount} from 'vue'
  import { useCookies } from 'vue3-cookies'

  const table = ref({
    tableLabel: ['Задача', 'Время', 'Дата', 'Выполнено'],
    tableData: []
  })

  const {cookies} = useCookies()
  const headerData = ref({})
  const status = ref('USER')

  const dateNow = ref(new Date().getTime())

  const firstDate = ref(dateHandler.dMDate(dateNow.value - 1000 * 60 * 60 *24 * 60))
  const secondDate = ref(dateHandler.dMDate(dateNow.value))


  const getTable = async () => {
    if(cookies.get('userToken') !== null) {
      const getHistory = await taskHandler.getHistory(cookies.get('userToken'), dateNow.value)

      table.value.tableData = getHistory.map(item => {
        const date = new Date(item.date)
        return [
          item.label,
          item.hours.toFixed(1) + 'ч.',
          dateHandler.dMDate(date),
          item.isCompleted ? 'Да' : 'Нет'
        ]
      })
    }
  }

  const checkUser = async () => {
    if(cookies.get('userToken')) {
      const userInf = await userHandler.getUser(cookies.get('userToken'))
      status.value = userInf.status
    } else {
      status.value = 'UNAUTH'
    }
  }

  const enterPrev = async () => {
    dateNow.value -= 1000 * 60 * 60 * 60 * 24
    getTable()
    firstDate.value =  dateHandler.dMDate(dateNow.value - 1000 * 60 * 60 * 60 * 24)
    secondDate.value =  dateHandler.dMDate(dateNow.value)
  }



  const enterNext = async () => {
    if(dateHandler.dotsDate(dateNow.value) !== dateHandler.dotsDate(new Date())) {
      dateNow.value += 1000 * 60 * 60 * 60 * 24
      getTable()
      firstDate.value =  dateHandler.dMDate(dateNow.value - 1000 * 60 * 60 * 60 * 24)
      secondDate.value =  dateHandler.dMDate(dateNow.value)
    }
  }


  onBeforeMount( async () => {

    headerData.value.avatarURL = localStorage.getItem('avatarURL')
    headerData.value.status = localStorage.getItem('status')

    checkUser()
    getTable()


  })

</script>

<style lang="scss" scoped>

</style>
