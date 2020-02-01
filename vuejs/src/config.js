export default {
    "host": process.env.NODE_ENV === 'production' ? 'telemetria-exporter-demo.herokuapp.com' : 'localhost',
    "port": process.env.NODE_ENV === 'production' ? '' : 8000
};