<template>
  <div class="dashboard-wrapper p-6 bg-gray-100 min-h-screen">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <SaldoTotal />
      <PresupuestoMensual />
      <IngresosGastosRecientes />
      <FlujoCaja />
      <MetasFinancierasDash />
      <DistribucionGastos />
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import { useFinanzasStore } from '@/stores/finanzasStore';
import SaldoTotal from '@/components/SaldoTotal.vue';
import PresupuestoMensual from '@/components/PresupuestoMensual.vue';
import IngresosGastosRecientes from '@/components/IngresosGastosRecientes.vue';
import FlujoCaja from '@/components/FlujoCaja.vue';
import MetasFinancierasDash  from '@/components/MetasFinancierasDash.vue';
import DistribucionGastos from '@/components/DistribucionGastos.vue';

export default {
  name: 'DashboardC',
  components: {
    SaldoTotal,
    PresupuestoMensual,
    IngresosGastosRecientes,
    FlujoCaja,
    MetasFinancierasDash,
    DistribucionGastos
  },
  setup() {
    const finanzasStore = useFinanzasStore();

    onMounted(async () => {
      await finanzasStore.initializeStoreData();
    });
  }
};
</script>

<style scoped>
.dashboard-wrapper {
  padding: 1.5rem;
  background-color: #f7fafc; /* Background color */
}

.grid {
  display: grid;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .grid-cols-2 {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .grid-cols-3 {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
