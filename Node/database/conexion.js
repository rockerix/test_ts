const { Client } = require('pg');

const client = new Client({
    host                 : 'vimaq-test.c9w864wky3wh.us-west-2.rds.amazonaws.com',
    port                 : 5432,
    database             : 'postgres',
    user                 : 'postgres',
    password             : 'V1m4qDB.2025', 
    ssl                  : {
        rejectUnauthorized: false 
    }
});

client.connect()
  .then(() => {
    console.log('Conection OK PostgreSQL');
  })
  .catch(err => {
    console.error('Error conection PostgreSQL:', err.stack);
  });

  module.exports = client;