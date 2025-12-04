var socket = io('http://' + currentServer["serv"] + ':' + currentServer["port"], {
	withCredentials: true
});
 // console.log(socket);
 
function setactivetab(){
	var allTabs = document.getElementById("top_tr");
	var tdTabs = allTabs.getElementsByTagName("td");
	// console.log(allTabs,tdTabs);
	tdTabs[0].className = "active_top_selected";
	tdTabs[1].className = "active_top_selected";
	activeCharTab = tdTabs[0].getAttribute('buttoncharid');
	console.log("%c Setting active tab to: "+activeCharTab,"background: #fff; color: green");		
}
function connectToNode(cookie){
	console.log('Establishing connection on ' + currentServer["serv"] + ':' + currentServer["port"]);
// var CurrentUser = activeCharTab; 
socket.on('connect', function(){
	console.log("%c CONNECTED","background:red; color: white");
	
});
socket.on('connect_error', (err) => {
	console.log("%cConnection error:", "background:red; color: white", err.message);
});
socket.on('connection', (socket) => console.log('New connection:', socket.id));
socket.on('auth_success_firstlogin', function(data){//получаем подтверждение перса data[0] - инфа, data[1] - пароль идентификации
// console.log(data);
	if(data[1] == unique_code){
		console.log(data);
		showLogin("loading");	
		// showLogin("login");	
		startingMap('initiate');
		var codedata = data[0][0];
		var mapdata = data[0][1];
		var chardata = data[0][2];
		console.log(codedata);
		setCookie('map_access',codedata);//добавляем инфу в куки
		clientInfo.updData(data[0][2]);
		for(var i=0;i<chardata.length;i++){
			// console.log(atob(chardata[i]['CharacterName']),chardata[i]['CharacterID'],i,cookie);
			createTab(atob(chardata[i]['CharacterName']),chardata[i]['CharacterID'],i,cookie);	
		}
		setTimeout(function(){
			setactivetab();
		},1000);
		
		
		setTimeout(function(){
			for(let s=0;s<chardata.length;s++){
				if(chardata[s]['CharacterID'] == activeCharTab){
					updatePanel(chardata[s]["solar_system_id"],chardata[s]['CharacterID'], 'charname_holder');
				}
				clientInfo.charSys(chardata[s]["solar_system_id"],chardata[s]['CharacterID']);
			}
		},2000);
		
		
		// getCookieJS('canvasoffsetX', false, function(dataX){
		// 	getCookieJS('canvasoffsetY', false, function(dataY){
		init(mapdata,[],"","initiate");
			// var dataX = 0, dataY = 0;
			// init(mapdata,[],"","initiate","",{dataX,dataY});
		// 	},this);
		// },this);
	}		
	
});
socket.on('auth_success_addcharacter', function(data){//получаем подтверждение перса data[0] - инфа, data[1] - пароль идентификации
		console.log(data);
	var usercode = data[0][0];
	var mapdata = data[0][1];
	var chardata = data[0][2];
	// console.log(locdata);
	if(data[1] == cookie){//сверяем пароль, чтоб лишние персы не залогинились
		// console.log("%c AUTH SUCCESS","background:green; color: white");
		// console.log(data,[data[0]]);
		// addCookie('map_access',chardata);//добавляем инфу в куки
		console.log("%c ADDING CHARACTER:"+chardata['CharacterID'],"background:green; color: white");
		// showLogin("loading");	
		// showLogin("login");	
		// startingMap('initiate');
		clientInfo.updData(data[0][2]);
		for(var i=0;i<chardata.length;i++){
			createTab(atob(chardata[i]['CharacterName']),chardata[i]['CharacterID'],i,cookie);	
		}
		setactivetab();
		
		
		for(let s=0;s<chardata.length;s++){
			if(chardata[s]['CharacterID'] == activeCharTab){
				updatePanel(chardata[s]["solar_system_id"],chardata[s]['CharacterID'], 'charname_holder');
			}
			clientInfo.charSys(chardata[s]["solar_system_id"],chardata[s]['CharacterID']);
		}
		// console.log("map_connections_for:"+activeCharTab); 
		
		// init(data[0].map,data[0].residents,"","initiate");
		// init(mapdata,[],"","initiate");
	}
});

socket.on('start_char', function(data){
	console.log("%c CHAR ADDING","background:green; color: white");
	
	
	var allTabs = document.getElementById("top_tr");

	var cook = JSON.parse(cookie);
	for(var i=0;i<cook.length;i++){
		// console.log(cook);
		if(cook[i]['CharacterID'] == data[0]['CharacterID']){//ищем перса в кукисах
			for(var p=0;p<cook[i]['password'].length;p++){//проверяем его пароль
				if(cook[i]['password'][p] == data[1]){
					console.log("%c STARTING FOR: "+data[0]['CharacterID']+' - '+atob(data[0]['CharacterName'])+' - '+i+'password:'+data[1],"background:green; color: white");

					// console.log("%c Going to add tabs for characters, currently we have "+r_token.length+" characters.","background: #fff; color: 660033");
					createTab(atob(data[0]['CharacterName']),data[0]['CharacterID'],i,cookie);	
					var tdTabs = allTabs.getElementsByTagName("td");
					tdTabs[0].className = "active_top_selected";
					tdTabs[1].className = "active_top_selected";
					// activeCharTab = tdTabs[0].firstChild.innerHTML;
					activeCharTab = tdTabs[0].getAttribute('buttoncharid');
		// console.log(tdTabs[0]);
					console.log("%c Setting active tab to: "+activeCharTab,"background: #fff; color: green");
					// console.log(activeCharTab,tdTabs[0].getAttribute('buttoncharid'));
					socket.emit('map_request', tdTabs[0].getAttribute('buttoncharid'));
				}
			}
		}
	}
	
// startTrack(task);
});
socket.on('token_error', function(data){
	// console.log(data);
	if(data[1] == cookie){
		var charID = data[0];
		// console.log(charID);
		console.log("%c CHARACTER TOKEN ERROR: "+charID,"background:red;color:white");
		var allTabs = document.getElementById("top_tr");
		var tdTabs = allTabs.getElementsByTagName("td");
		for(var i=0; i < tdTabs.length; i++){//tdTabs[0]
			if(tdTabs[i].getAttribute('buttoncharid') == charID){				
				var charName = tdTabs[i].firstChild.innerHTML;
				var charStatus = document.getElementById("status-"+charName);
				if(charStatus){
					// console.log(charStatus);
					charStatus.innerHTML = "(!)";
					charStatus.style.color = "red";
				}
				// tdTabs[i].className = "active_top_selected";
			}
		}
	}
});



// socket.on('event', function(data){});
// socket.on('reconnect_error', function () {
    // console.log('attempt to reconnect has failed');
  // });
// socket.on('disconnect', function(){
	// console.log("%c DISCONNECTED","background:red;color:white");
// });

	// socket.emit('map_request', activeCharTab);
	// //console.log("electron tried to send message");

socket.on('privat_char_update', function(data){
	cookie = cookie.replace(/"/g,'');
	// console.log(cookie,data[1]);
	if(cookie == data[1]){
		if(data[0].length == 0){showLogin("login");switchPage('login');return;}
		// console.log(data,activeCharTab);
		clientInfo.updData(data[0]);

		// console.log(data[0].length);
		showLogin("loading");	
		startingMap('initiate');
		var chardata = data[0];
		
		for(var i=0;i<chardata.length;i++){
		createTab(atob(chardata[i]['CharacterName']),chardata[i]['CharacterID'],i,cookie);	
		}
		setactivetab();	

		for(let s=0;s<data[0].length;s++){
		if(data[0][s]['CharacterID'] == activeCharTab){
		updatePanel(data[0][s]["solar_system_id"],data[0][s]['CharacterID'], 'charname_holder');
		}
		clientInfo.charSys(data[0][s]["solar_system_id"],data[0][s]['CharacterID']);
		}
	}
});
socket.on('map_connections', function(data){
	// console.log(data[0].custom_sys_names);
	cookie = cookie.replace(/"/g,'');
	// console.log(cookie);
	if(data[1].replace(/"/g,'') == cookie){
			clientInfo.map = data[0].map;
			init(data[0].map,[],"","initiate",data[0].custom_sys_names);
			

		// getCookieJS('canvasoffsetX', false, function(dataX){
		// 	getCookieJS('canvasoffsetY', false, function(dataY){
			// var dataX = 0, dataY = 0;
			// 	init(data[0].map,[],"","initiate",data[0].custom_sys_names,{dataX,dataY});
		// 	},this);
		// },this);
	}
	// console.log('end of parse');
	// var found = document.querySelector("[buttonCharID='"+data[1]+"']");//находим кнопку перса
	// // console.log(found);
	// if(found){
		// if(data[1] == found.getAttribute('buttonCharID')){
		// // console.log(data); 
		
			// console.log("map_connections_for:"+found.getAttribute('buttonCharID')); 
			// // init(data[0].map,data[0].residents,"","initiate");
			// return data;
		// }
	// }
});
}

// function testClick(){
	// socket.emit('map_request', "");
	// console.log("electron tried to send message");
// }

