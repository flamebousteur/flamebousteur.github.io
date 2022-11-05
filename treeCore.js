// check nodeJS
var isNodeJS = (typeof module !== 'undefined' && module.exports);
if (isNodeJS) {
    const fs = require('node:fs');
    const path = require('node:path');
}

class treeCore {
    constructor (tree = []) {
        this.tree = tree;
        this.onNewTree = function() {};
    }

    getTree(base) {
        if (!isNodeJS) throw new Error("This function is only available in NodeJS");
        var files = fs.readdirSync(base);
        files.forEach(function(file) {
            var newbase = path.join(base, file);
            if (fs.statSync(newbase).isDirectory()) {
                if (!["node_modules", ".git"].includes(file)) getTree(newbase);
            } else {
                // change \\ to /
                this.tree.push("/"+newbase.replace(/\\/g, "/"));
                console.log(newbase);
            }
        });
    }

    setTree(tree) {
        this.tree = tree;
        this.onNewTree();
    }

    fileExists(file) {
        return this.tree.includes(file);
    }

    getFileContent(file) {
        if (!this.fileExists(file)) throw new Error("File does not exist");
        else return fetch(file).then(res => res.text());
    }

    readDir(dir) {
        if (!this.fileExists(dir)) throw new Error("Directory does not exist");
        else return this.tree.filter(file => file.startsWith(dir));
    }

    getFiles(selectors, from = 0, offset = this.tree.length) {
        // selector: string or array of strings
        // can contain * and ?
        // * matches any number of characters
        // ? matches any single character
        // from is the index to start from
        // offset is the number of files to return
        if (typeof selectors === "string") selectors = [selectors];
        var files = [];
        for (var i = 0; i < selectors.length && files.length < offset; i++) {
            var file = selectors[i];
            var regex = new RegExp("^"+file.replace(/\./g, "\\.").replace(/\*/g, ".*").replace(/\?/g, ".")+"$");
            for (var j = from; j < this.tree.length && files.length < offset; j++) if (regex.test(this.tree[j])) files.push(this.tree[j]);
        }
        return files;
    }

    getImages() {
        return this.getFiles([
            "*.png",
            "*.jpg",
            "*.jpeg",
            "*.gif",
            "*.svg",
            "*.webp",
            "*.bmp",
            "*.ico",
            "*.tiff",
            "*.tif",
        ]);
    }
}

/*
var ntree = new tree([]);
ntree.getTree("./");
fs.writeFileSync("tree.json", JSON.stringify(ntree.tree));
*/

if (isNodeJS) module.exports = treeCore;
else window.treeCore = treeCore;