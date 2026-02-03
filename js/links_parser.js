function defineStaticType(sys_class,id,sys){	
	var static_type = "";
	if (sys_class == "Null") {
		var regId = sys["regionID"];
		//when in Null system return regin name instead
		static_type = regions[0]["regions"][regId]["regionName"];
	}
	else if ((sys_class == "High") || (sys_class == "Low")) {
		static_type =
			"J" + (sys["secur_j"] - 1) + "(" + (sys["short_j"] - 1) + ")" +
			"A" + (sys["secur_a"] - 1) + "(" + (sys["short_a"] - 1) + ")" +
			"D" + (sys["secur_d"] - 1) + "(" + (sys["short_d"] - 1) + ")" +
			"R" + (sys["secur_r"] - 1) + "(" + (sys["short_r"] - 1) + ")" +
			"H" + (sys["secur_h"] - 1) + "(" + (sys["short_h"] - 1) + ")";
	}
	else if(sys_class == "Abyss"){static_type = 'Abyss';}
	else if(sys_class == "Thera"){static_type = 'Thera';}
	else if(sys_class == "Pochven"){static_type = 'Pochven';}
	else (static_type = whSysInfo[0]["wh_info"][id]["statics"])
	return static_type;
}

function parse(json){
	json = correctJS(json);
	var otherLine = function(sys1,sys2,arr,j,jhome){
		var j2 = {};
		for (var k=0; k < arr.length; k++)
		{
			if((arr[k]["part1"]["system"] == sys1) && (arr[k]["parsed"] == 0))
			{
				//console.log(sys1);
				j2 = other1(j,arr[k],"part1","part2",arr[k]["part1"],jhome,sys1,arr,sys2);
			}
			else if((arr[k]["part2"]["system"] == sys1) && (arr[k]["parsed"] == 0))
			{
				//console.log(sys1);
				j2 = other1(j,arr[k],"part2","part1",arr[k]["part2"],jhome,sys1,arr,sys2);
			}
		}
		return j2;
	};
	var other1 = function (json_main,arrPart,c1,c2,part,jhome,sys1,arr,sys2){		
		json_main = child(sys1,arr,json_main, 0);
		json_main = child(sys2,arr,json_main, 0);
		jhome.adjacencies[jhome.adjacencies.length] = addEdge(arrPart,"none",part)["adjacencies"][0];
	};
	var child = function(sys1,arr,j, count){
		count++;
		//console.log(count);
		var j2 = {};
		var next_json = {};
		for (var  k=0; k < arr.length; k++)
		{
			if((arr[k]["part1"]["system"] == sys1) && (arr[k]["parsed"] == 0))
			{				
				arr[k]["parsed"] = 1;
				j = another_part(j,arr[k],"part1","part2");
				j2 = child(arr[k]["part2"]["system"],arr,j, count);
			}
			else if((arr[k]["part2"]["system"] == sys1) && (arr[k]["parsed"] == 0))
			{
				arr[k]["parsed"] = 1;
				j = another_part(j,arr[k],"part2","part1");
				j2 = child(arr[k]["part1"]["system"],arr,j, count);
			}
		}
		return j;
	};
	var create_part = function(id){
		// //параметры первой системы///////////////////////////////////////////////////////////////////////////////////////////////////
		// console.log(typeof(id))
		var sys = fullmap[id];
		// console.log(id,sys);
		var static_type = defineStaticType(sys["sysclass"],id,sys);

		
		var sys_shape1;
		if (id == homesystemID)	{	sys_shape1 = "icon";	}
		else						{	sys_shape1 = "circle";	}

		var effect = "";
		if(sys["sysclass"].substring(0, 1) == "C"){
			var WhSysInfo = whSysInfo[0]["wh_info"][id];
			effect = WhSysInfo["effect"];
			if(effect){effect = effect+"<br>";}
		}
		var  part = {};
		part["system"] = sys["solarSystemName"];
		part["class"] = sys["sysclass"];
		part["color"] = sys["color"];
		part["shape"] = sys_shape1;
		part["effect"] = effect;
		part["statics"] = static_type;
		part["ID"] = id;
		// part["residents"] = "test";	
		// part["residentsID"] = "";	
		// part["residentsAli"] = "";	
		part["date"] = "";
		//console.log(part);
		return part;
	};
	var set_edge_opt = function(edgeOpt,p1,part2){
		// console.log('test');
		var labelCenter;
		var edge_color,
			edge_type;
		if (edgeOpt["tc"] == 1) {edge_type="punktir";console.log('punktir here');} else {edge_type="line";}
		if (edgeOpt["mc"] == 1) {edge_color="#FF4719";} else {edge_color="#CCCCBB";}
		if (edgeOpt["fs"] == 1) {edge_color="#CC6699";}								//параметр фригсайза перекрывает крит по массе, т.к. фригодырка не может быть в крите по массе
		if (edgeOpt["type"] == 'labelline'){
			edge_color = "#0000ff";	
			edge_type = "labelline";	

			labelCenter = edgeOpt["labelCenter"];
			}

		var CritTime = new Date(),
			HoleTime = edgeOpt["date"];

		//если близится время смерти дыры - линия пунктиром
		if (CritTime.getTime() > HoleTime + 1000*60*60*20)	
		{	edge_type="punktir";	}

		if ((p1["class"] == 'C13') || (part2["class"] == 'C13')){edge_color="#CC6699";}

		var ed = {};
		ed["type"] = edge_type;
		ed["color"] = edge_color;
		ed["HoleTypes1"] = "";
		ed["HoleTypes2"] = "";
		ed["labelCenter"] = labelCenter;
		ed["hole1"] = "";
		ed["hole2"] = "";

		return ed;
	};
	var addNode = function(node){		
		var j={
		"id": ""+node["ID"]+"",
		"name": ""+node["system"],//+" ("+node["class"]+")",
		"data": {
			"$color": ""+node["color"]+"",
			"$class": ""+node["class"]+"",
			"$sysid": ""+node["ID"]+"",
			"$effect": ""+node["effect"]+"",
			"$statics": ""+node["statics"]+"",
			"$type": ""+node["shape"]+"",
			"$date": ""+node["date"]+"",
			"$pos": ""+node["pos"]+"",
			"$residents": ""+node["residents"]+"",
			"$residentsID": ""+node["residentsID"]+"",
			"$residentsAli": ""+node["residentsAli"]+"",	
			"$blur": "0",
			"$scolor": "#fff"
			}
			};
			//console.log(j);
		return j;
	}
	var addEdge = function(ed,type,sys){
		//console.log(edge);
		var  j ={
		"adjacencies": [
			{
			"nodeTo": ""+sys["ID"]+"",
			"data": {
					"$color": ""+ed["edge"]["color"]+"",
					"$colorTrue": ""+ed["edge"]["color"]+"",
					"$type": ""+type+"",
					"$labelCenter": ""+ed["edge"]["labelCenter"]+"",
					"$HoleTypes1": ""+ed["edge"]["HoleTypes1"]+"",
					"$HoleTypes2": ""+ed["edge"]["HoleTypes2"]+"",
					"$Sys1": ""+ed["part1"]["system"]+"",
					"$Sys2": ""+ed["part2"]["system"]+"",
					"$HoleSys1": ""+ed["edge"]["hole1"]+"",
					"$HoleSys2": ""+ed["edge"]["hole1"]+"",
					"$blur": "0",
					"$scolor": "#fff"
					}
			}
		]};
		//console.log(j);
		return j;
	};
	var addPart = function(arr,a,b){
		//console.log(arr);
		var jsonPart = 	addNode(arr[a]);
		jsonPart.adjacencies = addEdge(arr,arr["edge"]["type"],arr[b])["adjacencies"];
		return jsonPart;
	};
	var another_part = function(j2,arr,p1,p2){
		j2[j2.length] = addPart(arr,p1,p2);
		j2[j2.length] = addPart(arr,p2,p1);
		return 	j2;
	};
	
	var home_static_type = defineStaticType(fullmap[homesystemID]["sysclass"],homesystemID,fullmap[homesystemID]);
	var homesystemSavedColor = saved_options.colors.color_C5;
	switch(fullmap[homesystemID]["sysclass"]) {
		case 'C1':homesystemSavedColor = saved_options.colors.color_C1;break;
		case 'C2':homesystemSavedColor = saved_options.colors.color_C2;break;
		case 'C3':homesystemSavedColor = saved_options.colors.color_C3;break;
		case 'C4':homesystemSavedColor = saved_options.colors.color_C4;break;
		case 'C5':homesystemSavedColor = saved_options.colors.color_C5;break;
		case 'C6':homesystemSavedColor = saved_options.colors.colors.color_C6;break;
		default: homesystemSavedColor = saved_options.colors.color_C5;
	}
	var new_json,
		homepart = {
			"id": "", 
			"name": whSysInfo[0]["wh_info"][homesystemID]["name"],
			"data": {
				"$color": homesystemSavedColor, 
				"$type": "icon",
				"$class": fullmap[homesystemID]["sysclass"],
				"$effect": whSysInfo[0]["wh_info"][homesystemID]["effect"],
				"$statics": home_static_type,
				"$sysid": homesystemID,
				"$residents": "",
				"$pos": "",
				"$date": ""
			},
			"adjacencies": []
		};
	new_json = [homepart];
	var ar = [];
	var k=0;
	for (var i = 0; i < json.length; i++) {
		if(json[i]["alive"] != "0"){
			var part1 = create_part(json[i]["sys1"]),
				part2 = create_part(json[i]["sys2"]),
				edge = set_edge_opt(json[i],part1,part2),			
				parsed = 0;			
			ar[k] = {part1,part2,parsed,edge};
			k++;
		}
	}
	// console.log(ar);
	var child_json = child("homepart", ar, new_json, 0);
	//console.log(child_json);
		

	/* теперь для других цепочек, они будут соединены нивидимыми линиями с домашкой и отрисовываться от центра */
	var json3 = {};
	for (var k=0; k < ar.length; k++)
	{	
		if (ar[k]["parsed"] == 0)
		{
			otherLine(ar[k]["part1"]["system"], ar[k]["part2"]["system"], ar, child_json, homepart);
		}
	}
	
	//console.log(json3);
	
	return new_json;
}
function spacetreeParse(json){
	// console.log(json);
	// var nJson = clone(json);
	json = correctJS(json);
			// console.log(json);
	var createTree = function(j,parentTree,num){
		var adj1 = [],
			next1 = false,
			next2 = false;
		for(var i=0;i<j.length;i++){
			if(j[i].sys1 == parentTree && j[i].alive == 1 && !j[i].refined){
				j[i].refined = true;
				adj1.push(createTree(j,j[i].sys2,num+1));
				for(var k=0;k<j.length;k++){
					if(((j[k].sys1 == j[i].sys1)&&(j[k].sys2 == j[i].sys2))||((j[k].sys1 == j[i].sys2)&&(j[k].sys2 == j[i].sys1))){j[k].marked = true;}
				}
			}
			if(j[i].sys2 == parentTree && j[i].alive == 1 && !j[i].refined){
				j[i].refined = true;
				adj1.push(createTree(j,j[i].sys1,num+1));
				for(var k=0;k<j.length;k++){
					if(((j[k].sys1 == j[i].sys1)&&(j[k].sys2 == j[i].sys2))||((j[k].sys1 == j[i].sys2)&&(j[k].sys2 == j[i].sys1))){j[k].marked = true;}
				}
			}
		}
		var sys = fullmap[parentTree];
		var effect = "";
		if(sys["sysclass"].substring(0, 1) == "C"){
			var WhSysInfo = whSysInfo[0]["wh_info"][parentTree];
			effect = WhSysInfo["effect"];
			if(effect){effect = effect+"<br>";}
		}
		var static_type = defineStaticType(sys["sysclass"],parentTree,sys);
		var tree = {      
			id: parentTree,
			name: sys["solarSystemName"],
			data: {
				"$color": sys["color"], 
				// "$type": "icon",
				"$class": sys["sysclass"],
				"$effect": effect,
				"$statics": static_type,
				"$sysid": parentTree
			},
			children: adj1
		};
		// console.log(num);
		//вернулись в корень, начало, присоединяем прочие связи
		if(num == 0){
			// console.log(j);
			for(var i=0;i<j.length;i++){
				j[i].refined = false;
				if(!j[i].marked && j[i].alive == 1){
					// console.log(j[i]);
					j.push({	alive 	:	"1",
								date	:   new Date().getTime(),
								deleted :	"",
								founder	:	"",
								status	:	"999",
								sys1	:	j[i].sys1,
								sys2	:   homesystemID});
					var json2 = createTree(j,homesystemID,0);
					// console.log(json2);
					for(var k=0;k<j.length;k++){
						if(!j[k].refined){var json2 = createTree(j,homesystemID,0);}
					}
					return json2;
					// tree = json2;
					// return  json2;
					// console.log(json2);
				};
			}			
		}
		// console.log(tree);
		return tree;
	};
	var json1 = createTree(json,homesystemID,0);
	var n2Json = [];
	
	// var j = json;
	// for(var i=0;i<j.length;i++){
		// if(!j[i].marked && j[i].alive == 1){
			// console.log(j[i]);
			// j.push({	alive 	:	"1",
						// date	:   new Date().getTime(),
						// deleted :	"",
						// founder	:	"",
						// status	:	"999",
						// sys1	:	j[i].sys1,
						// sys2	:   homesystemID});
			// var json2 = createTree(j,homesystemID,0);
			// return  json2;
			// // console.log(json2);
		// };
	// }	
			
			
	// console.log(json1);
	return json1;
}
function markSysParsed(s1,s2,j){
	for(var i=0;i<j.length;i++){
		if(((j[i].sys1 == s1)&&(j[i].sys2 == s2))||((j[i].sys1 == s2)&&(j[i].sys2 == s1))){j[i].marked = true;}
	}
}
function CheckStatus999(id1,j){
			// console.log(j.length);
	for(var i=0;i<j.length;i++){		
		// console.log(id1,j[i].sys1,j[i].sys2,j[i].status);
		if((((id1 == j[i].sys1)&&(j[i].sys2 == homesystemID))||((id1 == j[i].sys2)&&(j[i].sys1 == homesystemID)))&&(j[i].status == 999)){
			// console.log(id1,j.sys1,j.sys2,j.status);
			return true;
			
		}
	}
}