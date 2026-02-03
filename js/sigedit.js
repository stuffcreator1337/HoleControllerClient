function openSysTable(id,name,color,display,sigs){
	// var sigpage = document.getElementById("sigspanel");
	console.log(id);
	// console.log(sigpage.contentDocument );
	document.querySelector("#hiddenSigs").innerHTML = JSON.stringify(sigs);
	// console.log(document.querySelector("#hiddenSigs").innerHTML);
	insertSigs(sigs);
	document.getElementById("systemPanelID").style.display = display;
	// console.log(id,name,color);
	document.getElementById("sigs_systemname").innerHTML = name;
	document.getElementById("annotations_systemname").innerHTML = name;
	document.getElementById("hiddenSyID").innerHTML = id;
	document.getElementById("hiddenSyst").innerHTML = name;
	document.getElementById("sigs_systemname").style.color = "#"+color;
	document.getElementById("annotations_systemname").style.color = "#"+color;
	
	var syscont = document.getElementById(id);
	var text = syscont.children["nodeDivID"].children["sys_custom_name"].textContent;
	document.getElementById('system_name').value = text;
}
function insertSigs(sigs){

	var table = document.querySelector(".sigos");
	// console.log(table);
	table.innerHTML = "";
	if(sigs){
	// console.log(sigs);
	// console.log(sigs.length);
		 for ( var prop in sigs) {
			// console.log("adding sig "+sigs[i]);
			addSig(prop,sigs[prop],table,"#FFFFFF");
		}
	}
	var sigcount = document.querySelector(".leftform").children["sigs"].children["numberofsigs"];
	var tablecount = document.querySelector(".sigos").children.length;
	document.querySelector("#hiddenSigC").innerHTML = tablecount;
	sigcount.innerHTML = tablecount;
}
// function setdest(sys) {
	// parent.wspace_dest.src = "routeparser/parse_wspace_dest.php?sys2=" + sys;
// }
// function resizeSigs(tab){
	// //console.log("resizeSigs");
	// /* parent.linkedit.height = parent.linkedit.contentDocument.getElementsByTagName("form")[tab].scrollHeight+18; */
	
