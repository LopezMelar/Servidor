const bcrypt = require('bcrypt');
const User = require('../models/user');
const saltRounds = 10; // Número de rondas de sal

module.exports = {
    // Registro de usuario
    register(req, res) {
        const user = req.body;

        // Validar que todos los campos necesarios estén presentes
        if (!user.email || !user.password_user) {
            return res.status(400).json({
                success: false,
                message: 'Email y contraseña son requeridos'
            });
        }

        // Hashear la contraseña antes de guardar en la base de datos
        bcrypt.hash(user.password_user, saltRounds, (err, hashedPassword) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: 'Error al hashear la contraseña',
                    error: err
                });
            }

            // Crear el usuario con la contraseña hasheada
            User.create({
                ...user,
                password_user: hashedPassword
            }, (err, data) => {
                if (err) {
                    return res.status(501).json({
                        success: false,
                        message: 'Error al registrar',
                        error: err
                    });
                }

                return res.status(201).json({
                    success: true,
                    message: 'El registro se realizó correctamente',
                    data: data
                });
            });
        });
    },

    // Inicio de sesión
    login(req, res) {
        const { email, password } = req.body;

        // Validar que todos los campos necesarios estén presentes
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email y contraseña son requeridos'
            });
        }

        // Buscar el usuario por email
        User.findByEmail(email, (err, user) => {
            if (err || !user) {
                return res.status(401).json({
                    success: false,
                    message: 'Credenciales incorrectas'
                });
            }

            // Comparar la contraseña ingresada con la almacenada
            bcrypt.compare(password, user.password_user, (err, isMatch) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'Error en la comparación de contraseñas',
                        error: err
                    });
                }
            
                if (!isMatch) {
                    return res.status(401).json({
                        success: false,
                        message: 'Credenciales incorrectas'
                    });
                }
            
                return res.status(200).json({
                    success: true,
                    message: 'Inicio de sesión exitoso'
                });
            });
        });
    }
};
