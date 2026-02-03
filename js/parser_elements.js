function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}
function nodeStyleDetails(nodeDiv,node,nodeInnerName){
	// console.log(node.data.custom_name);
	var elements = {};
	let charPNG = "<img src='img/Character.png' height='12' width='12'</img>";
	let infoPNG = "<img src='img/icon_info.png'</img>";
	let destPNG = "<img src='img/destSet.png' height='12' width='12'</img>";
	elements.pilots 			= 	new Span('span','', 'char', charPNG);							//nodeDiv.appendChild(elements.pilots);
	elements.locals 			=	new Span('span','', 'locals', infoPNG);							//nodeDiv.appendChild(elements.locals);		
	elements.nameContainer 		= 	new Span('span','system_label', 'nameContId', node.name);					//nodeDiv.appendChild(elements.nameContainer);
	elements.systemClass 		= 	new Span('span','system_label', 'systemClass', " ("+node.data.$class+")");			//nodeDiv.appendChild(elements.nameContainer);
	elements.statics_short 		= 	new Span('span','', 'statics_short',nodeInnerName);				//nodeDiv.appendChild(elements.statics_short);
	elements.closeButton 		=	new Span('span','', 'closeBtnID', 'x');							//nodeDiv.appendChild(elements.closeButton);
	elements.systemId 			= 	new Span('span','', 'sys_id', node.data.$sysid);				//	nodeDiv.appendChild(elements.systemId);
	elements.effect 			= 	new Span('span','', 'eff', '');									//nodeDiv.appendChild(elements.effect);
	elements.localsInfo 		= 	new Span('span','', 'locals', '');								//nodeDiv.appendChild(elements.localsInfo);
	elements.pilotsInfo 		= 	new Span('span','pilots_Info', 'pilotsInfo','');				//nodeDiv.appendChild(elements.pilotsInfo);		
	elements.pilotsInfo_short 	= 	new Span('span','pilots_Info_short', 'pilotsInfo_short','');//	nodeDiv.appendChild(elements.pilotsInfo_short);
	elements.sys_custom_name 	= 	new Span('span','sys_custom_name', 'sys_custom_name',node.data.custom_name);//	nodeDiv.appendChild(elements.sys_custom_name);
	
	elements.nameContainer.setAttribute('color_type','sys');
	elements.effect.setAttribute('color_type','t2');
	// console.log(elements.effect);
	for(var elem in elements){
		nodeDiv.appendChild(elements[elem]);
	}
	elements.destSet = 			new Span('span','setDestClick', '', destPNG, node.name);	if ((node.name.indexOf("High") != -1)||(node.name.indexOf("Low") != -1)||(node.name.indexOf("Null") != -1)){		nodeDiv.appendChild(elements.destSet);	}
	elements.systemClass.setAttribute('color_type',node.data.$class);
	return elements;
}
function getSec(type,security){
	var system_type;
	/* for k-space */
	if(type == 'ks'){		
		if 		(security >= "0.45")	{	system_type="High";			}
		else if (security < "0.00")		{	system_type="Null";			}
		else 							{	system_type="Low";			}		
		return system_type;
	}
	/* for w-space */
	else{
		system_type = "C"+security;
		return system_type;
	}
}


function getColor(sysclass){
	var color;
	switch (sysclass) {
		case "1":case "C1":        				color = saved_options.colors.color_C1; return color;        break;
		case "2": case "C2": color = saved_options.colors.color_C2; return color;        break;
		case "3": case "C3": color = saved_options.colors.color_C3; return color;        break;
		case "4": case "C4": color = saved_options.colors.color_C4; return color;        break;
		case "5": case "C5": color = saved_options.colors.color_C5; return color;        break;
		case "6": case "C6": color = saved_options.colors.color_C6; return color;        break;
		case "13": case "C13": color = saved_options.colors.color_C13; return color;        break;
		case "14": case "C14": color = saved_options.colors.color_C14; return color;        break;
		case "15": case "C15": color = saved_options.colors.color_C15; return color;        break;
		case "16": case "C16": color = saved_options.colors.color_C16; return color;        break;
		case "17": case "C17": color = saved_options.colors.color_C17; return color;        break;
		case "18": case "C18": color = saved_options.colors.color_C18; return color;        break;
		case "High": case "highsec": case "h": color = saved_options.colors.color_High; return color;        break;
		case "Low": case "lowsec": case "l": color = saved_options.colors.color_Low; return color;        break;
		case "Null": case "nullsec": case "n": color = saved_options.colors.color_Null; return color;        break;
		case "Abyss": case "Abyss": case "s": color = saved_options.colors.color_Abyss; return color;        break;
		case "Thera": case "Thera": case "t": color = saved_options.colors.color_Thera; return color;        break;
		case "Pochven": case "Pochven": case "p": color = saved_options.colors.color_Pochven; return color;        break;
		//default:       color = "kSpace"; return color;        break;
	}
}

