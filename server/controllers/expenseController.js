import pool from '../database.js';

// Obtener gastos por departamento dentro de un rango de fechas
export const getExpensesByDepartment = async (req, res) => {
  try {
    const { startDate, endDate, departmentId } = req.query;

    // Validar fechas obligatorias
    if (!startDate || !endDate) {
      return res.status(400).json({ message: 'Se deben enviar las fechas de inicio y fin.' });
    }

    console.log('🔍 Parámetros recibidos:', { startDate, endDate,  });

    // Construir la consulta dinámicamente
    let query = `
      SELECT d.name AS departmentName, SUM(e.amount) AS totalAmount
      FROM expenses e
      JOIN departments d ON e.department_id = d.id
      WHERE e.date BETWEEN ? AND ?`;

    const queryParams = [startDate, endDate];

    // Si se proporciona departmentId, agregarlo a la consulta
    if (departmentId) {
      query += ` AND e.department_id = ?`;
      queryParams.push(departmentId);
    }

    query += ` GROUP BY e.department_id`;

    // Ejecutar la consulta
    const [rows] = await pool.query(query, queryParams);

    res.status(200).json(rows);
  } catch (error) {
    console.error('❌ Error al obtener los gastos:', error);
    res.status(500).json({ message: 'Error al obtener los gastos.', error });
  }
};
