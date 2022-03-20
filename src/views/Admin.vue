<template>
  <Header :headerData="headerData"  v-if="status === 'ADMIN'"></Header>

  <div class="container" v-if="status === 'ADMIN'">
    <Sidebar></Sidebar>

    <div class="content">
      <h2 class="label">Панель администратора</h2>

      <div class="admin-search">
        <h3 class="label">Поиск пользователя</h3>
        <input type="text" @input="findUser" v-model="searchUser" class="global-input">
      </div>

      <h3 class="label mt60">
        Список пользователей
      </h3>

      <div class="user-wrap">
        <user-item
          v-for="user in userInf"
          class="user-item admin-item"
          :userInf="user"
          @change-status="changeStatus"
          @banned="bannedUser"
        ></user-item>
      </div>
    </div>
  </div>

  <auth-error v-else-if="status === 'UNAUTH'"></auth-error>

  <div class="container" v-else>
    <div class="admin-wrap">
      <h2 class="admin-error">Ты по-моему перепутал</h2>
      <router-link to="/">Вернуться на главную</router-link>
    </div>
  </div>

  <Footer></Footer>
</template>

<script setup>
  import Header from '../components/Header.vue'
  import Sidebar from '../components/Sidebar.vue'
  import Footer from '../components/Footer.vue'
  import UserItem from '../components/UserItem.vue'
  import AuthError from '../components/AuthError.vue'
  import adminHandler from '../handlers/adminHandler.js'
  import userHandler from '../handlers/userHandler.js'

  import {ref, onBeforeMount} from 'vue'
  import { useCookies } from 'vue3-cookies'

  const userInf = ref([])
  const searchUser = ref('')

  const headerData = ref({})
  const {cookies} = useCookies()
  const status = ref('USER')
  const baseURL = 'http://localhost:5000/'

  const changeStatus = async dataUser => {
    if(dataUser.status.trim().length > 2) {
      const data = await adminHandler.changeStatusUser(status.value, dataUser.userID, dataUser.status)
      alert(data.message)
    }
  }

  const findUser = async e => {
    if(e.data !== null) {
      const usersList = await adminHandler.findUsersByUsername(status.value, searchUser.value.trim())
      userInf.value = usersList.filter(item => item.status !== 'ADMIN').map(item => {
        return {
          name: item.username,
          status: item.substatus,
          src: `${baseURL}${item.userID}.jpg`,
          userID: item.userID,
          ban: item.status === 'BANNED'
        }
      })
    } else {
      const usersList = await adminHandler.getUsersList(status.value, 10)
      userInf.value = usersList.map(item => {
        return {
          name: item.username,
          status: item.substatus,
          src: `${baseURL}${item.userID}.jpg`,
          userID: item.userID,
          ban: item.status === 'BANNED'
        }
      })
    }
  }

  const bannedUser = async data => {
    if(data.ban) {
      const user = await adminHandler.unBannedUser(status.value, data.userID)
      alert(user.message)
    } else {
      const user = await adminHandler.bannedUser(status.value, data.userID)
      alert(user.message)
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


  onBeforeMount(async () => {
    await checkUser()
    headerData.value.avatarURL = localStorage.getItem('avatarURL')
    headerData.value.status = localStorage.getItem('status')

    if(cookies.get('userToken') !== null) {
      const usersList = await adminHandler.getUsersList(status.value, 10)
      userInf.value = usersList.map(item => {
        return {
          name: item.username,
          status: item.substatus,
          src: `${baseURL}${item.userID}.jpg`,
          userID: item.userID,
          ban: item.status === 'BANNED'
        }
      })
    }
  })

</script>

<style lang="scss" scoped>
  @import '../assets/styles/variables.scss';
  @import '../assets/styles/global.scss';
  @import '../assets/styles/media.scss';

  .admin-search{
    margin-right: 36px;
    a.calendar-button{
      background: #fff;
      border-radius: 4px;
      box-shadow: 0px 0px 8px rgba(134, 118, 254, 0.25);
      display: block;
      padding: 3px 13px;
    }
  }

  .user-item{
    border-top: 1px dashed #F0F3FF;
    margin-bottom: 0 !important;
    &:last-child{
      border-bottom: 1px dashed #F0F3FF;
    }
  }

  .admin-wrap{
    margin: 0 auto;
    margin-top: 180px;
    text-align: center;
    a{
      font-weight: 400;
      font-size: 14px;
      line-height: 16px;
      text-decoration-line: underline;
      font-family: 'Raleway', sans-serif;
      color: $blue;
    }
  }

  h2.admin-error{
    font-style: normal;
    font-weight: normal;
    font-size: 32px;
    line-height: 38px;
    color: #222222;
    margin: 0 0 24px;
  }

  #app{
    &.dark{
      .user-item{
        border-color: #343434;
      }
    }
  }


</style>
