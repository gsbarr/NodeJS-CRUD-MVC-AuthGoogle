// Importamos el modelo
const Noticias = require('../models/Noticias.js');

// Creamos un nuevo controlador
const NoticiasController = {};


NoticiasController.nuevoItem = async (req, res) => {
    // Para obtener un dato en particular
    const { autor, titulo, texto } = req.body;
    console.log(req.body);

    // Si existen los 4 datos
    if ( autor && titulo && texto ) {
        // Creamos un nuevo item
        const nuevaNoticia = new Noticias({autor, titulo, texto});
        console.log(nuevaNoticia);


        try {
            // Guardamos el nuevo item 
            let r = await nuevaNoticia.save();

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

NoticiasController.listarTodo= async (req, res) => {
    console.log("ejecutando ListarTodo");
    const listado = await Noticias.find();
    res.status(200).send(listado);
};

NoticiasController.encontrarPorID = async (req, res) => {
    //const { nombre } = req.params.id;
    console.log(req.params.id);
    
    if (req.params.id) {

        try{
            const Noticia = await Noticias.findById(req.params.id);

            console.log("encontro elemento");
            if (Noticia){
                res.send(Noticia); 
            } else{
                res.status(404).json({msg: 'No se encontró elemento'});
            }
        }
        catch(err){
            console.log("No se encontró elemento");
            res.status(404).json({msg: 'No se encontró elemento'});

        }
       
    }
  
    
};

NoticiasController.encontrarPorTitulo = async (req, res) => {
    //const { nombre } = req.params.id;
    console.log(req.params.id);

    if (req.params.id) {

        try{
            const Noticia = await Noticias.find({ titulo: req.params.id }).exec();

            if (Noticia){
                res.send(Noticia); 
            } else{
                res.status(404).json({msg: 'No se encontró elemento'});
            }

        } 
        catch (err) { 
            console.log("No se encontró elemento");
            res.status(404).json({msg: 'No se encontró elemento'});

        }

    }
  
    
};

NoticiasController.eliminarItem = async (req, res) => {
    const id = req.params.id;

    if (id){
        console.log(id);
        
        try{
            await Noticias.findByIdAndDelete(id);
        }
        catch (err) { 
            console.log("Error en el delete: "+err);
            res.status(500).json({error: err});
        }

        res.send("ID ELIMINADO");
    } else{
        res.send("Falta ID");
    }
};

NoticiasController.actualizar = async (req, res) => {
    const id = req.params.id;
    const { autor, titulo, texto } = req.body;

    console.log(req.body);

    if (id && autor && titulo && texto){
        
        try{
            let r = await Noticias.findByIdAndUpdate(id, {autor, titulo, texto});
            if (r){
                res.status(200).json({msg: 'Recurso actualizado'})
            } else{
                res.status(404).json({error: 'Recurso no encontrado'});
            }
        } catch(e){
            res.status(500).json({error: e});
        }
    } else{
        res.status(500).json({error: 'faltan datos'});
    }
};

module.exports = NoticiasController;

