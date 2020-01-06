const express = require('express');
const path = require('path');
const dree = require('dree');
const logger = require('../utils/logger')('ROUTES');

module.exports = function () {
    const router = express.Router();

    const routesPath = path.join(__dirname, 'routes');
    const dreeOptions = { skipErrors: false, extensions: ['js'] };
    const fileCallback = function (file) {
        if (/.route.js/.test(file.name)) {
            require(file.path)(router);
            logger.debug(`Added routes/${file.relativePath}`);
        }
    };
    dree.scan(routesPath, dreeOptions, fileCallback);

    return router;
}