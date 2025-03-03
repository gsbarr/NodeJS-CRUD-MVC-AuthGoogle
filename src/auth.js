const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

// Importamos el modelo
const UsuariosGoogle = require('./models/UsuariosGoogle.js');


// Autenticacion
passport.use(new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback",
    passReqToCallback   : true
  },
  async function(request, accessToken, refreshToken, profile, done) {
    console.log("AUTENTICACION");
    console.log(profile.id);
    console.log(profile.email);

    // USAR ESTA LINEA PARA CREAR USUARIOS SI NO EXISTEN
    /*UsuariosGoogle.findOrCreate({ googleId: profile.id, googleEmail: profile.email }, function (err, user) {
      return done(err, user);
    });*/

    // USAR ESTA LINEA PARA SOLAMENTE VERIFICAR USUARIOS EXISTENTES
    const user = await UsuariosGoogle.find({ googleEmail: profile.email }).exec();
       console.log(user);
        if (user){
            return done(null, user);
        } else{
            return done("Elemento no encontrado", user);
        }

  }
));

passport.serializeUser(function(user, done){
    done(null, user);
});

passport.deserializeUser(function(user, done){
    done(null, user);
});


