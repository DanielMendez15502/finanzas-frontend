<template>
    <div class="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <h2 class="text-lg font-bold text-gray-700 mb-4">Información General</h2>
      <form @submit.prevent="submitUserInfo">
        <div class="mb-4">
          <label class="block text-gray-700">Ingresos Mensuales</label>
          <input 
            type="number" 
            v-model="ingresosMensuales" 
            class="w-full p-2 border rounded"
            required 
            placeholder="Ingresos en USD"
            min="0" 
          />
        </div>
  
        <div class="mb-4">
          <label class="block text-gray-700">Gastos Mensuales</label>
          <input 
            type="number" 
            v-model="gastosMensuales" 
            class="w-full p-2 border rounded"
            required 
            placeholder="Gastos en USD"
            min="0"
          />
        </div>
  
        <div class="mb-4">
          <label class="block text-gray-700">¿Ahorras regularmente?</label>
          <select v-model="ahorraRegularmente" class="w-full p-2 border rounded">
            <option value="si">Sí</option>
            <option value="no">No</option>
          </select>
        </div>
  
        <div class="mb-4" v-if="ahorraRegularmente === 'si'">
          <label class="block text-gray-700">Porcentaje de Ingresos que Ahorras</label>
          <input 
            type="number" 
            v-model="porcentajeAhorro" 
            class="w-full p-2 border rounded"
            placeholder="Porcentaje (%)"
            min="0" max="100"
          />
        </div>
  
        <button @click="submitUserInfo" type="submit" class="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600">
          Guardar Información
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
        ingresosMensuales: '',
        gastosMensuales: '',
        ahorraRegularmente: 'no',
        porcentajeAhorro: ''
      };
    },
    methods: {
      async submitUserInfo() {
        if (!this.ingresosMensuales || !this.gastosMensuales) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Los campos de Ingresos Mensuales y Gastos Mensuales son obligatorios.',
            confirmButtonColor: '#d33'
          });
          return;
        }
  
        const finanzasStore = useFinanzasStore();
  
        try {
          await finanzasStore.guardarInformacionGeneral({
            ingresosMensuales: this.ingresosMensuales,
            gastosMensuales: this.gastosMensuales,
            ahorraRegularmente: this.ahorraRegularmente,
            porcentajeAhorro: this.ahorraRegularmente === 'si' ? this.porcentajeAhorro : null,
          });
  
          Swal.fire({
            icon: 'success',
            title: 'Información Guardada',
            text: 'La información general se ha guardado correctamente.',
            confirmButtonColor: '#3085d6'
          });
  
          this.$router.push('/dashboard');
        } catch (error) {
          console.log(error);
          Swal.fire({
            icon: 'error',
            title: 'Error al Guardar',
            text: 'Ocurrió un error al guardar la información. Por favor, intenta de nuevo.',
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
  