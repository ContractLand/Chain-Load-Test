const bootstrap = require("trebuchet-bootstrap");
const VU = require("trebuchet-vu-eth");
const Web3 = require("web3");

const RPC = "http://localhost:8545";
const GRPC_URL = "localhost:50051";
class Actor extends VU {
  constructor(state) {
    const web3 = new Web3(RPC);
    const { privateKey } = web3.eth.accounts.create();
    super({
      privateKey,
      rpc: RPC,
      grpc: GRPC_URL
    });
  }
  
  async run() {
    // Request for some ether from the faucet
    await this.requestMinFund(Web3.utils.toWei("0.01", "ether"));

    const tx = {
      to: "0x3c7539cd57b7e03f722c3aeb636247188b25dcc4",
      value: Web3.utils.toWei("0.002", "ether"),
      gas: 21000
    };
    await this.signAndSendTransaction(tx);
    await this.signAndSendTransaction(tx);
    await this.signAndSendTransaction(tx);
  }
}


bootstrap(Actor);