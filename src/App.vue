<template>
    <router-view></router-view>

</template>

<script setup>
    import { ref, onBeforeMount, reactive } from 'vue'

    onBeforeMount(() => {
      const theme = localStorage.getItem('theme')
      if(theme === null) localStorage.setItem('theme', 'light')
      if(theme === 'dark') document.querySelector('#app').classList.add('dark')
    })

</script>

<style lang="scss">


</style>
