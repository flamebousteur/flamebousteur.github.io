/*creat an Array with the 1st object of a json
{"a":1,"b":2} => ["a","b"]
*/
function findex(list) {
	let result = [];
	for (let[key,value] of Object.entries(list)) {
		result.push(key);
	}
	return result;
}

/*php $_COOKIE
change document.cookie in json
*/
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

//php $_GET
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

//change url
function murl(url){
	history.pushState("", "", url)
}

//copy clipboard
function copi(txt){
	navigator.clipboard.writeText(txt)
	msg("copy to clipboard")
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

//send a XMLHttpRequest
function send(url,msg){
	let xhr = new XMLHttpRequest();
	xhr.open("GET", url , true);
	xhr.send(msg);
}

//add div to show the news
var flamebousteur_lib_new = []
function news(txt,exec){
	if(txt){
		flamebousteur_lib_new.push([txt,exec])
	}
	if(!document.getElementById("flamebousteur_lib_new")){
		document.body.innerHTML = document.body.innerHTML + '<div id="flamebousteur_lib_new"></div>'
	}else{
		document.getElementById("flamebousteur_lib_new").innerHTML = ""
	}
	let n = 0
	flamebousteur_lib_new.forEach(element =>{
		document.getElementById("flamebousteur_lib_new").innerHTML += '<div id="flamebousteur_lib_new_'+n+'"><span style="cursor: pointer;font-weight: bold;text-decoration: underline;" onclick="'+flamebousteur_lib_new[n][1]+'">'+flamebousteur_lib_new[n][0]+'</span><span style="font-size: 12px;position: absolute; right:10px;cursor: pointer;" onclick="delnew(\''+n+'\')"> close</span></div>'
		n++
	})
}

function delnew(id){
	var top = document.getElementById("flamebousteur_lib_new");
	var nested = document.getElementById("flamebousteur_lib_new_"+id);
	var garbage = top.removeChild(nested)
	flamebousteur_lib_new.splice(id,1)
	news()
}

export { findex , $_COOKIE , $_GET , msg , send , news , delnew }