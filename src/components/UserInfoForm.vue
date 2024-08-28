<template>
  <div>
    <!-- Navegación de Tabs -->
    <div class="tabs">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        @click="activeTab = index"
        :class="{'active-tab': activeTab === index}"
        class="tab"
      >
        <i :class="tab.icon" class="tab-icon"></i>
        {{ tab.name }}
      </button>
    </div>

    <!-- Contenido de los Tabs -->
    <div class="tab-content">
      <div v-if="activeTab === 0">
        <InformacionGeneral />
      </div>
      <div v-if="activeTab === 1">
        <FormularioTransacciones />
      </div>
      <div v-if="activeTab === 2">
        <FormularioDeudas />
      </div>
      <!-- Aquí puedes agregar más secciones como otras tabs -->
    </div>
  </div>
</template>

<script>
import InformacionGeneral from '@/components/InformacionGeneral.vue';
import FormularioTransacciones from '@/components/FormularioTransacciones.vue';
import FormularioDeudas from '@/components/FormularioDeudas.vue';

export default {
  components: {
    InformacionGeneral,
    FormularioTransacciones,
    FormularioDeudas
  },
  data() {
    return {
      activeTab: 0, // Índice de la tab activa
      tabs: [
        { name: "Información General", icon: "fas fa-info-circle" },
        { name: "Registrar Transacción", icon: "fas fa-exchange-alt" },
        { name: "Registrar Deudas", icon: "fas fa-money-bill-wave" }
      ]

    };
  }
};
</script>

<style scoped>
/* Estilos para las tabs */
.tabs {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  justify-content: center; /* Centrar las tabs */
}

.tab {
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  background-color: #f8f9fa;
  transition: background-color 0.3s, color 0.3s;
  border-radius: 8px;
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 1rem;
}

.tab:hover {
  background-color: #e9ecef;
}

.active-tab {
  background-color: #007bff;
  color: white;
}

.tab-content {
  padding: 20px;
  border: 1px solid #ccc;
  background-color: white;
  border-radius: 8px;
}

/* Estilo para los íconos */
.tab-icon {
  margin-right: 8px;
  font-size: 1.2rem;
}
</style>
