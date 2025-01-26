import pool from '../database.js';

export const getAllDepartments = async (req, res) => {
  try {
    console.log('📡 Solicitando todos los departamentos...');

    const [departments] = await pool.query('SELECT id, name FROM departments');

    console.log('✅ Departamentos obtenidos:', departments);

    res.status(200).json(departments);
  } catch (error) {
    console.error('❌ Error al obtener departamentos:', error);
    res.status(500).json({ message: 'Error al obtener los departamentos.', error });
  }
};


// ✅ Crear un nuevo departamento
export const createDepartment = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'El nombre del departamento es requerido.' });
    }

    const [result] = await pool.query('INSERT INTO departments (name) VALUES (?)', [name]);
    res.status(201).json({ id: result.insertId, name });
  } catch (error) {
    console.error('❌ Error al crear el departamento:', error);
    res.status(500).json({ message: 'Error al crear el departamento.', error });
  }
};
