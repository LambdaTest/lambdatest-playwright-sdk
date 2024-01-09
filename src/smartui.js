const client = require('./lib/httpClient.js');
const logger = require('./lib/logger.js');
const pkgName = require('./lib/utils.js').getPackageName()
const log = logger(pkgName);

async function isSmartUIRunning() { 
    try {
        await client.isSmartUIRunning();
        return true;
    } catch (error) {
        log.debug(error);
        return false;
    }
}

async function fetchDOMSerializer() {
    try {
        return await client.fetchDOMSerializer();
    } catch (error) {
        log.debug(error);
        throw new Error(`fetch DOMSerializer failed`);
    }
}

async function postSnapshot(snapshotDOM, snapshotName, testType) {
    const data = JSON.stringify({
        snapshot: {
            dom: snapshotDOM,
            name: snapshotName
        },
        testType
    });
      
    try {
        return await client.postSnapshot(data);
    } catch (error) {
        log.debug(error);
        throw new Error(`post snapshot failed`);
    }
}

module.exports = {
    isSmartUIRunning,
    fetchDOMSerializer,
    postSnapshot
};
