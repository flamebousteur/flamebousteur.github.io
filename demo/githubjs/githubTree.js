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

var githubTree = function(user, repo, branch = "main") {
	this.user = user;
	this.repo = repo;
	this.branch = branch;
	this.tree = {};
	this.files = {};
/*
file = {
	"name": "complet url to content",
}
*/
}

var getTree = function(url) {
	return new Promise(async function(resolve) {
		let result = {};
		let tree = JSON.parse(await geturl(url)).tree
		for (let i = 0; i < tree.length; i++) {
			if (tree[i].type == "tree") {
				result[tree[i].path] = await getTree(tree[i].url);
			} else {
				result[tree[i].path] = tree[i].url;
			}
		}
		resolve(result);
	})
}

githubTree.prototype.readTree = async function(sha) {
	return await getTree("https://api.github.com/repos/" + this.user + "/" + this.repo + "/git/trees/" + sha);
}

githubTree.prototype.init = async function(branch = null) {
	if (branch == null) branch = this.branch;
	let result = JSON.parse(await geturl("https://api.github.com/repos/" + this.user + "/" + this.repo + "/git/refs/heads/" + branch));
	if (result.object) {
		if (result.object.url) {
			result = JSON.parse(await geturl(result.object.url));
			if (result.tree) {
				if (result.tree.url) {
					result = JSON.parse(await geturl(result.tree.url))
					this.tree = result.tree;
					this.files = await this.readTree(result.sha);
				}
			}
		} else {
			throw new Error("Not a git repo");
		}
	} else {
		throw new Error("Not found");
	}
}

// githubTree('flamebousteur','flamebousteur.github.io')

export { githubTree }