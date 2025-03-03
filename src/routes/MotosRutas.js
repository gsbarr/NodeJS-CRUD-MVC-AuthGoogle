const { Router } = require('express');
const router = Router ();

const MotosController = require('../controllers/MotosController.js');


router.post('/motos/nuevo', MotosController.nuevoItem);

router.get('/motos/listar', MotosController.listarTodo);

router.delete('/motos/eliminar/:id', MotosController.eliminarItem);

router.put('/motos/actualizar/:id', MotosController.actualizar);

router.get('/motos/listar/:id', MotosController.encontrar);


module.exports = router;   