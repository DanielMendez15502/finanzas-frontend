import { defineStore } from 'pinia';
import * as api from '@/api/api';
import {useUsuarioStore} from './usuarioStore'

export const useFinanzasStore = defineStore('finanzasStore', {
  state: () => ({
    budgets: [],
    transactions: [],
    goals: [],
    categories: [],
    reports: [],
    notifications: [],
    ingresosMensuales: null,
    gastosMensuales: null,
    ahorraRegularmente: false,
    porcentajeAhorro: null,
    deudas: [],
    transaccionesRecientes: [],
    inversiones: [],
    categoriasGastos: [],
    presupuestoMensual: { gastado: 0, restante: 0 },
  }),

  actions: {
    async initializeStoreData() {
      const store = useUsuarioStore();
      try {
        await Promise.all([
          this.fetchBudgets(),
          this.fetchTransactions(),
          this.fetchGoals(),
          this.fetchCategories(),
          this.fetchReports(),
          this.fetchNotifications(),
          this.obtenerInformacionGeneralPorId(store.id),
          this.fetchFlujoCaja(store.id)
        ]).then(()=>{
          this.calcularPresupuestoMensual()
        });
        console.log('Store data initialized successfully');
        console.log(this.ingresosMensuales);
      } catch (error) {
        console.error('Error initializing store data:', error);
      }
    },

    async fetchBudgets() {
      try {
        const response = await api.getBudgets();
        this.budgets = response.data;
      } catch (error) {
        console.error('Error al obtener los presupuestos:', error);
      }
    },

    async createNewBudget(budgetData) {
      try {
        const response = await api.createBudget(budgetData);
        this.budgets.push(response.data);
      } catch (error) {
        console.error('Error al crear un presupuesto:', error);
      }
    },

    async deleteExistingBudget(budgetId) {
      try {
        await api.deleteBudget(budgetId);
        this.budgets = this.budgets.filter(b => b.id !== budgetId);
      } catch (error) {
        console.error('Error al eliminar un presupuesto:', error);
      }
    },

    async fetchTransactions() {
      try {
        const response = await api.getTransactions();
        this.transactions = response.data;
      } catch (error) {
        console.error('Error al obtener las transacciones:', error);
      }
    },

    async createNewTransaction(transactionData) {
      try {
        const response = await api.createTransaction(transactionData);
        this.transactions.push(response.data);
      } catch (error) {
        console.error('Error al crear una transacción:', error);
      }
    },

    async deleteExistingTransaction(transactionId) {
      try {
        await api.deleteTransaction(transactionId);
        this.transactions = this.transactions.filter(t => t.id !== transactionId);
      } catch (error) {
        console.error('Error al eliminar una transacción:', error);
      }
    },

    async fetchGoals() {
      try {
        const response = await api.getGoals();
        this.goals = response.data;
      } catch (error) {
        console.error('Error al obtener las metas financieras:', error);
      }
    },

    async createNewGoal(goalData) {
      try {
        const response = await api.createGoal(goalData);
        this.goals.push(response.data);
      } catch (error) {
        console.error('Error al crear una meta financiera:', error);
      }
    },

    async deleteExistingGoal(goalId) {
      try {
        await api.deleteGoal(goalId);
        this.goals = this.goals.filter(g => g.id !== goalId);
      } catch (error) {
        console.error('Error al eliminar una meta financiera:', error);
      }
    },

    async fetchCategories() {
      try {
        const response = await api.getCategories();
        console.log("!1111111111111111111111111111111")
        console.log(response);
        
        this.categories = response;
      } catch (error) {
        console.error('Error al obtener las categorías:', error);
      }
    },

    async createNewCategory(categoryData) {
      try {
        const response = await api.createCategory(categoryData);
        this.categories.push(response.data);
      } catch (error) {
        console.error('Error al crear una categoría:', error);
      }
    },

    async deleteExistingCategory(categoryId) {
      try {
        await api.deleteCategory(categoryId);
        this.categories = this.categories.filter(c => c.id !== categoryId);
      } catch (error) {
        console.error('Error al eliminar una categoría:', error);
      }
    },

    async fetchReports() {
      try {
        const response = await api.getReports();
        this.reports = response.data;
      } catch (error) {
        console.error('Error al obtener los reportes:', error);
      }
    },

    async createNewReport(reportData) {
      try {
        const response = await api.createReport(reportData);
        this.reports.push(response.data);
      } catch (error) {
        console.error('Error al crear un reporte:', error);
      }
    },

    async deleteExistingReport(reportId) {
      try {
        await api.deleteReport(reportId);
        this.reports = this.reports.filter(r => r.id !== reportId);
      } catch (error) {
        console.error('Error al eliminar un reporte:', error);
      }
    },

    async fetchNotifications() {
      try {
        const response = await api.getNotifications();
        this.notifications = response.data;
      } catch (error) {
        console.error('Error al obtener las notificaciones:', error);
      }
    },

    async createNewNotification(notificationData) {
      try {
        const response = await api.createNotification(notificationData);
        this.notifications.push(response.data);
      } catch (error) {
        console.error('Error al crear una notificación:', error);
      }
    },

    async deleteExistingNotification(notificationId) {
      try {
        await api.deleteNotification(notificationId);
        this.notifications = this.notifications.filter(n => n.id !== notificationId);
      } catch (error) {
        console.error('Error al eliminar una notificación:', error);
      }
    },
    
    async guardarInformacionGeneral(data) {
      const response = await api.guardarInformacionGeneralAPI(data);
    
      // Actualiza el estado del store con la información guardada
      this.ingresosMensuales = data.ingresosMensuales;
      this.gastosMensuales = data.gastosMensuales;
      this.ahorraRegularmente = data.ahorraRegularmente;
      this.porcentajeAhorro = data.porcentajeAhorro;
    
      // Actualiza el estado del store con las deudas, inversiones y categorías de gastos
      this.deudas = data.deudas;
      this.inversiones = data.inversiones;
      this.categoriasGastos = data.categoriasGastos;
    
      return response;
    },

    calcularPresupuestoMensual() {
      if (this.ingresosMensuales !== null && this.gastosMensuales !== null) {
        const gastado = this.gastosMensuales;
        const restante = this.ingresosMensuales - this.gastosMensuales;
        
        this.presupuestoMensual = {
          gastado: gastado > 0 ? gastado : 0,
          restante: restante > 0 ? restante : 0
        };
    
        console.log('Presupuesto Mensual:', this.presupuestoMensual);  // Verifica los valores
      }
    },
      async obtenerInformacionGeneralPorId(id){
        const response = await api.obtenerInformacionGeneralPorId(id);
        console.log(response)
        this.ingresosMensuales = response.ingresosMensuales;
        this.gastosMensuales = response.gastosMensuales;
      },
      async fetchTransaccionesRecientes() {
        try {
          const response = await api.obtenerTransaccionesRecientes();
          console.log(response);
          
          const { ingresos, gastos } = response;
  
          this.transaccionesRecientes = ingresos.concat(gastos).sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
          console.log("gggggggggggggggg")
          console.log(this.transaccionesRecientes);
          
        } catch (error) {
          console.error('Error al obtener las transacciones recientes:', error);
        }
      },
      async fetchFlujoCaja(id) {
        const response = await api.obtenerFlujoCaja(id);
        if(response!= null ||response!= undefined )
          this.flujoCaja = response;
        else{
          this.flujoCaja = [];
          return false; 
        }
      },
      
  },
  getters: {
    saldoTotal: (state) => {
      const ingresos = state.ingresosMensuales ?? 0;
      const gastos = state.gastosMensuales ?? 0;
      return ingresos - gastos;
    },
  },
});


