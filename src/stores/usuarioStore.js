import { defineStore } from 'pinia';
import { loginUser, updateUserProfile, getUserProfile } from '@/api/api'; // Importa todas las funciones que necesitas
import router from '@/router';

export const useUsuarioStore = defineStore('usuarioStore', {
  state: () => ({
    usuario: null,
    token: null,
    id: null,
    isAuthenticated: false,
  }),
  actions: {
    async login(credentials) {
      const response = await loginUser(credentials); // Realizamos la solicitud de login a la API
        
      if (response.user.status === 200) { // Guardamos la información del usuario y el token en el estado
        this.setUsuario(response.user);
        this.setToken(response.user.access_token);     
        return true;
      } else {
        return false;
      }
    },
    logout() {
      this.clearUsuario();
      localStorage.removeItem('token'); // Limpia el token almacenado si estás usando almacenamiento local
      router.push({ name: "LoginComponent" });
    },
    async fetchUserProfile() {
      const profile = await getUserProfile(this.id); // Obtén el perfil del usuario desde la API
      this.setUsuario(profile);
    },
    async updateUserProfile(data) {
      const updatedProfile = await updateUserProfile(this.id, data); // Actualiza el perfil del usuario en la API
      this.setUsuario(updatedProfile); // Actualiza el estado con los datos nuevos
    },
    isLogged() {
      return this.isAuthenticated && this.token != null && this.usuario != null;
    },
    setUsuario(data) {
      this.id = data.id;
      this.usuario = data;
      this.isAuthenticated = true;
    },
    setToken(token) {
      this.token = token;
    },
    clearUsuario() {
      this.usuario = null;
      this.token = null;
      this.isAuthenticated = false;
    },
  },
  getters: {
    getUsuario: (state) => state.usuario,
    getToken: (state) => state.token,
    isLoggedIn: (state) => state.isAuthenticated,
  },
  persist: true, // Esto habilita la persistencia automática
});
