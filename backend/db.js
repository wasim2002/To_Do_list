const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'user',
    password:'password',
    database: 'test'
}) 

connection.connect(error => {
    if (error) throw error;
    console.log('Successfully connect to database');
});
module.exports = connection;