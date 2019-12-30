const path = require('path');

module.exports = function () {
    const timestamp = Date.now();
    const tempPath = path.join(process.cwd(), 'temp');
    const folderPath = path.join(tempPath, `${timestamp}`);
    const zipPath = path.join(tempPath, `${timestamp}.zip`);

    return {
        timestamp,
        tempPath,
        folderPath,
        zipPath
    };
}