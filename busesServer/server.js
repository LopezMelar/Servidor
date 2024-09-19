const express = require('express'); 
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');
/*cross origin resource sharing
*IMPORTAR RUTAS
*/
const usersRoutes = require('./routes/userRoutes');

const port = process.env.PORT || 3000;

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.disable('x-powered-by'); 

// Configuración del puerto
app.set('port', port);

/*
*LLAMADO DE LAS RUTAS
*/

usersRoutes(app);


// Iniciar servidor
server.listen(port, '0.0.0.0', function() {
    console.log(`Aplicación de Node.js ${process.pid} iniciada en 0.0.0.0, puerto ${port}...`);
});


// Ruta raíz
app.get('/', (req, res) => {
    res.send('Ruta raíz del proyecto');
});


//Ruta adicional
app.get('/saludo', (req,res) => {
    res.send('saludar')
});

// Manejo de errores
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send(err.stack);
});
