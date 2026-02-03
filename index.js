class serverInfo{
	constructor(){
		this.charData = [];
		this.map = [];
	}
	charInfo(charID){
		var charData = this.charData;
		for(var i=0;i<charData.length;i++){
			if(charData[i]['CharacterID'] == charID){
				return charData[i];
			}
		}
		return null;
	}
	updInfo(charID,type,info){
		if(!this.charInfo(charID))return;
		this.charInfo(charID)[type] = info;
		if(info === false){this.charInfo(charID)[type] = false;}
	}
	updData(data){
		for(var i=0;i<data.length;i++){
			for(var type in data[i]){
				this.updInfo(data[i].CharacterID,type,data[i][type]);
			}
		}
	}
	charShip(ship,charID){
		var charData = this.charData;
		var found = false;
		for(var i=0;i<charData.length;i++){
			if(charData[i]['CharacterID'] == charID){
				found = true;
				charData[i]['ship_type_id'] = ship['ship_type_id'];
				charData[i]['ship_name'] = ship['ship_name'];
				charData[i]['ship_item_id'] = ship['ship_item_id'];
			}
		}
		if(!found){
			this.charAdd(charID);
			this.charShip(ship,charID);
		}
	}
	charSys(sys,charID){
		var charData = this.charData;
		var found = false;
		for(var i=0;i<charData.length;i++){
			if(charData[i]['CharacterID'] == charID){
				found = true;
				charData[i]['solar_system_id'] = sys;
			}
		}
		if(!found){
			this.charAdd(charID);
			this.charSys(sys,charID);
		}		
	}
	charOnline(online,charID){
		var charData = this.charData;
		var found = false;
		for(var i=0;i<charData.length;i++){
			if(charData[i]['CharacterID'] == charID){
				found = true;
				charData[i]['online'] = online;
			}
		}
		if(!found){
			this.charAdd(charID);
			this.charOnline(online,charID);
		}		
	}
	charAdd(charID){
		var charData = this.charData;
		charData.push({
			'CharacterID' : charID,
			'ship_type_id' : '',
			'ship_name' : '',
			'ship_item_id' : '',
			'solar_system_id' : '',
			'online' : ''
		});
	}
}

var clientInfo = new serverInfo();

function startingMap(task){

console.log("%c Loading canvas and requesting map from server","background: green; color: white");

// console.log('SWINCHING PAGE');
switchPage("map");
// create_link("","","normal");

var allTabs = document.getElementById("top_tr");
}

function rotateAnimation(id){
	for(var i=0;i<9;i++){
		setTimeout('document.getElementById("'+id+'").style.WebkitTransform = "rotate("+'+45*i+'+"deg)";', 20*i);
	}
}

function createTab(name,id,i,code){
	var org = document.querySelector("[buttonCharID='"+id+"']");//find and delete char button
	if(org)document.getElementById("top_tr").removeChild(org);
	var del = document.querySelector("[buttonCharID='"+id+"']");//find and delete char deletion button
	if(del)document.getElementById("top_tr").removeChild(del);
	
	var t = document.getElementById("top_tr");
	var tdTxt = document.createElement('text');
	var tdSta = document.createElement('text');
	var newTd = document.createElement('td');
		tdTxt.id = "intext";
		tdSta.id = "status-"+name;
		newTd.id = 'charTab-'+id;
		newTd.setAttribute('buttonCharID',id);
		newTd.style['z-index'] = 120+i;
		newTd.style.overflow = 'hidden';
		
		tdTxt.className = "tdText";
		tdSta.className = "tdText";
		newTd.className = "active_top";
		tdTxt.innerHTML = name;
		newTd.setAttribute("onClick", "changeActiveTab('"+id+"');");
		t.appendChild(newTd);
		newTd.appendChild(tdTxt);
		newTd.appendChild(tdSta);
		
		createDelBut("x","delChar",id,name,code);
		createAddBut("+","addChar",code);
}
function createDelBut(x,id,charId,name,code){
	// console.log("%c CHARID:"+charId,"background: red; color: black");
	if(!charId){console.log("%c NO CHARID SPECIFIED","background: red; color: black");return;}
	var t = document.getElementById("top_tr");
	var newTd = document.createElement('td');
		newTd.id = id;
		newTd.setAttribute('buttonCharID',charId);
		newTd.className = "active_top";
		newTd.innerHTML = x;
		// newTd.setAttribute("onClick", "clearCookies('"+charId+"');updateTop('"+name+"',true);deleteChar('"+charId+"')");
		newTd.setAttribute("onClick", "updateTop('"+name+"',true);deleteChar('"+charId+"','"+code+"')");
		// newTd.onClick = "clearAllCookies();";
		
		t.appendChild(newTd);
}
function createAddBut(name,id,unique){
	var but = document.getElementById('addChar');
	if(but)document.getElementById("top_tr").removeChild(but);
	// console.log("%c Creating Add Button tab for","background: #fff; color: orange");
	var t = document.getElementById("top_tr");
	var newTd = document.createElement('a');
		newTd.id = id;
		newTd.className = "active_top";
		newTd.innerHTML = name;
		newTd.setAttribute("onclick", "window.open('"+loginURL+"addcharacter_"+unique+"','_blank');");
		t.appendChild(newTd);
}
// <!-- automatic resize window after loading from login -->

function openUrl(){
	$('addChar').on('click', 'a[href^="http"]', function(event) {
	event.preventDefault();
	shell.openExternal(this.href);
});
	window.open(url);
}

function request_map(){
	console.log("asked for map");
	socket.emit('map_request', activeCharTab);
}

function isWh(id){
	if(!id)return;
	// console.log(id);
	var currentSys = fullmap[id];
	if((currentSys["sysclass"]!="High")
	&&(currentSys["sysclass"]!="Low")
	&&(currentSys["sysclass"]!="Null")
	&&(currentSys["sysclass"]!="Thera")
	&&(currentSys["sysclass"]!="Abyss")
	&&(currentSys["sysclass"]!="Pochven")){
		return true;}
	else {
		return false;}
}
