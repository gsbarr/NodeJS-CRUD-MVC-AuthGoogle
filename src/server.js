const express = require('express');
const cors = require('cors');

// Inicializaciones
const app = express();

// Configuración
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '../views');

// Middleware
app.use(express.urlencoded({extended: false})); // Convierte automaticamente cualquier dato que recibe en un JSON
app.use(cors());
 
 
//Variables globales

// Rutas
app.use(require('./routes/MotosRutas.js'));
app.use(require('./routes/NoticiasRutas.js'));
app.use(require('./routes/UsuariosRutas.js'));

// Archivos estáticos
app.use(express.static(__dirname +  '\public')); // Configuramos cuál es la carpeta PUBLIC


module.exports = app;