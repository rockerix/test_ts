const db = require('../database/conexion.js')

const getAccountById = async (idAccount) => {
    try {
    const result = await db.query('SELECT * FROM testts.accounts WHERE idAccount = $1', [idAccount]);

    if (result.rows.length === 0) {
        return null;
    }

    return result.rows[0];
} catch (error) {
    console.error('Error en la consulta:', error.message);
    throw new Error('Server error');
}
};

const getAccountByPin = async (pin) => {
    try {
        const result = await db.query('SELECT * FROM testts.accounts WHERE pin = $1', [pin]);

        if (result.rows.length === 0) {
            return null;
        }

        return result.rows[0];
    } catch (error) {
        console.error('Error en la consulta:', error.message);
        throw new Error('Server error');
    }
};
const updateBalance = async (idAccount, newBalance) => {
        try {

        await db.query('UPDATE testts.accounts SET actualbalance = $1 WHERE idAccount = $2', [newBalance, idAccount]);

        return 200;

    } catch (error) {
        console.error('Error en la consulta:', error.message);
        throw new Error('Server error');
    }
};

const updatePin = async (idAccount, newPin) => {
    try {

        await db.query('UPDATE testts.accounts SET pin = $1 WHERE idAccount = $2', [newPin, idAccount]);
        return 200;

        } catch (error) {
            console.error('Error en la consulta:', error.message);
            throw new Error('Server error');
        }
    };

const getAccountDetailById = async (idAccount) => {
    try {
    const result = await db.query('select * from testts.movements where idaccount = $1 order by idmovement desc limit 5', [idAccount]);

    if (result.rows.length === 0) {
        return null;
    }

    return result.rows;
} catch (error) {
    console.error('Error en la consulta:', error.message);
    throw new Error('Server error');
}
};

module.exports = { getAccountById, getAccountByPin, updateBalance, updatePin, getAccountDetailById };
