<template>
  <header>
    <div class="header-container">

      <div class="logo">
        <router-link to="/">@RoadToTheJunior</router-link>
        <a href="#" class="sidebar-button" :class="isActive ? 'active' : ''" @click.prevent="enterSidebar"></a>
      </div>

      <div class="header-wrap">
        <div class="mode-setting">
          <a href="#">
            <img :src="theme === 'light' ? '../src/assets/img/darkMode.svg': '../src/assets/img/lightMode.svg'" alt="" @click.prevent="changeTheme">
          </a>
        </div>

        <div class="user-icon">
          <div class="avatar">
            <img :src="headerData.avatarURL" alt="">
          </div>
          <span>{{headerData.status}}</span>
        </div>
      </div>

    </div>
  </header>
</template>

<script setup>
  import { ref } from 'vue'

  const props = defineProps(['headerData'])
  const theme = ref(localStorage.getItem('theme'))

  const emit = defineEmits(['click'])

  const isActive = ref(false)

  const enterSidebar = () => {
    isActive.value = !isActive.value
    if(isActive.value) {
      document.querySelector('.sidebar-wrap').classList.add('mobile-active')
    } else {
      document.querySelector('.sidebar-wrap').classList.remove('mobile-active')
    }
  }

  const changeTheme = () => {


    if(theme.value === 'dark') {
      theme.value = 'light'
      localStorage.setItem('theme', 'light')
      document.querySelector('#app').classList.remove('dark')
    } else {
      theme.value = 'dark'
      localStorage.setItem('theme', 'dark')
      document.querySelector('#app').classList.add('dark')
    }
    emit('updateCharts')
  }

</script>

<style lang="scss" scoped>
  @import '../assets/styles/variables.scss';

  header{
    background: #fff;
    box-shadow: 0px 0px 12px #F0F3FF;
    z-index: 400;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    .header-container{
      height: 84px;
      display: -webkit-flex;
      display: -ms-flex;
      display: flex;
      justify-content: space-between;
      -ms-align-items: center;
      align-items: center;
      margin: 0 auto;
      max-width: 1260px;
      .header-wrap{
        margin-bottom: 0;
        -ms-align-items: center;
        align-items: center;
        display: -webkit-flex;
        display: -ms-flex;
        display: flex;
      }
    }
  }

  .mode-setting{
    margin-right: 64px;
    a{
      img{
        width: 26px;
        transition: .3s all ease;
      }
    }
  }

  .logo{
    a{
      font-weight: 400;
      font-size: 14px;
      line-height: 16px;
      color: #000;
      text-decoration: none;
    }
    a.sidebar-button{
      position: relative;
      width: 45px;
      height: 45px;
      display: none;
      &:before, &:after{
        width: 60%;
        height: 2px;
        border-radius: 3px;
        position: absolute;
        left: 50%;
        top: 50%;
        content: '';
        background: $blue;
        transition: .3s all ease;

      }
      &:before{
        transform: translate(-50%, -5px);
      }
      &:after{
        opacity: .4;
        transform: translate(-50%, 5px);
      }
      &.active{
        &:before{
          transform: translate(-50%, 0) rotate(45deg);
        }
        &:after{
          opacity: 1;
          transform: translate(-50%, 0) rotate(-45deg);
        }
      }
    }
  }

  .user-icon{
    position: relative;
    .avatar{
      width: 64px;
      height: 64px;
      overflow: hidden;
      border-radius: 50%;
      img{
        width: 100%;
      }
    }
    span{
      position: absolute;
      bottom: 0;
      left: -20px;
      font-size: 12px;
      background: $cyan;
      line-height: 12px;
      padding: 2px 11px 0;
      border-radius: 7px;
      text-transform: uppercase;
      box-sizing: border-box;
    }
  }

  #app{
    &.dark{
      .logo{
        a.sidebar-button{
          &:before, &:after{
            background: $cyan;
          }
        }
      }
    }
  }
</style>
