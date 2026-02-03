function updatePanel(id,charId,charName){
	if(activeCharTab == charId){	
	console.log("%c name:"+charName+', id:'+charId,"background:red;color:black");
	// socket.emit('routes_request',{'user':activeCharTab});//<<---раблочить позже
		updateLocTab(id, charId);
		if(!isWh(id)){
			console.log(id+' - NEED TO FIND ENTER TO HOME');
			// if (typeof map !== 'undefined'){
			// console.log('GOING TO FIND ENTER TO HOME');
			// console.log(clientInfo.map);
			findExits(clientInfo.map);
		}	// }
	}
	// var new_id = id;
	
	// var old_id = charLoc[charId];
	// charLoc[charId] = new_id;
	// // console.log(charName,new_id);
	
	// if(new_id){
		// if(old_id != new_id){
			// socket.emit('new_char_location', {'user':charName, 'charId':charId, 'sys': new_id, 'loc_time': new Date().getTime()});			
		// }
	// }	
	// else{
		// console.log("%c ERROR GETTING THE SOLAR SYSTEM:"+new_id,"background:red; color:black");
	// }
	
	// if((new_id != old_id)&&(old_id != '')){
		
		// if((isWh(new_id) == true)||(isWh(old_id) == true)||(systemJumps[0].jumps[old_id][new_id]==null)){
			// console.log("%c Old sysID: "+old_id+", new sysID: "+new_id,"background: #336699; color: white");
			// create_link(new_id,old_id);		
			// var chId;
			// for(var i=0; i < a_token.length; i++){
				// if(charId[i] == id){
					// chId = i;
				// }
			// }
		// }
	// }
}
function correctHole(letter){
	var type;
	switch (letter) {
		case "h":       type = "High"; return type;        break;
		case "l":      	type = "Low"; return type;        break;
		case "n":       type = "Null"; return type;        break;
		default:  return letter;
}
}
function setEffect(){
	console.log();
	domTT_activate(this, event, 'content', 'test',  'trail', true);
}
function updateTop(name,switchTab){
	var allTabs = document.getElementById("top_tr");
	var tdTabs = allTabs.getElementsByTagName("td");
	for(var i=0; i < tdTabs.length; i++){
	console.log("%c Going to remove tab and Del Button for: "+name,"background: #fff; color: orange");
		if(tdTabs[i].firstChild.innerHTML == name){			
			allTabs.removeChild(tdTabs[i]);
			allTabs.removeChild(tdTabs[i]);
		}
	}
	allTabs = document.getElementById("top_tr");
	tdTabs = allTabs.getElementsByTagName("td");
	var activeTabSelected = false;
	for(var i=0; i < tdTabs.length; i++){
	console.log("%c Going to find new active tab.","background: #fff; color: orange");
		if(tdTabs[i].className == "active_top_selected"){	
			console.log("%c Finded selected tab: "+tdTabs[i].firstChild.innerHTML,"background: yellow; color: black");
	
			activeTabSelected = true;	}
	}
	if((activeTabSelected == false)&&(allTabs.getElementsByTagName("td").length != 0)){
		console.log("%c No selected tabs presented, selecting the first one: ","background: yellow; color: black");
		tdTabs[0].className = "active_top_selected";tdTabs[1].className = "active_top_selected";
	}
	if(allTabs.getElementsByTagName("td").length == 0){
	switchPage('login');}
}

function updateLocTab(id,charID){
	var systems = fullmap;
	var currentSys = systems[id];
	if(!currentSys)return;
	// console.log("%c UPDATING PANEL FOR: "+charID+", SYSTEM: "+currentSys["solarSystemName"],"background: green; color: black");
	document.getElementById('current_system').innerHTML = "Current system: "+currentSys["solarSystemName"];	
	document.getElementById('current_id').innerHTML = id;
	var toolTips = document.getElementsByClassName('effect_tooltip');
	if(isWh(id) == true){
		switchVisibility('wspace');
		setWspaceInfo(id,charID);
	}
	else{
	switchVisibility('kspace');
		
	}
}

