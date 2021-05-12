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
	let desc = data[$_GET['f']]["desc"]
	let descfr = data[$_GET['f']]["descfr"]
	let type = data[$_GET['f']]["type"]
	let photo = data[$_GET['f']]["photo"]
	let color = data[$_GET['f']]["color"]

	document.querySelector('meta[property="og:url"]').setAttribute("content","https://flamebousteur.github.io/file.html?f="+$_GET['f']);
	document.querySelector('meta[property="og:image"]').setAttribute("content","https://flamebousteur.github.io/img/zip/"+$_GET['f']+".png");
	document.querySelector('meta[property="og:description"]').setAttribute("content",type+"\n "+desc);
	document.querySelector('meta[name="theme-color"]').setAttribute("content",color);

	document.getElementById("title").innerHTML = "Flame Bousteur "+$_GET['f']+" : "+type;

	document.getElementById("type").innerHTML = type+'\n';
	document.getElementById("desc").innerHTML = 'description:<br>'+desc;
	document.getElementById("descfr").innerHTML = 'fr:<br>'+descfr;
	document.getElementById("tele").style.backgroundImage = "url(\"img/zip/"+$_GET['f']+".png\")";

	document.getElementById("download").href = "zip/"+$_GET['f']+"/"+$_GET['f']+".zip";

	document.getElementById("img1a").href = "img/zip/"+$_GET['f']+".png";
	document.getElementById("img1").src = "img/zip/"+$_GET['f']+".png";
}
