<template>
  <Header :headerData="headerData"></Header>
  <div class="container">
    <img src="../assets/img/page404.png" alt="">
    <h2 class="label">Статус <span>404</span></h2>
    <router-link to="/">Вернуться на главную</router-link>
  </div>
  <Footer></Footer>
</template>

<script setup>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

import {onBeforeMount, ref} from 'vue'

const headerData = ref({})

onBeforeMount(() => {
  headerData.value.avatarURL = localStorage.getItem('avatarURL')
  headerData.value.status = localStorage.getItem('status')
})
</script>

<style lang="scss" scoped>
  @import '../assets/styles/variables.scss';
  .container{
    height: 100vh;
    width: 100%;
    padding: 0;
    // margin-bottom: 140px;
    display: -webkit-flex;
    display: -ms-flex;
    display: flex;
    justify-content: center;
    -ms-align-items: center;
    align-items: center;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    img{
      width: 192px;
    }
    h2{
      font-weight: 300;
      font-size: 28px;
      line-height: 33px;
      font-family: 'Raleway', sans-serif;
      color: #000000;
      span{
        color: $blue;
      }
    }
    a{
      font-weight: 400;
      font-size: 14px;
      line-height: 16px;
      text-decoration-line: underline;
      font-family: 'Raleway', sans-serif;
      color: $blue;
    }
  }

  #app{
    &.dark{
      .container{
        a{
          color: $cyan;
        }
        h2.label{
          span{
            color: $cyan;
          }
        }
      }
    }
  }
</style>
