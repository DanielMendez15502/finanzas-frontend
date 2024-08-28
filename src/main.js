import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/tailwind.css'; // O cualquier otro archivo CSS que tengas
import PrimeVue from 'primevue/config';
import {Swal} from 'sweetalert2';
import { createPinia } from 'pinia';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { faHome, faDollarSign, faFlag, faChartLine, faCog, faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
library.add(faHome, faDollarSign, faFlag, faChartLine, faCog, faAngleDoubleLeft, faAngleDoubleRight,fas);

const pinia = createPinia();
createApp(App)
  .use(router)
  .use(PrimeVue)
  .use(pinia)
  .use(Swal)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app');
