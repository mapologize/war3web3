const express = require("express");
const serverless = require("serverless-http");
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider(""));
const app = express();
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    hello: "hi hi!"
  });
});

router.get('/getsignature/:pkey/:hash', (req, res) => {

    const privateKey = req.params.pkey;
    const hashmes = req.params.hash;
    const sigObj = web3.eth.accounts.sign(hashmes, privateKey);
    res.send(sigObj.signature);
});

app.use(`/.netlify/functions/server`, router);

module.exports = app;
module.exports.handler = serverless(app);