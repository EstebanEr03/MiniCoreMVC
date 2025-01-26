import React, { useState, useEffect } from 'react';
import { getExpenses } from '../Controllers/expensesController';

const Expenses = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [departmentId, setDepartmentId] = useState(''); // Estado para el departamento
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);
  const [departments, setDepartments] = useState([]); // Lista de departamentos

  // Cargar la lista de departamentos al montar el componente
  useEffect(() => {
    fetch('http://localhost:3000/api/departments')
      .then(response => response.json())
      .then(data => setDepartments(data))
      .catch(error => console.error('❌ Error al obtener departamentos:', error));
  }, []);

  const fetchExpenses = async () => {
    if (!startDate || !endDate) {
      setError('⚠️ Por favor, ingrese ambas fechas.');
      return;
    }

    try {
      console.log('🔍 Enviando solicitud con:', { startDate, endDate, departmentId });

      const data = await getExpenses(startDate, endDate, departmentId || null);
      setExpenses(data);
      setError(null);
    } catch (err) {
      setError('⚠️ No se pudieron obtener los datos.');
    }
  };

  return (
    <div>
      <h1>Reporte de Gastos por Departamento</h1>
      <div>
        <label>Fecha Inicio:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <label>Fecha Fin:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

        <label>Departamento:</label>
        <select value={departmentId} onChange={(e) => setDepartmentId(e.target.value)}>
          <option value="">Todos</option>
          {departments.map((dep) => (
            <option key={dep.id} value={dep.id}>{dep.name}</option>
          ))}
        </select>

        <button onClick={fetchExpenses}>Consultar</button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        <h2>Resultados:</h2>
        <ul>
          {expenses.length > 0 ? (
            expenses.map((expense, index) => (
              <li key={index}>
                {expense.departmentName}: ${expense.totalAmount}
              </li>
            ))
          ) : (
            <p>No hay datos disponibles.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Expenses;
