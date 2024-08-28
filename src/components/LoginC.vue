<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-700">
    <div class="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
      <h2 class="text-4xl font-bold text-center text-blue-900 mb-8">Iniciar Sesión</h2>
      <form >
        <div class="mb-6">
          <label class="block text-gray-700 text-lg font-semibold mb-2">Correo Electrónico</label>
          <InputText 
            v-model="email" 
            type="email" 
            placeholder="ejemplo@correo.com" 
            class="w-full p-inputtext-lg"
            style="font-size: 1.25rem; padding: 0.75rem;"
            required
          />
        </div>
        <div class="mb-8">
          <label class="block text-gray-700 text-lg font-semibold mb-2">Contraseña</label>
          <Password 
            v-model="password" 
            placeholder="Contraseña"
            feedback="false"
            toggleMask
            class="w-full p-inputtext-lg"
            style="font-size: 1.25rem; padding: 0.75rem;"
            required
          />
        </div>
        <Button 
          label="Iniciar Sesión" 
          icon="pi pi-sign-in" 
          class="w-full p-button-lg p-button-primary"
          style="font-size: 1.25rem; padding: 0.75rem;"
          @click="login"
        />
      </form>
      <p class="text-center text-gray-600 mt-6">
        ¿No tienes una cuenta? 
        <router-link to="/register" class="text-blue-600 hover:underline font-semibold">Regístrate</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import Swal from 'sweetalert2';
import { useUsuarioStore } from '@/stores/usuarioStore'; // Importamos el store

export default {
  name: 'LoginComponent',
  components: {
    InputText,
    Password,
    Button
  },
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    async login() {
      const usuarioStore = useUsuarioStore(); // Accedemos al store

      try {
        await usuarioStore.login({
          username: this.email,
          password: this.password
        });
        
        Swal.fire({
          icon: 'success',
          title: 'Inicio de sesión exitoso',
          text: 'Has iniciado sesión correctamente.',
          confirmButtonColor: '#3085d6'
        });

        this.$router.push('/dashboard'); // Redirigimos al dashboard
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error de autenticación',
          text: 'Las credenciales son incorrectas. Por favor, inténtalo de nuevo.',
          confirmButtonColor: '#d33'
        });
      }
    },
    logout() {
      this.isAuthenticated = false;
      this.user = null;
      this.token = null;
      localStorage.removeItem('token'); // Limpia el token almacenado si estás usando almacenamiento local
    }
  }
};
</script>

<style scoped>
/* Estilos del componente */
body {
  font-family: 'Nunito', sans-serif;
  background-color: #f0f4f8;
}

.min-h-screen {
  min-height: 100vh;
}

.bg-gradient-to-r {
  background: linear-gradient(to right, #4299e1, #2b6cb0);
}

.bg-white {
  background-color: white;
}

.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
}

.rounded-lg {
  border-radius: 0.5rem;
}

.text-blue-900 {
  color: #2a4365;
}

.mb-8 {
  margin-bottom: 2rem;
}

.mb-6 {
  margin-bottom: 1.5rem;
}

.w-full {
  width: 100%;
}

.p-inputtext-lg {
  padding: 0.75rem;
  font-size: 1.25rem;
}

.p-button-lg {
  padding: 0.75rem;
  font-size: 1.25rem;
}

.p-button-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.p-button-primary:hover {
  background-color: #0056b3;
}

.text-center {
  text-align: center;
}

.mt-6 {
  margin-top: 1.5rem;
}
</style>
