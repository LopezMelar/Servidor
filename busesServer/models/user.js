const db = require('../config/config');

const User = {};

User.create = (user, result) => {

    const sql = `
    INSERT INTO 
    users (email, name_user, last_name_user, cellphone, image, password_user, created_at, update_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`;


db.query(
    sql,
    [
        user.email,
        user.name_user,
        user.last_name_user,
        user.cellphone,
        user.image,
        user.password_user,
        new Date(),
        new Date
    ],
        (err, res) => {
            if(err){
                console.log('error: ' , err);
                result(err, null);
            }else{
                console.log('id del nuevo usuario: ' , res.insertId);
                result(null, res.insertId);
            }
        }

    
)
}
// Método para buscar un usuario por email
User.findByEmail = (email, result) => {
    const sql = `SELECT * FROM users WHERE email = ?`;

    db.query(sql, [email], (err, res) => {
        if (err) {
            console.log('Error: ', err);
            result(err, null);
        } else if (res.length) {
            console.log('Usuario encontrado: ', res[0]);
            result(null, res[0]);
        } else {
            // Si no se encontró el usuario
            result(null, null);
        }
    });
};

module.exports = User;