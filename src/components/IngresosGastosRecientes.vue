<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-lg font-bold text-gray-700 mb-4">Ingresos y Gastos Recientes</h2>
    <div v-if="chartData.datasets && chartData.datasets.length > 0">
      <Chart type="bar" :data="chartData" :options="chartOptions" />
      <p class="mt-4" :class="balanceClass">{{ balance.mensaje }}</p>
    </div>
    <div v-else>
      <p class="text-gray-500">Aún no se ha registrado ninguna transacción.</p>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useFinanzasStore } from '@/stores/finanzasStore';
import  Chart  from 'primevue/chart';

export default {
  components: { Chart },
  setup() {
    const finanzasStore = useFinanzasStore();

    onMounted(async () => {
      await finanzasStore.fetchTransaccionesRecientes();
    });

    const transaccionesRecientes = computed(() => finanzasStore.transaccionesRecientes || []);

    const chartData = computed(() => {
  const transacciones = transaccionesRecientes.value;

  // Toma solo las últimas 20 transacciones
  const ultimasTransacciones = transacciones.slice(-20);

  if (ultimasTransacciones.length === 0) {
    return {
      labels: ['Sin datos'],
      datasets: [
        {
          label: 'Ingresos',
          backgroundColor: '#42A5F5',
          data: [0]
        },
        {
          label: 'Gastos',
          backgroundColor: '#FFA726',
          data: [0]
        }
      ]
    };
  }


  return {
    labels: ultimasTransacciones.map(item => item.fecha),
    datasets: [
      {
        label: 'Ingresos',
        backgroundColor: '#42A5F5',
        data: ultimasTransacciones.map(item => item.ingresos)
      },
      {
        label: 'Gastos',
        backgroundColor: '#FFA726',
        data: ultimasTransacciones.map(item => item.gastos)
      }
    ]
  };
});
const balance = computed(() => {
      const transacciones = transaccionesRecientes.value;

      if (transacciones.length === 0) {
        return {
          mensaje: "No hay suficientes datos para calcular el balance.",
          balance: 0,
        };
      }

      const totalIngresos = transacciones.reduce((acc, transaccion) => acc + transaccion.ingresos, 0);
      const totalGastos = transacciones.reduce((acc, transaccion) => acc + transaccion.gastos, 0);

      const balance = totalIngresos - totalGastos;
      let mensaje = '';

      if (balance > 0) {
        mensaje = `Has ganado $${balance.toFixed(2)} más de lo que has gastado.`;
      } else if (balance < 0) {
        mensaje = `Has gastado $${Math.abs(balance).toFixed(2)} más de lo que has ganado.`;
      } else {
        mensaje = "Tus ingresos y gastos están equilibrados.";
      }

      return {
        mensaje,
        balance,
      };
    });
    const balanceClass = computed(() => {
      if (balance.value.balance > 0) {
        return 'text-green-500';
      } else if (balance.value.balance < 0) {
        return 'text-red-500';
      } else {
        return 'text-black';
      }
    });


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
      transaccionesRecientes,
      chartData,
      chartOptions,
      balance,
      balanceClass,
    };
  }
};
</script>

<style scoped>
/* Estilos para Ingresos y Gastos Recientes */
</style>
