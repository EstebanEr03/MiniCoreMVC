import express from 'express';
import { getExpensesByDepartment } from '../controllers/expenseController.js';
import { getAllDepartments } from '../controllers/departmentController.js'; // ✅ Importar función correctamente

const router = express.Router();

router.get('/expenses', getExpensesByDepartment);
router.get('/departments', getAllDepartments);


export default router;
