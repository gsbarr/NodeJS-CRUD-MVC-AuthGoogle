const {Schema, model} = require('mongoose');
const findOrCreate = require('mongoose-findorcreate')

const UsuarioGoogleEsquema = new Schema({
    googleId: {
        type: String,
        required: false
    },
    googleEmail: {
        type: String,
        required: false
    }

}, {
    timestamps: true 
});

UsuarioGoogleEsquema.plugin(findOrCreate);

module.exports = model('UsuariosGoogle', UsuarioGoogleEsquema, 'UsuariosGoogle');