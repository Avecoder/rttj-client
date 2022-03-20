<template>
  <v-date-picker v-model="date" :attributes="attributes" :min-date="new Date()" @dayclick="takeDate">
    <template #default="{ inputValue, inputEvents }">
      <input :value="inputValue" v-on="inputEvents"  class="global-input">
    </template>
</v-date-picker>

<h2>{{inputValue}}</h2>
</template>

<script setup>
import {ref} from 'vue'
const emit = defineEmits(['click'])

const takeDate = date => {
  emit('enterDate', date)
}

const date = ref(0)
const inputValue = ref()

const attributes = ref([
  {
    key: 'today',
    dates: new Date(),
  },
  {
    key: 'current',
    dates: inputValue,
  }
])



</script>

<style lang="scss" scoped>
  @import '../assets/styles/variables.scss';
  .today{
    background: red;
  }
  
</style>
