const logger = require('./src/lib/logger');
const smartui = require('./src/smartui');
const pkgName = require('./src/lib/utils').getPackageName()

// Take a DOM snapshot and post it to the snapshot endpoint
async function smartuiSnapshot(page, snapshotName) {
  if (!page) throw new Error('A Playwright `page` object is required.');
  if (!snapshotName) throw new Error('The `name` argument is required.');
  if (!(await smartui.isSmartUIRunning())) throw new Error('SmartUI server is not running.');
  let log = logger(pkgName);

  try {
    // Inject the DOM serialization script
    const resp = await smartui.fetchDOMSerializer();
    await page.evaluate(resp.body.data.dom);
    
    // Serialize and capture the DOM
    /* istanbul ignore next: no instrumenting injected code */
    let { dom } = await page.evaluate((options) => ({
      /* eslint-disable-next-line no-undef */
      dom: SmartUIDOM.serialize(options)
    }), {});

    // Post the DOM to the snapshot endpoint with snapshot options and other info
    await smartui.postSnapshot( dom.html,  snapshotName,  'playwright' );
    log.info(`Snapshot captured: ${snapshotName}`);
  } catch (err) {
    log.error(`Could not take DOM snapshot "${snapshotName}"`);
    log.error(err);
  }
}

module.exports = smartuiSnapshot;
