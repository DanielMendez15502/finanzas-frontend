<template>
    <div class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-lg font-bold text-gray-700 mb-4">Generar Reporte</h2>
      
      <div class="mb-4">
        <label for="reportType" class="block text-gray-600 mb-2">Tipo de Reporte</label>
        <select v-model="selectedReportType" id="reportType" class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="transacciones">Transacciones</option>
          <option value="presupuestos">Presupuestos</option>
          <option value="metas">Metas</option>
        </select>
      </div>
  
      <div class="mb-4">
        <label for="reportPeriod" class="block text-gray-600 mb-2">Periodo del Reporte</label>
        <select v-model="selectedReportPeriod" id="reportPeriod" class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="diario">Diario</option>
          <option value="mensual">Mensual</option>
          <option value="anual">Anual</option>
        </select>
      </div>
  
      <button @click="generateReport" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
        Generar Reporte
      </button>
  
      <div v-if="reportData" class="mt-4">
        <h3 class="text-lg font-bold text-gray-700">Datos del Reporte:</h3>
        <pre class="bg-gray-100 p-4 rounded-md mt-2">{{ reportData }}</pre>
      </div>
    </div>
  </template>
  
  <script>
  import * as api from '@/api/api';
  
  export default {
    data() {
      return {
        selectedReportType: 'transacciones',
        selectedReportPeriod: 'diario',
        reportData: null,
      };
    },
    methods: {
      async generateReport() {
        try {
          const reportId = await this.createReport();
          const response = await api.getReport(reportId);
          this.reportData = response.data;
        } catch (error) {
          console.error('Error al generar el reporte:', error);
        }
      },
      async createReport() {
        
      console.log("lelelel")
        const response = await api.createReport({
          name: `Reporte de ${this.selectedReportType}`,
          report_type: this.selectedReportType,
          report_period: this.selectedReportPeriod,
        });
        console.log(response);
        
        return response.id;
      },
    },
  };
  </script>
  
  <style scoped>
  /* Estilos personalizados para el componente de reportes */
  </style>
  