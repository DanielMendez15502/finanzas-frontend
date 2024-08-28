<template>
    <div class="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <h2 class="text-lg font-bold text-gray-700 mb-4">Registrar Transacción</h2>
      <form @submit.prevent="submitTransaction">
        <div class="mb-4">
          <label class="block text-gray-700">Tipo de Transacción</label>
          <select v-model="type" class="w-full p-2 border rounded" required>
            <option value="ingreso">Ingreso</option>
            <option value="gasto">Gasto</option>
          </select>
        </div>
  
        <div class="mb-4">
          <label class="block text-gray-700">Categoría</label>
          <select v-model="category" class="w-full p-2 border rounded" required>
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
          </select>
        </div>
  
        <div class="mb-4">
          <label class="block text-gray-700">Monto</label>
          <input 
            type="number" 
            v-model="amount" 
            class="w-full p-2 border rounded"
            required 
            placeholder="Monto en USD"
            min="0"
          />
        </div>
  
        <button type="submit" class="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600">
          Guardar Transacción
        </button>
      </form>
    </div>
  </template>
  
  <script>
  import { useFinanzasStore } from '@/stores/finanzasStore';
//   import { computed } from 'vue';
  import Swal from 'sweetalert2';
  
  export default {
    data() {
      return {
        type: 'gasto',
        category: '',
        amount: '',
        categories: []
      };
    },
    mounted() {
      this.loadCategories();
    },
    methods: {
        async loadCategories() {
            const finanzasStore = useFinanzasStore();
            
            // Si `categories` ya está en el store y no necesitas hacer más procesamiento:
            this.categories = finanzasStore.categories;
            console.log(finanzasStore.categories);
        },
      async submitTransaction() {
        const finanzasStore = useFinanzasStore();
  
        try {
          await finanzasStore.createNewTransaction({
            type: this.type,
            category: this.category,
            amount: this.amount,
            date: new Date().toISOString().split('T')[0],  // Fecha actual en formato YYYY-MM-DD
            description: ''
          });
  
          Swal.fire({
            icon: 'success',
            title: 'Transacción Guardada',
            text: 'La transacción se ha guardado correctamente.',
            confirmButtonColor: '#3085d6'
          });
  
          this.$router.push('/dashboard');
        } catch (error) {
          console.log(error);
          Swal.fire({
            icon: 'error',
            title: 'Error al Guardar',
            text: 'Ocurrió un error al guardar la transacción. Por favor, intenta de nuevo.',
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
  