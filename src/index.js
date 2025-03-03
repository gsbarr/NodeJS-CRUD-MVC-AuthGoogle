const app = require('./server.js');
require('./db.js');

// Sirve para ver en consola información útil sobre cómo es llamado el servidor
const morgan = require('morgan');


app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'));
});
 
 
