<template>
  <div id="app">
    <!-- Aquí se renderizará el componente correspondiente a la ruta actual -->
    <LoginC/>
  </div>
</template>

<script>
import LoginC from '@/components/LoginC.vue';
export default {
  name: 'App',
  components:{
    LoginC
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
