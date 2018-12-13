const { join } = require("path");
const Manager = require("trebuchet-manager");

const SETUP_SCRIPT = join(__dirname, "./setup.js");
const VU_TOKEN_CREATOR = join(__dirname, "./vu-token-creator.js");
const VU_SENDER = join(__dirname, "./vu-sender.js");

const rampPeriod = 5000;
const concurrency = 5;
const activePeriod = 55000;
const coolingTimeout = 10000;

const manager = new Manager({
  reportPath: "load_test_report",
  setupScript: SETUP_SCRIPT,
  vuScript: [{
    name: "Token Creator",
    script: VU_TOKEN_CREATOR,
    weight: 1
  }, {
    name: "Ether Senders",
    script: VU_SENDER,
    weight: 2
  }],
  rampPeriod,
  concurrency,
  activePeriod,
  coolingTimeout
});

manager.runTest();
