const { Router } = require('express');
const router = Router ();

const UsuariosController = require('../controllers/UsuariosController.js');
const Autenticacion = require('../middleware/autenticacion.js');


router.post('/usuario/iniciar_sesion', UsuariosController.iniciar_sesion);

// Para probar autenticación
router.get('/usuario/pruebaAut', Autenticacion.verificarToken, UsuariosController.pruebaAut)

module.exports = router;   