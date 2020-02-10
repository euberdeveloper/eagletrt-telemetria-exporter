const { MongoScanner } = require('mongo-scanner');
const logger = require('../../utils/logger')('DBSCHEMA');

const { MONGO } = require('../../config');
const mongoScanner = new MongoScanner(MONGO.uri, null, { 
    excludeSystem: true,
    excludeEmptyDatabases: true,
    excludeDatabases: ['local'],
    ignoreLackOfPermissions: true
});

module.exports = function (router) {

    router.get('/database-schema', async (_req, res) => {
        logger.info('api/database-schema');
        try {
            logger.debug('Uri is ', MONGO.uri);
            const dbSchema = await mongoScanner.getSchema();
            res.status(200).send(dbSchema);
        }
        catch (error) {
            logger.warning('Uri was ', MONGO.uri);
            logger.error('Error in getting database schema', error);
            res.status(500).send(error);
        }
    });

};