function restoreLast(){
	console.log("%c Restoring last deleted.",'background: green; color: white');
	socket.emit("restore_last",{'user': activeCharTab});
}

function Span(type,Class, ID, inner, system){
	var obj = document.createElement(type);
	if(Class)obj.className = Class;
	if(ID)obj.id = ID;
	if(inner)obj.innerHTML = inner;

	return obj;
}
function correctJS(json){
	var del = [];
	for(var i=0; i<json.length;i++){
		if((json[i].sys1 == 'undefined')||(json[i].sys2 == 'undefined')){
			del.push(i);
		}
	}
	del.sort(function(a, b){return b-a});
	for(var j=0;j<del.length;j++){
		json.splice(del[j],1);
	}
	// console.log(del);
	return json;
}
function getKsHubs(hubsDest){
	var hubs = "";
	var J = hubsDest.indexOf("J");
	var A = hubsDest.indexOf("A");
	var D = hubsDest.indexOf("D");
	var R = hubsDest.indexOf("R");
	var H = hubsDest.indexOf("H");
	var Jdest = hubsDest.substring(J+1, A);
	var Adest = hubsDest.substring(A+1, D);
	var Ddest = hubsDest.substring(D+1, R);
	var Rdest = hubsDest.substring(R+1, H);
	var Hdest = hubsDest.substring(H+1, hubsDest.length);
	var colored = $jit.id('opt_colorStatics').checked;
	hubs = "<table id='sigcountsys'><tbody>";
	hubs = 	hubs+"<tr><td><text wh_color_check='"+colored+"' color_type='Jita' style='', >Jita</text>		</td><td width='16px'><img class='setDest' src='img/destSet.png' height='16' width='16'  onclick='setCharacterDest(30000142)'></img></td><td>"+Jdest+"</td></tr>";
	hubs = 	hubs+"<tr><td><text wh_color_check='"+colored+"' color_type='Amarr' style='', >Amarr</text>		</td><td width='16px'><img class='setDest' src='img/destSet.png' height='16' width='16'  onclick='setCharacterDest(30002187)'></img></td><td>"+Adest+"</td></tr>";
	hubs = 	hubs+"<tr><td><text wh_color_check='"+colored+"' color_type='Dodixie' style='', >Dodixie</text>	</td><td width='16px'><img class='setDest' src='img/destSet.png' height='16' width='16'  onclick='setCharacterDest(30002659)'></img></td><td>"+Ddest+"</td></tr>";
	hubs = 	hubs+"<tr><td><text wh_color_check='"+colored+"' color_type='Rens' style='', >Rens</text>		</td><td width='16px'><img class='setDest' src='img/destSet.png' height='16' width='16'  onclick='setCharacterDest(30002510)'></img></td><td>"+Rdest+"</td></tr>";
	hubs = 	hubs+"<tr><td><text wh_color_check='"+colored+"' color_type='Rens' style='', >Hek</text>		</td><td width='16px'><img class='setDest' src='img/destSet.png' height='16' width='16'  onclick='setCharacterDest(30002053)'></img></td><td>"+Hdest+"</td></tr></tbody></table>";
	
	
	// hubs = "<text id=sigcountsys ><a wh_color_check='"+colored+"' color_type='Jita' style='', onclick='CCPEVE.showInfo(5, 30000142); return false;' href='#'>Jita</a>"+" "+"<img class='setDest' src='img/destSet.png' height='16' width='16'  onclick='setCharacterDest(30000142)'></img>"+Jdest+"<br>";
	// hubs = 				hubs+"<a wh_color_check='"+colored+"' color_type='Amarr' style='', onclick='CCPEVE.showInfo(5, 30002187); return false;' href='#'>Amarr</a>"+" "+"<img class='setDest' src='img/destSet.png' height='16' width='16'  onclick='setCharacterDest(30002187)'></img>"+Adest+"<br>";
	// hubs = 				hubs+"<a wh_color_check='"+colored+"' color_type='Dodixie' style='', onclick='CCPEVE.showInfo(5, 30002659); return false;' href='#'>Dodixie</a>"+" "+"<img class='setDest' src='img/destSet.png' height='16' width='16'  onclick='setCharacterDest(30002659)'></img>"+Ddest+"<br>";
	// hubs = 				hubs+"<a wh_color_check='"+colored+"' color_type='Rens' style='', onclick='CCPEVE.showInfo(5, 30002510); return false;' href='#'>Rens</a>"+" "+"<img class='setDest' src='img/destSet.png' height='16' width='16'  onclick='setCharacterDest(30002510)'></img>"+Rdest+"<br>";
	// hubs = 				hubs+"<a wh_color_check='"+colored+"' color_type='Rens' style='', onclick='CCPEVE.showInfo(5, 30002053); return false;' href='#'>Hek</a>"+" "+"<img class='setDest' src='img/destSet.png' height='16' width='16'  onclick='setCharacterDest(30002053)'></img>"+Hdest+"</text>";
	return hubs;
}

