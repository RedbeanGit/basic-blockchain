const P2PServer = require('./p2p-server');
const Blockchain = require('./blockchain');
const HTTPServer = require('./http-server');

const blockchain = new Blockchain();
const p2pServer = new P2PServer(blockchain);
const httpServer = new HTTPServer(blockchain, p2pServer);

p2pServer.listen();
p2pServer.connectToPeers();

httpServer.listen();
