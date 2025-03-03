const {Schema, model} = require('mongoose');
const bcrypt = require('bcryptjs');

const UsuarioEsquema = new Schema({
    usuario: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

}, {
    timestamps: true 
});

// Creamos función que encripta contraseña
UsuarioEsquema.methods.encriptarPass = async password => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

// Función para verificar si la contraseña es correcta
UsuarioEsquema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

module.exports = model('Usuarios', UsuarioEsquema, 'Usuarios');