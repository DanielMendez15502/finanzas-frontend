<template>
    <div class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-lg font-bold text-gray-700 mb-4">Distribución de Gastos</h2>
      <div v-if="distribucionGastos.length > 0">
        <Chart type="pie" :data="chartData" :options="chartOptions" />
      </div>
      <p v-else class="text-gray-600">No hay datos disponibles para mostrar la distribución de gastos.</p>
    </div>
  </template>
  
  <script>
  import { computed, onMounted,ref } from 'vue';
import  Chart  from 'primevue/chart';
import { obtenerDistribucionGastos } from '@/api/api'; // Función que consumiría el nuevo endpoint

export default {
  components: { Chart },
  setup() {
    const distribucionGastos = ref([]);

    onMounted(async () => {
      distribucionGastos.value = await obtenerDistribucionGastos(); 
    });

    const chartData = computed(() => ({
      labels: distribucionGastos.value.map(item => item.categoria),
      datasets: [
        {
          data: distribucionGastos.value.map(item => item.monto),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40']
        }
      ]
    }));

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false
    };

    return {
      distribucionGastos,
      chartData,
      chartOptions
    };
  }
};


  </script>
  
  <style scoped>
  /* Estilos para Distribución de Gastos */
  </style>
  