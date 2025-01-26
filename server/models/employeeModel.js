const pool = require('../database');

// Obtener todos los empleados
exports.getAllEmployees = async () => {
  const [rows] = await pool.query(
    `SELECT e.id, e.name, d.name AS departmentName
     FROM employees e
     JOIN departments d ON e.department_id = d.id`
  );
  return rows;
};

// Crear un nuevo empleado
exports.createEmployee = async (name, departmentId) => {
  const [result] = await pool.query(
    'INSERT INTO employees (name, department_id) VALUES (?, ?)',
    [name, departmentId]
  );
  return result.insertId;
};
