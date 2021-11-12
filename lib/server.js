const http = require('http');
const { StringDecoder } = require('string_decoder');

const config = require('../config.js');

const utils = require('./utils.js');
const data = require('./data.js');
const PageHomeGuest = require('../pages/PageHomeGuest.js');
const PageHomeUser = require('../pages/PageHomeUser.js');
const Page404 = require('../pages/Page404.js');
const PageRegister = require('../pages/PageRegister.js');
const PageLogin = require('../pages/PageLogin.js');
const PageEmpty = require('../pages/PageEmpty.js');

const ApiTask = require('../api/task.js');
const ApiUser = require('../api/user.js');
const ApiToken = require('../api/token.js');

const server = {};

server.db = null;

server.httpServer = http.createServer((req, res) => {
    const baseURL = `http${req.socket.encrypted ? 's' : ''}://${req.headers.host}`;
    const parsedURL = new URL(req.url, baseURL);
    const parsedPathName = parsedURL.pathname;
    const queryStringObject = parsedURL.searchParams;
    const httpMethod = req.method.toLowerCase();
    const trimmedPath = parsedPathName.replace(/^\/+|\/+$/g, '');
    const headers = req.headers;

    const decoder = new StringDecoder('utf-8');
    let buffer = '';
    req.on('data', (data) => {
        buffer += decoder.write(data);
    })

    req.on('end', async () => {
        buffer += decoder.end();

        const textFileExtensions = ['css', 'js', 'svg', 'webmanifest'];
        const binaryFileExtensions = ['woff2', 'woff', 'ttf', 'eot', 'otf', 'png', 'jpg', 'ico'];
        const urlParts = trimmedPath.split('.');
        const fileExtension = urlParts[urlParts.length - 1];
        const isTextFile = textFileExtensions.includes(fileExtension);
        const isBinaryFile = binaryFileExtensions.includes(fileExtension);
        const isAPI = trimmedPath.indexOf('api/') === 0;
        const isPage = !isTextFile && !isBinaryFile && !isAPI;

        const MIMES = {
            css: 'text/css',
            js: 'text/javascript',
            svg: 'image/svg+xml',
            woff2: 'font/woff2',
            woff: 'font/woff',
            ttf: 'font/ttf',
            eot: 'application/vnd.ms-fontobject',
            otf: 'font/otf',
            png: 'image/png',
            jpg: 'image/jpeg',
            ico: 'image/x-icon',
            webmanifest: 'application/manifest+json',
        }

        const cookiesObject = utils.parseCookies(headers.cookie);
        const userObject = await ApiToken._token.verify(cookiesObject['login-token']);

        const dataForHandlers = {
            db: server.db,
            baseURL,
            trimmedPath,
            httpMethod,
            headers,
            queryStringObject,
            payload: utils.parseJSONtoObject(buffer),
            user: {
                isLoggedIn: userObject !== false,
            }
        }

        // papildau informacija apie vartotoja, jei jis yra prisijunges
        if (dataForHandlers.user.isLoggedIn) {
            dataForHandlers.user = {
                ...dataForHandlers.user,
                ...userObject,
            }
        }

        if (isTextFile || isBinaryFile) {
            let fileContent = '';
            if (isTextFile) {
                fileContent = await data.readStaticTextFile(trimmedPath);
            } else {
                fileContent = await data.readStaticBinaryFile(trimmedPath);
            }

            if (fileContent === '') {
                // nepavyko rasti norimo failo
                res.writeHead(404, {
                    'Content-Type': MIMES[fileExtension],
                })
            } else {
                // pavyko rasti norima faila
                res.writeHead(200, {
                    'Content-Type': MIMES[fileExtension],
                })
            }

            return res.end(fileContent);
        }

        if (isAPI) {
            const endPoint = trimmedPath.split('/')[1];
            const handler = server.api[endPoint][endPoint];
            handler(dataForHandlers, (statusCode, payload = '', headers = {}) => {
                statusCode = typeof statusCode === 'number' ? statusCode : 200;
                payload = typeof payload === 'string' ? payload : JSON.stringify(payload);
                res.writeHead(statusCode, {
                    'Content-Type': 'application/json',
                    ...headers,
                })
                return res.end(payload);
            });
        }

        if (isPage) {
            const isLoggedIn = dataForHandlers.user.isLoggedIn;

            let pageHandler = server.routes['404'];
            const routes = isLoggedIn ? server.protectedRoutes : server.routes;
            if (trimmedPath in routes) {
                pageHandler = routes[trimmedPath];
            }
            const page = new pageHandler(dataForHandlers);
            return res.end(page.render());
        }
    })
});

server.routes = {
    '': PageHomeGuest,
    'register': PageRegister,
    'login': PageLogin,
    '404': Page404,
};

server.protectedRoutes = {
    '': PageHomeUser,
    '404': Page404,
};

server.api = {
    task: ApiTask,
    user: ApiUser,
    token: ApiToken,
};

server.init = (db) => {
    server.db = db;

    server.httpServer.listen(config.httpPort, () => {
        console.log(`Tavo serveris sukasi ant http://localhost:${config.httpPort}`);
    })
}

module.exports = server;