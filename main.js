const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

const { PORT } = require('./config');
const routes = require('./routes');
const app = express();

const logger = require('./utils/logger')('MAIN');

/* ADDING MIDDLEWARES */

logger.info('Adding middlewares...');

logger.debug('cors');
app.use(cors());

logger.debug('morgan');
app.use(morgan('dev'));

logger.debug('bodyParser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

logger.success('Added middlewares!!!');

/* ADDING ROUTES */

logger.hr();

logger.info('Adding routes...');
app.use('/api', routes());
logger.success('Added routes!!!');

/* STARTING SERVER */

logger.hr();

logger.info('Starting server...');
app.listen(PORT, () => {
    logger.success('Server started!!!');
    logger.debug(`Server listening on port ${PORT}`);
    logger.hr();
    logger.br();
});