const utils = require('../lib/utils.js');

const handlers = {}

handlers.task = (data, callback) => {
    const acceptableMethods = ['get', 'post', 'put', 'delete'];

    if (acceptableMethods.includes(data.httpMethod)) {
        return handlers._task[data.httpMethod](data, callback);
    }

    return callback(405, { error: 'Nepriimtinas uzklausos metodas' });
}

handlers._task = {}

handlers._task.get = async (data, callback) => {
    // gaunam
}

handlers._task.post = async (data, callback) => {
    // kuriam
}

handlers._task.put = async (data, callback) => {
    // atnaujinam
}

handlers._task.delete = async (data, callback) => {
    // istrinam
}

module.exports = handlers;