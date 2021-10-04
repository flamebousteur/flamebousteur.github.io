console.log('v2.8.2')
console.log('last modification type: patch')
console.log('last modification description: patch in case of faster connection and modifacation of the statisic système')

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
		send(statlink+"index.php?f=index&l="+$_GET["l"])
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
'				<li><a href="https://discord.gg/nRyWMgzwzY" target="_blank">Discord server</a></li>'+
'				<li><a href="https://www.planetminecraft.com/member/flamebousteur/" target="_blank">planet minecraft</a></li>'+
'			</ul>'+
'		</li>'+
'		<li class="deroulant">'+
'			<a>minecraft</a>'+
'			<ul class="sous" id="type">'+
'			</ul>'+
'		</li>'+
'	</ul>'+
'</nav>'+
'<div id="dp-map" class="cr">'+
'</div>';

/* programe secondaire ============================================================*/

if(screen.width < 51){
	if(screen.width < 51){
		console.log("nano 🔍")
	}
}

function dloal(f){
	if(findex(data).includes(f)){
		window.location.href = '/zip/'+f+'/'+f+'.zip'
		if($_COOKIE()["stat"]){
			console.log('cookies stop')
		}else{
			send(statlink+"index.php?d=a&f="+f)
		}
	}
}

function load(f){
	if($_COOKIE()["v"] != f){
		if($_COOKIE()["stat"]){
			console.log('cookies stop')
		}else{
			document.cookie = 'v='+f+'; secure';
			console.log('page '+f+' charge')
			if($_GET['l']){
				send(statlink+"index.php?f="+f+"&l="+$_GET['l'])
			}else{
				send(statlink+"index.php?f="+f)
			}
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
	let types = [];
	findex(data).forEach(element=>{
		if(types.includes(data[element]['type'])){
		}else{
			types.push(data[element]['type'])
		}
	})

	types.forEach(element =>{
		let txt = '';
		let typ = element;
		type(typ).forEach(element =>{
			txt = '<a onclick="load(\''+element+'\')"><img alt="'+element+'" src="/img/zip/'+element+'.png" width="200"></a>'
			if(document.getElementById(typ)){
				document.getElementById(typ).innerHTML += txt;
			}else{
				document.getElementById("dp-map").innerHTML += '<div id="'+typ+'"><div class="in">'+typ+'</div>'+txt+'</div><br><hr>';
				document.getElementById("type").innerHTML += '<li><a href="#'+typ+'">'+typ+'</a></li>'
			}
		})
		txt = '';
	})
	murl(window.location.origin)
}

function loadjs(){
	console.log('last creation:'+findex(data)[0])

	if($_COOKIE()["stat"]){
		console.log('cookies stop')
	}else{
		if($_COOKIE()["index"]){
			console.log('cookies stop')
		}else{
			msg('by continuing on this site you accept statistics cookies',3);
			msg('en continuant sur ce site vous accepter des cookies de statistique',3)
		}
	}

	if(data[$_GET['f']]){
		load($_GET['f']);
	}else{
		pr()
	}

	news('sea my last creation : '+findex(data)[0],"load('"+findex(data)[0]+"')")

	if(screen.width < 402){
		document.getElementById("dp-map").style.textAlign = "center";
	}
}


window.onoffline = (event) => {
	msg('connection lost')
};

function devstatimg(d){
	document.getElementById('dt').innerHTML = '';
	findex(stat["files"][d]["web-site"]).forEach(element =>{
		document.getElementById('dt').innerHTML += element+' : '+stat["files"][d]["web-site"][element]+'<br>';
	})
	document.getElementById('dtd').innerHTML = 'view: '+stat["files"][d]["view"]+' | dowload: '+stat["files"][d]["dowload"]
}

function devstat(){
	statpage = '<table>'+
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
'			<tr id="dt"></tr>'+
'			<tr id="dtd"></tr>'+
'		</table>'+
'</table>';
	document.body.innerHTML = statpage;

	findex(stat["files"]).forEach(element =>{
		txt = document.getElementById('stat').innerHTML
		txt = txt + '<tr onmouseover="devstatimg(\''+element+'\')"><td>'+element+'</td><td>'+stat["files"][element]["view"]+'</td><td>'+stat["files"][element]["dowload"]+'</td></tr>'
		document.getElementById('stat').innerHTML = txt
	})
}
