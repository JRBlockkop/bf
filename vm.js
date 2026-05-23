const net = require('net');
const fs = require('fs');
const bf = require('./bf');

const server = net.createServer((c) => {
    c.on('error', (err) => {
        console.log('Socket error:', err.code || err.message);
    });

    c.on('data',(d)=> {
        const dh = d.toString('hex');
        console.log("[IN]",dh);
        bf.load(dh);
        bf.run(fs.readFileSync('./os.bf').toString());
        console.log("[OUT]",bf.out);
        c.write(bf.out);
    })
}).listen(25565)

server.on('error', (err) => {
    console.error('Server error:', err);
});;