const { Router } = require('express');
const router = Router ();

const NoticiasController = require('../controllers/NoticiasController.js');
const Autenticacion = require('../middleware/autenticacion.js');


router.post('/noticias/crear', NoticiasController.nuevoItem);

router.get('/noticias/listar',   NoticiasController.listarTodo);

router.delete('/noticias/eliminar/:id', NoticiasController.eliminarItem);

router.put('/noticias/actualizar/:id', NoticiasController.actualizar);

router.get('/noticias/porID/:id', NoticiasController.encontrarPorID);

router.get('/noticias/porTitulo/:id', NoticiasController.encontrarPorTitulo);


module.exports = router;   