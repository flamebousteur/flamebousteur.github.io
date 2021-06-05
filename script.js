console.log('v2.2.5')
console.log('last creation: modern-office')

var mod = "l"

const page1 =
'<a id="mod" onclick="mod()">change theme</a>'+
'<div style="margin-left:auto; margin-right:auto; width:6em;">'+
'	<span id="msg" class="msg">msg</span>'+
'</div>'+
'<p id="up" align="center" style="background-image:url(\'img/end portal hd.png\');background-size: cover;">'+
'	<img src="img/flamebousteur.png" width="100%" alt="a">'+
'</p>'+
'<nav>'+
'	<ul>'+
'		<li class="deroulant">'+
'			<a>Social Media</a>'+
'			<ul class="sous">'+
'				<li><a href="https://www.youtube.com/channel/UCpb9cOY9nklRXTQEC6Jxctg" target="_blank">Youtube</a></li>'+
'				<li><a href="https://www.instagram.com/flameboff/" target="_blank">Instagrame</a></li>'+
'				<li><a href="https://github.com/flamebousteur" target="_blank">GitHub</a></li>'+
'				<li><a onclick="copi(\'flamebousteur#5111\')">Discord: flamebousteur#5111</a></li>'+
'				<li><a href="https://www.planetminecraft.com/member/flamebousteur/" target="_blank">planet minecraft</a></li>'+
'			</ul>'+
'		</li>'+
'		<li class="deroulant">'+
'			<a>minecraft</a>'+
'			<ul class="sous">'+
'				<li>map</li>'+
'				<li><a onclick="load(\'floating-island\');" >floating island</a></li>'+
'				<li><a onclick="load(\'cove-in-minecraft\')">cove in minecraft</a></li>'+
'				<li><a onclick="load(\'wisard-tower\')">wisard tower</a></li>'+
'				<li><a onclick="load(\'modern-office\')">modern office</a></li>'+
'				<li>DataPack</li>'+
'				<li><a onclick="load(\'the-floor-is-lava\')">the floor is lava</a></li>'+
'				<li><a onclick="load(\'craftS+\')">CraftS+</a></li>'+
'				<li><a onclick="load(\'utility-item\')">utilitys item</a></li>'+
'				<li><a onclick="load(\'shield\')">sheld</a></li>'+
'				<li><a onclick="load(\'spawner-generator\')">spawner generator</a></li>'+
'			</ul>'+
'		</li>'+
'	</ul>'+
'</nav>'+
'<div id="dp-map" class="cr">'+
'	<a onclick="load(\'floating-island\')"><img alt="floating-island" src="img/zip/floating-island.png" width="200"></a>'+
'	<a onclick="load(\'cove-in-minecraft\')"><img alt="cove-in-minecraft" src="/img/zip/cove-in-minecraft.png" width="200"></a>'+
'	<a onclick="load(\'wisard-tower\')"><img alt="wisard-tower" src="img/zip/wisard-tower.png" width="200"></a>'+
'	<a onclick="load(\'modern-office\')"><img alt="modern-office" src="img/zip/modern-office.png" width="200"></a>'+
'	<br><hr><br>'+
'	<a onclick="load(\'the-floor-is-lava\')"><img alt="the-floor-is-lava" src="img/zip/the-floor-is-lava.png" width="200"></a>'+
'	<a onclick="load(\'craftS+\')"><img alt="craftS+" src="img/zip/craftS+.png" width="200"></a>'+
'	<a onclick="load(\'utility-item\')"><img alt="utility-item" src="img/zip/utility-item.png" width="200"></a>'+
'	<a onclick="load(\'shield\')"><img alt="Shield.png" src="img/zip/shield.png" width="200"></a>'+
'	<a onclick="load(\'spawner-generator\')"><img alt="spawner-generator" src="img/zip/spawner-generator.png" width="200"></a>'+
'</div>'+
'<footer>'+
'	<div align="center">Flamebousteur</div>'+
'	<a target="_blank" href="https://github.com/flamebousteur/flamebousteur.github.io">github</a>'+
'</footer>';

