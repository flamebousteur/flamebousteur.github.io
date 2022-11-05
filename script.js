const vertion = "3.0.0"
console.log('v'+vertion)

/* for the test */
// check nodeJS
var isNodeJS = (typeof module !== 'undefined' && module.exports);
if (isNodeJS) {
	const treeCore = require("./treeCore.js");
}

function $_GET(param) {
	var vars = {};
	window.location.href.replace( location.hash, '' ).replace(
		/[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
		function( m, key, value ) { // callback
			// decode the uri
			vars[decodeURIComponent(key)] = value !== undefined ? decodeURIComponent(value) : '';
		}
	);
	if ( param ) {
		return vars[param] ? vars[param] : null;	
	}
	return vars;
}

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

// cookie gestion
function setCookie(cname, cvalue, exdays = null) {
	var d = new Date();
	var expires = "";
	if (exdays != null) {
		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		expires = "expires="+ d.toUTCString() + ";";
	}
	document.cookie = cname + "=" + cvalue + ";" + expires + "path=/; secure; samesite=strict";
}

function getCookie(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for(var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return false;
}

function delCookie(cname = null) {
	if (cname == null) {
		// delete all cookie
		var cookies = document.cookie.split(";");
		for (var i = 0; i < cookies.length; i++) {
			var cookie = cookies[i];
			var eqPos = cookie.indexOf("=");
			var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
			document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
		}
	} else {
		// delete one cookie
		document.cookie = cname + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	}
}

var ntree = new treeCore()

//send a XMLHttpRequest
function send(url,msg){
	let xhr = new XMLHttpRequest();
	xhr.open("GET", url , true);
	xhr.send(msg);
}

/* end lib */
// statistics gestion
var stats = {
	indexLoaded: false,
	files: [],
	stat: true,
	statlink: statlink ? statlink : false,
	save: function(){
		setCookie("stats", JSON.stringify({file: this.files, indexLoaded: this.indexLoaded, stat: this.stat}))
	},
	load: function(){
		var stats = getCookie("stats")
		if (stats == false) return // no stats cookie
		stats = JSON.parse(stats)
		this.files = stats.file
		this.indexLoaded = stats.indexLoaded
		this.stat = stats.stat
	},
	download: function (f) {
		if (!this.stat) return
		send(this.statlink+"index.php?d=a&f="+f)
	},
	newFiles: function (f) {
		if (this.files.includes(f)) return
		this.files.push(f)
		if (!this.stat) return
		var _GET = $_GET()
		if(_GET['l']) send(this.statlink+"index.php?f="+f+"&l="+_GET['l'])
		else send(this.statlink+"index.php?f="+f)
		this.save()
	},
	loadIndex: function () {
		if (this.indexLoaded) return
		this.indexLoaded = true	
		this.save()
		if (!this.stat) return
		var _GET = $_GET()
		if(_GET['l']) send(this.statlink+"index.php?f=index&l="+_GET["l"])
		else send(this.statlink+"index.php?f=index")
	},
	noStats: function () {
		this.stat = false
		this.save()
	}
}
stats.load()

var load = {
	toload:0,
	toloadlogo:0,
	loaded:0,
	percent:0,
	onloadchange:function(){
		if (!document.querySelector(".chargementbar")) return
		// logo
		if (this.toloadlogo > this.loaded) this.logoload(true)
		else this.logoload(false)
		// percent
		if (this.toload > this.loaded){
			document.querySelector(".chargementbar").style.opacity = "1"
			this.percent = Math.round(this.loaded/this.toload*100)
			document.querySelector(".chargementbar").style.width = this.percent+"%"
		} else document.querySelector(".chargementbar").style.opacity = "0"
	},
	addl:function(n){
		this.toload += n
		this.onloadchange()
	},
	addld:function(n){
		this.loaded += n
		this.onloadchange()
	},
	logoload:function(start = false){
		if (!document.getElementById("loader")) return
		if (start) document.getElementById("loader").style.visibility = "visible";
		else document.getElementById("loader").style.visibility = "hidden";
	}
}

function setcard(url, contentElement = null, iframe = false, onclick = null, atr = {}){
	let type = url.split(".")[1]
	let card = document.createElement("card")
	let element;
	if (iframe == true) {
		element = document.createElement("iframe")
	} else if(type == "jpg" || type == "png" || type == "gif" || type == "jpeg" || type == "webp"){
		type = "img"
		element = document.createElement("img")
	} else if (type == "mp4" || type == "webm") {
		type = "video"
		element = document.createElement("video")
		if (Object.keys(atr).length > 0) {
			for (let i in atr) {
				element.setAttribute(i, atr[i])
			}
		}
	} else {
		return false
	}
	element.src = url
	if (onclick != null) {
		element.onclick = onclick
	}
	if (iframe == false && type == "img") {
		element.onloadstart = function(){
			load.addl(1)
		}
		element.onload = function(){
			load.addld(1)
		}
		element.onerror = function(){
			load.addld(1)
		}
	}
	card.appendChild(element)
	contentElement.appendChild(card)
	return card
}

var data = []
var pathname = location.pathname.split('/')
pathname = pathname.slice(1,pathname.length)
var stat = {}

const pages = {
	index:{
		txt:'<p id="up" align="center" style="background-image:url(\'/img/end portal hd.png\');background-size: cover;border-bottom:2px solid #162168;">'+
		'	<img src="/img/flamebousteur.png" width="50%" alt="FlameBousteur">'+
		'</p>'+
		'<nav>'+
		'	<ul>'+
		'		<li class="deroulant">'+
		'			<a>Social Media</a>'+
		'			<ul class="sous">'+
		'				<li><a href="https://www.youtube.com/channel/UCpb9cOY9nklRXTQEC6Jxctg" target="_blank">Youtube</a></li>'+
//		'				<li><a href="https://www.facebook.com/flame.bousteur" target="_blank">facebook</a></li>'+
//		'				<li><a href="https://twitter.com/flame65407614" target="_blank">twitter</a></li>'+
//		'				<li><a href="https://www.instagram.com/flameboff/" target="_blank">Instagrame</a></li>'+
		'				<li><a href="https://github.com/flamebousteur" target="_blank">GitHub</a></li>'+
//		'				<li><a href="https://discord.com/" target="_blank">Discord server</a></li>'+
		'				<li><a href="https://www.planetminecraft.com/member/flamebousteur/" target="_blank">planet minecraft</a></li>'+
		'			</ul>'+
		'		</li>'+
		'		<li class="deroulant">'+
		'			<a>creation</a>'+
		'			<ul class="sous" id="type">'+
		'			</ul>'+
		'		</li>'+
		'	</ul>'+
		'</nav>'+
		'<div id="dp-map"></div>'+
		'<br>',
	}
}

function downloadfile (f) {
	stats.download(f)
	if(data.files[f]) window.open('/zip/'+f+'/'+f+'.zip', '_blank')
}

function loadfile(f){
	stats.newFiles(f)
	document.title = "Flame Bousteur - "+f;
	if (data.files[f] == undefined) return false
	// reset the page
	document.getElementById("divpage").innerHTML = ""
	// generate the html
	let header = document.createElement("div")
	header.className = "fileheader"
	let back = document.createElement("a")
	back.innerHTML = "back"
	back.setAttribute("onclick","loadindex()")
	header.appendChild(back)
	let download = document.createElement("span")
	if (data.files[f].download) {
		download.innerHTML += "download: "
		download.className = "dl"
		download.onclick = () => downloadfile(f)
	}
	download.innerHTML += f
	header.appendChild(download)
	document.getElementById("divpage").appendChild(header)
	let datae = document.createElement("div")
	let dataie = document.createElement("div")
	datae.className = "filedata"
	dataie.innerHTML += data.files[f].type
	if (data.files[f].primg != undefined) imgurl = data.files[f].primg
	else if (data.files[f].images && data.files[f].images[0]) imgurl = data.files[f].images[0]
	else imgurl = "/img/zip/"+f+".png"
	datae.style.backgroundImage = "url('"+imgurl+"')"
	dataie.innerHTML += '<a onclick="navigator.clipboard.writeText(\'https://flamebousteur.github.io/?f='+f+'\')">copy link</a>'
	if (data.files[f].desc != undefined) dataie.innerHTML += '<span class="desc">'+data.files[f].desc+"</span>"
	datae.appendChild(dataie)
	document.getElementById("divpage").appendChild(datae)
	let color = document.createElement("div")
	color.className = "filecolor"
	if (typeof data.files[f].color == "string") {
		color.style.backgroundColor = data.files[f].color
	} else if (Array.isArray(data.files[f].color)) {
		color.style.background = "linear-gradient(to right, "+data.files[f].color.join(", ")+")"
	}
	document.getElementById("divpage").appendChild(color)
	if (stat.files && stat.files[f]) {
		let stats = document.createElement("div")
		stats.className = "stats"
		stats.innerHTML += stat.files[f].view+' views / '+stat.files[f].dowload+' downloads'
		dataie.appendChild(stats)
	}
	let content = document.createElement("div")
	content.className = "content"
	if (data.files[f].embed) {
		setcard(data.files[f].embed, content, true)
	}
	if (data.files[f].video) {
		for (let i = 0; i < data.files[f].video.length; i++) {
			setcard(data.files[f].video[i], content, false, null, {controls:true, autoplay:true})
		}
	}
	let tp = "";
	if (data.files[f]['primg']){
		tp = data.files[f]['primg']
	} else if (data.files[f].images && data.files[f].images[0]) {
		tp = false
	} else {
		tp = '/img/zip/'+f+'.webp'
	}
	if (tp != false) setcard(tp, content, false, function(){window.location=tp})
	if (data.files[f].photo) {
		for (let i = 1; i <= data.files[f].photo; i++) {
			setcard('/zip/'+f+'/img/'+i+'.png', content, false, function(){window.location="/zip/"+f+"/img/"+i+".png"})
		}
	}
	if (data.files[f].images) {
		for (let i = 0; i < data.files[f].images.length; i++) {
			setcard(data.files[f].images[i], content, false, function(){window.location=data.files[f].images[i]})
		}
	}
	document.getElementById("divpage").appendChild(content)
	history.pushState(null, null, "?f="+f)
	return true
}

function loadgalries(low, str, off){
	let limit = true
	if (off == undefined) {
		off = 10
		limit = false
	}
	document.title = "Flame Bousteur - galeries";
	let divp = document.getElementById("divpage")
	divp.innerHTML = ""
	let header = document.createElement("div")
	header.className = "fileheader"
	let back = document.createElement("a")
	back.innerHTML = "back"
	back.setAttribute("onclick","loadindex()")
	header.appendChild(back)
	let download = document.createElement("span")
	download.innerHTML += "galeries"
	header.appendChild(download)
	divp.appendChild(header)
	let content = document.createElement("div")
	content.style.display = "flex"
	divp.appendChild(content)
	let button = document.createElement("button")

	if (low) {
		content.style.display = "block"
	}

	let loaded = 0
	let load = function(start = str, offset = off) {
		let images = ntree.getFiles(["*.png", "*.jpg", "*.jpeg", "*.webp"], start, offset)
		for (let i = 0; i < images.length; i++) {
			if (!low) {
				content.className = "content"
				let card = setcard(images[i], content, false, function(){window.location=images[i]})
				if (!card) continue
				let span = document.createElement("span")
				span.innerHTML = images[i]
				card.className = "scard"
				card.appendChild(span)
				content.appendChild(card)
			} else {
				let c = document.createElement("a")
				c.setAttribute("href", images[i])
				c.style.display = "block"
				let img = document.createElement("img")
				img.src = images[i]
				img.width = 300
				let span = document.createElement("span")
				span.innerHTML = images[i]
				c.appendChild(img)
				c.appendChild(span)
				content.appendChild(c)
			}
			loaded++
		}
		if (images.length < offset) {
			button.style.display = "none"
		}
	}
	if (ntree.tree.length != 0) {
		let o = (off <= 10) ? off : 10
		if (off == "all") off = o = ntree.tree.length
		load(str, o)
	}
	
	ntree.onNewTree = () => {
		let o = (off <= 10) ? off : 10
		if (off == "all") off = o = ntree.tree.length
		load(str, o)
	}

	// if the user click on button, load 10 more images
	button.innerHTML = "load more"
	button.onclick = function() {
		load(loaded, 20)
	}
	divp.appendChild(button)
}

var types = {}
function loadindex(){
	document.title = "Flame Bousteur";
	history.pushState(null, null, "/")
//	types = {}
	/*
	<card>
		<!-- IMG -->
		<img src="https://flamebousteur.github.io/img/zip/enchanting%20table.png">

		<!-- OR VIDEO -->
		<video src="https://flamebousteur.github.io/video/rid'aire.mp4" autoplay loop></video>

		<!-- THE TEXT -->
		<span>test</span>
	</card>
	*/
	document.getElementById("divpage").innerHTML = pages.index.txt
	if (Object.keys(types).length === 0) {
		for (const key in data.files) {
			if (data.files[key].hidden && data.files[key].hidden == true) continue
			let typ = data.files[key]['type']
			if(types[typ] == undefined){
				types[typ] = document.createElement("div")
			}
			let card = document.createElement("card")
			card.className = "scard"
			let img = document.createElement("img")
			img.alt = key
			if (data.files[key]['primg']){
				img.src = data.files[key]['primg']
			} else if (data.files[key].images && data.files[key].images[0]) {
				img.src = data.files[key].images[0]
			} else {
				img.src = '/img/zip/'+key+'.webp'
			}
			img.onloadstart = function(){
				load.addl(1)
			}
			img.onload = function(){
				load.addld(1)
			}
			img.onerror = function(){
				load.addld(1)
			}
			card.appendChild(img)
			card.innerHTML += '<span>'+key+'</span>'
			card.setAttribute("onclick","loadfile('"+key+"')")
			types[typ].appendChild(card)
		}
	}
	n = 1
	for (const key in types) {
		// generate creation types list in navbar
		document.getElementById("dp-map").innerHTML += '<span id="type'+key+'" class="typename">'+key+'</span>'
		document.getElementById("dp-map").appendChild(types[key])
		let li = document.createElement("li")
		let a = document.createElement("a")
		a.innerHTML = key
		li.appendChild(a)
		document.getElementById("type").appendChild(li)
		a.onclick = function(){
			// scrol to the dp-map
			document.getElementById("type"+key).scrollIntoView({behavior: 'smooth'})
			// change url
			history.pushState(null, null, "#type"+key)
		}
		n++
	}
}

function Particl(canvasEle, {color: colors = [], maxParticles = 50, MaxSpeed = 5, globalSpeed = 0} = {}) {
	let ctx = canvasEle.getContext("2d")
	// partciles start from the center right of the canvas and go to the left and random height
	let particles = []
	let generatedParticles = 0
	let width = canvasEle.width
	let height = canvasEle.height
	let end = 0

	let add = function() {
		let x = width
		let y = height / 2
		let size = Math.random() * 5 + 1
		let speed = Math.random() * MaxSpeed + 1
		let ydirection = Math.random() * 2 - 1
		let color
		if (colors.length > 0) color = colors[Math.floor(Math.random() * colors.length)]
		// random color
		else color = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`
		particles.push({x, y, size, speed, color, ydirection})
		generatedParticles++
	}

	let draw = function() {
		ctx.clearRect(0, 0, width, height)
		for (let i = 0; i < particles.length; i++) {
			ctx.beginPath()
			ctx.arc(particles[i].x, particles[i].y, particles[i].size, 0, Math.PI * 2)
			ctx.fillStyle = particles[i].color
			ctx.fill()
		}
	}

	let update = function() {
		for (let i = 0; i < particles.length; i++) {
			particles[i].x -= particles[i].speed + globalSpeed
			particles[i].y += particles[i].ydirection
			particles[i].ydirection += Math.random() * 0.2 - 0.1
			if (particles[i].x < 0) {
				particles.splice(i, 1)
			}
		}
		// end of the animation
		if (end == 1) if (particles.length == 0) end = 2
	}

	let loop = function() {
		draw()
		update()
		if (end != 2) requestAnimationFrame(loop)
	}

	let reset = () => {
		particles = []
		end = 0
		generatedParticles = 0
		loop()
	}

	let init = function(mx = maxParticles) {
		loop()
		// add new particles every 10ms and stop when if there is 100 particles
		let interval = setInterval(function() {
			if (generatedParticles < mx) {
				add()
			} else {
				end = 1
				clearInterval(interval)
			}
		}, 10)
	}

	let setGlobalSpeed = speed => globalSpeed = speed

	return { init, stop, reset, add, draw, update, loop, setGlobalSpeed}
}

/*dev stat function =======================================================*/

function devstatimg(d){
	document.getElementById('dt').innerHTML = '';
	for (const element in stat["files"][d]["web-site"]) 
		document.getElementById('dt').innerHTML += element+' : '+stat["files"][d]["web-site"][element]+'<br>';
	document.getElementById('dtd').innerHTML = 'view: '+stat["files"][d]["view"]+' | dowload: '+stat["files"][d]["dowload"]
}

function devstat(){
	statpage = `<table style="background-color: #fff">
	<td>
		<table id="stat">
			<thead>
				<tr>
					<td></td>
					<td>view</td>
					<td>dowload</td>
				</tr>
			</thead>
		</table>
	</td>
	<td>
		<table>
			<tr id="dt"></tr>
			<tr id="dtd"></tr>
		</table>
</table>`;
	document.body.innerHTML = statpage;

	for (const element in stat["files"]) {
		txt = document.getElementById('stat').innerHTML
		txt = txt + '<tr onmouseover="devstatimg(\''+element+'\')"><td>'+element+'</td><td>'+stat["files"][element]["view"]+'</td><td>'+stat["files"][element]["dowload"]+'</td></tr>'
		document.getElementById('stat').innerHTML = txt
	}
}

window.addEventListener("load", async function () {
	load.addl(2,1)
	data = JSON.parse(await geturl("/data.json"))
	load.addld(1)
	let parm = $_GET()
	if (parm["a"]) {
		switch (parm["a"]) {
			case 'nostat':
				stats.noStats()
				console.log("stats stop")
				break;
		}
	}
	switch (pathname[0]) {
		case "files":
			loadfile(pathname[1])
			break;
		case "galrie":
			loadgalries((parm["low"] ? true : false), (parm["str"] ? parm["str"] : 0), (parm["off"] ? parm["off"] : undefined))
			break;
		case "stat":
			devstat()
			break;
		default:
			if(parm['f'] && data.files[parm['f']]){
				loadfile(parm['f']);
			}else{
				loadindex()
			}
			break;
	}
	stats.loadIndex()
	document.querySelector("html").className = 'ready'
	ntree.setTree(JSON.parse(await geturl("/tree.json")))
	load.addld(1)
	// get last creation in data
	let last = Object.keys(data.files)[0]
	let lastc = document.createElement("span")
	lastc.innerHTML = 'sea my last creation : '+last
	lastc.className = "lastc"
	lastc.onclick = () => {
		loadfile(last)
		lastc.remove()
	}
	// confettis
	let confettis = document.createElement("canvas")
	confettis.id = "confettis"
	confettis.width = window.innerWidth / 2
	confettis.height = 100
	confettis.style.pointerEvents = "none"
	let part = Particl(confettis) 
	let isMouseHover = false
	lastc.onmouseover = () => {
		isMouseHover = true
		part.setGlobalSpeed(0.5)
		part.reset()
		let interval = setInterval(function() {
			// add new particles every 10ms and stop when the user stop the mouse over
			if (isMouseHover) part.add()
			else clearInterval(interval)
		}, 10)
	}
	lastc.onmouseout = () => {
		isMouseHover = false
		part.setGlobalSpeed(0)
	}
	lastc.appendChild(confettis)
	document.body.appendChild(lastc)
	part.init()
//	stat = JSON.parse(await geturl("https://www.fjmessgeraete.ch/59d71404-d59e-11eb-b8bc-0242ac130003/Lucas/stat.json"))
})

// if the user go back in history load the index page
window.addEventListener("popstate", loadindex)