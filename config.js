const path = require('path');

module.exports = {
    PORT: 8000,
    MONGO: {
        uri: 'mongodb://localhost:27017',
        options: {}
    },
    LOGGER: {
        palette: {
            info: '#81A2BE',
            success: '#B5BD68',
            debug: '#C5C8C6',
            warning: '#F0C674',
            error: '#CC6666'
        }
    },
    DIST_PATH: path.join(__dirname, 'frontend')
};