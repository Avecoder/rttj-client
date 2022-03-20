<template>
  <Header
    :headerData="headerData"
    v-if="status === 'ADMIN' || status === 'USER' || status === 'BANNED'"
    @update-charts="updateCharts"
  ></Header>


  <div class="container"  v-if="status === 'ADMIN' || status === 'USER'">
    <Sidebar></Sidebar>

    <div class="content">
      <div class="wrap jcb aic label-mobile">
        <h2 class="label m0">Общая статистика</h2>
        <div class="date">Период: c <span>{{firstDate}}</span> по <span>{{secondDate}}</span></div>
      </div>

      <arrows
        @next-week="enterNextWeek"
        @prev-week="enterPrevWeek"
        v-if="table.tableData.length > 1"
      ></arrows>

      <radar-chart
        v-if="table.tableData.length > 1"
        :radarData="radar.radarData"
        :radarOptions="radar.radarOptions"
        class="radar-wrap"
      ></radar-chart>

      <div class="wrap mobile-wrap">
        <p class="legend red">Прошлая неделя</p>
        <p class="legend blue">Текущая неделя</p>
      </div>

      <!-- <p>Общая нагрузка за неделю от ожидаемой составила: <span>72%</span>. Это лучше чем у остальных пользователей. </p> -->

      <Table :tableData="table.tableData" :tableLabel="table.tableLabel" v-if="table.tableData.length > 1"></Table>
      <!-- <p v-else>У вас нет <router-link to="/friend">друзей</router-link>, заведите их</p> -->

      <div class="wrap mobile-wrap">
        <router-link to="/tasks" class="button">Изменить план</router-link>
        <router-link to="/" class="button">Твоя статистика</router-link>
      </div>
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
  import RadarChart from '../components/RadarChart.vue'
  import radarChart from '../chartData/radarChart.js'
  import Table from '../components/Table.vue'
  import AuthError from '../components/AuthError.vue'
  import BannedError from '../components/BannedError.vue'
  import Arrows from '../components/Arrows.vue'

  import userHandler from '../handlers/userHandler'
  import dateHandler from '../handlers/dateHandler'
  import {ref, onBeforeMount, reactive} from 'vue'
  import { useCookies } from "vue3-cookies"

  const { cookies } = useCookies()

  const headerData = ref({})
  const status = ref('USER')
  const dateNow = ref(new Date().getTime())

  const firstDate = ref(dateHandler.dMDate(dateNow.value - 1000 * 60 * 60 *24 * 6))
  const secondDate = ref(dateHandler.dMDate(dateNow.value))

  const radar = reactive(radarChart)

  const table = reactive({
    tableLabel: ['Пользователь', 'Статус', 'Часы'],
    tableData: []
  })

  const checkUser = async () => {
    if(cookies.get('userToken')) {
      const userInf = await userHandler.getUser(cookies.get('userToken'))
      status.value = userInf.status
    } else {
      status.value = 'UNAUTH'
    }
  }
  const renderChart = async () => {
    if(cookies.get('userToken') !== null) {
      const data = await userHandler.getAllStatic(cookies.get('userToken'), dateNow.value)

      radar.radarData.datasets[0].data = await data.map(item => item.data[0])
      radar.radarData.datasets[1].data = await data.map(item => item.data[1])
      radar.radarData.labels = await data.map(item => {
        if(item.userID == localStorage.getItem('userID')) return 'Ты'
        else return item.username
      })
      table.tableData = await data.map(item => [item.username, item.substatus, item.data[0]])
    }
  }

  const enterPrevWeek = async () => {
    dateNow.value -= 1000 * 60 * 60 * 7 * 24
    await renderChart()
    firstDate.value =  dateHandler.dMDate(dateNow.value - 1000 * 60 * 60 * 6 * 24)
    secondDate.value =  dateHandler.dMDate(dateNow.value)
  }

  const enterNextWeek = async () => {
    if(dateHandler.dotsDate(dateNow.value) !== dateHandler.dotsDate(new Date())) {
      dateNow.value += 1000 * 60 * 60 * 7 * 24
      await renderChart()
      firstDate.value =  dateHandler.dMDate(dateNow.value - 1000 * 60 * 60 * 6 * 24)
      secondDate.value =  dateHandler.dMDate(dateNow.value)
    }
  }
  const updateCharts = () => {
    const theme = localStorage.getItem('theme')

    if(theme === 'dark') {
      radar.radarOptions.scales.r = {
        beginAtZero: true,
        grid: {
          color: 'rgba(1, 1, 1, 0)',
          borderWidth: .5,
        },
        ticks: {
          display: false
        },
        angleLines: {
          color: '#343434'
        },
        pointLabels: {
          color: '#fff',
          font: {
            size: 14,
            family: 'Raleway',
            color: '#fff'
          },
          padding: 28
        }
      }

      radar.radarData.datasets[0].borderColor = '#01F1E3'
    }
  }

  onBeforeMount(async () => {
    checkUser()

    headerData.value.avatarURL = localStorage.getItem('avatarURL')
    headerData.value.status = localStorage.getItem('status')

    updateCharts()
    await renderChart()

  })

</script>

<style lang="scss" scoped>
  @import '../assets/styles/global.scss';
  @import '../assets/styles/variables.scss';

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

  .radar-wrap{
    margin-bottom: 70px;
  }

  p.legend{
    padding-left: 25px;
    font-size: 14px;
    line-height: 14px;
    color: #000000;
    font-family: 'Raleway', sans-serif;
    z-index: 5;
    position: relative;
    margin-right: 60px;
    &:after{
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 12px;
      height: 12px;
      border-radius: 50%;
    }
    &.red{
      &:after{
        background: $red;
      }
    }
    &.blue{
      &:after{
        background: $blue;
      }
    }
  }
</style>
