const mysql = require('mysql2/promise');

const db = {};

db.init = async ({ host, user, database }) => {
    await db.dropDatabase({ host, user, database });
    const connection = await db.createDatabase({ host, user, database });

    await db.createTableTasks(connection);
    await db.createTableUsers(connection);

    // uzpildom X1 lentele
    const usersQuery = "INSERT INTO`users`(`id`, `username`, `email`, `hashed_password`, `date`) VALUES\
        (1, 'John', 'john@john.john', '75240eb182463e773dbe28a6432db3e9914873376e19f72fc24d97d73ef0193cfabea4026c0367b15d4ec84969724d6f4be3f02a9760fa6983a525fac8ff91e1', '2021-11-11 17:55:49'),\
        (2, 'One', 'one@one.one', '67b17f50f60fe1fe9a3de6e0ef8488e9ed87509c989a8d553e1bcafc5dfcb5bee4d3c2295e1db1902cc7debbd813658709116fdb30c2998d56f22c2217f89586', '2021-11-11 17:56:07');";
    await connection.execute(usersQuery);

    return connection;
}

db.dropDatabase = async ({ host, user, database }) => {
    host = host ? host : 'localhost';
    user = user ? user : 'root';

    try {
        const conn = await mysql.createConnection({ host, user });
        await conn.execute(`DROP DATABASE IF EXISTS \`${database}\``);
        console.log('Buvusi duombaze istrinta');
    } catch (error) {
        console.log(`Iskilo bedu bandant pasalinti duombaze "${database}"`);
        return error;
    }
}

db.createDatabase = async ({ host, user, database }) => {
    host = host ? host : 'localhost';
    user = user ? user : 'root';

    try {
        let conn = await mysql.createConnection({ host, user });
        await conn.execute(`CREATE DATABASE IF NOT EXISTS \`${database}\``);
        await conn.end();

        conn = await mysql.createConnection({ host, user, database });
        console.log('Nauja duombaze sukurta');
        return conn;
    } catch (error) {
        console.log(`Iskilo bedu bandant sukurti duombaze "${database}"`);
        return error;
    }
}

db.createTableTasks = async (connection) => {
    try {
        const query = 'CREATE TABLE IF NOT EXISTS `tasks` (\
                            `id` int(10) NOT NULL AUTO_INCREMENT,\
                            `text` varchar(1000) COLLATE utf8_swedish_ci NOT NULL,\
                            `status` int(1) DEFAULT 0 NOT NULL,\
                            `date` timestamp NOT NULL DEFAULT current_timestamp(),\
                            PRIMARY KEY(`id`)\
                        ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;';
        await connection.execute(query);
    } catch (error) {
        console.log('Nepavyko sukurti uzduociu lenteles');
        console.log(error);
        return error;
    }
}

db.createTableUsers = async (connection) => {
    try {
        const query = 'CREATE TABLE IF NOT EXISTS `users` (\
                            `id` int(10) NOT NULL AUTO_INCREMENT,\
                            `username` varchar(20) COLLATE utf8_swedish_ci NOT NULL,\
                            `email` varchar(50) COLLATE utf8_swedish_ci NOT NULL,\
                            `hashed_password` varchar(1000) COLLATE utf8_swedish_ci NOT NULL,\
                            `date` timestamp NOT NULL DEFAULT current_timestamp(),\
                            PRIMARY KEY(`id`)\
                        ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;';
        await connection.execute(query);
    } catch (error) {
        console.log('Nepavyko sukurti uzduociu lenteles');
        console.log(error);
        return error;
    }
}

module.exports = db;
