import axios from 'axios';

// Base URL del backend
const API_URL = 'http://localhost:3000/api';

// ✅ Nueva función para obtener todos los departamentos
export const getAllDepartments = async () => {
  try {
    const response = await axios.get(`${API_URL}/departments`);
    return response.data;
  } catch (error) {
    console.error('❌ Error al obtener los departamentos:', error.response?.data || error.message);
    throw error;
  }
};

// ✅ Modificar la función existente de gastos para incluir departmentId opcionalmente
export const getExpenses = async (startDate, endDate, departmentId = null) => {
  try {
    const params = { startDate, endDate };
    if (departmentId) {
      params.departmentId = departmentId;
    }

    console.log('🔍 Enviando solicitud con:', params);

    const response = await axios.get(`${API_URL}/expenses`, { params });
    return response.data;
  } catch (error) {
    console.error('❌ Error al obtener los gastos:', error.response?.data || error.message);
    throw error;
  }
};
