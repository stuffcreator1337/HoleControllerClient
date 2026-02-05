let socket = null;
let socketInitialized = false;

function connectToNode(cookie) {
	// Защита от многократного вызова
	if (socketInitialized && socket && socket.connected) {
		console.log("%c Socket already running", "background:green; color: white");
		return;
	}

	if (socketInitialized) {
		console.log("%c Connection already initialized", "background:orange; color: white");
		return;
	}

	console.log("%c Initialising", "background:yellow; color: grey");
	socketInitialized = true;

	const { protocol, hostname } = location;
	const socketUrl = `${protocol}//${hostname}:3000`;

	// Закрываем старое соединение если есть
	if (socket) {
		socket.disconnect();
		socket = null;
	}

	// Создаем новое соединение
	socket = io(socketUrl, {
		withCredentials: true,
		transports: ["websocket", "polling"],
		reconnection: true,
		reconnectionAttempts: 5,
		reconnectionDelay: 1000,
		timeout: 20000
	});
	socket.on('connect', function(){
		console.log("%c CONNECTED", "background:GREEN; color: white");
		socket.emit('addr_request', local_code);
		if (typeof (parseInt(cookie.replace(/"/g, ''))) && cookie.replace(/"/g, '').length == 7) {//проверяем что в куки сохранен только 7-значный код доступа, в противном случае чистим куки 
			// console.log('sending data');
			socket.emit('user_auth', cookie);
			showLogin("loading");
			// showLogin("login");	
			startingMap('initiate');
		} else {
			clearAllCookies();
			// showLogin("loading");	
			// startingMap('initiate');
			showLogin("login");
		}
	});
	socket.on('connect_error', (error) => {
		console.error("%cConnection error:", "background:red; color: white", error);
		console.error("%cConnection error:", "background:red; color: white", {
			description: error.description,
			message: error.message,
			type: error.type
		});
	});
	socket.on('addr_response', function (msg) {
		if (msg.user == local_code) {
			console.log("%c SETTING LOGIN BUTTON...", "background:orange; color: white");
			setLoginButton(msg.data);
		}
	});
	socket.on('connection', (socket) => console.log('New connection:', socket.id));
	socket.on('auth_success_firstlogin', function(msg){//получаем подтверждение перса data[0] - инфа, data[1] - пароль идентификации
	// console.log(data);
		if (msg.user == unique_code){
			console.log(msg);
			showLogin("loading");	
			// showLogin("login");	
			startingMap('initiate');
			var codedata = msg.data[0];
			var mapdata = msg.data[1];
			var chardata = msg.data[2];
			console.log(codedata);
			setCookie('map_access',codedata);//добавляем инфу в куки
			clientInfo.updData(msg.data[2]);
			for(var i=0;i<chardata.length;i++){
				// console.log(chardata[i]['CharacterName'],chardata[i]['CharacterID'],i,cookie);
				createTab(chardata[i]['CharacterName'],chardata[i]['CharacterID'],i,cookie);	
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
	socket.on('auth_success_addcharacter', function (msg) {//получаем подтверждение перса data.data - инфа, data.user - пароль идентификации
		console.log(msg);
		var usercode = msg.data[0];
		var mapdata = msg.data[1];
		var chardata = msg.data[2];
		// console.log(locdata);
		if (msg.user == cookie){//сверяем пароль, чтоб лишние персы не залогинились
			// console.log("%c AUTH SUCCESS","background:green; color: white");
			// console.log(msg,[msg.data]);
			// addCookie('map_access',chardata);//добавляем инфу в куки
			console.log("%c ADDING CHARACTER:"+chardata['CharacterID'],"background:green; color: white");
			// showLogin("loading");	
			// showLogin("login");	
			// startingMap('initiate');
			clientInfo.updData(msg.data[2]);
			for(var i=0;i<chardata.length;i++){
				createTab(chardata[i]['CharacterName'],chardata[i]['CharacterID'],i,cookie);	
			}
			setactivetab();
		
		
			for(let s=0;s<chardata.length;s++){
				if(chardata[s]['CharacterID'] == activeCharTab){
					updatePanel(chardata[s]["solar_system_id"],chardata[s]['CharacterID'], 'charname_holder');
				}
				clientInfo.charSys(chardata[s]["solar_system_id"],chardata[s]['CharacterID']);
			}
			// console.log("map_connections_for:"+activeCharTab);

			// init(data.data.map,data.data.residents,"","initiate");
			// init(mapdata,[],"","initiate");
		}
	});

	socket.on('start_char', function(msg){
		console.log("%c CHAR ADDING","background:green; color: white");
	
	
		var allTabs = document.getElementById("top_tr");

		var cook = JSON.parse(cookie);
		for(var i=0;i<cook.length;i++){
			// console.log(cook);
			if (cook[i]['CharacterID'] == msg.data['CharacterID']){//ищем перса в кукисах
				for(var p=0;p<cook[i]['password'].length;p++){//проверяем его пароль
					if (cook[i]['password'][p] == msg.user){
						console.log("%c STARTING FOR: " + msg.data['CharacterID'] + ' - ' + msg.data['CharacterName'] + ' - ' + i + 'password:' + msg.user,"background:green; color: white");

						// console.log("%c Going to add tabs for characters, currently we have "+r_token.length+" characters.","background: #fff; color: 660033");
						createTab(msg.data['CharacterName'], msg.data['CharacterID'],i,cookie);	
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
	socket.on('token_error', function (msg){
	// console.log(data);
		if (msg.user == cookie){
			var charID = msg.data;
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



	// socket.on('event', function(msg){});
	// socket.on('reconnect_error', function () {
		// console.log('attempt to reconnect has failed');
	  // });
	// socket.on('disconnect', function(){
		// console.log("%c DISCONNECTED","background:red;color:white");
	// });

		// socket.emit('map_request', activeCharTab);
		// //console.log("electron tried to send message");

	socket.on('privat_char_update', function(msg){
		cookie = cookie.replace(/"/g,'');
		// console.log(cookie,data[1]);
		if (cookie == msg.user){
			if (msg.data.length == 0) {
				showLogin("login"); switchPage('login');
				return;
			}
			// console.log(data,activeCharTab);
			clientInfo.updData(msg.data);

			// console.log(data[0].length);
			showLogin("loading");	
			startingMap('initiate');
			var chardata = msg.data;
		
			for(var i=0;i<chardata.length;i++){
			createTab(chardata[i]['CharacterName'],chardata[i]['CharacterID'],i,cookie);	
			}
			setactivetab();	

			for (let s = 0; s < msg.data.length;s++){
				if (msg.data[s]['CharacterID'] == activeCharTab){
					updatePanel(msg.data[s]["solar_system_id"], msg.data[s]['CharacterID'], 'charname_holder');
			}
				clientInfo.charSys(msg.data[s]["solar_system_id"], msg.data[s]['CharacterID']);
			}
		}
	});
	socket.on('map_connections', function (msg){
		// console.log(data[0].custom_sys_names);
		cookie = cookie.replace(/"/g,'');
		// console.log(cookie);
			if (msg.user.replace(/"/g,'') == cookie){
				clientInfo.map = msg.data.map;
				homesystemID = msg.data.home;
				init(msg.data.map, [], "", "initiate", msg.data.custom_sys_names);
			

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
	/******************
	 * SIGS EDIT
	 ******************/

	socket.on('sending_sigs', function (msg) {
		console.log(msg.data.sigs);
		var d = msg.data;
		//console.log(d,d.user,d.data,d["user"], activeCharTab);
		//console.log(d.data["id"], d.data["name"], d.data["color"]);
		if (d.data["user"] == activeCharTab) {
			// console.log("recieved");
			// console.log(d["id"],d["name"],d["color"]);
			openSysTable(d.data["id"], d.data["name"], d.data["color"], "", msg.data.sigs);
		};
	});

	socket.on('sending_names', function (msg) {
		// console.log(msg);
		var d = msg.data;
		if (d["user"] == activeCharTab || d["user"] == 'all') {
			console.log("recieved names for systems");
			// console.log(msg.data.names);
			var names = msg.data.names;
			for (var i = 0; i < names.length; i++) {
				if (document.getElementById(names[i].id)) {
					// console.log(document.getElementById(names[i].id).children);
					document.getElementById(names[i].id).children["nodeDivID"].children["sys_custom_name"].value = names[i].name;
					document.getElementById(names[i].id).children["nodeDivID"].children["sys_custom_name"].innerHTML = names[i].name;
				}
			}
		};
	});
	/******************
	 * PILOT POS
	 ******************/
	socket.on('privat_char_update', function (msg) {
		updPilotPos(msg.data);
	});

}
function setactivetab(){
	var allTabs = document.getElementById("top_tr");
	var tdTabs = allTabs.getElementsByTagName("td");
	// console.log(allTabs,tdTabs);
	tdTabs[0].className = "active_top_selected";
	tdTabs[1].className = "active_top_selected";
	activeCharTab = tdTabs[0].getAttribute('buttoncharid');
	console.log("%c Setting active tab to: "+activeCharTab,"background: #fff; color: green");		
}
// function testClick(){
	// socket.emit('map_request', "");
	// console.log("electron tried to send message");
// }

