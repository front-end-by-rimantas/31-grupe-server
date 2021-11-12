const utils = require('../lib/utils.js');
const IsValid = require('../components/IsValid.js');
const fs = require('../lib/data.js');

const handlers = {}

handlers.token = (data, callback) => {
    const acceptableMethods = ['get', 'post', 'put', 'delete'];

    if (acceptableMethods.includes(data.httpMethod)) {
        return handlers._token[data.httpMethod](data, callback);
    }

    return callback(405, { error: 'Nepriimtinas uzklausos metodas' });
}

handlers._token = {}

handlers._token.get = async (data, callback) => {
    // gaunam
}

handlers._token.post = async (data, callback) => {
    const { action, username, password } = data.payload;

    if (!IsValid.nonEmptyString(action) || action !== 'login') {
        return callback(400, 'Kreipeisi i registracijos API, bet objekte nurodytas kitas API.');
    }

    if (!IsValid.nonEmptyString(username) ||
        !IsValid.nonEmptyString(password)) {
        return callback(400, 'Prisijungimo API duomenyse rado klaida/as.');
    }

    let user = null;

    try {
        const query = `SELECT * FROM \`users\`
                        WHERE username = '${username}'
                            AND hashed_password = '${utils.hash(password)}'`;
        user = await data.db.execute(query);
    } catch (error) {
        return callback(503, 'Nepavyko rasti norimo vartotojo.');
    }

    if (user[0].length === 0) {
        return callback(404, 'Neteisingi prisijungimo duomenys.');
    }
    if (user[0].length > 1) {
        return callback(503, 'Problema bandant atpazinti tinkama vartotoja - daugybine registracija.');
    }

    const token = utils.randomString(20);

    const tokenObject = {
        token,
        email: user.email,
        username,
        expire: Date.now() + 86400000,
    }

    const res = await fs.create('token', token, tokenObject);

    if (res !== true) {
        return callback(400, 'Nepavyko sukurti vartotojo token');
    }

    const cookies = [
        'login-token=' + token,
        'path=/',
        'domain=localhost',
        'max-age=86400',
        'expires=Sun, 16 Jul 3567 06:23:41 GMT',
        // 'Secure',
        'SameSite=Lax',
        'HttpOnly'
    ];

    return callback(200, tokenObject, {
        'Set-Cookie': cookies.join('; '),
    });
}

handlers._token.put = async (data, callback) => {
    // atnaujinam
}

handlers._token.delete = async (data, callback) => {
    // istrinam
    try {
        const isLogout = await fs.delete('token', data.user.token);
        if (isLogout) {
            const cookies = [
                'login-token=',
                'path=/',
                'expires=Thu, 01 Jan 1970 00:00:00 UTC',
            ];
            return callback(200, 'Vartotojas islogintas', {
                'Set-Cookie': cookies.join('; '),
            });
        } else {
            return callback(503, 'Nepavyko isloginti vartotojo');
        }
    } catch (error) {
        return callback(503, 'Nepavyko isloginti vartotojo (vidine serverio problema)');
    }
}

handlers._token.verify = async (tokenStr) => {
    // validuojam
    const tokenContent = await fs.read('token', tokenStr);
    if (tokenContent === '') {
        return false;
    }

    if (!tokenContent.expire ||
        tokenContent.expire < Date.now()) {
        return false;
    }
    return tokenContent;
}

module.exports = handlers;