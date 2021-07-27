function findex(list) {
	let result = [];
	for (let[key,value] of Object.entries(list)) {
		result.push(key);
	}
	return result;
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
