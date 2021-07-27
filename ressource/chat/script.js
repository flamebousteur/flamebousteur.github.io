var tchaton = false;
const tchatintt = 5000;
var tchatint = false;
var tchat = 0;
var tchatmaxmessage = 5
var notiredy = false
var notiok = false

//const statlink = "http://localhost:8081"
const statlink = "https://www.fjmessgeraete.ch/59d71404-d59e-11eb-b8bc-0242ac130003/Lucas"

function chec(){
	let xhr = new XMLHttpRequest();
	xhr.open("POST", statlink+"/chat/chat.php", true);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send();
}

function generatedtchat(json){
	document.getElementById("channel").innerHTML = ''
	for(let n = 0; n < tchatmaxmessage; n++ ){
		if(json[n]){
			let txt = document.getElementById("channel").innerHTML+'<div id="msg"><span class="mmsg">'+json[n]["msg"]+'</span><span class="tmsg">'+json[n]["time"]+'</span></div>';
			document.getElementById("channel").innerHTML = txt
		}
	}
	tchat = json.length;
}

function send(msg){
	if(tchaton == true){
		if(tchatint == true){
			let xhr = new XMLHttpRequest();
			if(msg){
				msg = msg
			}else{
				msg = document.getElementById("message").value
			}
			xhr.open("POST", statlink+"/chat/chat.php?m=in", true);
			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			xhr.send("msg="+msg);
			tchatint = false;
			notiredy = false
			setTimeout(function(){notiredy = true},1000)
			setTimeout(function(){tchatint = true},tchatintt);
		}
	}
}

function upchannel(){
	let xhr = new XMLHttpRequest();
	xhr.open("GET", statlink+"/chat/chat.php?m=out", true);
	xhr.onreadystatechange = function(){
		if (xhr.readyState==4 && xhr.status==200){
			let json = JSON.parse(xhr.responseText)
			if(json.length != tchat){
				generatedtchat(json)
				if(notiok && notiredy){
					let notif = new Notification("new message", {body: json[0]["msg"], icon: "https://flamebousteur.github.io/img/favicon.svg"});
				}
			}
		}
	}
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send();
	if(tchaton == true){
		setTimeout(upchannel,1000)
	}
}

function tchatactiv(){
	if(tchaton == false){
		tchaton = true
		upchannel()
		document.getElementById("tchatactiver").value = "desactive tchat"
		notiredy = false
		setTimeout(function(){notiredy = true},1000)
	}else{
		tchaton = false
		document.getElementById("tchatactiver").value = "active tchat"
	}
}

setTimeout(function(){tchatint = true},tchatintt)
setTimeout(function(){notiredy = true},1000)

Notification.requestPermission( function(status) {
	if(status == 'granted'){
		notiok = true
	}else{
		notiok = false
	}
})

document.body.innerHTML = document.body.innerHTML+'<a target="_blank" href="https://github.com/flamebousteur/flamebousteur.github.io/blob/main/ressource/chat/script.js">view source code on github</a>'
