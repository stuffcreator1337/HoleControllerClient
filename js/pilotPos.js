function updPilotPos(data){
	// console.log(data);
	var pilotsTable = document.getElementById("pilotPos");
	var pilotsTable_c = document.getElementById("pilotPos").children;
	var new_loctime = new Date().getTime();
	for(let i=0; i < data.length; i++){
		var old_loctime = new Date(data[i]['last_logout']).getTime();
		// console.log(new_loctime > old_loctime+180000);
		if((data[i]['online'] == false)&&(new_loctime > old_loctime+180000)){
			if(document.getElementById(data[i]['CharacterID']+'_tr'))document.getElementById(data[i]['CharacterID']+'_tr').remove();
		}
	}
	for(let i=0; i < data.length; i++){
		// console.log(data[i]);
		if(data[i]['CharacterName']){
			var new_tr = createPilotTr(data[i]['CharacterName'],
			data[i]['solar_system_id'],
			data[i]['ship_type_id'],
			data[i]['last_login'],
			data[i]['last_logout'],
			data[i]['CharacterID'],
			data[i]['online']);
			// console.log(new_tr);
			if(new_tr){pilotsTable.appendChild(new_tr);}
		}
		
	}	
	opt_setNewColor(document.getElementById("color_back"),saved_options.colors.color_back);
}
function docCreateElem(type,id,cl,inner,disp,appendTo,charID,online){

	var el = document.getElementById(id);
	if(!inner) inner = '';	

	if(!el){
		var el = document.createElement(type);
		el.className = cl;
		el.id = id;
		// console.log(inner);			
		if(inner != 'old') el.innerHTML = inner;
		el.style.display = disp;
		if(appendTo)appendTo.appendChild(el);
			// el.setAttribute('color_type','back');
		return el;
	}
	else{
		if(inner == 'old') inner = el.innerHTML;
		if(el.innerHTML != inner) {
			el.innerHTML = inner;	
				if(id=='sys_class'){
		// console.log(inner);
				}
		}
			// el.setAttribute('color_type','back');
		return el;
	}
}
function createPilotTr(name,loc,ship,last_time,loc_time,charID,online){
	// var tr = document.createElement('tr');
	// console.log(loc);
	if(!loc)return;
		var sys = fullmap[loc]["solarSystemName"];
		// console.log(sys);
		// var sys = "test1";

		var div0 = new docCreateElem('tr',charID+"_tr",'charLocation');
		// var div0 = document.createElement('tr');
			// div0.className = 'charLocation';
			
		var csst = new docCreateElem('span','','csstooltip');
			// csst.className = 'csstooltip';		
			// csst.className = 'csstooltip';		
			
			
		var td1= new docCreateElem('text',"pilotNameTd-"+name,'fullname',name,'none');
		// console.log(name);
		// var td1= document.createElement('text');
			// td1.id = "pilotNameTd-"+name;
			// td1.className = "fullname";
			// td1.innerHTML = name;
			// td1.style.display = 'none';
			csst.appendChild(td1);
			
			csst.appendChild(serverImage(ship+"_32","shipImgSmall",14,14));
			
		var td2= new docCreateElem('span','','');
		// var td2= document.createElement('span');	
			td2.style.color = '#000';
			
			td2.appendChild(serverImage(ship+"_64","shipImgLarge",64,64));
			csst.appendChild(td2);
			
			div0.appendChild(csst);
			
		var td3= new docCreateElem('text','',''," "+name.substring(0, 15));
		// var td3= document.createElement('text');
			// td3.innerHTML = " "+name.substring(0, 15);
			div0.appendChild(td3);
			
		var td4= new docCreateElem('text','','pilotName',name,'none');
			div0.appendChild(td4);
		
		var tdL = new docCreateElem('span','','sysLoc');
			tdL.setAttribute('color_type','back');
		
		var t1= new docCreateElem('text','','',"(");
		// var t1= document.createElement('text');
			// t1.innerHTML = "(";
			
		var aid= new docCreateElem('a',"pilotSys-"+name,'systemName',sys);
		// var aid= document.createElement('a');
			// aid.id = "pilotSys-"+sys;
			aid.setAttribute('sysID',loc);
			// console.log(fullmap[loc]["sysclass"]);
			aid.style.color = getColor(fullmap[loc]["sysclass"]);
			// aid.className = "systemName";
			aid.setAttribute("onmouseover", "highlight('"+loc+"');");
			aid.setAttribute("onmouseout", "unhighlight('"+loc+"');");
			// aid.innerHTML = sys;	

		var t2= new docCreateElem('text','','',")  ");
			// t2.innerHTML = ")  ";
			
		// var t3= document.createElement('text');
		var charStatus = document.createElement('text');
			charStatus.className = 'lastTime';
		if(online){
			charStatus.style.color 	= "green"; 
			charStatus.innerHTML	= "Online";			
		}else{
			var new_time = new Date().getTime();
			var pers_outtime = new Date(loc_time).getTime() + 1800000;		//время после которого показывать перса не надо, это 30 минут
			var location_outtime = new Date(loc_time).getTime() + 120000;	//время которое учитывается при движении перса, это 2 минуты
			var timeLeft = pers_outtime - new_time;
			var loctLeft = location_outtime - new_time;
			var seconds = 1800000 - timeLeft;	
			var seconds2 = 120000 - loctLeft;	
				if(seconds < 120000){
						charStatus.style.color 	= "green"; 
						charStatus.innerHTML	= "Active";
					
					// if(seconds2<120000){
						// charStatus.style.color 	= "green"; 
						// charStatus.innerHTML	= "Moving";
					// }else{
						// charStatus.style.color 	= "green"; 
						// charStatus.innerHTML	= "Active";
					// }		
				}else{
					charStatus.style.color 	= "orange"; 
					charStatus.innerHTML	= Math.round(seconds/60000) + " min";
					// charStatus = "<text class='lastTime' style='color:orange'>".round($seconds/60)." мин</text>";
				}
			}
			// t3.innerHTML = last_time;
			
			// console.log(loc_time,clientInfo.charData);
			// console.log(loc_time,clientInfo.charInfo(charID));
			// console.log(new_time,pers_outtime);
			tdL.appendChild(t1);
			tdL.appendChild(aid);
			tdL.appendChild(t2);
			
			tdL.appendChild(charStatus);
			div0.appendChild(tdL);
			// console.log(new_time < pers_outtime,online,charID);
			if ((new_time < pers_outtime)||(online == true)){
			div0.setAttribute('color_type','back');
				return div0;
			}
	
}

	// $pers_date =(strtotime($row[4]));
	// $loc_time =(strtotime($row[14]));
	// $createDate = new DateTime($row[4]);
	// $pers_time = $createDate->format('H:i:s');
	// $pers_outtime = $pers_date+1800;	//время после которого показывать перса не надо, это 30 минут
	// $location_outtime = $loc_time+120;	//время после которого показывать перса не надо, это 2 минуты
	// if ($sys_date < $pers_outtime){

	// $timeLeft = $pers_outtime-$sys_date;
	// $loctLeft = $location_outtime-$sys_date;
	// $seconds = 1800-$timeLeft;
	// $seconds2 = 120-$loctLeft;
	// if($seconds < 120){
		// if($seconds2<120){
			// $status = "<text class='lastTime' style='color:green'>Moving </text>";
		// }else{
			// $status = "<text class='lastTime' style='color:green'>Active </text>";
		// }		
	// }else{
		// $status = "<text class='lastTime' style='color:orange'>".round($seconds/60)." мин</text>";
	// }

