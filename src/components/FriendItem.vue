<template>
  <div class="friend-item wrap jcb aic">
    <div class="user-inf">
      <div class="avatar">
        <img :src="userInf.src" alt="">
      </div>
      <div class="username">{{userInf.username}}</div>
      <div class="status">{{userInf.substatus}}</div>
    </div>
    <div class="delete">
      <a href="#" @click.prevent="$emit('someEvent', {userID: userInf.userID, action: butt.action})">{{butt.label}}</a>
    </div>
  </div>
</template>

<script setup>
  import { defineEmits } from 'vue'

  const props = defineProps(['userInf', 'butt'])
</script>

<style lang="scss" scoped>
  @import '../assets/styles/global.scss';
  @import '../assets/styles/variables.scss';

  .user-inf{
    display: -webkit-flex;
    display: -ms-flex;
    display: flex;
    -ms-align-items: center;
    align-items: center;
    padding: 18px 16px;
    .avatar{
      width: 55px;
      height: 55px;
      margin-right: 20px;
      border-radius: 50%;
      overflow: hidden;
      display: -webkit-flex;
      display: -ms-flex;
      display: flex;
      -ms-align-items: flex-start;
      align-items: flex-start;
      justify-content: center;
      img{
        width: 110%;
      }
    }
    .username{
      font-weight: 400;
      font-size: 16px;
      line-height: 16px;
      font-family: 'Raleway', sans-serif;
      color: #000000;
      margin-right: 32px;
    }
    .status{
      font-weight: 500;
      font-size: 12px;
      line-height: 12px;
      font-family: 'Raleway', sans-serif;
      color: #000000;
      background: $cyan;
      border-radius: 14px;
      padding: 1px 13px;
      text-transform: uppercase;
    }
  }

  #app{
    &.dark{
      .username{
        color: #fff;
      }
      .delete{
        a{
          color: $cyan;
        }
      }
    }
  }

</style>
