<template>
    <div id="app">
      <!-- Aquí se renderizará el componente correspondiente a la ruta actual -->
      <DashboardC/>
    </div>
  </template>
  
  <script>
  import DashboardC from '@/components/DashboardC.vue';
  export default {
    name: 'App',
    components:{   
        DashboardC
    }
  }
  </script>
  
  <style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 0px;
  }
  </style>
  