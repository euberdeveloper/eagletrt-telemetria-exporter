export default {
    host: process.env.HEROKU ? 'telemetria-exporter-demo.herokuapp.com' : 'localhost',
    port: process.env.HEROKU ? '' : 8000,
    protocol: process.env.HEROKU ? 'https' : 'http'
};
