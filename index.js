const express = require('express');
const app = express();
const http = require('http');
const bodyParser = require('body-parser');
const composeAPI = require('@iota/core');
app.use(bodyParser.urlencoded({
    extended: true
}));
const server = http.createServer(app);
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

const iota = composeAPI.composeAPI({
    provider: 'https://nodes.devnet.iota.org:443'
});

app.get('/', function (req, res) {
    res.send('iota core apis!!!')
});

app.get('/balances/:address', async function (req, res) {
    try {
        const { balances } = await iota.getBalances([req.params.address])
        res.send({ balances })
    } catch (err) {
        res.status(400).send({
            message: err.message
        })
    }
});

app.get('/transactions/:address', async function (req, res) {
    try {
        const transactions = await iota.findTransactionObjects({ addresses: [req.params.address] })
        res.send({ transactions })
    } catch (err) {
        res.status(400).send({
            message: err.message
        })
    }
});

server.listen(process.env.PORT || 3000, function () {
    console.log('listening on *:3000');
});