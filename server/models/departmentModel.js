const pool = require('../database');

// Obtener todos los departamentos
exports.getAllDepartments = async () => {
  const [rows] = await pool.query('SELECT * FROM departments');
  return rows;
};

// Crear un nuevo departamento
exports.createDepartment = async (name) => {
  const [result] = await pool.query('INSERT INTO departments (name) VALUES (?)', [name]);
  return result.insertId;
};
