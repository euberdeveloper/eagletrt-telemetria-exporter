const eagletrtCsv = require('eagletrt-csv');
const childProcess = require('child_process');
const util = require('util');
const logger = require('../../utils/logger')('EXPORT_CSV');
const remover = require('../../utils/remover');
const pather = require('../../utils/pather');

const exec = util.promisify(childProcess.exec);

module.exports = function (router) {

    router.post('/export/csv', async (req, res) => {
        logger.info('api/export/csv');

        const {
            timestamp,
            tempPath,
            folderPath,
            zipPath
        } = pather();
        logger.debug('timestamp is', timestamp);

        const collectionsToExport = req.body.collectionsToExport;
        logger.debug('collections are ', collectionsToExport);
        try {
            await eagletrtCsv.mongoExport({
                collections: collectionsToExport,
                throwIfOneFails: true,
                outDir: folderPath
            });

            await exec(`zip -r ${timestamp}.zip ${timestamp}/*`, { cwd: tempPath });
            res.sendFile(zipPath, async () => await remover(timestamp));
        }
        catch (error) {
            logger.warn('Timestamp was ', timestamp);
            logger.error('Error in exporting csv', error);
            res.status(500).send(error);
        }
    });

};