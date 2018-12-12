# Trebuchet Box (Ethereum)

This box is configured to run a load test on a Ethereum network. It does so by running a virtual user that perform the following actions:

The virtual user's actions are defined in `src/vu.js`.

1. Obtain 0.1 ether from a faucet account
2. Send 0.002 ether to an account
3. Deploy a mintable token smart contract
4. Mint some token on the smart contract
5. Send 50000 tokens to an account

The default configuration for the load test has been set to the following:

The test runner configuration are defined in `src/runner.js`.

- Concurrent Virtual Users: 5
- Ramp Period: 5 sec
- Active Period: 55 sec
- Cooling Timeout: 10 sec

The report for the load test can be found in the `load_test_report` folder

You may use this repository to get started with using Trebuchet Framework to load test your private network. 

## Installation

1. Clone this repository
   
  ```bash
  git clone git@github.com:Trebuchet-Framework/Trebuchet-Box-Ethereum.git
  ```

2. Install dependencies
   
  ```bash
  cd trebuchet-box-ethereum
  npm install
  ```

3. Run a testnet OR Configure faucet
   
  Run a Ganache network:

  ```bash
  ganache-cli -b 2 -m "deputy apology card solution wage spot tray choice thing hollow peanut matrix"
  ```

  -or-

  Configure the faucet private key by editing the private key in `src/setup.js`.

4. Run the load test on your local ethereum node
   
  ```bash
  npm run test
  ```

5. Review the load test report
  
  ```bash
  open load_test_report/index.html
  ```

## Sample Report

![Sample Report](https://raw.githubusercontent.com/Trebuchet-Framework/Trebuchet/master/static/sample-report.png)
