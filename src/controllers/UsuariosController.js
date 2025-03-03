require('dotenv').config();
const jsonwebtoken = require('jsonwebtoken');

// Importamos el modelo
const Usuarios = require('../models/Usuarios.js');

// Creamos un nuevo controlador
const UsuariosController = {};

UsuariosController.pruebaAut = async (req, res) => {
    
    console.log('Pasaste la prueba de la autenticación');
    res.status(200).send('Pasaste la prueba de la autenticación');
    
};

UsuariosController.nuevoItem = async (req, res) => {
    // Para obtener un dato en particular
    const { nombre, marca } = req.body;
    console.log(req.body);

    // Si existen los 4 datos
    if ( nombre && marca) {
        // Creamos un nuevo item
        const nuevaMoto = new Motos({nombre, marca});
        console.log(nuevaMoto);


        try {
            // Guardamos el nuevo item 
            let r = await nuevaMoto.save();

            // Verificamos si se creó el recurso
            if (r){
                res.status(200).json({msg: 'Recurso creado'});
            } else {
                res.status(500).json({error: 'Recurso no creado'});
            }
        } catch (e) {
            console.log(e);
            res.status(500).json({error: e});
        }
        
    }
    else {
        res.status(500).json({error: 'faltan datos'});
    }

    
};


UsuariosController.encontrar = async (req, res) => {
    //const { nombre } = req.params.id;
    console.log(req.params.id);
    if (req.params.id) {
        const Moto = await Motos.findById(req.params.id);
       
        if (Moto){
            res.send(Moto); 
        } else{
            res.send("Elemento no encontrado");
        }
    }
    else {
        res.send("error");
    }
        
  
    
};

UsuariosController.iniciar_sesion = async (req, res) => {
    
    const { usuario, password } = req.body;
    console.log(req.body);

    if (usuario && password) {

        try{
            const Usuario = await Usuarios.find({ usuario: usuario }).exec();
            // La anterior función devuelve muchos registros, por eso la proxima funcion
            // recupera 1 solo registro de ese array
            nombreUsuario = Usuario.find( usu => usu.usuario == usuario);
            // Ahora tenemos en nombreUsuario exactamente el registro que nos interesa
            
        } 
        catch (err) { 
            console.log("No se encontró elemento");
            res.status(404).json({msg: 'No se encontró elemento'});

        }

        console.log(nombreUsuario.usuario + "=" + usuario);

            if (nombreUsuario.usuario == usuario){
                // Si la autenticación es correcta, devolvemos un TOKEN
                console.log("LOGUEADO");
                const token = jsonwebtoken.sign(
                    {user: nombreUsuario.user},
                    process.env.JWT_SECRET,
                    {expiresIn: process.env.EXPIRES_IN}
                ); 

                const cookieOption = {
                    expires: new Date(Date.now() + (process.env.COOKIE_EXPIRES * 24 * 60 * 1000))
                    ,path: "/"
                    , httpOnly: false, 
                    sameSite: 'none', 
                    secure: true 
                };
                console.log(cookieOption);
                // Devolvemos 
                res.cookie("jwt", token, cookieOption);
                res.status(200).send({msg: "Inicio sesión correctamente"});


            } else{
                res.status(404).json({msg: 'No se encontró el usuario'});
            }

        

    }
    else {
        res.status(500).json({error: 'faltan datos'});
    }
  
    
};

module.exports = UsuariosController;

