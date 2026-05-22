const net = require('net');
const fs = require('fs');
const bf = require('./bf');

net.createServer((c) => {
    c.on('data',(d)=> {
        const dh = d.toString('hex');
        console.log(dh)
        bf.load(dh);
        bf.run(fs.readFileSync('./os.bf').toString())
        c.write(bf.out);
    })
}).listen(25565)