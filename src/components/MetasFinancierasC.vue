<template>
    <div class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-lg font-bold text-gray-700 mb-4">Metas Financieras</h2>
  
      <div v-if="goals.length">
        <div class="flex flex-wrap space-x-4 space-y-4">
          <div v-for="goal in goals" :key="goal.id" class="flex flex-col items-center bg-gray-100 p-4 rounded-lg w-1/4">
            <h3 class="text-blue-500 font-bold">{{ goal.name }}</h3>
            <p>Meta: ${{ goal.target_amount }} | Ahorrado: ${{ goal.saved_amount }}</p>
            <p>Fecha límite: {{ goal.deadline }}</p>
            <p>Estado: {{ goal.status }}</p>
            <div class="mt-2">
              <button @click="openModal(goal)" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Abonar</button>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <p class="text-gray-500">Aún no se ha registrado ninguna meta financiera.</p>
      </div>
  
      <form @submit.prevent="createNewGoal" class="mt-6 space-y-4">
        <div>
          <label class="block text-gray-700">Nombre de la Meta</label>
          <input type="text" v-model="newGoal.name" class="w-full p-2 border rounded" required />
        </div>
        <div>
          <label class="block text-gray-700">Monto Objetivo</label>
          <input type="number" v-model="newGoal.target_amount" class="w-full p-2 border rounded" required />
        </div>
        <div>
          <label class="block text-gray-700">Fecha de Inicio</label>
          <input type="date" v-model="newGoal.start_date" class="w-full p-2 border rounded" required />
        </div>
        <div>
          <label class="block text-gray-700">Fecha Límite</label>
          <input type="date" v-model="newGoal.deadline" class="w-full p-2 border rounded" required />
        </div>
        <button type="submit" class="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600">Agregar Meta</button>
      </form>
  
      <!-- Modal para abonar -->
      <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
          <h3 class="text-lg font-bold mb-4">Abonar a Meta: {{ selectedGoal.name }}</h3>
          <div class="mb-4">
            <label class="block text-gray-700 mb-2">Monto del Abono</label>
            <input 
              type="number" 
              v-model="abonoAmount" 
              class="p-2 border rounded w-full" 
              placeholder="Monto del abono"
            />
          </div>
          <div class="flex justify-between">
            <button @click="addAbono" class="bg-green-500 text-white p-2 rounded hover:bg-green-600">Abonar</button>
            <button @click="closeModal" class="bg-red-500 text-white p-2 rounded hover:bg-red-600">Cancelar</button>
          </div>
        </div>
      </div>
  
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { getGoals, createGoal, deleteGoal, updateGoal } from '@/api/api';
  
  export default {
    setup() {
      const goals = ref([]);
      const newGoal = ref({
        name: '',
        target_amount: '',
        start_date: '',
        deadline: '',
      });
      const showModal = ref(false);
      const selectedGoal = ref(null);
      const abonoAmount = ref(0);
  
      onMounted(async () => {
        await fetchGoals();
      });
  
      const fetchGoals = async () => {
        try {
          goals.value = await getGoals();
        } catch (error) {
          console.error('Error al obtener las metas:', error);
        }
      };
  
      const createNewGoal = async () => {
        try {
          const createdGoal = await createGoal(newGoal.value);
          goals.value.push(createdGoal);
          newGoal.value = { name: '', target_amount: '', start_date: '', deadline: '' }; // Limpiar el formulario
        } catch (error) {
          console.error('Error al crear la meta:', error);
        }
      };
  
      const deleteGoalById = async (goalId) => {
        try {
          await deleteGoal(goalId);
          goals.value = goals.value.filter(goal => goal.id !== goalId);
        } catch (error) {
          console.error('Error al eliminar la meta:', error);
        }
      };
  
      const openModal = (goal) => {
        selectedGoal.value = goal;
        abonoAmount.value = 0;
        showModal.value = true;
      };
  
      const closeModal = () => {
        showModal.value = false;
        selectedGoal.value = null;
        abonoAmount.value = 0;
      };
  
      const addAbono = async () => {
        try {
            console.log(abonoAmount.value)
          console.log(parseFloat(abonoAmount.value));
          selectedGoal.value.saved_amount =  parseFloat(selectedGoal.value.saved_amount)  + parseFloat(abonoAmount.value);
          
          await updateGoal(selectedGoal.value.id, abonoAmount.value);
          closeModal();
        } catch (error) {
          console.error('Error al abonar a la meta:', error);
        }
      };
  
      return {
        goals,
        newGoal,
        showModal,
        selectedGoal,
        abonoAmount,
        createNewGoal,
        deleteGoal: deleteGoalById,
        openModal,
        closeModal,
        addAbono,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Estilos personalizados para el componente de Metas Financieras y el Modal */
  </style>
  