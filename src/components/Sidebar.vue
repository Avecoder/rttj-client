<template>
  <div class="sidebar-wrap">
    <div class="sidebar">
      <ul>
        <li
          v-for="route in $router.options.routes.filter(item => {
            if(status === 'ADMIN') return item
            else return item.path !== '/admin'
          })">
          <div class="router-wrap" v-if="route.path !== '/:catchAll(.*)' " :class="route.path === $route.path ? 'current' : ''">
            <router-link :to="{ path: route.path}">{{route.name}}</router-link>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
  import {onBeforeMount, ref} from 'vue'
  import userHandler from '../handlers/userHandler.js'
  import { useCookies } from 'vue3-cookies'


  const {cookies} = useCookies()
  const status = ref('USER')

  onBeforeMount(async () => {
    const data = await userHandler.getUser(cookies.get('userToken'))
    status.value = data.status
  })

</script>

<style lang="scss" scoped>
  @import '../assets/styles/variables.scss';
  @import '../assets/styles/sidebar.scss';


</style>
