const { Router } = require('express');
const router = Router ();
const passport = require('passport');


const NoticiasController = require('../controllers/NoticiasController.js');
const Autenticacion = require('../middleware/autenticacion.js');
const authMiddle = require('../middleware/authMiddle.js')


router.post('/noticias/crear', NoticiasController.nuevoItem);

router.get('/noticias/listar',  NoticiasController.listarTodo);

router.delete('/noticias/eliminar/:id', NoticiasController.eliminarItem);

router.put('/noticias/actualizar/:id', NoticiasController.actualizar);

router.get('/noticias/porID/:id', NoticiasController.encontrarPorID);

router.get('/noticias/porTitulo/:id', NoticiasController.encontrarPorTitulo);

/****** RUTAS PARA LA WEB NOTICIAS *********/
router.get('/noticias/lista_total', passport.authenticate('google'), (req, res) => {
    console.log("autorizado con google")
    res.send('<script>document.location = "/";</script>');
  });


module.exports = router;   