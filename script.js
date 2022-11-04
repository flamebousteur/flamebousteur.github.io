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

//html message
var flamebousteur_lib_msgs = []
var flamebousteur_lib_msg_on = true
function msg(txt,time){
	if(!document.getElementById("flamebousteur_lib_msg")){
		document.body.innerHTML = '<div id="flamebousteur_lib_msg">msg</div>'+document.body.innerHTML
	}
	if(typeof time != 'undefined'){
		time = time * 1000
	}else{
		time = 1000
	}
	flamebousteur_lib_msgs.push([txt,time])
	function msgb(){
		flamebousteur_lib_msg_on = false
		let msg = document.getElementById("flamebousteur_lib_msg")
		msg.style.opacity = "1";
		msg.innerHTML = flamebousteur_lib_msgs[0][0]
		window.setTimeout(msgp, flamebousteur_lib_msgs[0][1]);
		function msgp(){
			msg.style.opacity = "0";
			window.setTimeout(function() {
				flamebousteur_lib_msg_on = true;
				if(flamebousteur_lib_msgs[0]){
					msgb(flamebousteur_lib_msgs)
				}
			},1000)
			msg.innerHTML = ''
		}
		flamebousteur_lib_msgs.shift()
	}
	if(flamebousteur_lib_msg_on){
		msgb()
	}
}

/* end lib */

var load = {
	toload:0,
	toloadlogo:0,
	loaded:0,
	percent:0,
	onloadchange:function(){
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
var autorisation = {
	stat:true
}
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
	if(data.files[f]) window.location.href = '/zip/'+f+'/'+f+'.zip'
}

function loadfile(f){
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
	}
	download.innerHTML += f
	download.setAttribute("onclick","downloadfile('"+f+"')")
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
		stats.innerHTML += '<span>'+stat.files[f].view+' views</span> / <span>'+stat.files[f].dowload+' downloads</span>'
		document.getElementById("divpage").appendChild(stats)
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

function loadgalries(){
	document.title = "Flame Bousteur - galeries";
	document.getElementById("divpage").innerHTML = ""
	let header = document.createElement("div")
	header.className = "fileheader"
	let back = document.createElement("a")
	back.innerHTML = "back"
	back.setAttribute("onclick","loadindex()")
	header.appendChild(back)
	let download = document.createElement("span")
	download.innerHTML += "galeries"
	header.appendChild(download)
	document.getElementById("divpage").appendChild(header)
	let content = document.createElement("div")
	content.className = "content"
	for (let i = 0; i < data.galries.length; i++) {
		setcard(data.galries[i].primg, content, false, function(){window.location="?g="+i})
	}
	document.getElementById("divpage").appendChild(content)
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

window.addEventListener("load", async function () {
	load.addl(2,1)
	data = JSON.parse(await geturl("/data.json"))
	load.addld(1)
	let parm = $_GET()
	if (parm) {
		switch (parm["a"]) {
			case 'nostat':
				autorisation.stat = false
				break;
		}
	}
	switch (pathname[0]) {
		case "files":
			loadfile(pathname[1])
			break;
		case "galries":
			loadgalries()
			break;
		default:
			if(parm['f'] && data.files[parm['f']]){
				loadfile(parm['f']);
			}else{
				loadindex()
			}
			break;
	}
	document.querySelector("html").className = 'ready'
	tree = JSON.parse(await geturl("/tree.json"))
	load.addld(1)
//	stat = JSON.parse(await geturl("https://www.fjmessgeraete.ch/59d71404-d59e-11eb-b8bc-0242ac130003/Lucas/stat.json"))
})