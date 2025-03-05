const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');


// Inicializaciones
const app = express();

// Configuración
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '../views');

// Middleware
app.use(express.urlencoded({extended: false})); // Convierte automaticamente cualquier dato que recibe en un JSON
app.use(cors({credentials: true}));
 
// CREAMOS session para autenticacion --> MUY IMPORTANTE EL ORDEN DEL CODIGO
app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

 

// Rutas
app.use(require('./routes/MotosRutas.js'));
app.use(require('./routes/NoticiasRutas.js'));
app.use(require('./routes/UsuariosRutas.js'));


// Archivos estáticos (FRONT END)
app.use(express.static(__dirname +  "\\public")); // Configuramos cuál es la carpeta PUBLIC


////////////////////////////////////////////////////////////////
// Ruta para inicio / creacion de usuario

// Chequea si esta logueado
function estaLogueado(req, res, next) {
    
    if(req.user && req.user.length > 0){
        console.log('LOGUEA');
        next();
    }
    else {
        console.log('NO LOGUEA');
        console.log(req.user);
        res.sendStatus(401);
    }
  }


app.get('/auth/google', 
    passport.authenticate('google', { scope: ['email', 'profile']})
);

app.get( '/auth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/auth/google/success',
        failureRedirect: '/auth/google/failure'
}));

app.get('/auth/google/success', estaLogueado, (req, res) => {
    console.log(req.user);
    res.send(`Hello ${req.user[0].googleEmail}`);
  });

  app.get('/carlitos', estaLogueado, (req, res) => {
    console.log(req.user);
    res.send(`Hello ${req.user[0].googleEmail}`);
  });

app.get('/auth/google/failure', (req, res) => {
    res.send('Failed to authenticate..');
  });

  app.get('/logout', async (req, res) => {
    req.logout(req.user, err => {
      if(err) return next(err);
      req.session.destroy();
      //res.redirect("/");
    });

  });
  

module.exports = app;