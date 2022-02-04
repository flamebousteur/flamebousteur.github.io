console.log('v2.8.3')
console.log('last modification: modificasion for css')

if($_COOKIE()["lang"]){
	var deflang = $_COOKIE()["lang"]
}else{
	var deflang = navigator.language
	document.cookie = 'lang='+deflang+'; secure;'
}

function nostat(){
	document.cookie = 'stat=no; secure;'
	console.log('cookies stop')
}

function onstat(){
	document.cookie = 'stat=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
	console.log('cookies stop')
}

if($_GET['a']){
	if($_GET['a'] == "nostat"){
		nostat()
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
'				<li><a href="https://discord.com/" target="_blank">Discord server</a></li>'+
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
'<div id="dp-map">'+
'</div>';

/*dev stat function =======================================================*/

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


/* programe ============================================================*/

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
	let color,
		d = "",
		de = "",
		def = "";
	if(!data[f]["color"]){
		color = "#000"
	}
	if(data[f]["download"]){
		d = '<a onclick="dloal(\''+f+'\')"><mark><img src="/img/Nether_Star.gif" width="20">download</mark></a>';
	}
	if(data[f]["desc"]){
		de = '<mark>description:<br>'+data[f]["desc"]+'</mark>'
	}
	if(data[f]["descfr"]){
		def = '<mark>fr:<br>'+data[f]["descfr"]+'</mark>'
	}
	const page2 =
'<h4><a style="cursor:pointer;" onclick="pr()">back</a></h4>'+
'<div class="tl" id="tele"; border-bottom: 3px solid '+color+'\';>'+
'	<p style="text-align:right;">'+d+
'		<br>'+
'		<a onclick="copi(\'https://flamebousteur.github.io/?f='+f+'\')">'+
'			<mark>copy link</mark>'+
'		</a>'+
'	</p>'+
'	<pre>'+
'<mark>'+data[f]["type"]+'\n</mark>'+
'<p>'+de+
'</p>'+
'<p>'+def+
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
	let max = 0;
	if(data[f]["photo"]){
		max = data[f]["photo"]
	}
	let txt = '<a id="img1a"><img id="img1" width="300"></a>';
	function a(){
		if(max != n){
			n += 1
			txt = txt + '<a href="/zip/'+f+'/img/'+n+'.png"><img alt="oups Image '+n+' can\'t be loaded" src="/zip/'+f+'/img/'+n+'.png" width="300"></a>'
			// txt = txt + '<a href="/zip/'+f+'/img/'+n+'.webp"><img alt="oups Image '+n+' can\'t be loaded" src="/zip/'+f+'/img/'+n+'.webp" width="300"></a>'
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
	document.getElementById("tele").style.backgroundImage = "url(\"/img/zip/"+f+".webp\")";

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
			txt = '<div id="prlegent"><a onclick="load(\''+element+'\')"><span class="mask"></span><span id="prlegentin">'+element+'</span><img alt="'+element+'" src="/img/zip/'+element+'.webp" width="200"></a></div>'
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

function showimage(img){
	console.log(img)
	if(document.getElementById("showimage")){
		document.getElementById("showimageimg").alt = 'oups Image '+img+' can\'t be loaded'
		document.getElementById("showimageimg").src = '/zip/'+$_GET['f']+'/img/'+img+'.webp'
		document.getElementById("showimagedesc").innerHTML = 'image : '+img
	}else{
		document.getElementById("divpage").innerHTML += '<div id="showimage" style="position: fixed;top: 0;background-color: white;z-index: 9;">'+
'	<div>'+
'	<div style="left: 0;position: absolute;top: 50%;"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" opacity=".87"/><path d="M17.51 3.87L15.73 2.1 5.84 12l9.9 9.9 1.77-1.77L9.38 12l8.13-8.13z"/></svg></div>'+
'	<div style="text-align: center;"><img id="showimageimg" alt="oups Image '+img+' can\'t be loaded" src="/zip/'+$_GET['f']+'/img/'+img+'.webp" style="width: 90%;"></div>'+
'	<div style="right: 0;position: absolute;top: 50%;"><svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><path d="M0,0h24v24H0V0z" fill="none"/></g><g><polygon points="6.23,20.23 8,22 18,12 8,2 6.23,3.77 14.46,12"/></g></svg></div>'+
'	</div>'+
'	<div id="showimagedesc">image : '+img+
'	</div>'+
'</div>';
	}
}

function patpage(loc){
	let pat = {
		"hellow-world":"hellow world",
		"privacy":"None of your personal information is and will be used.<br>Cookies are only used to get information on the source of traffic of the site.<br>Thank you for your understanding",
		"confidentialite":"Aucune de vos informations personnelles n'est et ne sera utilisée.<br>Les cookies ne sont utilisés qu'à fin d'avoir des informations sur la source de trafic du site.<br>Merci de votre compréhension",
		"about":"hello this is FlameBousteur.<br>I'm a minecraft builder and coder"
	}

	if(findex(pat).includes(loc)){
		document.getElementById("divpage").innerHTML = '<a onclick="pr()">back</a><div style="text-align:center;">'+pat[loc]+"<div><br>"
		document.querySelector("html").className = 'index'
		document.getElementById("title").innerHTML = loc;
	}

	murl("/"+loc)
}

function loadjs(){
	if($_GET['d']){
		if($_GET['d'] == "devstat"){
			devstat()
		}
	}else{
		console.log('last creation:'+findex(data)[0])

		let loc = window.location.pathname.substring(1)

		if(loc != ""){
			patpage(loc)
		}else{
			if($_COOKIE()["stat"]){
				console.log('cookies stop')
			}else{
				if($_COOKIE()["index"]){
					console.log('page index already charge')
				}else{
					console.log("ok")
					if($_GET["l"]){
						send(statlink+"index.php?f=index&l="+$_GET["l"])
						console.log('ok')
					}
					msg("by continuing on this site you accept statistics cookies <a style='color:blue;text-decoration: underline;' onclick='patpage(\"privacy\")'>privacy</a>",3)
					if(deflang == "fr"){
						msg("en continuant sur ce site vous accepter des cookies de statistique <a style='color:blue;text-decoration: underline;' onclick='patpage(\"confidentialite\")'>confidentialité</a>",3)
					}
					document.cookie = 'index=a; secure;';
					send(statlink+"index.php?f=index")
				}
			}

			if(data[$_GET['f']]){
				load($_GET['f']);
			}else{
				console.log('page index charge')
				pr()
			}

			if(screen.width < 402){
				document.getElementById("dp-map").style.textAlign = "center";
			}
		}
		news('sea my last creation : '+findex(data)[0],"load('"+findex(data)[0]+"')")
	}
}

/*secondary programe=======================================================*/

window.onoffline = (event) => {
	msg("connection lost")
};
