// var session = require('electron').remote.session;
// var ses = session.fromPartition('persist:name');


function setCookie(cname, cvalue) {
	// console.log(cvalue);
	// console.log(JSON.stringify(cvalue));
	cvalue = encodeURIComponent(JSON.stringify(cvalue));
    var d = new Date();
    d.setTime(d.getTime() + (365*24*60*60*1000));
	// console.log(d);
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function addCookie(cname,cvalue){//добавляем инфу в куки
	// cvalue = cvalue[0];
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
	// console.log(decodedCookie);
	var found = false;
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {//ищем куки по названию
            var cook = JSON.parse(c.substring(name.length, c.length));//парсим куки если нашли, будет формата [{...},{...},{...}]
			console.log(cook);
			console.log(cvalue);//формата {...}
			for(var j=0;j<cook.length;j++){//перебираем все куки на нужного перса
				if(cook[j]['CharacterID'] == cvalue['CharacterID']){//находим нужного перса для обновления его данных
					found = true;
					console.log('FOUND CHAR:'+cvalue['CharacterID']);
					cook[j] = cvalue;//присваиваем его данным новые значения
					setCookie(cname,cook);//обновляем всю куки
				}
			}
			if(!found){//если перса не нашли, то добавляем его инфу в куки
				console.log('NOT FOUND CHAR:'+cvalue['CharacterID']);
				cook.push(cvalue);
				console.log(cook);
				setCookie(cname,cook);//обновляем всю куки
			}
        }else{
		console.log(cvalue);
			console.log('EMPTY COOKIE, SETTING NEW FOR:'+cvalue['CharacterID']);
			setCookie(cname,[cvalue]);
		}
    }
}
function getCookieJS(cname, check, fn) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
	// console.log(decodedCookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return fn(c.substring(name.length, c.length));
        }
    }
    return fn('');
}

function clearAllCookies() {
	console.log("All cookies cleaned.");
	setCookie("map_access", "");
	setCookie("access_token", "");
	setCookie("refresh_token", "");
	setCookie("CharacterID", "");
	setCookie("stokens", "");
	setCookie("ttokens", "");
}
function clearCookies(charID) {
	if(!charID){console.log("%c NO CHARID SPECIFIED","background: red; color: black");return;}
	console.log("%c Going to delete the following entry: "+charID,"background: white;color:orange");
	getCookieJS(currentServer["token"], false, function(cok){
		var val = JSON.parse(cok.value);
		console.log(val);
		// console.log("%c CharID we need: "+charID,"background: white; color: orange");		
		for(var i=0; i<val.length; i++){
		console.log("%c Character being processed: "+val[i]["CharacterName"],"background: white; color: orange");
			if((val[i]["characterID"] == charID)||((!val[i]["characterID"])&&(charID == "undefined"))){
			console.log("%c Character was found at: "+i+"; resulting array:","background: white; color: orange");
				val.splice(i,1);
				console.log(val);
			}
		
		
		setCookie(currentServer["token"],JSON.stringify(val));
		}	
		console.log(val);
	});
}
function msToTime(duration,opt) {
        var milliseconds = parseInt((duration%1000)/100)
            , seconds = parseInt((duration/1000)%60)
            , minutes = parseInt((duration/(1000*60))%60)
            , hours = parseInt((duration/(1000*60*60))%24)
            , days = parseInt((duration/(1000*60*60*24))%365);

        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;

        // return days + ":" +hours + ":" + minutes + ":" + seconds + "." + milliseconds;
		if(opt == 'sec'){return hours + ":" + minutes + ":" + seconds;}else{
        // return hours + ":" + minutes + ":" + seconds;
        return hours + ":" + minutes;}
}
function setCookieData(data,type,charID,name){
	// console.log("%c Current charID: "+charID+", system: "+sys+", name: "+name,"background: #fff; color: green");
	getCookieJS(currentServer["token"], false, function(cok){
		var val = JSON.parse(cok.value);
		// console.log(val);
		for(var i=0; i<val.length; i++){
		
			if(val[i]["characterID"] == charID){
				// console.log("%c Checking charID: "+val[i]["characterID"]+", need ID: "+charID+"; we need to set "+data+" for the "+type,"background: yellow; color: black");
				val[i][type] = data;
			}
		}
		// console.log(val);
		setCookie(currentServer["token"],JSON.stringify(val));	
	});
}