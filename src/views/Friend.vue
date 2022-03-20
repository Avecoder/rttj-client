<template>
  <Header :headerData="headerData" v-if="status === 'ADMIN' || status === 'USER' || status === 'BANNED'"></Header>

  <div class="container" v-if="status === 'ADMIN' || status === 'USER'">
    <Sidebar></Sidebar>

    <div class="content">
      <h2 class="label">Список друзей</h2>

      <div class="friend-wrap" v-if="friendInf.length !== 0">
        <h3 class="label">Ваши друзья</h3>
        <friend-item
            v-for="item in friendInf"
            :userInf="item"
            :butt="{action: 'remove', label: 'Удалить'}"
            class="friend-item"
            @some-event="checkEmit"
        ></friend-item>
      </div>

      <div class="friend-wrap" v-if="reqFriend.length !== 0">
        <h3 class="label">Заявки</h3>
        <friend-item
            v-for="item in reqFriend"
            :userInf="item"
            :butt="{action: 'request', label: 'Добавить'}"
            class="friend-item"
            @some-event="checkEmit"
        ></friend-item>
      </div>

      <div class="friend-search-wrap">
        <h3 class="label" v-if="friendInf.length === 0 && reqFriend.length === 0">У Вас нет друзей, добавьте их.</h3>
        <h4 class="label">Поиск друзей</h4>
        <input type="text" placeholder="username" @input="sendLog" v-model="searchUser" class="global-input">
        <div class="friend-wrap" v-if="addFriend.length !== 0">
          <friend-item
              v-for="item in addFriend"
              :userInf="item"
              :butt="{action: 'add', label: 'Добавить'}"
              class="friend-item"
              @some-event="checkEmit"
          ></friend-item>
        </div>
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
  import FriendItem from '../components/FriendItem.vue'
  import AuthError from '../components/AuthError.vue'
  import BannedError from '../components/BannedError.vue'

  import userHandler from '../handlers/userHandler'

  import {ref, onBeforeMount} from 'vue'
  import { useCookies } from 'vue3-cookies'

  const friendInf = ref([])
  const addFriend = ref([])
  const reqFriend = ref([])

  const searchUser = ref('')
  const status = ref('USER')

  const headerData = ref({})
  const { cookies } = useCookies()

  const baseURL = 'http://localhost:5000/'

  const checkEmit = async data => {
    if(data.action === 'add') {
      const addUser = await userHandler.addFriend(cookies.get('userToken'), data.userID)
      addFriend.value = addFriend.value.filter(item => item.userID !== data.userID)
      alert(`Ваша заявка отправлена ${addUser.friend.username}.`)
    }

    if(data.action === 'remove') {
      const removeUser = await userHandler.removeFriend(cookies.get('userToken'), data.userID)
      friendInf.value = friendInf.value.filter(item => item.userID !== data.userID)
      alert(removeUser.message)
    }

    if(data.action === 'request') {
      const addUser = await userHandler.addFriend(cookies.get('userToken'), data.userID)
      reqFriend.value.forEach(item => {
        if(item.userID === data.userID) friendInf.value.push(item)
      })
      reqFriend.value = reqFriend.value.filter(item => item.userID !== data.userID)
      alert(`Вы добавили пользователя ${addUser.friend.username}.`)
    }
  }



  const sendLog = async e => {
    if(e.data !== null ) {
      const userID = localStorage.getItem('userID')
      const friendsList = await userHandler.getFriends(cookies.get('userToken'))
      const usersList = await userHandler.seacrhUsers(searchUser.value)
      const usersFilter = usersList.filter((item, i) => {
        let isFriend = false
        if(item.userID == userID) isFriend = true
        friendsList.forEach(el => {
          if(el.friendID == item.userID) {
            isFriend = true
          }
        })
        if(!isFriend) {
          return item
        }
      })

      addFriend.value = usersFilter.map(item => {
        return {
          src: `${baseURL}${item.userID}.jpg`,
          username: item.username,
          substatus: item.substatus,
          userID: item.userID
        }
      })

    } else {
      addFriend.value = []
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
    checkUser()
    headerData.value.avatarURL = localStorage.getItem('avatarURL')
    headerData.value.status = localStorage.getItem('status')


    if(cookies.get('userToken') !== null) {
      const usersList = await userHandler.getFriends(cookies.get('userToken'))

      const friendsID = usersList
                            .filter(item => item.isMutually)
                            .map(item => item.friendID)

      const requestID = usersList
                            .filter(item => !item.isMutually && item.friendID === item.fromRequest)
                            .map(item => item.friendID)


      const friendsList = await userHandler.getUsersByIDs(friendsID)
      const requestsList = await userHandler.getUsersByIDs(requestID)

      friendInf.value = friendsList.map(item => {
        return {
          src: `${baseURL}${item.userID}.jpg`,
          username: item.username,
          substatus: item.substatus,
          userID: item.userID
        }
      })

      reqFriend.value = requestsList.map(item => {
        return {
          src: `${baseURL}${item.userID}.jpg`,
          username: item.username,
          substatus: item.substatus,
          userID: item.userID
        }
      })
    }


  })
</script>

<style lang="scss">
  @import '../assets/styles/global.scss';
  @import '../assets/styles/variables.scss';

  .friend-item{
    border-top: 1px dashed #F0F3FF;
    margin-bottom: 0 !important;
    &:last-child{
      border-bottom: 1px dashed #F0F3FF;
    }
  }

  .friend-search-wrap{
    p{
      margin-bottom: 20px;
    }
    input.global-input{
      margin-bottom: 20px;
    }
  }

  #app{
    &.dark{
      .friend-item{
        border-color: #343434;
      }
    }
  }
</style>
