const fs = require('fs');
const rimraf = require('rimraf');
const path = require('path');
const util = require('util');

const unlinkAsync = util.promisify(fs.unlink);
const rimrafAsync = util.promisify(rimraf);
const tempPath = path.join(process.cwd(), 'temp');

module.exports = async function (timestamp) {
    const folderPath = path.join(tempPath, `${timestamp}`);
    const zipPath = path.join(tempPath, `${timestamp}.zip`);

    await rimrafAsync(folderPath);
    await unlinkAsync(zipPath);
};