if(screen.width < 400){
	let dpmap = document.getElementById("dp-map");
	dpmap.style.textAlign = "center";
}

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

function load(f){
	const page2 =
'<a id="mod" onclick="mod()">change theme</a>'+
'<div style="margin-left:auto; margin-right:auto; width:6em;">'+
'	<span id="msg" class="msg">msg</span>'+
'</div>'+
'<h4><a style="cursor:pointer;" onclick="pr()">back</a></h4>'+
'<div class="tl" id="tele" style=\'background-image:url("img/zip/craftS+.png"); border-bottom: 3px solid '+data[f]["color"]+'\';>'+
'	<p style="text-align:right;">'+
'		<a href="zip/'+f+'/'+f+'.zip"><mark>'+
'			<img src="../../img/Nether_Star.gif" width="20">download'+
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
'<div id="galery">problèmes</div>';
	document.querySelector("body").innerHTML = page2
	document.querySelector("html").className = ''
	document.querySelector("body").className = 'bin'
	if(mod == "l"){
		document.querySelector('link[rel="stylesheet"]').setAttribute("href","black.css");
		mod = "b"
	}else{
		document.querySelector('link[rel="stylesheet"]').setAttribute("href","style.css");
		mod = "l"
	}

	let n = 0
	let max = data[f]["photo"]
	let txt = '<a id="img1a"><img id="img1" width="300"></a>';
	function a(){
		if(max != n){
			n += 1
			txt = txt + '<a href="zip/'+f+'/img/'+n+'.png"><img alt="oups Image '+n+' can\'t be loaded" src="zip/'+f+'/img/'+n+'.png" width="300"></a>'
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
	document.getElementById("tele").style.backgroundImage = "url(\"img/zip/"+f+".png\")";

	if(data[f]["video"]){
		document.getElementById("ifr").src = "https://www.youtube.com/embed/"+data[f]["video"];
		document.getElementById("ifr").style.position = "static"
		document.getElementById("ifr").style.visibility = "visible"
	}

	document.getElementById("img1a").href = "img/zip/"+f+".png";
	document.getElementById("img1").src = "img/zip/"+f+".png";
}
function pr(){
	function res(){
		document.querySelector("body").innerHTML = page1
		document.querySelector("html").className = 'index'
		document.querySelector("body").className = ''
		if(mod == "l"){
			document.querySelector('link[rel="stylesheet"]').setAttribute("href","black.css");
			mod = "b"
		}else{
			document.querySelector('link[rel="stylesheet"]').setAttribute("href","style.css");
			mod = "l"
		}
	}
	if(window.location.origin+'/' != window.location.href){
		if(navigator.onLine){
			window.location.href = window.location.origin
		}else{
			res()
		}
	}else{
		res()
	}
}

if(data[$_GET['f']]){
	load($_GET['f']);
}else{
	document.querySelector("body").innerHTML = page1
	document.querySelector("html").className = 'index'
	document.querySelector("html").className = ''
	if(mod == "l"){
		document.querySelector('link[rel="stylesheet"]').setAttribute("href","black.css");
		mod = "b"
	}else{
		document.querySelector('link[rel="stylesheet"]').setAttribute("href","style.css");
		mod = "l"
	}
}

window.onoffline = (event) => {
	msg('connection lost')
};

function mod(black){
	if(black){
		if(black == true){
			document.querySelector('link[rel="stylesheet"]').setAttribute("href","black.css");
			mod = "b"
		}else{
			document.querySelector('link[rel="stylesheet"]').setAttribute("href","style.css");
			mod = "l"
		}
	}else{
		if(mod == "l"){
			document.querySelector('link[rel="stylesheet"]').setAttribute("href","black.css");
			mod = "b"
		}else{
			document.querySelector('link[rel="stylesheet"]').setAttribute("href","style.css");
			mod = "l"
		}
	}
}