function serverImage(name,cname,w,h){
	var	img = new Image();
	// console.log(cname);
		img.className = cname;
		img.src = "https://image.eveonline.com/Type/"+name+".png";
		img.style.height = h;
		img.height = h;
		img.style.width = w;
		img.width = w;
	return img;
}
function highlight(sys){
	var infovis = document.getElementById("infovis");
	var canvaswidget = infovis.children["infovis-canvaswidget"];
	var search = canvaswidget.children["infovis-label"].children;
	// console.log(search);
	// console.log(sys);
	var obj = search;
		for (var k in obj)
		{
			// console.log(typeof obj[k],obj[k].id.indexOf(sys));
			if ((typeof obj[k] == "object")&&(obj[k].id.indexOf(sys) == 0))
			{	
		// console.log(obj[k]);
				// var style = obj[k].style;
				var style = obj[k].firstChild.children["nameContId"].style;
				style.background = "-webkit-gradient(linear,left top,left bottom,color-stop(0%,#b30000),color-stop(100%,#660000))";

				style.fontSize = "1.0em";
				borderBottomStyle = style.borderBottomStyle;
				borderBottomWidth = style.borderBottomWidth;

				style.border = "1px solid #a1a1a1";
				style.webkitBorderRadius = "3px";
				style.padding = "2px";

				return;
			}
		}
		
}

function unhighlight(sys){
	//alert("test");
	var infovis = document.getElementById("infovis");
	var canvaswidget = infovis.children["infovis-canvaswidget"];
	var search = canvaswidget.children["infovis-label"].children;
	// console.log(search);
	var obj = search;
		for (var k in obj)
		{
			if ((typeof obj[k] == "object")&&(obj[k].id.indexOf(sys) == 0))
			{
				var style = obj[k].firstChild.children["nameContId"].style;
				//console.log(borderBottomStyle);
				style.background = "";
				style.fontSize = "0.85em";
				style.border = "";
				style.borderBottomStyle = borderBottomStyle;
				style.borderBottomWidth = borderBottomWidth;
				style.webkitBorderRadius = "";
				style.padding = "";
			}
		}		
}
	// "<div class='charLocation'><span class='csstooltip' >";
	// "<text class='fullname' style='display:none'>$row[3] ($row[9])</text>";
		// "<img class='shipImgSmall' src='https://image.eveonline.com/Type/".$row[11]."_32.png' height='14' width='14' />";
			// "<span style='color:#000;font-size: 13px;'>";
				// "<img class='shipImgLarge' src='https://image.eveonline.com/Type/".$row[11]."_64.png' height='64' width='64' />";
			// "</span>";
	// "</span>";
	// " <text class='pilotName'>".$row[1]."</text>";
	// " (<a id='".$row[3]."' class='systemName' onmouseover='javascript: var $row[3] = &#34;".$row[3]."&#34;; highlight($row[3])' onouseout='javascript: var $row[3] = &#34;".$row[3]."&#34;; unhighlight($row[3])' style='color:$sys_color1', onclick='CCPEVE.showInfo(5, $row[10]); return false;' href='#'>$row[3]</a>) ".$pers_time;	
	// "</div>";

Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = this.length - 1; i >= 0; i--) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}

