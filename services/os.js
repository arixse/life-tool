const os = require('os')

module.exports = function() {
    let osVersion = os.platform() + ' '+os.release();
    let freeMem = (os.freemem() / Math.pow(1024,3)).toFixed(2) + 'GB';
    let totalMem = (os.totalmem() / Math.pow(1024,3)).toFixed(2) + 'GB'
    return {
        osVersion,
        freeMem,
        totalMem
    }
}