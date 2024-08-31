const baseURL = 'http://localhost:8000/api';

// Función para obtener el token de autenticación
const getToken = () => {
  return localStorage.getItem('token'); // Asegúrate de que el token esté almacenado en localStorage
};

// Almacena el token después de iniciar sesión
export const loginUser = async (credentials) => {
  const response = await fetch(`${baseURL}/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error('Error en la solicitud de inicio de sesión');
  }

  const data = await response.json();
  console.log(data.user.access_token)
  localStorage.setItem('token', data.user.access_token);  // Asegúrate de guardar el token en localStorage
  return data;
};

export const registerUser = async (userData) => {
  const response = await fetch(`${baseURL}/register/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Error en la solicitud de registro');
  }

  return await response.json();
};

export const getBudgets = async () => {
  const token = getToken();
  const response = await fetch(`${baseURL}/budgets/`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Error al obtener los presupuestos');
  }

  return await response.json();
};

export const createBudget = async (data) => {
  const token = getToken();
  const response = await fetch(`${baseURL}/budgets/create/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Error al crear un presupuesto');
  }

  return await response.json();
};

export const deleteBudget = async (budgetId) => {
  const token = getToken();
  const response = await fetch(`${baseURL}/budgets/delete/${budgetId}/`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Error al eliminar el presupuesto');
  }

  return await response.json();
};

export const getTransactions = async () => {
  const token = getToken();
  const response = await fetch(`${baseURL}/transactions/`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Error al obtener las transacciones');
  }

  return await response.json();
};

export const createTransaction = async (data) => {
  const csrfToken = getCsrfToken();
  
  const response = await fetch(`${baseURL}/transactions/create/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`, // Asumiendo que estás usando JWT para la autenticación
      'X-CSRFToken': csrfToken, // Agregar el token CSRF aquí
    },
    body: JSON.stringify(data),
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Error al crear una transacción');
  }

  return response.json();
};

export const deleteTransaction = async (transactionId) => {
  const token = getToken();
  const response = await fetch(`${baseURL}/transactions/delete/${transactionId}/`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Error al eliminar la transacción');
  }

  return await response.json();
};

export const getGoals = async () => {
  const token = getToken();
  const response = await fetch(`${baseURL}/goals/`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Error al obtener las metas');
  }

  return await response.json();
};

export const createGoal = async (data) => {
  const token = getToken();
  const response = await fetch(`${baseURL}/goals/create/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'X-CSRFToken': getCsrfToken(), // Agregar el token CSRF aquí
    },
    body: JSON.stringify(data),
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Error al crear una meta');
  }

  return await response.json();
};

export const deleteGoal = async (goalId) => {
  const token = getToken();
  const response = await fetch(`${baseURL}/goals/delete/${goalId}/`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Error al eliminar la meta');
  }

  return await response.json();
};

export const getCategories = async () => {
  const token = getToken();
  const response = await fetch(`${baseURL}/categories/`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Error al obtener las categorías');
  }

  return await response.json();
};

export const createCategory = async (data) => {
  const token = getToken();
  const response = await fetch(`${baseURL}/categories/create/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'X-CSRFToken': getCsrfToken(), // Agregar el token CSRF aquí
    },
    body: JSON.stringify(data),
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Error al crear una categoría');
  }

  return await response.json();
};

export const deleteCategory = async (categoryId) => {
  const token = getToken();
  const response = await fetch(`${baseURL}/categories/delete/${categoryId}/`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Error al eliminar la categoría');
  }

  return await response.json();
};

export const getReports = async () => {
  const token = getToken();
  const response = await fetch(`${baseURL}/reports/`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Error al obtener los reportes');
  }

  return await response.json();
};

export const createReport = async (data) => {
  
  console.log("lilililililil")
  const token = getToken();
  
  const response = await fetch(`${baseURL}/reports/create/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'X-CSRFToken': getCsrfToken(),
    },
    body: JSON.stringify(data),
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Error al crear el reporte');
  }

  return await response.json();
};

export const deleteReport = async (reportId) => {
  const token = getToken();
  const response = await fetch(`${baseURL}/reports/delete/${reportId}/`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Error al eliminar el reporte');
  }

  return await response.json();
};

export const getNotifications = async () => {
  const token = getToken();
  const response = await fetch(`${baseURL}/notifications/`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Error al obtener las notificaciones');
  }

  return await response.json();
};

