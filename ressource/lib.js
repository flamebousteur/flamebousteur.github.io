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
var $_GET = $_GET()

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
var flamebousteur_lib_msgs = [["",0.001]]
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


//canvas-graph
function ggraf(data,canvasid){
	const xdata = data
	let graf = data

	let canvas = document.getElementById(canvasid)
	if(canvas.getContext){
		canvas.width = 1920;
		canvas.height = 1080;
		let ctx = canvas.getContext('2d');
		ctx.clearRect(0, 0, canvas.width, canvas.height)
		let ymin = graf[0][1]
		let xmin = graf[0][0]
		let ymax = graf[0][1]
		let xmax = graf[0][0]
		let n = 0
		graf.forEach(element =>{
			if(element[1] < ymin){
				ymin = element[1]
			}
			if(element[0] < xmin){
				xmin = element[0]
			}
			if(element[1] > ymax){
				ymax = element[1]
			}
			if(element[0] > xmax){
				xmax = element[0]
			}
			n++
		})
		ymax += 1
		ymin -= 5

		n = 0

		//
		graf.forEach(element =>{
			graf[n][1] = graf[n][1]-ymin
			graf[n][0] = (graf[n][0]-xmin)*canvas.width/(xmax-xmin)
			graf[n][1] = (graf[n][1])*canvas.height/ymax
			graf[n][1] = graf[n][1] - (graf[n][1]*2) + canvas.height
			n++
		})

		//graphique génération
		ctx.beginPath()
		ctx.lineWidth = 1
		ctx.moveTo(0,canvas.height-30)
		ctx.lineTo(canvas.width,canvas.height-30)
		ctx.strokeStyle = "#7a7a7a"
		ctx.stroke()
		for(n = 0;n < graf.length; n++){
			ctx.beginPath()
			ctx.arc(graf[n][0],graf[n][1], 10, 0, 2 * Math.PI)
			ctx.fillStyle = "#5dade2"
			ctx.fill()

			if(graf[n+1]){
				ctx.beginPath()
				ctx.lineWidth = 10
				ctx.moveTo(graf[n][0],graf[n][1])
				ctx.lineTo(graf[n+1][0],graf[n+1][1])
				ctx.strokeStyle = "#5dade2"
				ctx.stroke()
			}
		}
	}else{
		console.log('pb')
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

function htmlalert(htext,onc,himg){
	function htmlalertdel(){
		document.getElementById("flamebousteur_lib_htmlalert").innerHTML = ""
	}
	if(!document.getElementById("flamebousteur_lib_htmlalert")){
		document.body.innerHTML = document.body.innerHTML + '<div id="flamebousteur_lib_htmlalert"></div>'
	}
	if(himg){
		document.getElementById("flamebousteur_lib_htmlalert").innerHTML = "<div id='flamebousteur_lib_htmlalert_x'>X</div><div class='flamebousteur_lib_htmlalert' onclick="+onc+"><img src="+himg+"></img><div>"+htext+"</div></div>"
	}else{
		document.getElementById("flamebousteur_lib_htmlalert").innerHTML = "<div id='flamebousteur_lib_htmlalert_x'>X</div><div class='flamebousteur_lib_htmlalert' onclick="+onc+">"+htext+"</div>"
	}
	document.getElementById("flamebousteur_lib_htmlalert_x").onclick = htmlalertdel
}
