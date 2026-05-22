const bf = {
    mem: Array(32768).fill(0),
    out: "",
    p: 0,
    load:(dh)=>{
        bf.mem = Array(32768).fill(0);
        bf.p = 0;
        for (let i = 0; i < dh.length; i++) {
            bf.mem[i] = Number('0x'+dh[2*i]+dh[2*i+1]);
        }
    },
    run: (code)=>{
        bf.out = "";
        
        for (let i = 0; i < code.length; i++) {
            const c = code[i];
            console.log(c);
            if(c == ">"){bf.p = (bf.p+1+32768) % 32768}
            if(c == "<"){bf.p = (bf.p-1+32768) % 32768}

            if(c == "+"){bf.mem[bf.p] = (bf.mem[bf.p]+1+256)%256}
            if(c == "-"){bf.mem[bf.p] = (bf.mem[bf.p]-1+256)%256}

            if(c == "."){bf.out += String.fromCharCode(bf.mem[bf.p])}
        }
    }
}

module.exports = bf;