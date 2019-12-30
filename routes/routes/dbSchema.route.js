const { MONGO } = require('../../config');
const Database = require('../../utils/database');
const database = new Database(MONGO.uri, MONGO.options);

module.exports = function (router) {

    router.get('/database-schema', async (_req, res) => {
        await database.connect();
        const databases = await database.listDatabases();
        const dbSchema = {};
        for (const db of databases) {
            const collections = await database.listCollections(db);
            dbSchema[db] = collections;
        }
        res.status(200).send(dbSchema);
    });

};