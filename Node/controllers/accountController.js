const express = require('express');
const { getAccountById, updatePin, updateBalance,getAccountDetailById } = require('../models/accountModel');
const { createMovement } = require('../models/movementModel');
const router = express.Router();

router.post('/deposit', async (req, res) => {
    const { amount,idAccount } = req.body;

    if (amount <= 0) {
        return res.status(400).json({ message: 'Amount must be greater than 0' });
    }

    try {
        const account = await getAccountById(idAccount);
        if (!account) return res.status(404).json({ message: 'Account not found' });

        const transactionAmount = parseFloat(amount);

        const newBalance = (parseFloat(account.actualbalance) || 0) + transactionAmount;

        var updated =await updateBalance(idAccount, newBalance);

        var created = await createMovement(idAccount, 'Deposit', amount, newBalance);

        res.json({ message: 'Deposit successful', newBalance });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Withdraw money
router.post('/withdraw', async (req, res) => {
    const { amount,idAccount } = req.body;

    if (amount <= 0) {
        return res.status(400).json({ message: 'Amount must be greater than 0' });
    }

    try {
        const account = await getAccountById(idAccount);
        if (!account) return res.status(404).json({ message: 'Account not found' });

        const transactionAmount = parseFloat(amount);

        if (account.actualbalance < transactionAmount) {
            return res.status(400).json({ message: 'Insufficient funds' });
        }

        // Update balance
        const newBalance = (parseFloat(account.actualbalance) || 0) - transactionAmount;

        var updated = await updateBalance(idAccount, newBalance);
        // Record the movement
        var created = await createMovement(idAccount, 'Withdrawal', amount, newBalance);

        res.json({ message: 'Withdrawal successful', newBalance });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Check balance
router.post('/balance', async (req, res) => {
    const { idAccount } = req.body;
    try {
        const account = await getAccountById(idAccount);
        if (!account) return res.status(404).json({ message: 'Account not found' });

        res.json({ balance: account.actualbalance });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Check balance detail
router.post('/balanceDetail', async (req, res) => {
    const { idAccount } = req.body;
    try {
        const accountBalance = await getAccountDetailById(idAccount);
        if (!accountBalance) return res.status(404).json({ message: 'Account not found' });
        res.json({ balanceDetail: accountBalance });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});


// Change PIN
router.post('/change-pin', async (req, res) => {
    const { idAccount,newPin } = req.body;

    if (!newPin || newPin.length !== 4) {
        return res.status(400).json({ message: 'PIN must be 4 digits' });
    }

    try {
        await updatePin(idAccount, newPin);
        res.json({ message: 'PIN changed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
