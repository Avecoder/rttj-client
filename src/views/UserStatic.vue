<template>
  <Header
    :headerData="headerData"
    v-if="status === 'ADMIN' || status === 'USER' || status === 'BANNED'"
    @update-charts="updateCharts"
  ></Header>

  <div class="container" v-if="status === 'ADMIN' || status === 'USER'">
    <Sidebar></Sidebar>

    <div class="content">
      <div class="wrap jcb aic label-mobile">
        <h2 class="label m0">Статистика пользователя</h2>
        <div class="date">Период: c <span>{{firstDate}}</span> по <span>{{secondDate}}</span></div>
      </div>

      <arrows
        @next-week="enterNextWeek"
        @prev-week="enterPrevWeek"
      ></arrows>

      <div class="line-wrap" v-if="line.lineData">
        <line-chart :lineData="line.lineData" :lineOptions="line.lineOptions"></line-chart>
      </div>

      <!-- <p>Общая нагрузка за неделю от ожидаемой составила: <span>72%</span>. Это лучше чем у остальных пользователей. </p> -->
      <h3 class="label">{{table.tableData.length > 0 ? 'Занятия пользователя' : 'Ты вообще ничего не собирался делать.'}}</h3>
      <Table :tableData="table.tableData" :tableLabel="table.tableLabel" v-if="table.tableData.length > 0"></Table>
      <div class="wrap mobile-wrap">
        <router-link to="/tasks" class="button">Изменить план</router-link>
        <router-link to="/all" class="button">Общая статистика</router-link>
      </div>
    </div>
  </div>

  <banned-error v-else-if="status === 'BANNED'"></banned-error>

  <auth-error v-else></auth-error>

  <Footer></Footer>
</template>

<script setup>
  import { ref, onBeforeMount, reactive } from 'vue'
  import { useCookies } from 'vue3-cookies'
  import { useRoute } from 'vue-router'

  import Header from '../components/Header.vue'
  import Sidebar from '../components/Sidebar.vue'
  import Table from '../components/Table.vue'
  import Footer from '../components/Footer.vue'
  import LineChart from '../components/LineChart.vue'
  import Calendar from '../components/Calendar.vue'
  import AuthError from '../components/AuthError.vue'
  import BannedError from '../components/BannedError.vue'
  import Arrows from '../components/Arrows.vue'

  import lineChart from '../chartData/lineChart.js'
  import userHandler from '../handlers/userHandler.js'
  import dateHandler from '../handlers/dateHandler.js'

  import config from '../config'

  const baseURL = config.imageURL


  const table = ref({
    tableLabel: [
      'Задача',
      'Время',
      'Дата',
      'Выполнено'
    ],
    tableData: []
  })

  const { cookies } = useCookies()
  const route = useRoute()

  const headerData = ref({})
  const line = reactive(lineChart)
  const status = ref('USER')
  const dateNow = ref(new Date().getTime())

  const firstDate = ref(dateHandler.dMDate(dateNow.value - 1000 * 60 * 60 *24 * 6))
  const secondDate = ref(dateHandler.dMDate(dateNow.value))


  const renderChart = async () => {
    const userData = await userHandler.getTasksWeek(cookies.get('userToken'), dateNow.value)
    const userDataPeriod = await userHandler.getTasksPeriod(cookies.get('userToken'), dateNow.value)

    line.lineData.datasets[0].data = await userData.map(item => item.hours)
    line.lineData.datasets[0].label = 'Прозанимался'
    line.lineData.labels = await userData.map(item => {
      const date = new Date(item.date)
      return dateHandler.dMDate(date)
    })


    table.value.tableData = await userDataPeriod
      .filter(item => item.hours > 0)
      .map(item => {
        const pad = (s) => ('00' + s).slice(-2)
        const date = new Date(item.date)
        return [item.label, item.hours, dateHandler.dotsDate(date), item.isCompleted ? 'Да': 'Нет']
      })
  }

  const checkUser = async () => {
    try {
      if(cookies.get('userToken') !== null) {
        const userInf = await userHandler.getUser(cookies.get('userToken'))
        status.value = userInf.status
      } else {
        status.value = 'UNAUTH'
      }
    } catch(e) {
      console.log(`ERROR - ${e}`)
    }
  }

  const enterPrevWeek = async () => {
    dateNow.value -= 1000 * 60 * 60 * 8 * 24
    await renderChart()
    firstDate.value =  dateHandler.dMDate(dateNow.value - 1000 * 60 * 60 * 6 * 24)
    secondDate.value =  dateHandler.dMDate(dateNow.value)
  }

  const enterNextWeek = async () => {
    if(dateHandler.dotsDate(dateNow.value) !== dateHandler.dotsDate(new Date())) {
      dateNow.value += 1000 * 60 * 60 * 8 * 24
      await renderChart()
      firstDate.value =  dateHandler.dMDate(dateNow.value - 1000 * 60 * 60 * 6 * 24)
      secondDate.value =  dateHandler.dMDate(dateNow.value)
    }
  }

  const updateCharts = async () => {
    const theme = localStorage.getItem('theme')
    if(theme === 'dark') {
      line.lineOptions.scales.x = {
        grid: {
          color: '#323232',
          borderColor: '#323232',
          tickColor: 'transparent',
        },
        ticks: {
          color: '#01F1E3',
          padding: 12,
        }
      }

      line.lineOptions.scales.y = {
        grid: {
          color: 'transparent',
          borderColor: '#323232',
          tickColor: 'transparent'
        },
        ticks: {
          color: '#01F1E3',
          stepSize: 1,
          padding: 24
        }
      }

      line.lineData.datasets[0].borderColor = '#01F1E3'

    } else {
      line.lineOptions.scales.x = {
        grid: {
          color: '#F0F3FF',
          borderColor: '#F0F3FF',
          tickColor: 'transparent',
        },
        ticks: {
          color: '#8676FE',
          padding: 12,
        }
      }

      line.lineOptions.scales.y = {
        grid: {
          color: 'transparent',
          borderColor: '#F0F3FF',
          tickColor: 'transparent'
        },
        ticks: {
          color: '#8676FE',
          stepSize: 1,
          padding: 24
        }
      }

      line.lineData.datasets[0].borderColor = '#8676FE'
    }
  }

  onBeforeMount(async () => {
    try {
      if(route.query.user) {
        const queryParam = await userHandler.getUser(route.query.user)
        if(queryParam !== 'UNAUTH') {
          cookies.set('userToken', route.query.user)
          localStorage.setItem('avatarURL', `${baseURL}${queryParam.userID}.jpg`)
          localStorage.setItem('status', queryParam.substatus)
          localStorage.setItem('userID', queryParam.userID)
        } else {
          status.value = queryParam
        }
      }

      headerData.value.avatarURL = localStorage.getItem('avatarURL')
      headerData.value.status = localStorage.getItem('status')
      checkUser()

      if(status.value !== 'UNAUTH' || status.value !== 'BANNED') {
        updateCharts()
        await renderChart()
      }
    } catch(e) {
      console.log(e)
    }

  })

</script>

<style lang="scss">
  @import '../assets/styles/global.scss';
  @import '../assets/styles/media.scss';

  .content{
    width: calc(100% - 400px);
    padding-top: 80px;
    padding-left: 100px;
    padding-bottom: 100px;
    padding-right: 36px;
  }
  .container{
    width: 100%;
    display: -webkit-flex;
    display: -ms-flex;
    display: flex;
  }


</style>
