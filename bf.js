const bf = {
    stack: [],
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
        bf.stack = [];
        bf.out = "";
        let i = 0;

        while ( i < code.length) {
            const c = code[i];

            //console.log(i,bf.p,c,bf.mem[bf.p],bf.out)

            if(c == ">"){bf.p = (bf.p+1+32768) % 32768}
            if(c == "<"){bf.p = (bf.p-1+32768) % 32768}

            if(c == "+"){bf.mem[bf.p] = (bf.mem[bf.p]+1+256)%256}
            if(c == "-"){bf.mem[bf.p] = (bf.mem[bf.p]-1+256)%256}

            if(c == "."){bf.out += String.fromCharCode(bf.mem[bf.p])}

            if(c == "["){if(bf.mem[bf.p]!=0){bf.stack.push(i)}else {let depth = 1;while (depth > 0 && ++i < code.length) {if (code[i] == "[") depth++;if (code[i] == "]") depth--;}}}
            if(c == "]"){if(bf.mem[bf.p]!=0){i = bf.stack[bf.stack.length-1]}else{bf.stack.pop()}}

            i++
        }
    }
}

module.exports = bf;