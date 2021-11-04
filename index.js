const mysql = require('mysql2/promise');
const server = require('./lib/server.js');

const app = {};

app.init = async () => {
    // pasiruosti pradinius folder'ius
    // pasiruosti pradinius failus
    // prisijungti prie DB
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'todo',
    });

    // uzkurti serveri
    server.init(connection);
};

app.init();

module.exports = app;