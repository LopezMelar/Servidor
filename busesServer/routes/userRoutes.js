const usersController = require('../controllers/usersController');

module.exports = (app) => {

    app.post ('/api/users/create', usersController.register);
        app.post('/api/login', usersController.login); // Añadir ruta para inicio de sesión

};