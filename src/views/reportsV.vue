<template>
    <div id="app">
      <!-- Aquí se renderizará el componente correspondiente a la ruta actual -->
      <reportsC/>
    </div>
  </template>
  
  <script>
  import reportsC from '@/components/reportsC.vue';
  export default {
    name: 'profileV',
    components:{
        reportsC
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
  