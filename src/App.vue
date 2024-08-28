<template>
  <div class="app-wrapper">
    <Header />
    <div class="main-container flex h-screen bg-gray-100">
      <!-- Menú Lateral -->
      <MenuLateral v-if="isAuthenticated" />
      
      <!-- Contenido Principal -->
      <main class="flex-grow p-6 content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import MenuLateral from './components/MenuLateral.vue';
import { useUsuarioStore } from './stores/usuarioStore';
import { computed } from 'vue';

export default {
  components: {
    Header,
    MenuLateral
  },
  setup() {
    const storeUser = useUsuarioStore();
    const isAuthenticated = computed(() => storeUser.isAuthenticated);

    return {
      isAuthenticated
    };
  }
};
</script>

<style scoped>
.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-container {
  display: flex;
  flex-grow: 1;
}

.content {
  flex: 1;
  padding: 1rem;
  margin: 50px;
  background-color: #f9fafb;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
