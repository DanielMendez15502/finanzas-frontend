<template>
    <div class="container mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
      <h2 class="text-2xl font-bold text-gray-700 mb-6">Perfil de Usuario</h2>
  
      <form @submit.prevent="updateProfile">
        <div class="mb-4">
          <label for="username" class="block text-gray-700 font-semibold mb-2">Nombre de Usuario</label>
          <input
            type="text"
            id="username"
            v-model="form.username"
            class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
  
        <div class="mb-4">
          <label for="email" class="block text-gray-700 font-semibold mb-2">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            v-model="form.email"
            class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
  
        <div class="mb-4">
          <label for="password" class="block text-gray-700 font-semibold mb-2">Contraseña</label>
          <input
            type="password"
            id="password"
            v-model="form.password"
            class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <small class="text-gray-500">Dejar en blanco para mantener la contraseña actual</small>
        </div>
  
        <div class="mb-4">
          <label for="confirmPassword" class="block text-gray-700 font-semibold mb-2">Confirmar Contraseña</label>
          <input
            type="password"
            id="confirmPassword"
            v-model="form.confirmPassword"
            class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
  
        <div class="flex justify-end">
          <button
            type="submit"
            class="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { useUsuarioStore } from '../stores/usuarioStore';
  
  export default {
    setup() {
      const usuarioStore = useUsuarioStore();
      const form = ref({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
  
      onMounted(async () => {
        await usuarioStore.fetchUserProfile(); // Cargar el perfil del usuario
        const userData = usuarioStore.getUsuario;
        form.value.username = userData.username;
        form.value.email = userData.email;
      });
  
      const updateProfile = async () => {
        if (form.value.password !== form.value.confirmPassword) {
          alert('Las contraseñas no coinciden');
          return;
        }
  
        const updatedData = {
          username: form.value.username,
          email: form.value.email,
          password: form.value.password || null
        };
  
        try {
          await usuarioStore.updateUserProfile(updatedData);
          alert('Perfil actualizado con éxito');
        } catch (error) {
          console.error('Error al actualizar el perfil:', error);
          alert('Hubo un error al actualizar el perfil.');
        }
      };
  
      return {
        form,
        updateProfile
      };
    }
  };
  </script>
  
  <style scoped>
  /* Estilos personalizados para la vista de perfil */
  .container {
    max-width: 600px;
  }
  
  button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  </style>
  