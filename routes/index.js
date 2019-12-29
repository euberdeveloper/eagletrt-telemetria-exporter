const express = require('express');
const mongoback = require('mongoback');
const path = require('path');
const util = require('util');
const childProcess = require('child_process');

const { MONGO } = require('../config');
const Database = require('../utils/database');

const exec = util.promisify(childProcess.exec);
const database = new Database(MONGO.uri, MONGO.options);
const router = express.Router();

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

router.post('/export/json', async (req, res) => {
    const collectionsToExport = req.body.collectionsToExport;
    const timestamp = Date.now();
    const tempPath = path.join(__dirname, '../', 'temp');

    await mongoback.mongoExport({
        collections: [collectionsToExport],
        jsonArray: true,
        outDir: path.join(tempPath, `${timestamp}`)
    });

    await exec(`zip -r ${timestamp}.zip ${timestamp}/*`, { cwd: tempPath });
    res.sendFile(path.join(tempPath, `${timestamp}.zip`), () => {
        exec(`rm -rf ${timestamp} ${timestamp.zip}`, { cwd: tempPath });
    });
});

module.exports = router;