function findex(list) {
	let result = [];
	for (let[key,value] of Object.entries(list)) {
		result.push(key);
	}
	return result;
}

function nostat(){
	if($_COOKIE()["stat"]){
		document.cookie = 'stat=no; secure; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
		console.log('cookies stop')
	}else{
		document.cookie = 'stat=no; secure;'
		console.log('cookies on')
	}
}

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

function murl(url){
	history.pushState("", "", url)
}

function copi(txt){
	navigator.clipboard.writeText(txt)
	msg("copy to clipboard")
}

var msgpage =
'<div>'+
'	<div id="msg">msg</div>'+
'</div>';

function msg(txt,time){
	if(txt == ''){
		txt = 'undefined'
	}
	if(typeof time != 'undefined'){
		time = time * 1000
	}else{
		time = 1000
	}
	let msg = document.getElementById("msg")
	msg.style.opacity = "1";
	msg.innerHTML = txt
	window.setTimeout(msgp, time);		
	function msgp(){
		document.getElementById("msg").style.opacity = "0";
	}
}