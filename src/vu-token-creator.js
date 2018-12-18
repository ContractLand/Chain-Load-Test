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
      grpc: GRPC_URL,
      ...state
    });
  }
  
  async run() {
    // TX 1: Request for some ether from the faucet
    await this.requestMinFund(Web3.utils.toWei("0.05", "ether"));

    // TX 2: Deploy a mintable token smart contract
    const contract = await this.deployContract(abi, bytecode.object, {
      gas: 3000000,
      gasPrice: 0
    });

    // TX 3: Mint some tokens
    await contract.tx.mint(this.account.address, "100000").send({
      from: this.account.address,
      gas: 3000000,
      gasPrice: 0
    });

    // TX 4: Contract call to verify balance
    const tokenMinted = await contract.tx.balanceOf(this.account.address).call();
    if(tokenMinted !== "100000") throw new Error("Tokens were not minted");

    // TX 5: Send token to an address
    await contract.tx.transfer("0x3c7539cd57b7e03f722c3aeb636247188b25dcc4", "50000").send({
      from: this.account.address,
      gas: 3000000,
      gasPrice: 0
    });

    // TX 6: Contract call to verify balance
    const tokenSent = await contract.tx.balanceOf("0x3c7539cd57b7e03f722c3aeb636247188b25dcc4").call();
    if(tokenSent !== "50000") throw new Error("Recipient did not receive the token");
  }
}

module.exports = Actor;