// }
function switchtab(tab1){
	var label = document.getElementsByTagName("label");
	console.log(label);
	for(var tab in label){
		// console.log(label[tab]);
		if(label[tab])label[tab].id = "checkedno";
	}
	label[tab1].id = "checkedyes";
	
	var form = document.getElementsByTagName("form");
	for(var tab in form){
		// console.log(form[tab].style);
		if(form[tab].style)form[tab].style.display = "none";
	}
	form[tab1].style.display = 'block';
}
function defineSigType(sig){
	if (sig == "Wormhole")	{		return "Wormhole";		}
	if (sig == "W")	{		return "Wormhole";		}
	if (sig == "Data Site")	{		return "Data Site";		}
	if (sig == "D")	{		return "Data Site";		}
	if (sig == "Gas Site")	{		return "Gas Site";		}
	if (sig == "G")	{		return "Gas Site";		}
	if (sig == "Relic Site")	{		return "Relic Site";	}
	if (sig == "R")	{		return "Relic Site";	}
	if (sig == "C")	{		return "";				}
	if (sig == "")	{		return "";				}
}
function defineShortType(sig){
	if (sig == "Wormhole")	{		return "W";		}
	if (sig == "Data Site")	{		return "D";		}
	if (sig == "Gas Site")	{		return "G";		}
	if (sig == "Relic Site"){		return "R";	}
	if (sig == "")			{		return "C";				}
}
function addSig(sig,data,table,color){
	// console.log(data);
var tr = newObj('tr');
	tr.id = sig;
	tr.style.color = color;
	// tr.className = "tableSigCl";
var td = newObj('td');
	td.id = sig;
	td.className = "tableSigCl";
	//td.style = "color:"+color;
	// td.innerHTML = "<text id='tableSigId' style='color:"+color+"'>"+sig.substr(0,7)+"</text>";
	td.innerHTML = sig;
	// console.log()
	// td.style.color = color;
//console.log(parent.linkedit.contentDocument.body);
var sigType = defineSigType(data.type);
//console.log(sig.substr(7,1));
table.appendChild(tr);
tr.appendChild(td);
var td2 = newObj('td');
	td2.className = 'tableSigCl';
	td2.innerHTML = sigType;
	td2.id = 'tableSigType';
	// td2.style.color = color;
tr.appendChild(td2);
var tdate = newObj('td');
	tdate.className = 'tableSigCl';
	tdate.id = 'tableSigTimeAgo';
	// console.log(new Date().getTime(),data.time);
	var ti = new Date().getTime()-data.time;
	// console.log(ti);
	tdate.innerHTML = msToTime(ti,'min')+" ago";
	tr.appendChild(tdate);	
var Hdate = newObj('td');
	Hdate.className = 'tableSigCl';
	Hdate.id = 'tableSigTimeOpen';
	// console.log(data);
	Hdate.innerHTML = data.time;
	Hdate.style.display = 'none';
	tr.appendChild(Hdate);	
var delBut = newObj('a');
	//delBut.id = sig;
	delBut.id = 'delsig';
	delBut.innerHTML = 'X';
	delBut.className = 'tableSigCl';
	delBut.style.color = 'orange';
	delBut.onclick = function(e) { 
		e = e || window.event;
		deleteSig(sig,table); 
	};
tr.appendChild(delBut);	
}
function deleteSig(sig,table){
	// var body = parent.linkedit.contentDocument.body;
	var syst = document.querySelector("#hiddenSyst").innerHTML;
	//console.log(sig);
	var row = table.children[sig.substr(0,7)];
	row.parentNode.removeChild(row);
	/* parent.sigEdit.src = "action/sigedit.php?system="+syst+'&sig='+sig.substr(0,8)+'&task=delete';	 */
	var sigcount = document.querySelector(".leftform").children["sigs"].children["numberofsigs"];
	var tablecount = document.querySelector(".sigos").children.length;
	sigcount.innerHTML = tablecount;
	/* parent.linkedit.height = document.getElementsByTagName("form")[0].scrollHeight+18; */
	sendToFile(document.querySelector(".sigos"));
}
function updateButton(){
	//console.log("test");
	// var body = parent.linkedit.contentDocument.body;
	var input = document.querySelector(".textarea");
	// console.log(document.querySelector("#hiddenSigs").innerHTML);
	var oldSigs = JSON.parse(document.querySelector("#hiddenSigs").innerHTML);
	// console.log(oldSigs);
	var systID = document.querySelector("#hiddenSyID").innerHTML;
	var syst = document.querySelector("#hiddenSyst").innerHTML;
	//первичная проверка на корректность инфы
	if(input.value ==''){
		socket.emit('sigs_request', {'user':activeCharTab, 'id':systID, 'name':syst, 'color':document.querySelector("#hiddenSyst").style.color});
		return;}
	//замена по шаблону
	var output = input.value.replace(/\s+Cosmic Signature\s+Wormhole.+AU/g, "Ws1");   //удаляем wh au
	var output = output.replace(/\s+Cosmic Signature\s+Wormhole.+m/g, "Ws1");   		//удаляем wh m & km
	var output = output.replace(/\s+Источники сигналов\s+Червоточина.+а.е./g, "Ws1"); //удаляем вх ае 
	var output = output.replace(/\s+Источники сигналов\s+Червоточина.+м/g, "Ws1");   	//удаляем вх м и км

	var output = output.replace(/\s+Cosmic Signature\s+Gas Site.+AU/g, "Gs1");	//удаляем gas au
	var output = output.replace(/\s+Cosmic Signature\s+Gas Site.+m/g, "Gs1");		//удаляем gas m & km
	var output = output.replace(/\s+Источники сигналов\s+ГАЗ.+а.е./g, "Gs1");		//удаляем газ ае
	var output = output.replace(/\s+Источники сигналов\s+ГАЗ.+м/g, "Gs1");		//удаляем газ м и км

	var output = output.replace(/\s+Cosmic Signature\s+Data Site.+AU/g, "Ds1");	//удаляем Data au
	var output = output.replace(/\s+Cosmic Signature\s+Data Site.+m/g, "Ds1");	//удаляем Data m & km
	var output = output.replace(/\s+Источники сигналов\s+ДАННЫЕ.+а.е./g, "Ds1");	//удаляем ДАННЫЕ ае
	var output = output.replace(/\s+Источники сигналов\s+ДАННЫЕ.+м/g, "Ds1");		//удаляем ДАННЫЕ м и км

	var output = output.replace(/\s+Cosmic Signature\s+Relic Site.+AU/g, "Rs1");	//удаляем gas au
	var output = output.replace(/\s+Cosmic Signature\s+Relic Site.+m/g, "Rs1");	//удаляем gas m & km
	var output = output.replace(/\s+Источники сигналов\s+АРТЕФАКТЫ.+а.е./g, "Rs1");	//удаляем газ ае
	var output = output.replace(/\s+Источники сигналов\s+АРТЕФАКТЫ.+м/g, "Rs1");	//удаляем газ м и км

	var output = output.replace(/\s+Cosmic Signature\s+.+AU/g, "Cs1");	//удаляем gas au
	var output = output.replace(/\s+Cosmic Signature\s+.+m/g, "Cs1");	//удаляем gas m & km
	var output = output.replace(/\s+Источники сигналов\s+.+а.е./g, "Cs1");	//удаляем газ ае
	var output = output.replace(/\s+Источники сигналов\s+.+м/g, "Cs1");	//удаляем газ м и км'Ws1');

	var output = output.replace(/\s+Cosmic Anomaly\s+.+AU/g, "As1");   //удаляем wh au
	var output = output.replace(/\s+Cosmic Anomaly\s+.+m/g, "As1");   //удаляем wh au
	//var output = input.value.replace(pattern,replace);

	//проверяем на корректность инфы
	if (output.indexOf("s1")==-1){console.log("no sigs");return;}
	var output_count = output.match(/.{1,10}/g);
	var output_countlength = output_count.length;
	if(output_count[output_countlength-1].length != 10){output = ''; input.value='';return;}
	//разделяем сиги поштучно
	var output_splitted = output.split(/\s/);

	var new_out = [];
	var k=0;
	for(i=0;i<output_splitted.length;i++){
		// console.log(output_splitted[i].substr(7,3));
		if(!(output_splitted[i].substr(7,3) == "As1")){
			
			new_out[k] = output_splitted[i];
			k++;
		}
	}


	var table = document.querySelector(".sigos");
	var newsigs = '';
	var replaceSig = '';
	var checkbox = document.querySelector("#checkbox_sigs");
	var delSigs = oldSigs;
	// console.log(oldSigs);
	var k=0;
	for(var i=0;i<new_out.length;i++){
		//удаляем лишнее, все не-Cosmic Signature
		// console.log(new_out[i].substr(7,10));

			console.log(new_out[i]);
			//поштучно вносим их
			var sigshort = new_out[i].substr(0,7);
			var trsig = table.children[sigshort];
			//если такой сиги нет - вносим новую зеленую
			
			if(!trsig){
				console.log("new sig - "+sigshort);
				addSig(new_out[i].substr(0,7),{'time': new Date().getTime(),'type': new_out[i].substr(7,1)},table,"#00FF00");
				newsigs = newsigs+new_out[i];
				replaceSig = replaceSig+new_out[i];
				delSigs = checkForDel(sigshort,delSigs);
			}
			//если сига есть -
			else{//- смотрим определен ли класс во вставляемых
				trsig.children["tableSigTimeOpen"].innerHTML = new Date().getTime();//обновляем время у уже имеющейся сигнатуры
				trsig.children["tableSigTimeAgo"].innerHTML = msToTime(0,'min')+" ago";//обновляем время у уже имеющейся сигнатуры
				if(new_out[i].substr(7,1) != "C"){//если во вставляемых класс определен - вносим его
					trsig.children["tableSigType"].innerHTML = defineSigType(new_out[i].substr(7,1));//выставляем класс, второй столбец
					newsigs = newsigs+new_out[i];//вносим в список отправляемых новых сиг
					replaceSig = replaceSig+new_out[i];//вносим в список отправляемых новых сиг
				}else{
					// console.log(trsig.children);
				replaceSig = replaceSig + trsig.children[sigshort].innerHTML+defineShortType(trsig.children["tableSigType"].innerHTML)+'s1';
				}
				
				if(checkbox.checked){
					delSigs = checkForDel(sigshort,delSigs);
				}
			}
		
	}
	if(checkbox.checked){
		// console.log(delSigs.length);
		
		for ( var prop in delSigs) {
			// console.log(prop);
			// console.log(prop.substr(0,7));
			var sigshort = prop;
			var trsig = table.children[sigshort];
			console.log('%c RED '+prop,'background:red;color:black');
			trsig.style.color = '#FF0000';
			
		}
	}
	var sigcount = document.querySelector(".leftform").children["sigs"].children["numberofsigs"];
	var tablecount = document.querySelector(".sigos").children.length;
	sigcount.innerHTML = tablecount;
	input.value='';	
	sendToFile(table);
	document.querySelector("#checkbox_sigs").checked = false;
}
function checkForDel(sig,sigs){
	for ( var prop in sigs) {
		if(sig == prop){
			//формируем список на удаление, если сига есть в старых сигах и в новых - вычеркиваем из списка
			delete sigs[prop];
			//если сиги нет среди только что вставленных - оставляем её в списке на удаление
		}
	}	
	return sigs;
}
function sendToFile(table){
	var SigTime = new Date();
	var sigToSend2 = {};
	// var k=0;
	for(var i=0; i < table.children.length; i++){
		// console.log(table.children[i].children,'background:black;color:white');
		if(table.children[i].style.color != "rgb(255, 0, 0)"){
		// console.log('%c RED','background:red;color:black');
			// console.log(table.children[i]);
			var sigId = table.children[i].children[0].innerHTML;
			var sigTy = table.children[i].children["tableSigType"].innerHTML;
			var time = table.children[i].children["tableSigTimeOpen"].innerHTML;
			
			//вставить проверку на integer, иначе - вставлять новое время, проверить может быть для всех сиг всегда слать новое время
			if(sigId != ''){
				// console.log(time);
				sigToSend2[sigId] = { 'time': time, 'type' : sigTy};
				// k++;
			}			
		}	
	}
	console.log(sigToSend2);
	socket.emit('sigs_from_client', {"user":activeCharTab, "id": 	document.getElementById("hiddenSyID").innerHTML, "system":	document.getElementById("hiddenSyst").innerHTML, "sigs":sigToSend2});
}
function deleteAll(){
	// var body = parent.linkedit.contentDocument.body;
	var table = document.querySelector(".sigos");
	var syst = document.querySelector("#hiddenSyst").innerHTML;
	table.innerHTML = '';
	/* parent.sigEdit.src = "action/sigedit.php?system="+syst+'&task=deleteAll'; */
}
function newObj(type){
		var obj = document.createElement(type);
		return obj;
	}
