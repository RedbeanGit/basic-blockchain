# Basic Blockchain in JavaScript with Express and WebSocket

This is a basic implementation of a blockchain using JavaScript, Express, and WebSocket.

## Requirements

- Node.js
- npm (comes with Node.js)

## Installation

1. Clone the repository

```bash
$ git clone https://github.com/RedbeanGit/basic-blockchain.git
```

2. Install dependencies

```bash
$ npm install
```

## Usage

1. Start the server

```bash
$ HTTP_PORT=<some port> P2P_PORT=<another port> PEERS=<websocket host 1>,<websocket host n> npm start
```

## Features

- Add blocks to the blockchain
- Verify the integrity of the blockchain
- Display the blocks in the blockchain
- Use WebSocket to broadcast new blocks to connected clients in real time
- Use HTTP server to create new blocks or get the blockchain
