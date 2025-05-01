import express from 'express';
import usuariosController from '../controllers/UsuariosController.js';

const router = express.Router();

router.post('/users',usuariosController.criar); //http://localhost/api/users
router.get('/users', usuariosController.ListarUsuarios);
router.get('/users/:id',usuariosController.BuscarPorId);
router.put('/users/:id', usuariosController.alterarDados);

export default router;
