function setLoginButton(addr){
	


	// console.log(saved_options[0].frameBorder);
// writeOptions(prop);
	
	setInterval("pilotHighlight('pilotsInfo',true)", 1000 );
	setInterval("pilotHighlight('pilotsInfo_short',false)", 1000 );
	
	var button = document.getElementById("login_but");
	var loading = document.getElementById("loading_txt");
    loginURL_p2 = addr;
    loginURL = loginURL_p1 + loginURL_p2 + loginURL_p3;
	getCookieJS("map_access", false, function (cok) {
		//console.log(cok);
		if (cok.length >= 7) { unique_code = cok; }
		loading.style.visibility = "hidden";
		button.setAttribute("href", loginURL + '' + unique_state + '_' + unique_code);
		button.style.visibility = "visible";
	});
}
// var currentServer = Servers["sisi"];	

//открывать ссылки во внешнем браузере
// var shell = require('electron').shell;
// $(document).on('click', 'a[href^="http"]', function(event) {
	// console.log("%c Openineg tab <a>","background:red;color:white");
	// event.preventDefault();
	// shell.openExternal(this.href);
// });

  
// <!-- подгружаем али-значок в карту -->
var aliIcon = createIcon("settings/corp_logo",24,24);
var locIcon = createIcon("img/utilTileMouseHover",24,24);

function createIcon(name,w,h){
	var	img = new Image();
		img.src = name+".png";
		img.style.height = h;
		img.style.width = w;
	return img;
}


var currentTime = new Date();
currentTime = currentTime.getTime()
console.log("Started");

var char_index = {};
var restarting = false;
var timeToRefresh = new Date().getTime();


function startApp(start){
	console.log("%c Starting app, going to recieve cookie tokens.",'background: #fff; color: green');
	// console.log('%c Oh my heavens! ', 'background: #222; color: #bada55');
	getCookieJS('options', false, function (data) {
		console.log("%c Getting options Cookies.", 'background: #fff; color: green');
		// console.log(data);
		loadOptions(data);
	},this);

	getCookieJS('map_access', false, function (data) {// ищем сохраненные куки про имеющихся персов с доступом
		console.log("%c Getting map_access Cookies.", 'background: #fff; color: green');
		 console.log("%c Data length is: "+data.length+" the value is below:","background: white; color: green");		
		  //console.log(JSON.parse(data.value));
		// charTokens = JSON.parse(data.value);
		 //console.log(data.replace(/"/g,''));
		 //console.log(parseInt(data.replace(/"/g,'')));
		 //console.log(typeof(parseInt(data.replace(/"/g,''))));
		 //console.log(typeof(parseInt(data.replace(/"/g,''))) && data.replace(/"/g,'').length == 7);
		console.log(data);
		connectToNode(data);
	});
}


function addCharId(){
	
}

function switchPage(page){
	console.log('LOADING: '+page);
	var lPage = document.getElementById("loginPage");
	var mPage = document.getElementById("mainPage");
	if(page == "login"){
		// for(var i=0; i < a_token.length; i++){
			// clearInterval(getLoc[i]);
		// }
		// clearInterval(refresh1000sec);		
		lPage.style.display = 'block';
		lPage.style.height = '100%';
		lPage.style.width = '100%';
		mPage.style.display = 'none';
		mPage.style.height = '0px';
		mPage.style.width = '0px';	
		showLogin("login");
		var tableTr = document.getElementById("top_tr");   // Get the <ul> element with id="myList"
		while (tableTr.hasChildNodes()) {   
			//console.log(tableTr);
			tableTr.removeChild(tableTr.firstChild);
		}
	}
	if(page == "map"){
	// console.log('LOADING MAP');
		lPage.style.display = 'none';
		lPage.style.height = '0px';
		lPage.style.width = '0px';
	// console.log(mPage.style);
		mPage.style.display = 'block';
	// console.log(mPage.style);
		mPage.style.height = '100%';
		mPage.style.width = '100%';		
		// var button	= document.getElementById("login_but");
		// var loading = document.getElementById("loading_txt");
		// button.style.display = 'none';
		// loading.style.display = 'none';
	}
}


function showLogin(status){
	if (status == "loading") {
		console.log("status == loading");
		document.getElementById("loading_txt").style.visibility = 'visible';
		document.getElementById("login_but").style.visibility = 'hidden';
	}
	else if (status == "login") {
		console.log("status == login");
		document.getElementById("loading_txt").style.visibility = 'visible';
		document.getElementById("login_but").style.visibility = 'hidden';
	}
	else {
		console.log("status == none");
	}
}


function deleteChar(id,code){
	console.log("%c Going to delete the following entry: "+id,"background:white;color:orange");
	// console.log(code);
	socket.emit('charDelete', [code,id]);
}