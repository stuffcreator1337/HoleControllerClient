// // const remote = require('electron').remote
// // const url = require('url')
// // const path = require('path')
// // var http = require("http")
// var used_code = "";

// var server = http.createServer(function (req, res) {
	 // var parsedUrl = parseQuery(req.url)	
	 // var code1 = parsedUrl["/?code"];
	// res.writeHead(200, {'Content-Type': 'text/plain;'});
	// if (code1){
		// //console.log(code1);
		// if(code1 == used_code){
			// res.end('This code have already been used, press LOGIN button again to recieve a new code.');
		// }else{
			// res.end('Token recieved. Close this page and open the app.');
			// used_code = code1;
			// var answer = auth("authorization_code",code1);
			// console.log(answer.responseJSON);
		// }
	// }
// });
// server.listen(8080);

// function parseQuery(qstr) {
    // var query = {};
    // var a = (qstr[0] === '?' ? qstr.substr(1) : qstr).split('&');
    // for (var i = 0; i < a.length; i++) {
        // var b = a[i].split('=');
        // query[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || '');
    // }
    // return query;
// }

// function auth(grant,code){
	// //sisilogin
// var clientId = "26463421869a4d34961b5f47a737da6b";
// var clientSecret = "6nPDTexIIWMqRmMEk5gYMzPFWXvbrKgl8YDq4a7e";

// var authorizationBasic = btoa(clientId + ':' + clientSecret);

	// return $.ajax({
		// type: 'POST',
		// url: 'https://'+currentServer["login"]+'eveonline.com/oauth/token',
		// data: { 'grant_type': grant,
			// 'code': code },
		// dataType: "json",
	   
		// crossDomain: true,
		// headers: {
		   // 'Authorization': 'Basic ' + authorizationBasic,
			// 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
			// //'Host': 'login.eveonline.com'
		// },
		// success: function (result) {
			// //remote.getCurrentWindow().focus();
			// console.log(result);
			// console.log("refresh_token: "+result["refresh_token"]); 
			
			// getCookieJS(currentServer["token"], false, function(data){
			// console.log(data.value);
				// //data = JSON.parse(data);
				// if((data.value == '')||(data.value == '[]')){
				// var accs = [];
				// var toks = {}
					// toks["access_token"] = result["access_token"];
					// toks["refresh_token"] = result["refresh_token"];
					// console.log(toks);
					// accs[0] = toks;
					// console.log("%c setting a new cookie tokens: "+JSON.stringify(accs),'background: green; color: orange');
				// setCookie(currentServer["token"],JSON.stringify(accs));	
				// }else{
				// var accs = JSON.parse(data.value);
				// var toks = {}
					// toks["access_token"] = result["access_token"];
					// toks["refresh_token"] = result["refresh_token"];
					// console.log(toks);
					// accs[accs.length] = toks;
					// console.log("adding a new cookie tokens: "+JSON.stringify(accs));
				// setCookie(currentServer["token"],JSON.stringify(accs));						
				// }			
			// getCharacterId(result["access_token"]);
			// });
		// },
		// error: function (req, status, error) {
			// remote.getCurrentWindow().focus();
		// }
	// });
// }

// function refreshT(rtoken){
	// if(!rtoken){console.log("%c no refresh token availible",'background: red; color: white'); return;}
	// console.log("Trying to recieve refresh token, ");
	// // console.log();
	// var clientId = "26463421869a4d34961b5f47a737da6b";
	// var clientSecret = "6nPDTexIIWMqRmMEk5gYMzPFWXvbrKgl8YDq4a7e";
	// var authorizationBasic = btoa(clientId + ':' + clientSecret);
	// return $.ajax({
		// type: 'POST',
		// url: 'https://'+currentServer["login"]+'eveonline.com/oauth/token',
		// data: { 'grant_type': 'refresh_token',
			// 'refresh_token': rtoken },
		// dataType: "json",
	   
		// crossDomain: true,
		// headers: {
		   // 'Authorization': 'Basic ' + authorizationBasic,
			// 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
			// //'Host': 'login.eveonline.com'
		// },
		// success: function (result) {
			
			// getCookieJS(currentServer["token"], false, function(cok){
				// if(cok.value){
				// cok = JSON.parse(cok.value);
				// for(var i=0; i<cok.length; i++){
					// if(cok[i]["refresh_token"] == rtoken){
						// //console.log("%c New access token: "+result["access_token"].substring(0, 10)+", time is: "+msToTime(new Date().getTime()-timeToRefresh), "background: black;color:white");
						// cok[i]["refresh_token"] = result["refresh_token"];
						// cok[i]["access_token"] = result["access_token"];
						// }
				// }
				// setCookie(currentServer["token"],JSON.stringify(cok));	}
				// else{console.log("%c no value for tokens",'background: red; color: white');}
			// });

			
		 // //  server.close();
		  // // return result;
		// },
		// error: function (req, status, error) {
			// remote.getCurrentWindow().focus();
			// showLogin("login");
		// //alert(error);
		// }
	// });
// }

// function	getCharacterId(atoken){
	// console.log(atoken.substring(0, 10));
	// var url = 'https://'+currentServer["login"]+'eveonline.com/oauth/verify';
	// $.when(getAjax(url,atoken,"getting character ID")).done(function(data){
		// var hasChar = false;
		// getCookieJS(currentServer["token"], false, function(cok){
			// if(cok.value){
			// cok = JSON.parse(cok.value);
			// for(var i=0; i<cok.length; i++){
				// if(cok[i]["characterID"] == data["CharacterID"]){
				// console.log("%c This character already exists.",'background: red; color: white');
			
					// hasChar = true;
				// }
			// }
			// for(var i=0; i<cok.length; i++){
				// if(cok[i]["access_token"] == atoken){
					// cok[i]["characterID"] = data["CharacterID"];
					// cok[i]["CharacterName"] = data["CharacterName"];
				// }
			// }
			// setCookie(currentServer["token"],JSON.stringify(cok));	}
			// else{console.log("no value for tokens");}		
			// getCharacterCorp(atoken,data["CharacterID"],hasChar);
		// });
		// // charID = data;
	// });
