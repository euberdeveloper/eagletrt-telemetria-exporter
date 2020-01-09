const mongoback = require('mongoback');
const zl = require('zip-lib');
const logger = require('../../utils/logger')('EXPORT_JSON');
const remover = require('../../utils/remover');
const pather = require('../../utils/pather');
const { MONGO } = require('../../config');

module.exports = function (router) {

    router.post('/export/json', async (req, res) => {
        logger.info('api/export/json');

        const {
            timestamp,
            folderPath,
            zipPath
        } = pather();
        logger.debug('timestamp is', timestamp);

        const collectionsToExport = req.body.collectionsToExport;
        logger.debug('collections are ', collectionsToExport);
        try {
            await mongoback.mongoExport({
                uri: MONGO.uri,
                collections: collectionsToExport,
                jsonArray: true,
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
            logger.error('Error in exporting json', error);
            res.status(500).send(error);
        }
    });

};