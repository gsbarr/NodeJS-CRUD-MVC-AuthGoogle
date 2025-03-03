// Importamos el modelo
const Motos = require('../models/Motos.js');

// Creamos un nuevo controlador
const MotosController = {};

MotosController.inicio = (req, res) => {
    res.send('sadsa');
};

MotosController.nuevoItem = async (req, res) => {
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

MotosController.listarTodo= async (req, res) => {
    const listado = await Motos.find();
    res.send(listado);
};

MotosController.encontrar = async (req, res) => {
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

MotosController.eliminarItem = async (req, res) => {
    const id = req.params.id;

    if (id){
        console.log(id);
        
        try{
            await Motos.findByIdAndDelete(id);
        }
        catch (err) { 
            console.log("Error en el delete: "+error);
            res.status(500).json({error: err});
        }

        res.send("ID ELIMINADO");
    } else{
        res.send("Falta ID");
    }
};

MotosController.actualizar = async (req, res) => {
    const id = req.params.id;
    const { nombre, marca } = req.body;

    console.log(req.body);

    if (id && nombre && marca){
        console.log(id, nombre, marca);
        
        try{
            let r = await Motos.findByIdAndUpdate(id, {nombre, marca});
            if (r){
                res.status(200).json({msg: 'Recurso actualizado'})
            } else{
                res.status(500).json({error: 'Recurso no encontrado'});
            }
        } catch(e){
            res.status(500).json({error: e});
        }
    } else{
        res.status(500).json({error: 'faltan datos'});
    }
};

module.exports = MotosController;

