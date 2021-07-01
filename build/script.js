const page =
'<div id="navigator">'+
'</div>'+
'<div id="afichage">'+
'	<div class="image">'+
'		<a id="himg"><img id="gimg" src=""></a>'+
'	</div>'+
'	<div id="description">'+
'	</div>'+
'</div>';

document.querySelector("body").innerHTML = page

let txt = ''
findex(data).forEach(element => {
	txt = txt + '<a onclick="load(\''+element+'\')">'+element+'</a>'
	document.getElementById("navigator").innerHTML = txt;
})

function load(a){
	if(data[a]){
		document.getElementById("description").innerHTML = data[a]["type"]+'<br><hr>'+data[a]["desc"];
		document.getElementById("gimg").src = './img/'+data[a]["img"]+'.png';
		document.getElementById("himg").href = './img/'+data[a]["img"]+'.png';
	}
}