function getWhEffect(effect,statics,type){
	
	var getColorEff = function(staticClass){
		var stt = new Object();
		// console.log(staticClass,stt);
		switch(staticClass) {
		case '': stt.color = "FFFFFF"; stt.type = "No info"; return stt;		break;
		case '0': stt.color = "FFFFFF"; stt.type = "No info"; return stt;		break;
		case '1': stt.color = saved_options.colors.color_C1; stt.type = "C1"; return stt;		break;
		case '2': stt.color = saved_options.colors.color_C2; stt.type = "C2"; return stt;		break;
		case '3': stt.color = saved_options.colors.color_C3; stt.type = "C3"; return stt;		break;
		case '4': stt.color = saved_options.colors.color_C4; stt.type = "C4"; return stt;		break;
		case '5': stt.color = saved_options.colors.color_C5; stt.type = "C5"; return stt;		break;
		case '6': stt.color = saved_options.colors.color_C6; stt.type = "C6"; return stt;		break;
		case 'l': stt.color = saved_options.colors.color_Low; stt.type = "Low"; return stt;		break;
		case 'n': stt.color = saved_options.colors.color_Null; stt.type = "Null"; return stt;		break;
		case 'h': stt.color = saved_options.colors.color_High; stt.type = "High"; return stt;		break;
		case 's': stt.color = saved_options.colors.color_Abyss; stt.type = ""; return stt;		break;
		case 't': stt.color = saved_options.colors.color_Thera; stt.type = ""; return stt;		break;
		case 'p': stt.color = saved_options.colors.color_Pochven; stt.type = ""; return stt;		break;
		}
	};
	
	var colored = $jit.id('opt_colorStatics').checked;
	var statics1 = (statics.substring(0, 4) == 'Abys' ? statics1 = 'Abyss' : statics1 = statics.substring(0, 4)),
		statics1class = statics.substring(4, 5),
		statics1color = getColorEff(statics1class),
		statics2 = statics.substring(5, 9);
		// console.log(statics1class);
	if (statics2 != ""){
	var statics2class = statics.substring(9, 10),
		statics2color = getColorEff(statics2class),
		statics21 = "<br><text wh_color_check='"+colored+"' color_type="+statics2color.type+" style=>"+statics2+" "+statics2color.type+"</text>",
		statics22 = "<text wh_color_check='"+colored+"' color_type="+statics2color.type+" style=>,"+correctHole(statics2class).substr(0,1)+"</text>";}
	else {var statics21 = "",statics22 = "";}
	
	//console.log((statics));
	//console.log((statics1color.color));
	//console.log((statics1color.type));
	var statics11 = "<text></text>";
	var statics12 = "<text></text>";
	try {
		statics11 = "<text wh_color_check='" + colored + "' color_type=" + statics1color.type + " style=>" + statics1 + " " + statics1color.type + "</text>",
		statics12 = "<text wh_color_check='" + colored + "' color_type=" + statics1color.type + " style=>" + correctHole(statics1class).substr(0, 1) + "</text>";

	} catch (e) {
        console.log(e);
		console.log(effect, statics, type);
	}
	
	if(type == 'nameContainer'){var effect1 = statics12+statics22;}
	else{var effect1 = effect+statics11+statics21;}
	return effect1;
}


function b64DecodeUnicode(str) {
	// Going backwards: from bytestream, to percent-encoding, to original string.
	return decodeURIComponent(atob(str).split('').map(function(c) {
		return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
	}).join(''));
}

function setVis(object,margin,edge) {	object.style.marginLeft = margin;	if(edge){	setInvEdge();}};
//function setInv(object) {	object.style.marginLeft = "-999em";	};
function setInvEdge(){	//ОТКЛЮЧИЛ ВРЕМЕННО
	/* var SigHoles = document.getElementsByClassName("edgeSig1");
	for(var i=0; i<SigHoles.length; i++) 
	{
		SigHoles[i].style.display = "none";
	} */
	//document.getElementsByClassName("edgeSig1")[0].style.display = "none";
}
// function changeStyle(opt_Compact){
	// var elemName 				= $("span[id='nameContId']");
	// var elemEff 				= $("span[id='eff']");
	// var elemPilotsInfo 			= $("span[id='pilotsInfo']");
	// var elemPilots 				= $("span[id='char']");
	// // console.log(elemPilots);//switchVisible
	// for(var i=0;i<elemPilots.length;i++){
		// switchVisible(elemEff[i],elemName[i],!opt_Compact);
		// // switchVisible(elemPilots[i],elemPilotsInfo[i],!opt_Compact);
		// // switchVisible(elemPilotsInfo[i],elemPilots[i],!opt_Compact);
		
	// }
