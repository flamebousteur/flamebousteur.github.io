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

function load(){
	f = [$_GET['f']]

	let n = 0
	let max = data[f]["photo"]
	let txt = '<a id="img1a"><img id="img1" width="300"></a>';
	function a(){
		if(max != n){
			n += 1
			txt = txt + '<a href="zip/'+$_GET['f']+'/img/'+n+'.png"><img alt="oups the image '+n+' can\'t charged" src="zip/'+$_GET['f']+'/img/'+n+'.png" width="300"></a>'
			a()
		}
		document.getElementById("galery").innerHTML = txt;
	}
	a()

	document.querySelector('meta[property="og:url"]').setAttribute("content","https://flamebousteur.github.io/file.html?f="+$_GET['f']);
	document.querySelector('meta[property="og:image"]').setAttribute("content","https://flamebousteur.github.io/img/zip/"+$_GET['f']+".png");
	document.querySelector('meta[property="og:description"]').setAttribute("content",type+"\n "+data[f]["desc"]);
	document.querySelector('meta[name="theme-color"]').setAttribute("content",data[f]["color"]);

	document.getElementById("title").innerHTML = "Flame Bousteur "+$_GET['f']+" : "+type;

	document.getElementById("type").innerHTML = data[f]["type"]+'\n';
	document.getElementById("desc").innerHTML = 'description:<br>'+data[f]["desc"];
	document.getElementById("descfr").innerHTML = 'fr:<br>'+data[f]["descfr"];
	document.getElementById("tele").style.backgroundImage = "url(\"img/zip/"+$_GET['f']+".png\")";
	document.getElementById("tele").style.borderBottom = "3px solid "+data[f]["color"]
	document.getElementById("download").href = "zip/"+$_GET['f']+"/"+$_GET['f']+".zip";

	document.getElementById("img1a").href = "img/zip/"+$_GET['f']+".png";
	document.getElementById("img1").src = "img/zip/"+$_GET['f']+".png";
}
