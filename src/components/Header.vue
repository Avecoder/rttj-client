<template>
  <header>
    <div class="header-container">

      <div class="logo">
        <router-link to="/">@RoadToTheJunior</router-link>
        <a href="#" class="sidebar-button" :class="isActive ? 'active' : ''" @click.prevent="enterSidebar"></a>
      </div>

      <div class="header-wrap">
        <div class="mode-setting">
          <a href="#"  @click.prevent="changeTheme">
            <svg v-if="theme === 'light'" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.5 6.375C7.5 4.93969 7.71141 3.48703 8.25 2.25C4.66734 3.80953 2.25 7.46812 2.25 11.625C2.25 17.2167 6.78328 21.75 12.375 21.75C16.5319 21.75 20.1905 19.3327 21.75 15.75C20.513 16.2886 19.0603 16.5 17.625 16.5C12.0333 16.5 7.5 11.9667 7.5 6.375Z" stroke="#7518F8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>

            <svg v-else width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.041 3.22076V5.47076M12.041 20.4708V22.7208M18.9354 6.07639L17.3445 7.66733M6.73758 18.2742L5.14664 19.8651M21.791 12.9708H19.541M4.54102 12.9708H2.29102M18.9354 19.8651L17.3445 18.2742M6.73758 7.66733L5.14664 6.07639" stroke="#01F1E3" stroke-miterlimit="10" stroke-linecap="round"/>
              <path d="M12.041 16.7208C14.1121 16.7208 15.791 15.0418 15.791 12.9708C15.791 10.8997 14.1121 9.22076 12.041 9.22076C9.96995 9.22076 8.29102 10.8997 8.29102 12.9708C8.29102 15.0418 9.96995 16.7208 12.041 16.7208Z" stroke="#01F1E3" stroke-miterlimit="10" stroke-linecap="round"/>
            </svg>
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
      svg{
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
