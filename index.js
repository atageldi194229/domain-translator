const dns = require('dns');
const v1 = require("./v1.json");
const fs = require("fs");

let count = 0;
let results = [];
for (let { domain } of v1.result.records) {
    dns.lookup(domain, (err, address, family) => {
        count++;

        if(err) return;
        
        results.push({ domain, address });

        // when done
        if (count !== v1.result.count) return;

        fs.writeFileSync("result.json", JSON.stringify(results));

        console.log("Successfully done.");
    });
}