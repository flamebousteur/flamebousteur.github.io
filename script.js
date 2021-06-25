console.log('v2.6.1')
console.log('last creation: modern-office')

//import { data } from "data.js"

function findex(list) {
	let result = [];
	for (let[key,value] of Object.entries(list)) {
		result.push(key);
	}
	return result;
}

function nostat(){
	document.cookie = 'stat=no; secure'
}

const xhr = new XMLHttpRequest();
xhr.open("get", "https://www.fjmessgeraete.ch/59d71404-d59e-11eb-b8bc-0242ac130003/Lucas/index.php", true);
xhr.send();

function $_COOKIE(){
	let result = {}
	let c = document.cookie
	c = c.split('; ')
	c.forEach(element =>{
		let a = element.split('=')
		let key = a[0];
		let obj = {};
		obj[key] = a[1];
		result[key] = obj[key]
	})
	return result
}

function $_GET(param) {
	var vars = {};
	window.location.href.replace( location.hash, '' ).replace( 
		/[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
		function( m, key, value ) { // callback
			vars[key] = value !== undefined ? value : '';
		}
	);

	if ( param ) {
		return vars[param] ? vars[param] : null;	
	}
	return vars;
}
var $_GET = $_GET()

if(window.location.hostname != "flamebousteur.github.io" && window.location.hostname !="localhost"){
	console.log(window.location.hostname)
	let page0 =
'<head>'+
'	<title id="title">'+
'		Flame Bousteur'+
'	</title>'+
'	<meta charset="utf-8">'+
'	<meta name="description" content="Flame Bousteur Web-site">'+
'	<meta name="viewport" content="width=device-width, initial-scale=1.0">'+
'	<meta name="author" content="flamebousteur">'+
'	<meta property="og:title"		content="Flame Bousteur">'+
'	<meta property="og:type"		content="website">'+
'	<meta property="og:url"			content="https://flamebousteur.github.io">'+
'	<meta property="og:image"		content="https://flamebousteur.github.io/img/favicon.ico">'+
'	<meta property="og:description"	content="Flamebousteur\'s datapacks and creation">'+
'	<meta name="theme-color" content="#ffffff">'+
'	<link rel="icon" href="img/favicon.ico">'+
'	<link rel="stylesheet" href="https://flamebousteur.github.io/style.css">'+
'</head>'+
'<body>'+
'	<div style="background-color:white;">'+
'		a problem has occurred<br>'+
'		un problème est survenue'+
'	</div>'+
'</body>'

	document.querySelector("html").innerHTML = page0
}

function murl(url){
	history.pushState("", "", url)
}

function type(type){
	let index = findex(data)
	let result = []
	index.forEach(element => {
		if(data[element]['type'] == type){
			result.push(element)
		}
	})
	return result
}

const page1 =
'<div>'+
'	<div id="msg">msg</div>'+
'</div>'+
'<p id="up" align="center" style="background-image:url(\'https://flamebousteur.github.io/img/end portal hd.png\');background-size: cover;border-bottom:2px solid #162168;">'+
'	<img src="https://flamebousteur.github.io/img/flamebousteur.png" width="100%" alt="a">'+
'</p>'+
'<nav>'+
'	<ul>'+
'		<li class="deroulant">'+
'			<a>Social Media</a>'+
'			<ul class="sous">'+
'				<li><a href="https://www.youtube.com/channel/UCpb9cOY9nklRXTQEC6Jxctg" target="_blank">Youtube</a></li>'+
'				<li><a href="https://www.facebook.com/flame.bousteur" target="_blank">facebook</a></li>'+
'				<li><a href="https://twitter.com/flame65407614" target="_blank">twitter</a></li>'+
'				<li><a href="https://www.instagram.com/flameboff/" target="_blank">Instagrame</a></li>'+
'				<li><a href="https://github.com/flamebousteur" target="_blank">GitHub</a></li>'+
'				<li><a onclick="copi(\'flamebousteur#5111\')">Discord: flamebousteur#5111</a></li>'+
'				<li><a href="https://www.planetminecraft.com/member/flamebousteur/" target="_blank">planet minecraft</a></li>'+
'			</ul>'+
'		</li>'+
'		<li class="deroulant">'+
'			<a>minecraft</a>'+
'			<ul class="sous">'+
'				<li><a href="#map">map</a></li>'+
'				<li><a href="#dp">DataPack</a></li>'+
'			</ul>'+
'		</li>'+
'	</ul>'+
'</nav>'+
'<div id="dp-map" class="cr">'+
'	<div id="map">'+
'	</div><br><hr><br><div id="dp">'+
'	</div>'+
'</div>'+
'<footer>'+
'	<div align="center">Flamebousteur</div>'+
'	<a target="_blank" href="https://github.com/flamebousteur/flamebousteur.github.io">github</a>'+
'</footer>'

if(screen.width < 51){
	if(screen.width < 51){
		console.log("nano 🔍")
	}
}

function copi(txt){
	navigator.clipboard.writeText(txt)
	msg("copy to clipboard")
}

function msg(txt,time){
	if(txt == ''){
		var txt = 'undefined'
	}
	if(typeof time != 'undefined'){
		var time = time * 1000
	}else{
		var time = 1000
	}
	let msg = document.getElementById("msg")
	msg.style.opacity = "1";
	msg.innerHTML = txt
	window.setTimeout(msgp, time);		
	function msgp(){
		document.getElementById("msg").style.opacity = "0";
	}
	delete txt
	delete time
}

function dloal(f){
	if(findex(data).includes(f)){
		window.location.href = 'https://flamebousteur.github.io/zip/'+f+'/'+f+'.zip'
		xhr.open("get", "https://www.fjmessgeraete.ch/59d71404-d59e-11eb-b8bc-0242ac130003/Lucas/index.php?d=a&f="+f, true)
		xhr.send()
	}
}

function load(f){
	if($_COOKIE()["v"] != f){
		if($_COOKIE()["stat"]){
			console.log('cookies stop')
		}else{
			console.log('a')
			document.cookie = 'v='+f+'; secure';
			console.log('page charge '+f)
			xhr.open("get", "https://www.fjmessgeraete.ch/59d71404-d59e-11eb-b8bc-0242ac130003/Lucas/index.php?f="+f, true)
			xhr.send()
		}
	}
	const page2 =
'<div id="msg">msg</div>'+
'<h4><a style="cursor:pointer;" onclick="pr()">back</a></h4>'+
'<div class="tl" id="tele" style=\'background-image:url("https://flamebousteur.github.io/img/zip/craftS+.png"); border-bottom: 3px solid '+data[f]["color"]+'\';>'+
'	<p style="text-align:right;">'+
'		<a onclick="dloal(\''+f+'\')"><mark>'+
'			<img src="https://flamebousteur.github.io/img/Nether_Star.gif" width="20">download'+
'		</mark></a>'+
'		<br>'+
'		<a onclick="copi(\'https://flamebousteur.github.io/?f='+f+'\')">'+
'			<mark>copy link</mark>'+
'		</a>'+
'	</p>'+
'	<pre>'+
'<mark>'+data[f]["type"]+'\n</mark>'+
'<p>'+
'<mark>description:<br>'+data[f]["desc"]+'</mark>'+
'</p>'+
'<p>'+
'<mark>fr:<br>'+data[f]["descfr"]+'</mark>'+
'</p>'+
'	</pre>'+
'</div>'+
'<iframe id="ifr" src=""></iframe>'+
'<hr>'+
'<div id="galery">problèmes</div>'+
'<div id="data"></div>';
	document.querySelector("body").innerHTML = page2
	document.querySelector("html").className = ''

	let n = 0
	let max = data[f]["photo"]
	let txt = '<a id="img1a"><img id="img1" width="300"></a>';
	function a(){
		if(max != n){
			n += 1
			txt = txt + '<a href="https://flamebousteur.github.io/zip/'+f+'/img/'+n+'.png"><img alt="oups Image '+n+' can\'t be loaded" src="https://flamebousteur.github.io/zip/'+f+'/img/'+n+'.png" width="300"></a>'
			a()
		}
		document.getElementById("galery").innerHTML = txt;
	}
	a()

	document.querySelector('meta[property="og:url"]').setAttribute("content","https://flamebousteur.github.io/file.html?f="+f);
	document.querySelector('meta[property="og:image"]').setAttribute("content","https://flamebousteur.github.io/img/zip/"+f+".png");
	document.querySelector('meta[property="og:description"]').setAttribute("content",data[f]["type"]+"\n "+data[f]["desc"]);
	document.querySelector('meta[name="theme-color"]').setAttribute("content",data[f]["color"]);

	document.getElementById("title").innerHTML = "Flame Bousteur "+f+" : "+data[f]["type"];
	document.getElementById("tele").style.backgroundImage = "url(\"https://flamebousteur.github.io/img/zip/"+f+".png\")";

	if(data[f]["video"]){
		document.getElementById("ifr").src = "https://www.youtube.com/embed/"+data[f]["video"];
		document.getElementById("ifr").style.position = "static"
		document.getElementById("ifr").style.visibility = "visible"
	}

	document.getElementById("img1a").href = "https://flamebousteur.github.io/img/zip/"+f+".png";
	document.getElementById("img1").src = "https://flamebousteur.github.io/img/zip/"+f+".png";
	document.getElementById("data").innerHTML = "view: "+stat[f]["view"]+" | dowload: "+stat[f]["dowload"];
	murl("?f="+f)
}
function pr(){
	document.querySelector("body").innerHTML = page1
	document.querySelector("html").className = 'index'
	document.getElementById("title").innerHTML = "Flame Bousteur";
	let txt = '';
	type('map').forEach(element =>{
		txt = txt + '<a onclick="load(\''+element+'\')"><img alt="'+element+'" src="https://flamebousteur.github.io/img/zip/'+element+'.png" width="200"></a>'
		document.getElementById("map").innerHTML = txt;
	})
	txt = '';
	type('data pack').forEach(element =>{
		txt = txt + '<a onclick="load(\''+element+'\')"><img alt="'+element+'" src="https://flamebousteur.github.io/img/zip/'+element+'.png" width="200"></a>'
		document.getElementById("dp").innerHTML = txt;
	})
	murl(window.location.origin)
}

if(data[$_GET['f']]){
	load($_GET['f']);
}else{
	pr()
}

if(screen.width < 400){
	let dpmap = document.getElementById("dp-map");
	dpmap.style.textAlign = "center";
}

window.onoffline = (event) => {
	msg('connection lost')
};


if($_COOKIE()["stat"]){
	console.log('cookies stop')
}else{
	msg('by continuing on this site you accept statistics cookies',5);
	window.setTimeout(() => {
		msg('en continuant sur ce site vous accepter des cookies de statistique',5)
	},5500)
}
