<template>
  <radar-chart
    :chart-data="radarData"
    :options="radarOptions"
    css-classes="chart-container"
    class="radar"
  />
</template>


<script setup>
  import { RadarChart } from "vue-chart-3"
  import { Chart, registerables } from 'chart.js';
  import {onBeforeMount, ref} from 'vue'
  Chart.register(...registerables)

  const props = defineProps(['radarData', 'radarOptions'])



</script>

<style lang="scss">
  .radar{
    padding-bottom: 10px;
    margin: 0 auto;
    width: 600px;
    height: 600px;
    position: relative;
    z-index: 5;
    display: block;
    &:hover{
      display: block;
    }
  }
</style>
