const express = require('express');
const jwt = require('jsonwebtoken');
const { getAccountByPin } = require('../models/accountModel');
const router = express.Router();

router.post('/login', async (req, res) => {
    const { pin } = req.body;
    try {
        const account = await getAccountByPin(pin);

        if (!account) {
            return res.status(400).json({ message: 'Invalid PIN' });
        }
        const token = jwt.sign({ idAccount: account.idaccount, bank: account.bank,name:account.complete_name }, "ThomsonReuters2025" , {
            expiresIn:  '15m'
        });

        res.json({ token });
    } catch (error) {
        console.error(error.stack);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