// }
function create_link(new_id,old_id,type){
	// console.log(new_id,old_id);
		var openDate = new Date();
		var jsonReady = {
			"sys1" : ""+new_id+"",
			"sys2" : ""+old_id+"",
			"date" : ""+openDate.getTime()+"",
			"status" : "0", 
			"founder" : "", 
			"alive" : "1",
			"deleted" : "",
			"type" : type,
			"user" : activeCharTab
			};
			// console.log(jsonReady);
	socket.emit('new_link', jsonReady);
}

function ligthLocation(that,arr){
	// console.log("%c name:"+activeCharTab,"background:red;color:black");
	// console.log(arr);
	// that.graph.eachNode(function(node){
		// //console.log(node);
		// if(node.id == homesystemID){node.data.$type = "icon";}else{node.data.$type = "circle";}
		// node.data.$blur = 0;  				
		// node.eachAdjacency(function(adj){
			// // console.log(adj.data);
			// adj.data.$blur = 0;  
			// adj.data.$color = adj.data.$colorTrue || '#CCCCBB';
		// });
	// });
	
	that.fx.animate();
	
	var found = false;
	// console.log(arr,clientInfo.charData);
	var currentChar = document.getElementsByClassName("active_top_selected");
	// console.log("%c name:"+currentChar[0].firstChild.innerHTML,"background:red;color:black");
	if(arr.length > 0){
		for(var i=0;i < arr.length; i++){
			if(arr[i]["solar_system_id"]){
				// console.log(arr[i]["solar_system_id"]);
				if(arr[i]["CharacterID"] == activeCharTab){
					found = true;
					var sys = fullmap[arr[i]["solar_system_id"]]["solarSystemName"];
					var node1 = that.graph.getNode(sys);
					// console.log(arr[i]["CharacterID"],sys,node1);
					// console.log(sys);
					if(node1){
						node1.data.$blur = 10;
						node1.data.$scolor = "#00ff00";
						if(node1.id == homesystemID){node1.data.$type = "homeLoc";}else{node1.data.$type = "location";}
						that.fx.animate();
					}
				}
			}
			else{
				console.log("%c ERROR GETTING THE SOLAR SYSTEM:"+arr[i],"background:red; color:black");
				// console.log();
			}
		}
	}
	if(!found){
		for(var i=0;i < clientInfo.charData.length; i++){
			if(clientInfo.charData[i]["CharacterID"] == activeCharTab){
				var sys = fullmap[clientInfo.charData[i]["solar_system_id"]]["solarSystemName"];
				var node1 = that.graph.getNode(sys);
				// console.log(sys);
				if(node1){
					node1.data.$blur = 10;
					node1.data.$scolor = "#00ff00";
					if(node1.id == homesystemID){node1.data.$type = "homeLoc";}else{node1.data.$type = "location";}
					that.fx.animate();
				}
			}
		}
	}
}


// {	
//console.log(that);
//ОТКЛЮЧИЛ ВРЕМЕННО
/* parent.wspace_dest.src = "routeparser/parse_wspace_dest.php";
//console.log(parent.wspace_dest.contentDocument.body.getElementsByClassName("cfrom"));
var cfrom = parent.wspace_dest.contentDocument.body.getElementsByClassName("cfrom");
var cto = parent.wspace_dest.contentDocument.body.getElementsByClassName("cto");

var sf = parent.wspace_dest.contentDocument.body.getElementsByClassName("startSys");
var stt = parent.wspace_dest.contentDocument.body.getElementsByClassName("endSys"); */
//console.log( parent.wspace_dest.contentDocument.body);
// console.log( that.graph);

//console.log(parent.wspace_dest.contentDocument.body.getElementsByClassName("cfrom"));

// for (var i = 0; i < cfrom.length; i++)
// {
	// var cf = cfrom[i].innerHTML;
	// var ct = cto[i].innerHTML;
	// var adj = that.graph.getAdjacence(cf,ct);
	// //console.log(adj);
	// adj.data.$color = "#00ff00";
	// adj.data.$blur = 10;
// }

// adj = that.graph.getAdjacence(sf[0].innerHTML,stt[0].innerHTML);
// if(adj){
// adj.data.$color = "#00ff00";
// adj.data.$blur = 10;}
// var node2 = that.graph.getNode(stt[0].innerHTML);
// node2.data.$blur = 15;
// node2.data.$scolor = "#ff0000";
// var node1 = that.graph.getNode(sf[0].innerHTML);
// //console.log(node1);
// node1.data.$blur = 15;
// node1.data.$scolor = "#00ff00";
// that.fx.animate({modes: ['edge-property:alpha'], duration: 2000 });
	 
// }
