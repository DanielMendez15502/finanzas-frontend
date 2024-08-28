<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-lg font-bold text-gray-700 mb-4">Flujo de Caja</h2>
    <div v-if="flujoCaja.length === 0" class="text-center text-gray-500">
      Aún no se ha registrado ninguna transacción de flujo de caja.
    </div>
    <div v-else>
      <Chart type="line" :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useFinanzasStore } from '@/stores/finanzasStore';
import  Chart  from 'primevue/chart';

export default {
  components: { Chart },
  setup() {
    const finanzasStore = useFinanzasStore();
    const flujoCaja = computed(() => finanzasStore.flujoCaja || []);

    const chartData = computed(() => ({
      labels: flujoCaja.value.length ? flujoCaja.value.map(item => item.fecha) : ['Sin datos'],
      datasets: [
        {
          label: 'Flujo de Caja',
          data: flujoCaja.value.length ? flujoCaja.value.map(item => item.cantidad) : [0],
          fill: false,
          borderColor: '#4BC0C0'
        }
      ]
    }));

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    };
    return {
      flujoCaja,
      chartData,
      chartOptions
    };
  }
};
</script>

<style scoped>
/* Estilos para Flujo de Caja */
</style>
