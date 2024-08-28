<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-lg font-bold text-gray-700 mb-4">Metas Financieras</h2>
    <ul v-if="metasFinancieras.length > 0">
      <li v-for="meta in metasFinancieras" :key="meta.id" class="mb-4">
        <p class="font-semibold">{{ meta.name }}</p>
        <div class="w-full bg-gray-200 rounded-full h-4">
          <div class="bg-green-500 h-4 rounded-full" :style="{ width: calcularProgreso(meta) + '%' }"></div>
        </div>
        <p class="text-sm text-gray-600">{{ calcularProgreso(meta) }}% completado</p>
      </li>
    </ul>
    <p v-else class="text-gray-600">No hay metas financieras registradas.</p>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { getGoals } from '@/api/api';  // Asegúrate de importar la función desde el archivo de API

export default {
  setup() {
    const metasFinancieras = ref([]); // Estado local para almacenar las metas financieras

    // Función para calcular el progreso de la meta
    const calcularProgreso = (meta) => {
      if (meta.target_amount === 0) return 0;
      return ((meta.saved_amount / meta.target_amount) * 100).toFixed(2);
    };

    // Cargar las metas financieras al montar el componente
    const cargarMetas = async () => {
      try {
        const data = await getGoals();
        metasFinancieras.value = data;  // Almacena las metas obtenidas en el estado local
      } catch (error) {
        console.error('Error al cargar las metas financieras:', error);
      }
    };

    onMounted(cargarMetas); // Llama a la función cuando el componente se monta

    return {
      metasFinancieras,
      calcularProgreso
    };
  }
};
</script>

<style scoped>
/* Estilos para Metas Financieras */
</style>
