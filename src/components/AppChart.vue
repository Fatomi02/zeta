<template>
  <div class="w-full flex justify-center">
    <canvas ref="chartCanvas" :class="type === 'pie' ? 'max-h-[250px] lg:max-h-[350px]' : ''"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const props = defineProps({
  type: {
    type: String, // Accepts 'pie', 'bar', 'line', etc.
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
  options: {
    type: Object,
    default: () => ({}),
  },
});

const chartCanvas = ref(null);
let chartInstance = null;

// Function to render the chart
const renderChart = () => {
  if (chartInstance) {
    chartInstance.destroy(); // Destroy the previous chart
  }
  if (chartCanvas.value) {
    chartInstance = new Chart(chartCanvas.value, {
      type: props.type, // Use the 'type' prop
      data: props.data,
      options: props.options,
    });
  }
};

// Watch for changes in props to re-render the chart
watch(
  () => [props.type, props.data, props.options],
  () => renderChart(),
  { deep: true }
);

onMounted(() => renderChart());

onBeforeUnmount(() => {
  if (chartInstance) chartInstance.destroy();
});
</script>

<style scoped>
canvas {
  height: 350px !important;
}

@media only screen and (max-width: 640px) {
  canvas {
    height: auto !important;
  }
}
</style>
