<template>
  <line-chart
    :chart-data="lineData"
    :options="lineOptions"
    css-classes="chart-container"
  />
</template>

<script setup>
  import { LineChart } from "vue-chart-3"

  import { Chart, registerables } from 'chart.js';
  Chart.register(...registerables);

  const props = defineProps(['lineData', 'lineOptions'])

</script>
