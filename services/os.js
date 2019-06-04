const os = require('os')

module.exports = function() {
    let osVersion = os.platform() + ' '+os.release();
    let freeMem = os.freemem().toFixed(2) / Math.pow(1024,3) + 'GB';
    return {
        osVersion,
        freeMem
    }
}