const Blockchain = require('./blockchain');
const Block = require('./block');

describe('Blockchain', () => {
  let blockchain;

  beforeEach(() => {
    blockchain = new Blockchain();
    blockchain2 = new Blockchain();
  });

  it('starts with the genesis block', () => {
    expect(blockchain.chain[0]).toEqual(Block.genesis());
  });

  it('adds a new block', () => {
    const data = 'foo';
    blockchain.addBlock(data);

    expect(blockchain.chain[blockchain.chain.length - 1].data).toEqual(data);
  });

  it('validates a valid chain', () => {
    blockchain2.addBlock('foo');
    expect(Blockchain.isValidChain(blockchain2.chain)).toBe(true);
  });

  it('invdalidates a corrupted genesis block', () => {
    blockchain2.chain[0].data = 'corrupted';
    expect(Blockchain.isValidChain(blockchain2.chain)).toBe(false);
  });

  it('invalidates a corrupted chain', () => {
    blockchain2.addBlock('foo');
    blockchain2.chain[1].data = 'not foo';
    expect(Blockchain.isValidChain(blockchain2.chain)).toBe(false);
  });

  it('replace the chain with a valid chain', () => {
    blockchain2.addBlock('goo');
    blockchain.replaceChain(blockchain2.chain);
    expect(blockchain.chain).toEqual(blockchain2.chain);
  });

  it('does not replaces the chain with less than or equal chain', () => {
    blockchain.addBlock('foo');
    blockchain.replaceChain(blockchain2.chain);
    expect(blockchain.chain).not.toEqual(blockchain2.chain);
  });
});