// }
// function postAjax(url,token,task,name){
	// return $.ajax({
		// type: 'POST',
		// url: url,   
		// crossDomain: true,
		// headers: {
		   // 'Authorization': 'Bearer ' + token
		// },
		// success: function (result) {
			// console.log(result);
		// },
		// error: function (req, status, error) {}
	// });
// }
// function 	getAjax(url,token,task,name){
	// if(charTokens[char_index[name]])	token = charTokens[char_index[name]].access_token;
	// // console.log(token.substring(0, 10));
	// return $.ajax({
		// type: 'GET',
		// url: url,   
		// crossDomain: true,
		// headers: {
		   // 'Authorization': 'Bearer ' + token
		// },
		// success: function (result) {
			// // console.log(errorCount[name]);
			// console.log("%c Success AJAX request from server","background:green;color:white");
			// if(errorCount[name] > 0){errorCount[name]--;}
			// if(error502 > 0){error502--;}
			// if((errorCount[name] == 0)&&(error502 == 0)){
				// restarting = false;
				// // console.log("%c Ready go set a new restart with error count "+errorCount[name],"background:green;color:white");
				// var tokenStatus = $("text[class^='tdText'][id^='status']");
				// // console.log(tokenStatus);
				// for(var i=0; i < tokenStatus.length; i++){
					// // console.log(tokenStatus[i]);
					// tokenStatus[i].innerHTML = "";
					// tokenStatus[i].style.color = "white";
				// }
			// }
			
			// //console.log("%c Success in "+task+" for: "+name+", current time is: "+msToTime(new Date().getTime()),"background:white;color:blue");
			// // console.log("%c Success in for: "+name,"background:white;color:blue");
			// // console.log("%c Current token is: "+token+", current time is: "+msToTime(new Date().getTime()),"background:white;color:blue");
		// },
		// error: function (req, status, error) {
			// var tokenStatus = $("text[class^='tdText'][id^='status']");
			// console.log("e:"+req.status+"; task: "+task+"; char: "+name+"; token: "+token.substring(0, 10)+"; error number: "+errorCount[name]);
			// if((req.status == 500)||(req.status == 502)||(req.status == 400)){
				// if(error502 < 20){error502 = error502+5;}
				// for(var i=0; i < tokenStatus.length; i++){
					// tokenStatus[i].innerHTML = "   (!)";
					// tokenStatus[i].style.color = "yellow";
				// }
				
			// }
			// if((req.status == 403)&&(errorCount[name] < 20)){
				// console.log("%c Current token: "+token.substring(0, 10), "background: black;color:white");
				// errorCount[name]++;
				// // console.log(tokenStatus);
				// for(var i=0; i < tokenStatus.length; i++){
					// // console.log(tokenStatus[i]);
					// tokenStatus[i].innerHTML = "   (!)";
					// tokenStatus[i].style.color = "red";
				// }
				
			// }
			// if(errorCount[name] >= 20){
				// console.log("%c We have "+errorCount[name]+" errors, going to stop tracking", "background: red;color:black");
				// errorCount[name]++;
				// stopAll();
				// if(restarting == false){
					// restarting = true;
					// errorCount[name] = 10;
					// console.log("%c RESTARTING TRACKING, GOING TO GET NEW TOKENS", "background: red;color:black");
					// setTimeout("startTrack();",2000);
				// }
				
			// }
			// // startTrack();
		// }
	// });
// }
// function stopAll(){
	// for(var i=0; i < charName.length; i++){
		// clearInterval(getLoc[i]);
		// clearInterval(getShip[i]);
		// clearInterval(refresh1000sec[i]);
	// }
// }

// function	getCharacterCorp(token,id,dubl){
	// // console.log("getting character Alliance");
	// //console.log(charInfo);
	// console.log("Character Id: "+id);
	// console.log("%c Current state is:"+dubl,"background:white;color:orange");
	// if(id){
	// var url = 'https://esi.evetech.net/v4/characters/'+id+'?datasource='+currentServer["source"];
	// $.when(getAjax(url,token,"getting character Alliance")).done(function(data){
		// if(dubl){
			// console.log("%c This character already defined.",'background: red; color: white');
			// clearCookies(id);return;}
		// if(data["alliance_id"] != 19004344){
			// console.log("Current Alliance: "+data["alliance_id"]+" - OK");
			// //server.close();
			 // startApp();
			// //switchPage("index.html");
		// }
		// else{
			// console.log("Current Alliance: "+data["alliance_id"]+" - DENIED");
			// clearCookies(id);
			// showLogin("login")
			// alert("Not Hole Control.");
			// //switchPage("login.html");
		// }
	// });
	// }else{console.log("%c No id specified",'background: red; color: white');}
// }

// function setWrongTokens(){
	// console.log("%c Setting wrong rokens to test 403 error, time is: "+msToTime(new Date().getTime()-timeToRefresh), "background: black;color:white");
	// getCookieJS(currentServer["token"], false, function(data){
		// var accs = JSON.parse(data.value);
		// for(var i=0; i < accs.length; i++){
			// // console.log(accs[i]);
			// accs[i]["access_token"] = "87345377583745345";
		// }
		// setCookie(currentServer["token"],JSON.stringify(accs));	
	// });
// }