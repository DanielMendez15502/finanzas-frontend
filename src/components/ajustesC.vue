<template>
    <div class="settings-container bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-lg font-bold text-gray-700 mb-4">Ajustes de Usuario</h2>
  
      <!-- Formulario de ajustes -->
      <form @submit.prevent="handleUpdateProfile">
        <div class="mb-4">
          <label for="username" class="block text-gray-600 mb-2">Nombre de usuario</label>
          <input
            type="text"
            id="username"
            v-model="localUsername"
            class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
  
        <div class="mb-4">
          <label for="email" class="block text-gray-600 mb-2">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            v-model="localEmail"
            class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
  
        <div class="mb-4">
          <label for="password" class="block text-gray-600 mb-2">Contraseña Nueva</label>
          <input
            type="password"
            id="password"
            v-model="localPassword"
            class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
  
        <div class="mb-4">
          <label for="confirmPassword" class="block text-gray-600 mb-2">Confirmar Contraseña Nueva</label>
          <input
            type="password"
            id="confirmPassword"
            v-model="localConfirmPassword"
            class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
  
        <div class="flex justify-between items-center">
          <button
            type="submit"
            class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Guardar Cambios
          </button>
          <button
            type="button"
            class="text-red-500 px-4 py-2"
            @click="resetForm"
          >
            Cancelar
          </button>
        </div>
      </form>
  
      <div v-if="updateError" class="mt-4 text-red-500">
        {{ updateError }}
      </div>
      <div v-if="updateSuccess" class="mt-4 text-green-500">
        Cambios guardados correctamente.
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useUsuarioStore } from '@/stores/usuarioStore';
  
  export default {
    setup() {
      const store = useUsuarioStore();
  
      // Inicializar datos locales desde el store (evitar reactividad circular)
      const localUsername = ref(store.usuario?.username || '');
      const localEmail = ref(store.usuario?.email || '');
      const localPassword = ref('');
      const localConfirmPassword = ref('');
  
      const updateError = ref(null);
      const updateSuccess = ref(false);
  
      const handleUpdateProfile = async () => {
        updateError.value = null;
        updateSuccess.value = false;
  
        if (localPassword.value && localPassword.value !== localConfirmPassword.value) {
          updateError.value = 'Las contraseñas no coinciden.';
          return;
        }
  
        try {
          const updatedProfile = {
            username: localUsername.value,
            email: localEmail.value,
            password: localPassword.value || undefined,
          };
  
          await store.updateUserProfile(updatedProfile);
          updateSuccess.value = true;
        } catch (error) {
          updateError.value = 'Error al actualizar el perfil: ' + error.message;
        }
      };
  
      const resetForm = () => {
        localUsername.value = store.usuario?.username || '';
        localEmail.value = store.usuario?.email || '';
        localPassword.value = '';
        localConfirmPassword.value = '';
      };
  
      return {
        localUsername,
        localEmail,
        localPassword,
        localConfirmPassword,
        handleUpdateProfile,
        updateError,
        updateSuccess,
        resetForm,
      };
    }
  };
  </script>
  
  <style scoped>
  .settings-container {
    max-width: 500px;
    margin: 0 auto;
  }
  </style>
  