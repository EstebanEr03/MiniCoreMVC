import mysql from 'mysql2';

const pool = mysql.createPool({
  host: 'localhost',       // Cambia si es necesario
  user: 'root',            // Usuario de MySQL
  password: '',            // Contraseña de MySQL
  database: 'company'      // Nombre de la base de datos
});

export default pool.promise();
