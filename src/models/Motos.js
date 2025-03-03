const {Schema, model} = require('mongoose');

// Esquema: describimos la estructura de la tabla o colección
const MotosSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    marca: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// Modelo creado a partir del esquema
module.exports = model('Motos', MotosSchema, 'Motos');
