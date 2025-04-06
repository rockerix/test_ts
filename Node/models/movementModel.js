const db = require('../database/conexion.js')

const createMovement = async (idAccount, type, amount, newBalance) => {
    try {
    await db.query('INSERT INTO testts.movements (idAccount, type, amount, newBalance, timestamp) VALUES ($1, $2, $3, $4, NOW())', [idAccount, type, amount, newBalance]);
    
    return 200;

} catch (error) {
    console.error('Error al insertar:', error.message); // Captura y muestra el error
    return null;
}
};

module.exports = { createMovement };