const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require('./controllers/authController.js');
const accountRoutes = require('./controllers/accountController.js');

app.get('/', (req,res) =>{
    res.send('Health');
});

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/accounts', accountRoutes);


app.listen(6500,() => {
    console.log('Server OK');
});