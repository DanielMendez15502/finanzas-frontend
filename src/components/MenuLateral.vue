<template>
    <aside
      class="bg-blue-800 text-white flex flex-col relative"
      :class="{ 'w-20': isCollapsed, 'w-64': !isCollapsed }"
    >
      <div
        class="h-16 flex items-center justify-between px-4 border-b border-blue-700 cursor-pointer"
        @click="toggleCollapse"
      >
        <span class="text-2xl font-bold" v-if="!isCollapsed">FinanzasApp</span>
        <font-awesome-icon :icon="isCollapsed ? 'angle-double-right' : 'angle-double-left'" />
      </div>
      <nav class="flex-grow p-4">
        <ul>
          <li class="mb-4">
            <router-link to="/dashboard" class="flex items-center text-white p-2 rounded hover:bg-blue-600">
              <font-awesome-icon :icon="['fas', 'home']" class="mr-2" />
              <span v-if="!isCollapsed">Dashboard</span>
            </router-link>
          </li>
          <li class="mb-4">
            <router-link to="/GeneralInformation" class="flex items-center text-white p-2 rounded hover:bg-blue-600">
              <font-awesome-icon :icon="['fas', 'dollar-sign']" class="mr-2" />
              <span v-if="!isCollapsed">Ingresos y Gastos</span>
            </router-link>
          </li>
          <li class="mb-4">
            <router-link to="/goals" class="flex items-center text-white p-2 rounded hover:bg-blue-600">
              <font-awesome-icon :icon="['fas', 'flag']" class="mr-2" />
              <span v-if="!isCollapsed">Metas Financieras</span>
            </router-link>
          </li>
          <li class="mb-4">
            <router-link to="/reports" class="flex items-center text-white p-2 rounded hover:bg-blue-600">
              <font-awesome-icon :icon="['fas', 'chart-line']" class="mr-2" />
              <span v-if="!isCollapsed">Reportes</span>
            </router-link>
          </li>
        </ul>
      </nav>
      <div class="p-4 border-t border-blue-700">
        <router-link to="/settings" class="flex items-center text-white p-2 rounded hover:bg-blue-600">
          <font-awesome-icon :icon="['fas', 'cog']" class="mr-2" />
          <span v-if="!isCollapsed">Ajustes</span>
        </router-link>
      </div>
      <!-- Botón para expandir/colapsar -->
      <div class="absolute top-2/4 -right-4 transform -translate-y-1/2 bg-blue-800 p-2 rounded-full shadow-lg cursor-pointer"
           @click="toggleCollapse">
        <font-awesome-icon :icon="isCollapsed ? 'angle-double-right' : 'angle-double-left'" class="text-white" />
      </div>
    </aside>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isCollapsed: false
      };
    },
    methods: {
      toggleCollapse() {
        this.isCollapsed = !this.isCollapsed;
      }
    }
  };
  </script>
  
  <style scoped>
  /* Añade estilos aquí si es necesario */
  </style>
  