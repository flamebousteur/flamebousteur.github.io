console.log('v2.7')
console.log('last creation:'+findex(data)[0])

function nostat(){
	if($_COOKIE()["stat"]){
		document.cookie = 'stat=no; secure; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
	}else{
		document.cookie = 'stat=no; secure;'
	}
}

if($_GET['a']){
	if($_GET['a'] == "nostat"){
		document.cookie = 'stat=no; secure;'
		console.log('cookies on')
	}
}
if($_COOKIE()["stat"]){
	console.log('cookies stop')
}else{
	if($_GET["l"]){
		send(statlink+"index.php?l="+$_GET["l"])
		console.log('ok')
	}
	if($_COOKIE()["index"]){
		console.log('page index already charge')
	}else{
		document.cookie = 'index=a; secure;';
		console.log('page index charge')
		send(statlink+"index.php?f=index")
	}
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
'<p id="up" align="center" style="background-image:url(\'/img/end portal hd.png\');background-size: cover;border-bottom:2px solid #162168;">'+
'	<img src="/img/flamebousteur.png" width="100%" alt="a">'+
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
'</div>';

/* programe secondaire ============================================================*/

news('sea my last creation : '+findex(data)[0],'load("'+findex(data)[0]+'")')

if(screen.width < 51){
	if(screen.width < 51){
		console.log("nano 🔍")
	}
}

function dloal(f){
	if(findex(data).includes(f)){
		window.location.href = '/zip/'+f+'/'+f+'.zip'
		send(statlink+"index.php?d=a&f="+f)
	}
}

function load(f){
	if($_COOKIE()["v"] != f){
		if($_COOKIE()["stat"]){
			console.log('cookies stop')
		}else{
			document.cookie = 'v='+f+'; secure';
			console.log('page '+f+' charge')
			send(statlink+"index.php?f="+f)
		}
	}
	murl("?f="+f)
	const page2 =
'<h4><a style="cursor:pointer;" onclick="pr()">back</a></h4>'+
'<div class="tl" id="tele"; border-bottom: 3px solid '+data[f]["color"]+'\';>'+
'	<p style="text-align:right;">'+
'		<a onclick="dloal(\''+f+'\')"><mark>'+
'			<img src="/img/Nether_Star.gif" width="20">download'+
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
'<mark id="link"></mark>'+
'	</pre>'+
'</div>'+
'<iframe id="ifr" src=""></iframe>'+
'<video id="video" src=""></video>'+
'<hr>'+
'<div id="data"></div>'+
'<div id="galery">problèmes</div>';
	document.getElementById("divpage").innerHTML = page2
	document.querySelector("html").className = ''

	let n = 0
	let max = data[f]["photo"]
	let txt = '<a id="img1a"><img id="img1" width="300"></a>';
	function a(){
		if(max != n){
			n += 1
			txt = txt + '<a href="/zip/'+f+'/img/'+n+'.png"><img alt="oups Image '+n+' can\'t be loaded" src="/zip/'+f+'/img/'+n+'.png" width="300"></a>'
			a()
		}
		document.getElementById("galery").innerHTML = txt;
	}
	a()

	document.querySelector('meta[property="og:url"]').setAttribute("content","/file.html?f="+f);
	document.querySelector('meta[property="og:image"]').setAttribute("content","/img/zip/"+f+".png");
	document.querySelector('meta[property="og:description"]').setAttribute("content",data[f]["type"]+"\n "+data[f]["desc"]);
	document.querySelector('meta[name="theme-color"]').setAttribute("content",data[f]["color"]);

	document.getElementById("title").innerHTML = "Flame Bousteur "+f+" : "+data[f]["type"];
	document.getElementById("tele").style.backgroundImage = "url(\"/img/zip/"+f+".png\")";

	if(data[f]["video"]){
		document.getElementById("video").src = data[f]["video"]
		document.getElementById("video").style.position = "static"
		document.getElementById("video").style.visibility = "visible"
	}

	if(data[f]["link"]){
		document.getElementById("link").innerHTML = '<a style="color:black;" href="'+data[f]["link"]+'">special link</a><br>'
	}

	if(data[f]["embed"]){
		document.getElementById("ifr").src = data[f]["embed"];
		document.getElementById("ifr").style.position = "static"
		document.getElementById("ifr").style.visibility = "visible"
	}

	document.getElementById("img1a").href = "/img/zip/"+f+".png";
	document.getElementById("img1").src = "/img/zip/"+f+".png";
	document.getElementById("data").innerHTML = "view: "+stat["files"][f]["view"]+" | dowload: "+stat["files"][f]["dowload"];
}

function pr(){
	document.getElementById("divpage").innerHTML = page1
	document.querySelector("html").className = 'index'
	document.getElementById("title").innerHTML = "Flame Bousteur";
	let txt = '';
	type('map').forEach(element =>{
		txt = txt + '<a onclick="load(\''+element+'\')"><img alt="'+element+'" src="/img/zip/'+element+'.png" width="200"></a>'
		document.getElementById("map").innerHTML = txt;
	})
	txt = '';
	type('data pack').forEach(element =>{
		txt = txt + '<a onclick="load(\''+element+'\')"><img alt="'+element+'" src="/img/zip/'+element+'.png" width="200"></a>'
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
	document.getElementById("dp-map").style.textAlign = "center";
}

window.onoffline = (event) => {
	msg('connection lost')
};

if($_COOKIE()["stat"]){
	console.log('cookies stop')
}else{
	msg('by continuing on this site you accept statistics cookies',3);
	msg('en continuant sur ce site vous accepter des cookies de statistique',3)
}


/*for dev*/
const pageStat =
'<table>'+
'	<td>'+
'		<table id="stat">'+
'			<thead>'+
'				<tr>'+
'					<td></td>'+
'					<td>view</td>'+
'					<td>dowload</td>'+
'				</tr>'+
'			</thead>'+
'		</table>'+
'	</td>'+
'	<td>'+
'		<table>'+
'			<tr><img id="dt"></tr>'+
'			<tr id="dtd"></tr>'+
'		</table>'+
'	</td>'+
'</table>';
function devstatimg(d){
	document.getElementById('dt').src = '/img/zip/'+d+'.png'
	document.getElementById('dtd').innerHTML = 'view: '+stat[d]["view"]+' | dowload: '+stat[d]["dowload"]
}
function devstat(){
	document.getElementById("divpage").innerHTML = pageStat
	document.querySelector("html").className = ''
	txt = document.getElementById('stat').innerHTML
	findex(stat).forEach(element =>{
		if(typeof(stat[element]["dowload"]) == 'undefined'){
			stat[element]["dowload"] = '-'
		}
		if(element == 'index'){
			txt = txt + '<tr><td>'+element+'</td><td>'+stat[element]["view"]+'</td><td>'+stat[element]["dowload"]+'</td></tr>'
		}else{
			txt = txt + '<tr onmouseover="devstatimg(\''+element+'\')"><td>'+element+'</td><td>'+stat[element]["view"]+'</td><td>'+stat[element]["dowload"]+'</td></tr>'
		}
		document.getElementById('stat').innerHTML = txt
	})
}
