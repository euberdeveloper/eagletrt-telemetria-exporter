const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const { PORT, DIST_PATH } = require('./config');
const routes = require('./routes');
const app = express();

const logger = require('./utils/logger')('MAIN');

/* ADDING MIDDLEWARES */

logger.info('Adding middlewares...');

logger.debug('compression');
app.use(compression());

logger.debug('helmet');
app.use(helmet());

logger.debug('cors');
app.use(cors());

logger.debug('morgan');
app.use(morgan('dev'));

logger.debug('bodyParser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

logger.debug('express-static');
app.use(express.static(DIST_PATH));

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