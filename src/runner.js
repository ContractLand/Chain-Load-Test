const { join } = require("path");
const Manager = require("trebuchet-manager");

const SETUP_SCRIPT = join(__dirname, "./setup.js");
const VU_SCRIPT = join(__dirname, "./virtualUser.js");

const rampPeriod = 5000;
const concurrency = 30;
const activePeriod = 55000;
const coolingTimeout = 10000;

const manager = new Manager({
  reportPath: "load_test_report",
  setupScript: SETUP_SCRIPT,
  vuScript: VU_SCRIPT,
  rampPeriod,
  concurrency,
  activePeriod,
  coolingTimeout
});

manager.runTest();
