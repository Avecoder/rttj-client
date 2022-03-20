<template>
  <div class="alert-wrap" v-show="visible">
    <p>Пользователь <span>User228</span> пидорас,так как он удалил вас из друзей.</p>
    <a href="#" @click="visible = false">
      <img src="../assets/img/close.svg" alt="">
    </a>
  </div>
</template>

<script setup>
  import {ref} from 'vue'

  const visible = ref(false)
</script>

<style lang="scss" scoped>
  @import '../assets/styles/variables.scss';

  .alert-wrap{
    background: #FFFFFF;
    box-shadow: 0px 0px 12px #F0F3FF;
    border-radius: 6px;
    display: -webkit-flex;
    display: -ms-flex;
    display: flex;
    justify-content: space-between;
    -ms-align-items: flex-start;
    align-items: flex-start;
    max-width: 300px;
    padding: 14px 18px;
    p{
      font-weight: normal;
      font-size: 15px;
      line-height: 22px;
      color: #000000;
      margin: 0;
      margin-right: 20px;
      span{
        color: $blue;
      }
    }
  }
</style>
