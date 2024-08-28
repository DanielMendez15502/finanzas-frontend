<template>
    <div id="app">
      <!-- Aquí se renderizará el componente correspondiente a la ruta actual -->
      <MetasFinancierasC/>
    </div>
  </template>
  
  <script>
  import MetasFinancierasC from '@/components/MetasFinancierasC.vue';
  export default {
    name: 'MetasFinancierasV',
    components:{
        MetasFinancierasC
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
  