function checkExistSystem(id,arr){
	for(var i=0;i<arr.length;i++){
	// console.log(arr[i].firstChild.children["sys_id"].innerHTML);
		if(arr[i].firstChild.children["sys_id"].innerHTML == id)return arr[i].firstChild;
	}
	return false;
}

function pilotHighlight(container,small_icon) {
// console.log(container,small_icon);
var Parser = document.getElementById("infovis-canvaswidget");
if(!Parser) return;
// var infovis = Parser.contentDocument.body.children.infovis;
var systems = Parser.getElementsByClassName("node");
// console.log(infovis.children["infovis-canvaswidget"].getElementsByClassName("node"));
var pilotName = document.getElementsByClassName("pilotName");
var systemName = document.getElementsByClassName("systemName");
var systemFull = document.getElementsByClassName("fullname");
var csstooltip = document.getElementsByClassName("csstooltip");
var charLocation = document.getElementsByClassName("charLocation");
var shipImg = document.getElementsByClassName("shipImgSmall");
var shipLrg = document.getElementsByClassName("shipImgLarge");
	// console.log(systems);
// console.log("==========================================================================================");
// console.log("SysNumber: "+systemName.length);
 // console.log("Number: "+systems.length);
for(var i=0; i<systems.length; i++) 
{
	// console.log(systems[]);
	systems[i].firstChild.children[container].innerHTML = "";
	systems[i].firstChild.children["char"].style.display = "none";
}
var pilotsinSys = {};
var not_shown_pilots = {};
for(var i=0; i<systemName.length; i++) {
// console.log(systemName[i]);
	var sysFullName = systemName[i].innerHTML;
	var sysID = systemName[i].getAttribute('sysID');
	not_shown_pilots[sysFullName] = not_shown_pilots[sysFullName] || 0;
	pilotsinSys[sysFullName] = pilotsinSys[sysFullName] || 0;
	// console.log("sysFullName: "+sysFullName);
	// console.log(systems[sysID]);
	// console.log(checkExistSystem(sysID,systems));
	var finfSys = checkExistSystem(sysID,systems);
	if (finfSys){
		// console.log("%c Number of pilots in "+sysFullName+"system:"+pilotsinSys[sysFullName],"background: grey;color:black");
		if((pilotsinSys[sysFullName]>5)&&(!small_icon)&&(i != systemName.length)){
			not_shown_pilots[sysFullName] = not_shown_pilots[sysFullName] + 1;
		}else{
			pilotsinSys[sysFullName] = pilotsinSys[sysFullName] + 1;
			var tooltipStart = "<span class='csstooltip' >";
			var tooltipEnd = "</span>";
			var pilot = " "+pilotName[i].innerHTML;
			var pilotPos = finfSys.children[container].innerHTML;
			var ship = "";
			if(small_icon) ship = "<img class='shipImgSmall' src='"+shipImg[i].src+"' height='14' width='14' /img>";
			// var shipLarge = "<span style='color:#000;'>";
			// shipLarge = shipLarge+ "<img class='shipImgLarge' src='"+shipLrg[i].src+"' height='64' width='64' />";
			// shipLarge = shipLarge+  "</span>";
			var maxlength = 15;
			pilot = pilot.substring(0, maxlength);
			finfSys.children["char"].style.display = "";
			//console.log(systems[sysFullName]);
			if (pilotPos.indexOf(pilot) == "-1")
			{finfSys.children[container].innerHTML =  pilotPos + tooltipStart + ship + pilot + tooltipEnd + "<br>";}
			
			// var charList = charList + pilotName[i].innerHTML + "<br>";
			//console.log(charList);
		}
	};
}
for(var i=0; i<systemName.length; i++) {
	var sysFullName = systemName[i].innerHTML;
	var sysID = systemName[i].getAttribute('sysID');
	var finfSys = checkExistSystem(sysID,systems);
	if(not_shown_pilots[sysFullName]){
		console.log("%c Number of not shown pilots in "+sysFullName+"system:"+not_shown_pilots[sysFullName],"background: grey;color:black");
	
		var tooltipStart = "<span class='csstooltip' >";
		var tooltipEnd = "</span>";
		var pilotPos = finfSys.children[container].innerHTML;
		// console.log(systems[sysFullName].children[container]);
		docCreateElem('span','not_shown_number','csstooltip',"And "+not_shown_pilots[sysFullName]+" more",'',finfSys.children[container]);
	}	
}


}	