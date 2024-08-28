<template>
  <header class="bg-blue-900 text-white shadow-md py-3 px-4 flex justify-between items-center">
    <!-- Logo o Nombre del Sistema -->
    <div class="text-xl font-bold">
      FinanzasApp
    </div>

    <!-- Buscador -->
    <div class="flex items-center">
      <input
        type="text"
        placeholder="Buscar..."
        class="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
      />
      <button class="ml-2 bg-blue-700 p-2 rounded-md hover:bg-blue-800 flex items-center justify-center">
        <font-awesome-icon :icon="['fas', 'search']" />
      </button>
    </div>

    <!-- Iconos de Notificaciones y Usuario -->
    <div class="flex items-center relative">
      <!-- Botón de Notificaciones -->
      <div class="relative">
        <button 
          class="relative p-2 rounded-md hover:bg-blue-800 flex items-center justify-center"
          @click="toggleNotificationsDropdown"
        >
          <font-awesome-icon :icon="['fas', 'bell']" />
          <span
            class="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1"
            v-if="notifications.length > 0"
          >
            {{ notifications.length }}
          </span>
        </button>

        <!-- Dropdown de Notificaciones -->
        <div
          v-if="notificationsDropdownOpen"
          class="absolute right-0 mt-2 bg-white text-black shadow-lg rounded-md overflow-hidden z-20"
          style="min-width: 200px;"
        >
          <div v-if="notifications.length > 0">
            <ul>
              <li v-for="(notification, index) in notifications" :key="index" class="px-4 py-2 hover:bg-gray-100">
                <p>{{ notification.message }}</p>
                <p class="text-xs text-gray-500">{{ notification.time }}</p>
              </li>
            </ul>
          </div>
          <div v-else class="px-4 py-2 text-gray-500">
            No tienes notificaciones.
          </div>
        </div>
      </div>

      <!-- Menú de Usuario -->
      <div class="ml-4 relative">
        <button @click="toggleDropdown" class="flex items-center p-2 rounded-md hover:bg-blue-800">
          <img src="https://via.placeholder.com/30" alt="User Avatar" class="rounded-full mr-2"/>
          <span>{{ username }}</span>
          <font-awesome-icon :icon="['fas', 'angle-down']" class="ml-2" />
        </button>

        <div
          v-if="dropdownOpen"
          class="absolute right-0 mt-2 bg-white text-black shadow-lg rounded-md overflow-hidden z-20"
          style="min-width: 160px;"
        >
          <router-link to="/profile" class="block px-4 py-2 hover:bg-gray-100">Perfil</router-link>
          <router-link to="/settings" class="block px-4 py-2 hover:bg-gray-100">Ajustes</router-link>
          <button @click="logout" class="block w-full text-left px-4 py-2 hover:bg-gray-100">
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { useUsuarioStore } from '../stores/usuarioStore';
import { ref } from 'vue';

export default {
  name: 'HeaderC',
  setup() {
    const dropdownOpen = ref(false);
    const notificationsDropdownOpen = ref(false);
    const notifications = ref([
      { message: 'Tienes una nueva transacción pendiente.', time: 'Hace 2 horas' },
      { message: 'Tu reporte financiero mensual está listo.', time: 'Ayer' }
    ]);
    const username = ref('Usuario');

    const toggleDropdown = () => {
      dropdownOpen.value = !dropdownOpen.value;
    };

    const toggleNotificationsDropdown = () => {
      notificationsDropdownOpen.value = !notificationsDropdownOpen.value;
    };

    const logout = () => {
      const store = useUsuarioStore();
      store.logout();
    };

    return {
      dropdownOpen,
      notificationsDropdownOpen,
      notifications,
      username,
      toggleDropdown,
      toggleNotificationsDropdown,
      logout
    };
  }
};
</script>

<style scoped>
/* Estilos personalizados para el header */
header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 50;
}

button i {
  font-size: 1.2rem; /* Asegura que los íconos estén bien alineados */
}

input[type="text"] {
  height: 2.5rem; /* Asegura que el input tenga una altura consistente */
}

button {
  height: 2.5rem; /* Asegura que el botón de búsqueda esté alineado con el input */
}

.router-link-active {
  background-color: #f0f0f0; /* Resalta el enlace activo */
}

div[style*="min-width"] {
  width: max-content;
  right: 0;
}

/* Estilos para el dropdown de notificaciones */
.absolute {
  position: absolute;
}
</style>
