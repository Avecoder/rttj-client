<template>
  <div class="wrap jce">
    <a href="#" class="arrow" @click.prevent="$emit('prevWeek')">
      <svg width="10" height="17" viewBox="0 0 10 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.93543 1.07495L1.50684 8.65925L8.93543 16.2436" stroke="#7518F8"/>
      </svg>
    </a>
    <a href="#" class="arrow" @click.prevent="$emit('nextWeek')">
      <svg width="9" height="17" viewBox="0 0 9 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.641716 1.07495L8.07031 8.65925L0.641716 16.2436" stroke="#7518F8"/>
      </svg>
    </a>
  </div>
</template>


<script setup>
  
</script>
