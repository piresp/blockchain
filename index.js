const crypto = require('crypto');

class Block {
  constructor(index, previousHash, timestamp, data, hash) {
    this.index = index;
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.data = data;
    this.hash = hash;
  }
}

const calculateHash = (index, previousHash, timestamp, data) => {
  return crypto.createHash('sha256').update(index + previousHash + timestamp + data).digest('hex');
};

const createGenesisBlock = () => {
  const timestamp = Date.now();
  return new Block(0, "0", timestamp, "Galinha pintadinha", calculateHash(0, "0", timestamp, "Galinha pintadinha"));
};

const createNewBlock = (data) => {
  const lastBlock = blockchain[blockchain.length - 1];
  const index = lastBlock.index + 1;
  const timestamp = Date.now();
  const hash = calculateHash(index, lastBlock.hash, timestamp, data);
  return new Block(index, lastBlock.hash, timestamp, data, hash);
};

const isValidChain = (blockchainToValidate) => {
  const genesisBlock = createGenesisBlock();

  if (blockchainToValidate[0].index !== genesisBlock.index ||
    blockchainToValidate[0].data !== genesisBlock.data ||
    blockchainToValidate[0].previousHash !== genesisBlock.previousHash) {
    return false;
  }

  for (let i = 1; i < blockchainToValidate.length; i++) {
    const currentBlock = blockchainToValidate[i];
    const previousBlock = blockchainToValidate[i - 1];

    if (currentBlock.previousHash !== previousBlock.hash) {
      return false;
    }

    if (currentBlock.hash !== calculateHash(currentBlock.index, currentBlock.previousHash, currentBlock.timestamp, currentBlock.data)) {
      return false;
    }
  }

  return true;
};

const blockchain = [createGenesisBlock()];

const user1 = {
  receivement: {
    cpf: "12312308u23u5",
    name: "John"
  },
  payment: {
    cpf: "41827584768596",
    name: "Lila"
  },
  amount: "234,32R$"
}

blockchain.push(createNewBlock(user1));
blockchain.push(createNewBlock(user1));
blockchain.push(createNewBlock(user1));
console.log(JSON.stringify(blockchain));
console.log(isValidChain(blockchain));
