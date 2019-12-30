const express = require('express');
const path = require('path');
const dree = require('dree');

const router = express.Router();

const routesPath = path.join(__dirname, 'routes');
const dreeOptions = { skipErrors: false, extensions: ['js'] };
const fileCallback = function(file) {
    if (/.route.js/.test(file.name)) {
        require(file.path)(router);
        console.log(`Extracted routes from ${file.path}`);
    }
};

dree.scan(routesPath, dreeOptions, fileCallback);

module.exports = router;