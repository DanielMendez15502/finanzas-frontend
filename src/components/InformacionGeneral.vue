<template>
  <div class="bg-white p-8 rounded-lg shadow-md max-w-lg mx-auto mt-6">
    <!-- Barra de progreso visual -->
    <div class="mb-4">
      <div class="relative pt-1">
        <div class="flex mb-2 items-center justify-between">
          <div>
            <span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
              Progreso
            </span>
          </div>
          <div class="text-right">
            <span class="text-xs font-semibold inline-block text-blue-600">
              100%
            </span>
          </div>
        </div>
        <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
          <div style="width:100%" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-500"></div>
        </div>
      </div>
    </div>

    <!-- Título del formulario -->
    <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">Información General</h2>

    <!-- Sección para mostrar la información actual -->
    <div v-if="loaded" class="mb-8 p-4 bg-gray-100 rounded-lg shadow-inner">
      <h3 class="text-lg font-semibold text-gray-600 mb-4">Información Actual:</h3>
      <p class="text-gray-700 mb-2"><i class="fas fa-dollar-sign text-blue-500 mr-2"></i><strong>Ingresos Mensuales:</strong> {{ currentInfo.ingresosMensuales }} USD</p>
      <p class="text-gray-700 mb-2"><i class="fas fa-money-bill-wave text-green-500 mr-2"></i><strong>Gastos Mensuales:</strong> {{ currentInfo.gastosMensuales }} USD</p>
      <p class="text-gray-700 mb-2"><i class="fas fa-piggy-bank text-yellow-500 mr-2"></i><strong>Ahorra Regularmente:</strong> {{ currentInfo.ahorraRegularmente === 'si' ? 'Sí' : 'No' }}</p>
      <p v-if="currentInfo.ahorraRegularmente === 'si'" class="text-gray-700"><i class="fas fa-percentage text-red-500 mr-2"></i><strong>Porcentaje de Ahorro:</strong> {{ currentInfo.porcentajeAhorro }}%</p>
    </div>

    <!-- Formulario para actualizar la información -->
    <form @submit.prevent="submitUserInfo" class="space-y-6">
      <div>
        <label class="block text-gray-700 text-sm font-bold mb-2">Ingresos Mensuales</label>
        <div class="relative">
          <input 
            type="number" 
            v-model="ingresosMensuales" 
            class="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            required 
            placeholder="Ingresos en USD"
            min="0" 
          />
          <i class="fas fa-dollar-sign absolute right-3 top-3 text-gray-400"></i>
        </div>
      </div>

      <div>
        <label class="block text-gray-700 text-sm font-bold mb-2">Gastos Mensuales</label>
        <div class="relative">
          <input 
            type="number" 
            v-model="gastosMensuales" 
            class="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            required 
            placeholder="Gastos en USD"
            min="0"
          />
          <i class="fas fa-money-bill-wave absolute right-3 top-3 text-gray-400"></i>
        </div>
      </div>

      <div>
        <label class="block text-gray-700 text-sm font-bold mb-2">¿Ahorras regularmente?</label>
        <div class="relative">
          <select v-model="ahorraRegularmente" class="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300">
            <option value="si">Sí</option>
            <option value="no">No</option>
          </select>
          <i class="fas fa-piggy-bank absolute right-3 top-3 text-gray-400"></i>
        </div>
      </div>

      <div v-if="ahorraRegularmente === 'si'">
        <label class="block text-gray-700 text-sm font-bold mb-2">Porcentaje de Ingresos que Ahorras</label>
        <div class="relative">
          <input 
            type="number" 
            v-model="porcentajeAhorro" 
            class="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            placeholder="Porcentaje (%)"
            min="0" max="100"
          />
          <i class="fas fa-percentage absolute right-3 top-3 text-gray-400"></i>
        </div>
      </div>

      <button type="submit" class="bg-blue-500 text-white p-3 rounded-lg w-full hover:bg-blue-600 transition duration-300 shadow-md">
        Guardar Información
      </button>
    </form>
  </div>
</template>

<script>
import { useFinanzasStore } from '@/stores/finanzasStore';
import { useUsuarioStore } from '@/stores/usuarioStore';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      ingresosMensuales: '',
      gastosMensuales: '',
      ahorraRegularmente: 'no',
      porcentajeAhorro: '',
      currentInfo: {},  // Variable para almacenar la información actual
      loaded: false,    // Bandera para verificar si la información fue cargada
    };
  },
  async mounted() {
    await this.loadCurrentInfo();
  },
  methods: {
    async loadCurrentInfo() {
      const finanzasStore = useFinanzasStore();
      const userStore = useUsuarioStore();
      const id = userStore.id;
      try {
        this.currentInfo = await finanzasStore.obtenerInformacionGeneralPorId(id);
        this.ingresosMensuales = this.currentInfo.ingresosMensuales;
        this.gastosMensuales = this.currentInfo.gastosMensuales;
        this.ahorraRegularmente = this.currentInfo.ahorraRegularmente;
        this.porcentajeAhorro = this.currentInfo.porcentajeAhorro;
        this.loaded = true;
      } catch (error) {
        console.error("Error al cargar la información actual:", error);
        Swal.fire({
          icon: 'error',
          title: 'Error al Cargar',
          text: 'Ocurrió un error al cargar la información. Por favor, intenta de nuevo.',
          confirmButtonColor: '#d33'
        });
      }
    },
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
