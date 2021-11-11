const utils = require('../lib/utils.js');
const IsValid = require('../components/IsValid.js');

const handlers = {}

handlers.user = (data, callback) => {
    const acceptableMethods = ['get', 'post', 'put', 'delete'];

    if (acceptableMethods.includes(data.httpMethod)) {
        return handlers._user[data.httpMethod](data, callback);
    }

    return callback(405, { error: 'Nepriimtinas uzklausos metodas' });
}

handlers._user = {}

handlers._user.get = async (data, callback) => {
    // gaunam
}

handlers._user.post = async (data, callback) => {
    const { action, username, email, password, rePass } = data.payload;

    if (!IsValid.nonEmptyString(action) || action !== 'register') {
        return callback(400, 'Kreipeisi i registracijos API, bet objekte nurodytas kitas API.');
    }

    if (!IsValid.nonEmptyString(username) ||
        !IsValid.nonEmptyString(email) ||
        !IsValid.nonEmptyString(password) ||
        !IsValid.nonEmptyString(rePass) ||
        password !== rePass ||
        password.length < 8) {
        return callback(400, 'Registracijos API duomenyse rado klaida/as.');
    }

    let user = null;

    try {
        const query = `SELECT * FROM \`users\`
                        WHERE username = '${username}'`;
        user = await data.db.execute(query);
    } catch (error) {
        return callback(503, 'Nepavyko rasti norimo vartotojo.');
    }

    if (user[0].length !== 0) {
        return callback(400, 'Toks vartotojas jau uzregistruotas.');
    }

    try {
        const query = `INSERT INTO \`users\`
                            (\`username\`, \`email\`, \`hashed_password\`)
                        VALUES
                            ('${username}', '${email}', '${utils.hash(password)}')`;
        await data.db.execute(query);
        return callback(201, 'Naujas vartotojas uzregistruotas.');
    } catch (error) {
        return callback(503, 'Nepavyko uzregistruoti naujo vartotojo.');
    }
}

handlers._user.put = async (data, callback) => {
    // atnaujinam
}

handlers._user.delete = async (data, callback) => {
    // istrinam
}

module.exports = handlers;