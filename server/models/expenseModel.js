const pool = require('../database');

// Obtener gastos por rango de fechas
exports.getExpensesByDateRange = async (startDate, endDate) => {
  const [rows] = await pool.query(
    `SELECT d.name AS departmentName, SUM(e.amount) AS totalAmount
     FROM expenses e
     JOIN departments d ON e.department_id = d.id
     WHERE e.date BETWEEN ? AND ?
     GROUP BY e.department_id`,
    [startDate, endDate]
  );
  return rows;
};

// Crear un nuevo gasto
exports.createExpense = async (departmentId, amount, date, description) => {
  const [result] = await pool.query(
    'INSERT INTO expenses (department_id, amount, date, description) VALUES (?, ?, ?, ?)',
    [departmentId, amount, date, description]
  );
  return result.insertId;
};
