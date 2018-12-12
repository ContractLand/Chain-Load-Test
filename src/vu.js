const bootstrap = require("trebuchet-bootstrap");
const VU = require("trebuchet-vu-eth");
const Web3 = require("web3");

const {abi, bytecode} = require("./token.json");

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
    // TX 1: Request for some ether from the faucet
    await this.requestMinFund(Web3.utils.toWei("0.1", "ether"));

    // TX 2: Send some ether to an address
    await this.signAndSendTransaction({
      to: "0x3c7539cd57b7e03f722c3aeb636247188b25dcc4",
      value: Web3.utils.toWei("0.002", "ether"),
      gas: 21000
    });

    // TX 3: Deploy a mintable token smart contract
    const contract = await this.deployContract(abi, bytecode.object, {
      gas: 3000000,
      gasPrice: 0
    });

    // TX 4: Mint some tokens
    await contract.tx.mint(this.account.address, "100000").send({
      from: this.account.address,
      gas: 3000000,
      gasPrice: 0
    });

    // TX 5: Send token to an address
    await contract.tx.transfer("0x3c7539cd57b7e03f722c3aeb636247188b25dcc4", "50000").send({
      from: this.account.address,
      gas: 3000000,
      gasPrice: 0
    });
  }
}


bootstrap(Actor);