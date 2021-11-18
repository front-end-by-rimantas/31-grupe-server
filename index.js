const config = require('./config.js');
const db = require('./lib/db.js');
const server = require('./lib/server.js');


const app = {};

app.init = async () => {
    // pasiruosti pradinius folder'ius
    // pasiruosti pradinius failus
    // prisijungti prie DB
    const connection = await db.init(config.db);

    // uzkurti serveri
    server.init(connection);

    // reguliariu procesu paleidimas
    setInterval(() => {
        // nebegaliojanciu token failu trinimas
    }, 24 * 60 * 60 * 1000);
};

app.init();

module.exports = app;