function setWspaceInfo(id,charID){
	var systems = fullmap;
	var currentSys = systems[id];
	var wh_info = document.getElementById("wh_info");
	// console.log(wh_info.firstChild);
	var sys =  whSysInfo[0].wh_info[id];
	// console.log(sys);
	if(sys["statics"]){
		var stType = [];
		var statC = [];
		stType[0] = sys["statics"].substring(0, 4);
		statC[0] = sys["statics"].substring(4, 5);
		stType[1] = sys["statics"].substring(5, 9);
		statC[1] = sys["statics"].substring(9, 10);			
		// console.log(stType[0], statC[0], stType[1], statC[1]);
		var currColor = getColor(sys["sysclass"]);
		var s_t = 1;
		if(statC[1]){ s_t = 2;}	
		// console.log("going to create tr1");
		//Current class: C5
		var tr1 = docCreateElem('tr','sys_class','activeLeft',"<text>Current class: <font color="+currColor+">"+sys["sysclass"]+"<br></font></text>",'',wh_info);
		
		for(var i=0;i<s_t;i++){
			var tr2 = docCreateElem('tr',"static"+i,'activeLeft','old','',wh_info);
			var td21 = docCreateElem('text',"stype"+i,'activeLeft', "Static Type:",'',tr2);
			var stColor = getColor(statC[i]);
			var td22 = docCreateElem('text',"staticName"+i,'activeLeft',"<font style='cursor: help;border-bottom: 1px dashed;' color="+stColor+">"+stType[i]+"</font>",'',tr2);
				$jit.id("static"+i+"tool").innerHTML = setHole(stType[i]).innerHTML;	
				td22.setAttribute("onmouseover", "domTT_activate(this, event, 'content', document.getElementById('static"+i+"tool'), 'trail', true);");
			var td23 = docCreateElem('text','static'+i+'class','activeLeft',"Class: <font color="+getColor(statC[i])+">"+correctHole(statC[i])+"</font>",'',tr2);		
		}
	}
	if(sys["effect"]){
		var tr3 = docCreateElem('tr','effectName','activeLeft',"<font style='cursor: help;border-bottom: 1px dashed;'>"+sys['effect']+"</font>",'',wh_info);
			// tr3.style='cursor: help; border-bottom: 1px dashed;';sys['effect']
			tr3.setAttribute("onmouseover", "domTT_activate(this, event, 'content', document.getElementById('effectTool'), 'trail', true);");
		var effectTool = $jit.id('effectTool');
		effectTool.innerHTML = setEffect(sys["effect"], sys["sysclass"]).innerHTML;	
	}
}

function switchVisibility(type){
	if(type == 'wspace'){
		$jit.id('destParsed').style.visibility = 'hidden';
		$jit.id('destParsed').firstChild.innerHTML = '';
		$jit.id("wh_info").style.visibility = '';		
	}else{		
		$jit.id('destParsed').style.visibility = '';	
		$jit.id("wh_info").style.visibility = 'hidden';
		$jit.id("wh_info").innerHTML = '';
		// $jit.id("static1").style.visibility = 'hidden';
		// $jit.id("static1").style.height = '0';
	}

}
function changeActiveTab(charID){
	console.log("%c Going to change the active tab to: "+charID,"background: #fff;color: orange");
	activeCharTab = charID;
	changeTopStyle(charID);
	console.log(clientInfo);
	// console.log(clientInfo.charInfo(charID));
	var inf = clientInfo.charInfo(charID);
	if(!inf){
		for(var i=0;i<clientInfo.charData.length;i++){
			if(clientInfo.charData[i].CharacterID == charID){inf = clientInfo.charData[i];}
		}
	}
	updatePanel(inf['solar_system_id'],charID,'charname_holder');
}
function changeTopStyle(charID){	
	var allTabs = document.getElementById("top_tr");
	var tdTabs = allTabs.getElementsByTagName("td");
	for(var i=0; i < tdTabs.length; i++){
		// console.log("%c Checking charID: "+val[i]["characterID"]+", need ID: "+charID,"background: #fff; color: yellow");
		tdTabs[i].className = "active_top";	
	}
	for(var i=0; i < tdTabs.length; i++){//tdTabs[0]
		if(tdTabs[i].getAttribute('buttoncharid') == charID){
			tdTabs[i].className = "active_top_selected";
		}
	}
	$jit.id("wh_info").style.visibility = 'hidden';
}