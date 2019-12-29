const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

const { PORT } = require('./config');
const routes = require('./routes');
const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});