export const createNotification = async (data) => {
  const token = getToken();
  const response = await fetch(`${baseURL}/notifications/create/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Error al crear una notificación');
  }

  return await response.json();
};

export const deleteNotification = async (notificationId) => {
  const token = getToken();
  const response = await fetch(`${baseURL}/notifications/delete/${notificationId}/`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Error al eliminar la notificación');
  }

  return await response.json();
};

export const guardarInformacionGeneralAPI = async (datos) => {
  let token = localStorage.getItem('token');
  console.log(token)
  let response = await fetch(`${baseURL}/guardar-informacion-general/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(datos),
    credentials: 'include',
  });

  if (response.status === 401) { // Si el token es inválido o ha expirado
    token = await refreshToken(); // Refresca el token
    response = await fetch(`${baseURL}/guardar-informacion-general/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(datos),
      credentials: 'include',
    });
  }

  if (!response.ok) {
    throw new Error('Error en la solicitud para guardar la información general');
  }

  return await response.json();
};
export const refreshToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  const response = await fetch(`${baseURL}/token/refresh/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refresh: refreshToken }),
  });

  if (!response.ok) {
    throw new Error('Error al refrescar el token');
  }

  const data = await response.json();
  localStorage.setItem('token', data.access); // Guarda el nuevo token de acceso
  return data.access;
};

export const obtenerInformacionGeneralPorId = async (id) => {
  try {
    const response = await fetch(`${baseURL}/obtener-informacion-general/${id}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}` // Reemplaza `yourToken` con el token de autenticación si es necesario
      }
    });

    if (!response.ok) {
      throw new Error('Error al obtener la información del perfil');
    }

    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
export const obtenerTransaccionesRecientes = async () => {
  try {
    
    const response = await fetch(`${baseURL}/obtener-transacciones-recientes/`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}` // Reemplaza `yourToken` con el token de autenticación si es necesario
      }}
    );
    
    if (!response.ok) {
      throw new Error('Error al obtener las transacciones recientes');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener transacciones recientes:', error);
    throw error;
  }
};
// Función para obtener el token CSRF desde las cookies
function getCsrfToken() {
  const name = 'csrftoken';
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + '=')) {
      return cookie.substring(name.length + 1, cookie.length);
    }
  }
  return null;
}
export async function obtenerFlujoCaja(userId) {
  try {
      const response = await fetch(`${baseURL}/obtener-flujo-caja/${userId}/`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${getToken()}`, // Asumiendo que estás usando JWT para la autenticación
          },
      });

      if (!response.ok) {
          throw new Error('Error al obtener el flujo de caja');
      }

      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error:', error);
      throw error; // Propaga el error para que el llamado a esta función también pueda manejarlo
  }
}

export const updateGoal = async (goalId, abono) => {
  const token = getToken();
  console.log("Valor original de abono:", abono);
  
  // Verifica el tipo de abono
  console.log("Tipo de abono:", typeof abono);

  // Intenta eliminar espacios en blanco alrededor de abono
  const abonoLimpio = typeof abono === 'string' ? abono.trim() : abono;
  console.log("Valor de abono después de limpiar:", abonoLimpio);

  // Convertir abono a número flotante y verificar que es un número válido
  const abonoNumerico = parseFloat(abonoLimpio);

  if (isNaN(abonoNumerico)) {
    throw new Error('El valor de abono debe ser un número válido');
  }
  
  console.log("Valor numérico de abono:", abonoNumerico);
  
  const response = await fetch(`${baseURL}/goals/abono/${goalId}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'X-CSRFToken': getCsrfToken(),
    },
    body: JSON.stringify({ abono: abonoNumerico }),
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Error al actualizar la meta con el abono');
  }

  return await response.json();
};

// api.js
export const obtenerDistribucionGastos = async () => {
  const token = getToken();
  const response = await fetch(`${baseURL}/distribucion-gastos/`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Error al obtener la distribución de gastos');
  }

  return await response.json();
};


// Función para obtener el perfil del usuario
export const getUserProfile = async (userId) => {
  try {
    const response = await fetch(`${baseURL}/users/${userId}/profile/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${getToken()}`, // Incluye el token en la cabecera
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener el perfil del usuario');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error; // Propaga el error para que sea manejado en el componente
  }
};

// Función para actualizar el perfil del usuario
export const updateUserProfile = async (userId, userData) => {
  try {
    const response = await fetch(`${baseURL}/users/${userId}/profile/`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${getToken()}`, // Incluye el token en la cabecera
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Error al actualizar el perfil del usuario');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error; // Propaga el error para que sea manejado en el componente
  }
};

export const getReportes = async () => {
  const token = getToken();
  const response = await fetch(`${baseURL}/reports/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Error al obtener los reportes');
  }

  return await response.json();
};


export const getReport = async (reportId) => {
  const token = getToken();
  const response = await fetch(`${baseURL}/reports/${reportId}/`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Error al obtener el reporte');
  }

  return await response.json();
};

// Función para crear una nueva deuda
export const createNewDebt = async (debtData) => {
  try {
    const token = getToken();
    const csrfToken = getCsrfToken();

    const response = await fetch(`${baseURL}/debts/`, {  // Asumiendo que la URL para DebtListCreateView es /debts/
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'X-CSRFToken': csrfToken,  // Si estás usando Django con protección CSRF
      },
      body: JSON.stringify(debtData),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Error al crear la deuda');
    }

    return await response.json();
  } catch (error) {
    console.error('Error al crear la deuda:', error);
    throw error;
  }
};