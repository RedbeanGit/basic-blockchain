const express = require('express');
const bodyParser = require('body-parser');

const HTTP_PORT = process.env.HTTP_PORT || 3001;

class HTTPServer {
  constructor(blockchain, p2pServer) {
    this.blockchain = blockchain;
    this.p2pServer = p2pServer;
    this.app = express();
  }

  listen() {
    this.app.use(bodyParser.json());

    this.app.get('/blocks', (_req, res) => {
      res.json(this.blockchain.chain);
    });

    this.app.post('/mine', (req, res) => {
      const { data } = req.body;
      this.blockchain.addBlock(data);
      this.p2pServer.syncChains();
      res.json(this.blockchain.chain);
    });

    this.app.listen(HTTP_PORT, () => {
      console.log(`Listening on port ${HTTP_PORT}`);
    });
  }
}

module.exports = HTTPServer;
