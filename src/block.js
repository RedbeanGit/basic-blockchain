const SHA256 = require('crypto-js/sha256');
const { DEFAULT_DIFFICULTY, MINE_RATE } = require('./config');

class Block {
  constructor(timestamp, lastHash, hash, difficulty, nonce, data) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.difficulty = difficulty;
    this.nonce = nonce;
    this.data = data;
  }

  toString() {
    return `Block -
      Timestamp : ${this.timestamp}
      Last Hash : ${this.lastHash.substring(0, 10)}
      Hash      : ${this.hash.substring(0, 10)}
      Nonce     : ${this.nonce}
      Difficulty: ${this.difficulty}
      Data      : ${this.data}`;
  }

  static genesis() {
    const timestamp = 'Genesis time';
    const lastHash = '';
    const nonce = 0;
    const data = '';
    const hash = Block.hash(
      timestamp,
      lastHash,
      DEFAULT_DIFFICULTY,
      nonce,
      data
    );
    return new this(timestamp, lastHash, hash, DEFAULT_DIFFICULTY, nonce, data);
  }

  static hash(timestamp, lastHash, difficulty, nonce, data) {
    return SHA256(
      `${timestamp}${lastHash}${difficulty}${nonce}${data}`
    ).toString();
  }

  static mineBlock(lastBlock, data) {
    const timestamp = Date.now();
    const lastHash = lastBlock.hash;
    const difficulty = Block.adjustDifficulty(lastBlock, timestamp);
    let nonce = 0;
    let hash = '';

    do {
      hash = Block.hash(timestamp, lastHash, nonce, data);
      nonce++;
    } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));

    console.log('Found hash: ', hash);

    return new Block(timestamp, lastHash, hash, difficulty, nonce - 1, data);
  }

  static blockHash(block) {
    const { timestamp, lastHash, difficulty, nonce, data } = block;
    return Block.hash(timestamp, lastHash, difficulty, nonce, data);
  }

  static adjustDifficulty(lastBlock, currentTime) {
    let { difficulty } = lastBlock;
    difficulty =
      lastBlock.timestamp + MINE_RATE > currentTime
        ? difficulty + 1
        : Math.max(difficulty - 1, 0);
    return difficulty;
  }
}

module.exports = Block;
