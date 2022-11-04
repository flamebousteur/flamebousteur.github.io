const fs = require('node:fs');
const path = require('node:path');

var tree = [];
function getTree(base) {
    var files = fs.readdirSync(base);
    files.forEach(function(file) {
        var newbase = path.join(base, file);
        if (fs.statSync(newbase).isDirectory()) {
            if (!["node_modules", ".git"].includes(file)) getTree(newbase);
        } else {
            // change \\ to /
            tree.push("/"+newbase.replace(/\\/g, "/"));
            console.log(newbase);
        }
    });
}

getTree("./");

// write to file tree.json
fs.writeFileSync("tree.json", JSON.stringify(tree));