function residents(){
	// var body = parent.linkedit.contentDocument.body;
	// var res = document.querySelector("#hiddenSigs").innerHTML;
	
}
function clear_area_content(){
	// console.log(document.getElementById('hiddenSyID'));
	// console.log(document.getElementById('hiddenSyID').textContent);
	var syscont = document.getElementById(document.getElementById('hiddenSyID').textContent);
	var text = syscont.children["nodeDivID"].children["sys_custom_name"].textContent;
	document.getElementById('system_name').value = text;
}
function sendSysName(that){
	// console.log(that);
	// console.log(document.getElementById("hiddenSyID").innerHTML);
	// console.log(document.getElementById('system_name'));
	// console.log(document.getElementById('system_name').value);
	var sysname = document.getElementById('system_name').value;
	// if(sysname != ''){
	var sysid = document.getElementById("hiddenSyID").innerHTML;
	// console.log(document.getElementById(sysid).children);
	document.getElementById(sysid).children["nodeDivID"].children["sys_custom_name"].value = sysname;
	document.getElementById(sysid).children["nodeDivID"].children["sys_custom_name"].innerHTML = sysname;
	socket.emit('sysname_from_client', {"user":activeCharTab, "id": 	sysid, "system":	document.getElementById("hiddenSyst").innerHTML, "name":sysname});		
	// }
	clear_area_content();
}
function resUpdateButton(){
	// var body = parent.linkedit.contentDocument.body;
	// var corpInput = document.querySelector("#resCorpInput");
	// var posInput = document.querySelector("#resPosInput");
	// var commInput = document.querySelector("#resCommInput");
	// var syst = document.querySelector("#hiddenSyst").innerHTML;
	// var syID = document.querySelector("#hiddenSyID").innerHTML;
	// var corpID = document.querySelector("#hiddenCoID").innerHTML;
	// var checkbox = document.querySelector("#checkbox_ali");
	// if(checkbox.checked){
		// var res_type = 'ali';
	// }
	// else{
		// var res_type = 'corp';
	// }
	// var allposes = '';

	// //console.log(posInput.value);
	// var poses = posInput.value.match(/[0-9]{1,2}-[0-9]{1,2}/g);
	// //console.log(poses);

	
	// if(poses){
		// console.log("poses = yes");
		// var allposes = poses.join('p');
	// }
	// if(corpInput.value){
		// /* parent.sigEdit.src = "action/sigedit.php?system="+syst+'&common='+encodeURIComponent(commInput.value)+'&poses='+allposes+'&corpName='+encodeURIComponent(corpInput.value)+'&corpID='+corpID+'&resType='+res_type+'&task=resUpdate&sysid='+syID;
		// console.log(parent.sigEdit.src);	 */
		// //console.log(corpID);
		// if((corpID == 0)||(corpID == '')){
			// //console.log(corpID);			
			// corpID = getCorpID(corpInput.value, syst, res_type);
		// }			
	// }else{
		// if(!commInput.value){
		// /* parent.sigEdit.src = "action/sigedit.php?system="+syst+'&task=deleteRes';
		// console.log("deleting info: "+parent.sigEdit.src); */
		// }
	// }
}
function residentsDisplay(){
	// var body = parent.linkedit.contentDocument.body;
	// var corpInput = document.querySelector("#resCorpInput");
	// var posInput = document.querySelector("#resPosInput");
	// var commInput = document.querySelector("#resCommInput");
	// var syst = document.querySelector("#hiddenSyst").innerHTML;
	// var syID = document.querySelector("#hiddenSyID").innerHTML;
	// var corpID = document.querySelector("#hiddenCoID").innerHTML;
	// var checkbox = document.querySelector("#checkbox_ali");
	// if(checkbox.checked){
		// var res_type = 'ali';
	// }
	// else{
		// var res_type = 'corp';
	// }
	// var allposes = '';
	// var output = corpInput.value;
	// //console.log(posInput.value);
	// var poses = posInput.value.match(/[0-9]{1,2}-[0-9]{1,2}/g);
	// //console.log(poses);
	// // for(i=0;i<poses.length;i++){
		// // //console.log(poses[i]);
		// // //allposes = allposes + poses[i]
	// // }
	// // var corpN = output.match(/\w*[0-9]*\w+\s+/g);
	// // var corpName = corpN.join('');
	// // console.log(corpName);
	
	// if(poses){
		// var allposes = poses.join('p');
	// }
	// //console.log(corpID);
	// if(corpID == 0){
		// //console.log(corpID);
		// if(corpInput.value){
			// corpID = getCorpID(corpInput.value, syst);
		// }			
	// }
	/* parent.sigEdit.src = "action/sigedit.php?system="+syst+'&common='+encodeURIComponent(commInput.value)+'&poses='+allposes+'&corpName='+corpInput.value+'&corpID='+corpID+'&resType='+res_type+'&task=resUpdate&sysid='+syID; */
	//console.log(parent.sigEdit.src);
}
function eveInfo(type, id){
	// CCPEVE.showInfo(type, id);
	// return false;
}
function getCorpID(name, syst, type){
	// console.log("get ID");
	// var url = 'https://api.eveonline.com/eve/CharacterID.xml.aspx?names='+name;
	// var x = new XMLHttpRequest();
	// x.open("GET", url, true);
	// x.onreadystatechange = function () {
		// if (x.readyState == 4 && x.status == 200)
		// {
			// var doc = x.responseXML;
			// var corpID = doc.getElementsByTagName("row")[0].getAttribute("characterID");
			// parent.sigEdit.src = "action/sigedit.php?system="+syst+'&corpID='+corpID+'&task=idUpdate';
			// console.log(corpID);
			// return corpID;
		// }
	// };
	// x.send(null);
}
function reload(){
// console.log(parent.linkedit);
// parent.linkedit.contentWindow.location.reload(true);
}