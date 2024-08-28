<template>
    <div class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-lg font-bold text-gray-700 mb-4">Saldo Total</h2>
      <p class="text-3xl text-green-500 font-semibold">{{ formatCurrency(saldoTotal) }}</p>
    </div>
  </template>
  
  <script>
  import { computed } from 'vue';
  import { useFinanzasStore } from '@/stores/finanzasStore';
  
  export default {
    setup() {
      const finanzasStore = useFinanzasStore();
      const saldoTotal = computed(() => finanzasStore.saldoTotal);
  
      const formatCurrency = (value) => {
        if (value === null || value === undefined) {
          return '$0.00'; // Valor predeterminado
        }
        return `$${value.toFixed(2)}`;
      };
  
      return {
        saldoTotal,
        formatCurrency
      };
    }
  };
  </script>
  
  <style scoped>
  /* Estilos para Saldo Total */
  </style>
  