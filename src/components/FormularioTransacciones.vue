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
        <button type="button" class="text-blue-500 mt-2" @click="showModal = true">
          + Añadir nueva categoría
        </button>
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

    <!-- Modal para añadir nueva categoría -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h3 class="text-lg font-bold text-gray-700 mb-4">Añadir Nueva Categoría</h3>
        <form @submit.prevent="addCategory">
          <div class="mb-4">
            <label class="block text-gray-700">Nombre de la Categoría</label>
            <input 
              type="text" 
              v-model="newCategory" 
              class="w-full p-2 border rounded"
              required 
              placeholder="Nombre de la categoría"
            />
          </div>

          <div class="flex justify-end">
            <button type="button" class="text-gray-500 mr-4" @click="showModal = false">
              Cancelar
            </button>
            <button type="submit" class="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { useFinanzasStore } from '@/stores/finanzasStore';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      type: 'gasto',
      category: '',
      amount: '',
      categories: [],
      showModal: false,
      newCategory: ''
    };
  },
  mounted() {
    this.loadCategories();
  },
  methods: {
    async loadCategories() {
      const finanzasStore = useFinanzasStore();
      console.log("22222222222222222222");
      console.log(finanzasStore.categories);
      
      this.categories = finanzasStore.categories;
    },
    async submitTransaction() {
      const finanzasStore = useFinanzasStore();

      try {
        await finanzasStore.createNewTransaction({
          type: this.type,
          category: this.category,
          amount: this.amount,
          date: new Date().toISOString().split('T')[0],
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
    },
    async addCategory() {
      const finanzasStore = useFinanzasStore();

      try {
        await finanzasStore.createNewCategory({ name: this.newCategory, type: "Type" });
        this.loadCategories();
        this.showModal = false;
        this.newCategory = '';

        Swal.fire({
          icon: 'success',
          title: 'Categoría Añadida',
          text: 'La nueva categoría se ha añadido correctamente.',
          confirmButtonColor: '#3085d6'
        });
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Error al Añadir',
          text: 'Ocurrió un error al añadir la categoría. Por favor, intenta de nuevo.',
          confirmButtonColor: '#d33'
        });
      }
    }
  }
};
</script>

<style scoped>
/* Estilos personalizados para el formulario y modal */
</style>
