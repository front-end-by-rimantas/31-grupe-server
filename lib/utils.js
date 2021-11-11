const crypto = require('crypto');
const config = require('../config.js');

const utils = {};

utils.parseJSONtoObject = text => {
    try {
        return JSON.parse(text);
    } catch (error) {
        return {};
    }
}

utils.hash = str => {
    if (typeof str === 'string' && str !== '') {
        return crypto.createHmac('sha512', config.hashingSecret).update(str).digest('hex');
    } else {
        return false;
    }
}

utils.randomString = (size = 10) => {
    const abc = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const abcLength = abc.length;
    let text = '';
    for (let i = 0; i < size; i++) {
        const index = Math.floor(Math.random() * abcLength);
        text += abc[index];
    }
    return text;
}

utils.parseCookies = (str) => {
    const obj = {};
    if (typeof str === 'string' && str !== '') {
        const parts = str.split(';').map(s => s.trim());
        for (const part of parts) {
            const [key, value] = part.split('=');   // ['hi', 'five']
            obj[key] = value;
        }
    }
    return obj;
}

module.exports = utils;
