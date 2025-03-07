const { Router } = require('express');
const router = Router ();
const passport = require('passport');
const ensureLogIn = require('connect-ensure-login').ensureLoggedIn;

// Funcion para verificar si esta logeado
var ensureLoggedIn = ensureLogIn({
  redirectTo: "/auth/google", // Si no está logueado, redirige a pag. de logueo
  setReturnTo: false
});

const NoticiasController = require('../controllers/NoticiasController.js');
const authMiddle = require('../middleware/authMiddle.js')


router.post('/noticias/crear', ensureLoggedIn, NoticiasController.nuevoItem);

router.get('/noticias/listar', ensureLoggedIn, NoticiasController.listarTodo);

router.delete('/noticias/eliminar/:id', ensureLoggedIn, NoticiasController.eliminarItem);

router.put('/noticias/actualizar/:id', ensureLoggedIn, NoticiasController.actualizar);

router.get('/noticias/porID/:id', ensureLoggedIn, NoticiasController.encontrarPorID);

router.get('/noticias/porTitulo/:id', ensureLoggedIn, NoticiasController.encontrarPorTitulo);

/****** RUTA PARA VALIDAR EL RENDERIZADO DE UNA WEB ENTERA *********/
router.get('/noticias/lista_total', ensureLoggedIn, (req, res) => {
    console.log("autorizado con google");
    res.send('<script>document.location = "/";</script>');
  });


module.exports = router;   