<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-lg font-bold text-gray-700 mb-4">Presupuesto Mensual</h2>
    <p>Gastado: {{ finanzasStore.presupuestoMensual.gastado }}</p>
    <p>Restante: {{ finanzasStore.presupuestoMensual.restante }}</p>
    <Chart type="doughnut" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import { computed } from 'vue';
import { useFinanzasStore } from '@/stores/finanzasStore';
import Chart from 'primevue/chart';

export default {
  components: { Chart },
  setup() {
    const finanzasStore = useFinanzasStore();

    const chartData = computed(() => ({
      labels: ['Gastado', 'Restante'],
      datasets: [
        {
          data: [
            finanzasStore.presupuestoMensual.gastado,
            finanzasStore.presupuestoMensual.restante
          ],
          backgroundColor: ['#FF6384', '#36A2EB']
        }
      ]
    }));

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false
    };

    return {
      finanzasStore,
      chartData,
      chartOptions
    };
  }
};

</script>

<style scoped>
/* Scoped styles for the Presupuesto Mensual component */
</style>
