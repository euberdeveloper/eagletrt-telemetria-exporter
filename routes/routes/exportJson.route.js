const mongoback = require('mongoback');
const childProcess = require('child_process');
const util = require('util');
const remover = require('../../utils/remover');
const pather = require('../../utils/pather');

const exec = util.promisify(childProcess.exec);

module.exports = function (router) {

    router.post('/export/json', async (req, res) => {
        const {
            timestamp,
            tempPath,
            folderPath,
            zipPath
        } = pather();

        const collectionsToExport = req.body.collectionsToExport;
        await mongoback.mongoExport({
            collections: [collectionsToExport],
            jsonArray: true,
            outDir: folderPath
        });

        await exec(`zip -r ${timestamp}.zip ${timestamp}/*`, { cwd: tempPath });
        res.sendFile(zipPath, async () => await remover(timestamp));
    });

};