<template>
  <Header :headerData="headerData" v-if="status === 'ADMIN' || status === 'USER' || status === 'BANNED'"></Header>

  <div class="container" v-if="status === 'ADMIN' || status === 'USER'">
    <Sidebar></Sidebar>

    <div class="content">
      <h2 class="label">Профиль</h2>
      <p>В общем ты прозанимался <span>124</span>ч.</p>

      <div class="wrap mobile-wrap">
        <div class="avatar-set">
          <img :src="avatar" alt="">
          <label class="custom-upload">
            <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg, image/jpg" @input="changeImg">
            <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.5 6.92622V11.9575C10.5 12.1011 10.4717 12.2433 10.4167 12.376C10.3618 12.5087 10.2812 12.6293 10.1796 12.7309C10.0781 12.8324 9.95751 12.913 9.82481 12.968C9.69211 13.0229 9.54988 13.0512 9.40625 13.0512H2.84375C2.55367 13.0512 2.27547 12.936 2.07035 12.7309C1.86523 12.5258 1.75 12.2476 1.75 11.9575V5.39497C1.75 5.10489 1.86523 4.82669 2.07035 4.62158C2.27547 4.41646 2.55367 4.30122 2.84375 4.30122H7.42328" stroke="#7518F8" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12.5765 2.25727C12.5366 2.21337 12.4881 2.17802 12.4341 2.15337C12.3801 2.12872 12.3217 2.11527 12.2623 2.11384C12.203 2.1124 12.144 2.12302 12.0888 2.14504C12.0337 2.16706 11.9836 2.20003 11.9416 2.24196L11.6034 2.57856C11.5624 2.61958 11.5393 2.6752 11.5393 2.73319C11.5393 2.79118 11.5624 2.8468 11.6034 2.88782L11.9134 3.19735C11.9338 3.21777 11.9579 3.23397 11.9845 3.24503C12.0111 3.25609 12.0397 3.26178 12.0685 3.26178C12.0973 3.26178 12.1258 3.25609 12.1524 3.24503C12.179 3.23397 12.2032 3.21777 12.2235 3.19735L12.5533 2.86922C12.7201 2.7027 12.7357 2.43145 12.5765 2.25727ZM10.9195 3.26215L5.98339 8.1895C5.95347 8.21931 5.93171 8.25631 5.92023 8.29696L5.69191 8.977C5.68644 8.99545 5.68605 9.01504 5.69079 9.03369C5.69552 9.05235 5.70521 9.06938 5.71881 9.08299C5.73242 9.09659 5.74945 9.10628 5.76811 9.11101C5.78676 9.11575 5.80635 9.11536 5.8248 9.10989L6.50429 8.88157C6.54494 8.87009 6.58195 8.84834 6.61175 8.81841L11.5391 3.88176C11.5847 3.83569 11.6103 3.77349 11.6103 3.70868C11.6103 3.64386 11.5847 3.58167 11.5391 3.53559L11.267 3.26215C11.2209 3.21615 11.1584 3.19032 11.0933 3.19032C11.0281 3.19032 10.9656 3.21615 10.9195 3.26215Z" fill="#7518F8"/>
            </svg>
          </label>
        </div>
        <div class="profile-inner">
          <input type="text" class="global-input" placeholder="Новый ник" v-model="username">
          <a href="#" class="button" @click.prevent="updateUser">Сохранить изменения</a>
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
  import AuthError from '../components/AuthError.vue'
  import BannedError from '../components/BannedError.vue'


  import userHandler from '../handlers/userHandler.js'
  import config from '../config'

  import {ref, onBeforeMount, reactive} from 'vue'
  import { useCookies } from 'vue3-cookies'


  const {cookies} = useCookies()
  const headerData = reactive({})
  const status = ref('USER')

  const avatar = ref(`${config.imageURL}982100994.jpg`)
  const username = ref('')


  const checkUser = async () => {
    if(cookies.get('userToken')) {
      const userInf = await userHandler.getUser(cookies.get('userToken'))
      status.value = userInf.status
      username.value = userInf.username
    } else {
      status.value = 'UNAUTH'
    }
  }

  const changeImg = event => {
    const input = event.target

    if (input.files && input.files[0]) {

        const reader = new FileReader()
        reader.onload = (e) => {
            avatar.value = e.target.result;
        }
        reader.readAsDataURL(input.files[0]);
    }
  }

  const updateUser = async () => {
    if(username.value.length > 2) {
      const data = await userHandler.updateUser(cookies.get('userToken'), username.value, avatar.value)
      location.reload()
    }
  }


  onBeforeMount( async () => {

    headerData.avatarURL = localStorage.getItem('avatarURL')
    headerData.status = localStorage.getItem('status')

    checkUser()

  })

</script>

<style lang="scss" scoped>
  @import '../assets/styles/global.scss';
  @import '../assets/styles/media.scss';

  .avatar-set{
    width: 200px;
    height: 200px;
    box-sizing: border-box;
    overflow: hidden;
    display: -webkit-flex;
    display: -ms-flex;
    display: flex;
    justify-content: center;
    -ms-align-items: flex-start;
    align-items: flex-start;
    border-radius: 8px;
    position: relative;
    img {
      width: 220px;
    }
    .custom-upload {
      width: 30px;
      height: 30px;
      background: #fff;
      cursor: pointer;
      position: absolute;
      right: 10px;
      top: 10px;
      display: -webkit-flex;
      display: -ms-flex;
      display: flex;
      justify-content: center;
      -ms-align-items: center;
      align-items: center;
      border-radius: 6px;
      input#avatar{
        display: none;
      }
      svg{
        width: 20px;
        height: 20px;
      }
    }
  }
  p{
    margin-bottom: 44px;
  }
  .profile-inner{
    margin-left: 28px;
    padding-top: 20px;
    input{
      display: block;
      margin-bottom: 40px;
    }
  }

  #app {
    &.dark{
      .custom-upload{
        background: #343434;
        svg{
          path{
            stroke: $cyan;
          }
        }
      }
    }
  }
</style>
