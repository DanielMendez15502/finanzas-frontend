import { createRouter, createWebHistory } from 'vue-router';
import LoginComponent from '../views/Login.vue';
import DashboardV from '@/components/DashboardC.vue';
import UserInfor from  '@/components/UserInfoForm.vue';
import MetasFinanzasV from '@/views/MetasFinanzasV.vue';
import profileV from '@/views/profileV.vue';
import AjustesCView from '@/views/ajustesV.vue';
import reportsV from '@/views/reportsV.vue';

const routes = [
  {
    path: '/',
    name: 'LoginComponent',
    component: LoginComponent
  },
  {
    path: '/Dashboard',
    name: 'DashboarCoponent',
    component: DashboardV
  },
  {
    path: '/GeneralInformation',
    name: 'UserInfor',
    component: UserInfor
  },
  {
    path: '/goals',
    name: 'MetasVie',
    component: MetasFinanzasV
  },
  {
    path: '/profile',
    name: 'profileV',
    component: profileV
  },
  {
    path: '/settings',
    name: 'ajustesV',
    component: AjustesCView
  },
  {
    path: '/reports',
    name: 'reportsV',
    component: reportsV
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
