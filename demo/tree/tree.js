function geturl(url) {
	return new Promise(function(resolve, reject) {
		let xhr = new XMLHttpRequest();
		xhr.open("GET", url);
		xhr.onload = function() {
			if (this.status >= 200 && this.status < 300) {
				resolve(xhr.response);
			} else {
				reject({
					status: this.status,
					statusText: xhr.statusText
				});
			}
		};
		xhr.onerror = function() {
			reject({
				status: this.status,
			})
		}
		xhr.send();
	});
}

var tree = function(tree = [],base = ""){
	this.tree = tree;
	this.base = base;
}

tree.prototype.fileExist = function(path){
	if (this.tree.includes(path)) return true;
	else return false;
}

tree.prototype.getFilePath = function(path){
	if (this.fileExist(path)) return this.base+path;
	else throw new Error("File not found");;
}

tree.prototype.getFileContent = async function(path){
	let url = this.getFilePath(path);
	if (url) {
		return await geturl(url);
	} else {
		throw new Error("File not found");
	}
}

tree.prototype.filderDir = function(path){
	let dir = [];
	for (let i = 0; i < this.tree.length; i++) {
		if (this.tree[i].startsWith(path)) {
			let folder = this.tree[i].replace(path, "").split("/")[0];
			if (!dir.includes(folder)) dir.push(folder)
		}
	}
	return dir;
}

export { tree };