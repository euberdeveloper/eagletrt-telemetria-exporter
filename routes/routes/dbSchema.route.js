const { MongoScanner } = require('mongo-scanner');

const { MONGO } = require('../../config');
const mongoScanner = new MongoScanner(MONGO.uri, MONGO.options, { 
    excludeSystem: true,
    excludeEmptyDatabases: true,
    excludeDatabases: ['local']
});

module.exports = function (router) {

    router.get('/database-schema', async (_req, res) => {
        const dbSchema = await mongoScanner.getSchema();
        res.status(200).send(dbSchema);
    });

};