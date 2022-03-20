<template>
  <div class="user-item wrap jcb aic">
    <div class="user-inf">
      <div class="avatar">
        <img :src="userInf.src" alt="">
      </div>
      <div class="username">{{userInf.name}}</div>
      <input type="text" class="global-input" :placeholder="userInf.status" v-model="status">
      <a href="#" @click.prevent="$emit('changeStatus', {userID: userInf.userID, status})">Сохранить</a>
    </div>
    <div class="delete">
      <a href="#" @click.prevent="bannedUser">{{userInf.ban ? 'Разбанить' : 'Забанить'}}</a>
    </div>
  </div>
</template>

<script setup>
  import {ref} from 'vue'

  const status = ref('')

  const props = defineProps(['userInf'])
  const emit = defineEmits(['click'])

  const bannedUser = () => {
    emit('banned', {userID: props.userInf.userID, ban: props.userInf.ban})
    props.userInf.ban = !props.userInf.ban
  }
</script>

<style lang="scss" scoped>
@import '../assets/styles/variables.scss';
@import '../assets/styles/global.scss';
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
    margin-right: 56px;
    min-width: 100px;
  }

  a{
    background: $cyan;
    color: #000;
    text-decoration: none;
    font-family: 'Raleway', sans-serif;
    font-size: 15px;
    line-height: 15px;
    padding: 0px 8px;
    border-radius: 20px;
    cursor: pointer;
  }


}

#app{
  &.dark{
    .delete{
      a{
        color: $cyan !important;
      }
    }
    .user-inf{
      .username{
        color: #fff !important;
      }
    }
  }
}
</style>
