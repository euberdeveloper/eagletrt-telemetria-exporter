const eagletrtCsv = require('eagletrt-csv');
const zl = require('zip-lib');
const logger = require('../../utils/logger')('EXPORT_CSV');
const remover = require('../../utils/remover');
const pather = require('../../utils/pather');
const { MONGO } = require('../../config');

module.exports = function (router) {

    router.post('/export/csv', async (req, res) => {
        logger.info('api/export/csv');

        const {
            timestamp,
            folderPath,
            zipPath
        } = pather();
        logger.debug('timestamp is', timestamp);

        const collectionsToExport = req.body.collectionsToExport;
        logger.debug('collections are ', collectionsToExport);
        try {
            await eagletrtCsv.mongoExport({
                uri: MONGO.uri,
                collections: collectionsToExport,
                throwIfLackOfPermissions: true,
                throwIfOneFails: true,
                outDir: folderPath
            });

            const zip = new zl.Zip();
            zip.addFolder(folderPath);
            await zip.archive(zipPath);
            
            res.sendFile(zipPath, async () => await remover(timestamp));
        }
        catch (error) {
            logger.warning('Timestamp was ', timestamp);
            logger.error('Error in exporting csv', error);
            res.status(500).send(error);
        }
    });

};