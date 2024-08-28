<template>
    <div class="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <h2 class="text-lg font-bold text-gray-700 mb-4">Registrar Deuda</h2>
      <form @submit.prevent="submitDebt">
        <div class="mb-4">
          <label class="block text-gray-700">Tipo de Deuda</label>
          <input 
            type="text" 
            v-model="tipoDeuda" 
            class="w-full p-2 border rounded"
            required 
            placeholder="Ej: Préstamo, Hipoteca"
          />
        </div>
  
        <div class="mb-4">
          <label class="block text-gray-700">Monto Total</label>
          <input 
            type="number" 
            v-model="montoTotal" 
            class="w-full p-2 border rounded"
            required 
            placeholder="Monto en USD"
            min="0"
          />
        </div>
  
        <div class="mb-4">
          <label class="block text-gray-700">Tasa de Interés (%)</label>
          <input 
            type="number" 
            v-model="tasaInteres" 
            class="w-full p-2 border rounded"
            required 
            placeholder="Tasa de Interés"
            min="0"
            max="100"
          />
        </div>
  
        <button @click="submitDebt" type="submit" class="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600">
          Guardar Deuda
        </button>
      </form>
    </div>
  </template>
  
  <script>
  import { useFinanzasStore } from '@/stores/finanzasStore';
  import Swal from 'sweetalert2';
  
  export default {
    data() {
      return {
        tipoDeuda: '',
        montoTotal: '',
        tasaInteres: ''
      };
    },
    methods: {
      async submitDebt() {
        const finanzasStore = useFinanzasStore();
  
        try {
          await finanzasStore.createNewDebt({
            tipo_de_deuda: this.tipoDeuda,
            monto_total: this.montoTotal,
            tasa_de_interes: this.tasaInteres,
            monto_restante: this.montoTotal,
            fecha_de_vencimiento: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]  // Un año desde hoy
          });
  
          Swal.fire({
            icon: 'success',
            title: 'Deuda Guardada',
            text: 'La deuda se ha guardado correctamente.',
            confirmButtonColor: '#3085d6'
          });
  
          this.$router.push('/dashboard');
        } catch (error) {
          console.log(error);
          Swal.fire({
            icon: 'error',
            title: 'Error al Guardar',
            text: 'Ocurrió un error al guardar la deuda. Por favor, intenta de nuevo.',
            confirmButtonColor: '#d33'
          });
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Estilos personalizados para el formulario */
  </style>
  