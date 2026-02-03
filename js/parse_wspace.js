function findExits(data){
	// $jit.id('destParsed').firstChild.innerHTML = '';
	var exits = [];
	for(var i=0; i<data.length; i++){
		if(data[i].alive == 1){
			if(!isWh(data[i].sys1)){exits[exits.length] = data[i].sys1}
			if(!isWh(data[i].sys2)){exits[exits.length] = data[i].sys2}
		}
	}
	// console.log(exits);
	for(var i=0; i<exits.length;i++){
		// console.log("processing system: "+fullmap[exits[i]].solarSystemName);
		// console.log("processing system: "+exits[i]);
		var ex = wparse(homesystemID,parseInt(exits[i]),data);
		if(ex.distance != -1){
		// console.log("getting distance2");
			var destSys = exits[i];
			// console.log("getting distance for: "+fullmap[destSys].solarSystemName);
			socket.emit('dest_request', { 'user': activeCharTab, 'id1': parseInt($jit.id('current_id').innerHTML), 'id2': parseInt(destSys) });

			//return;
			//getDistance(parseInt($jit.id('current_id').innerHTML),parseInt(destSys),function(data1,data2){
			//	// console.log(data1,data2);//data1 - safe путь, data2 - short путь
			//	var tbody = $jit.id('destParsed').firstChild;
			//	var searchName = fullmap[data1[data1.length-1]].solarSystemName+"_dest";
			//	// console.log(searchName);
			//	var searchSys = $jit.id(searchName);
			//	// console.log(document.getElementById('current_system').innerHTML);
			//	try{
			//		var safeCount = document.getElementById("safeDest_"+data2[data2.length-1]).innerHTML;
			//	}catch(e){
			//		var safeCount = '';
			//	}
			//	// console.log(safeCount);
			//	// var safeCount = document.getElementById("safeDest_"+data2[data2.length-1]).innerHTML;
			//	if((!searchSys) && (data2.length-1 != safeCount)){
			//	// var tr = document.createElement('tr');
			//	var shortDest = data1.length-1;
			//	var safeDest = data2.length-1;
			//	var tr = docCreateElem('tr',fullmap[data1[data1.length-1]].solarSystemName+"_dest",'activeLeft_table','','',tbody);			
			//	var td1 = docCreateElem('td',fullmap[data1[data1.length-1]].solarSystemName+"_destName",'',"<text style='color:"+fullmap[data1[data1.length-1]].color+"'>"+fullmap[data1[data1.length-1]].solarSystemName+"</text> ",'',tr);
			
			//	var td2 = docCreateElem('td',"safeDest_"+data1[data1.length-1],'',safeDest,'',tr);
			//	var td3 = docCreateElem('td','',''," ("+shortDest+") ",'',tr);
			//	var td4 = docCreateElem('td','','','jumps','',tr);
			//		// td1.id = fullmap[data1[data1.length-1]].solarSystemName+"_destName";;
			//		// td1.innerHTML = "<text style='color:"+fullmap[data1[data1.length-1]].color+"'>"+fullmap[data1[data1.length-1]].solarSystemName+"</text> ";
			//		td1.style.color = fullmap[data1[data1.length-1]].color;
			//		// td2.innerHTML = safeDest;
			//		// td2.id = "safeDest_"+data1[data1.length-1];
			//		// td3.innerHTML = " ("+shortDest+") ";
			//		// td4.innerHTML = "jumps";
			//		// tr.appendChild(td1);
			//		// tr.appendChild(td2);
			//		// tr.appendChild(td3);
			//		// tr.appendChild(td4);
			//	// tbody.appendChild(tr);	
			//	}
			//	else{
			//		// console.log(fullmap[data1[0]].solarSystemName);
			//	}
			//});
		}
	}
}
function wparse(system1, system2, data,type)
{
var k=0;
var result1 = [];
var result2 = [];
// if(type != "kspace"){
for(var i=0; i<data.length; i++){
	if(data[i].alive == 1){
		result1[k] = {"from" : data[i].sys1, "to" : data[i].sys2};
		result2[k] = {"from" : data[i].sys2, "to" : data[i].sys1};
		k++;
}}
var origin = system2;
// Jita 30000142
// Amarr 30002187
// Dodixie 30002659
// Rens 30002510
// Hek 30002053

// This will hold the result of our calculation
var jumpResult = {
    'origin' : origin,
    'destination' : system1,
    'jumps': 'N/A',
    'distance' : -1
};

// Load the jumps, by fetching the SolarSystemIDs from the Static Data Dump
// Results in an array like
// jumps = array(
//     'SystemID' => array('ID of neighbour system 1', 'ID of neighbour system 2', '...'),
//     '...'
// );

var jumps = {};
// jumps["from1"] = [];
// Assuming a mysql conversion of the Static Data Dump
// in the database evesdd
// console.log(result1.length);
var from1 = [];
var to1 = [];
for (var i=0; i<result1.length;i++) {
    from1[i] = result1[i]['to'];//+row['to_s'];
    to1[i]   = result1[i]['from'];//+row['from_s'];
//echo (from."<br>");
    if (!(jumps[from1[i]])) {
        jumps[from1[i]] = [];
    }
	// console.log(jumps);
	// console.log(i,from1[i],to1[i]);
	// jumps["from1"]
    jumps[from1[i]][jumps[from1[i]].length] = to1[i];//////////////????????????????????????????????????????
}

var from2 = [];
var to2 = [];
for (var i=0; i<result2.length;i++) {
    from2[i] = result2[i]['to'];//+row['to_s'];
    to2[i]   = result2[i]['from'];//+row['from_s'];
//echo (from."<br>");
    if (!(jumps[from2[i]])) {
        jumps[from2[i]] = [];
    }
	// console.log(jumps);
	// console.log(i,from2[i],to2[i]);
	// jumps["from1"]
    jumps[from2[i]][jumps[from2[i]].length] = to2[i];
}

// console.log(jumps);
// console.log(jumps[origin]);


if ((jumps[origin]) && (jumps[system1])) {
	// console.log("%c we have the prorer systems","background:yellow;color:black");
    // Target and origin the same, no distance
    if (system1 == origin) {
        jumpResult['jumps'] = origin;
        jumpResult['distance'] = 0;
    }
    // Target is a neigbour system of origin
    else if ((jumps[origin].indexOf(system1)!=-1) || (jumps[system1].indexOf(origin)!=-1)) {
	// console.log(jumps[origin].indexOf(system1),jumps[system1].indexOf(origin));
        jumpResult['jumps'] = origin + ', ' + system1;
        jumpResult['distance'] = 1;
    }
	else{
		 // Will contain the system IDs
		var resultPath = [];
        // Already visited system
	var  visitedSystems = {};
        // Limit the number of iterations
       var  remainingJumps = 9000;
        // Systems we can reach from here
       // var  withinReach = array(origin);//?????????????????????????????????????????????
       var  withinReach = jumps[origin];
		var k=0;
		// console.log(withinReach,remainingJumps,resultPath);
        while (withinReach.length-k > 0 && remainingJumps > 0 && resultPath.length-k < 1) {
		
            remainingJumps--;
            remainingJumps--;
            
// console.log("test");
            // Jump to the first system within reach
            var currentSystem = withinReach[k];
			k++;
            // Get the IDs of the systems, connected to the current
			// var links = [];
			var  links = jumps[currentSystem];
           var  linksCount = links.length;

            // Test all connected systems
            for(var i = 0; i < linksCount; i++) {
                var neighborSystem = links[i];
// console.log(fullmap[currentSystem].solarSystemName,fullmap[neighborSystem].solarSystemName);
                // If neighbour system is the target,
                // Build an array of ordered system IDs we need to
                // visit to get from thhe origin system to the
                // target system
                if (neighborSystem == system1) {
					// console.log("test");
                    resultPath[resultPath.length] = neighborSystem;
                    resultPath[resultPath.length] = currentSystem;
					
					// console.log("origin: "+fullmap[origin].solarSystemName+", "+origin);
					// console.log(visitedSystems);
					var limitCounter = 0;
                    // while ((visitedSystems[currentSystem] != origin)&&(limitCounter < 500)) {
						// limitCounter++;
                        // currentSystem = visitedSystems[currentSystem];
                        // resultPath[resultPath.length] = currentSystem;
						// // console.log("we have: "+visitedSystems[currentSystem]+":"+fullmap[visitedSystems[currentSystem]].solarSystemName+"; we need: "+origin+":"+fullmap[origin].solarSystemName);
                    // }
                    resultPath[resultPath.length] = origin;
                    resultPath.reverse();;
                    break;
                }
				
                // Otherwise, store the current - neighbour
                // Connection in the visited systems and add the
                // neighbour to the systems within reach
                else if (!(visitedSystems[neighborSystem])) {
					// console.log(fullmap[currentSystem].solarSystemName,fullmap[neighborSystem].solarSystemName);
					// console.log(currentSystem,neighborSystem);
                    visitedSystems[neighborSystem] = currentSystem;
                    withinReach[withinReach.length] = neighborSystem;
                }
            }
        }

        // If the result path is filled, we have a connection
        if (resultPath.length > 1) {
            jumpResult['distance'] = resultPath.length - 1;
            jumpResult['jumps'] = resultPath;
        }
	}
}
// console.log(jumpResult);
return jumpResult;
// console.log(resultPath);
}
function	getDistance(id1,id2,callback){
// var destSys = sysId;
// console.log(destSys);
	if(isWh(id1) || isWh(id2)) return "no way";
	var url1 = 'https://esi.evetech.net/v1/route/'+id1+'/'+id2+'/?datasource=tranquility&flag=shortest';
	var url2 = 'https://esi.evetech.net/v1/route/'+id1+'/'+id2+'/?datasource=tranquility&flag=secure';
	$.when(getAjax(url1)).done(function(data1){
		$.when(getAjax(url2)).done(function(data2){
			callback(data1,data2);
		});
	});

}
function 	getAjax(url,token,task,name){
	//if(charTokens[char_index[name]])	token = charTokens[char_index[name]].access_token;
	// console.log(token.substring(0, 10));
	return $.ajax({
		method: 'GET',
		url: url,   
		crossDomain: true,
		headers: {
			//'Authorization': 'Bearer ' + token
			"User-Agent": "Hole Controller"
		},
		success: function (result) {
			// console.log(errorCount[name]);
			console.log("%c Success AJAX request from server","background:green;color:white");
		},
		error: function (req, status, error) {
			var tokenStatus = $("text[class^='tdText'][id^='status']");
			console.log(
				`e:${req.status}; task:${task}; char:${name}; token:${token?.substring(0, 10) || "none"}`//; error:${errorCount[name]}`
			);
			// startTrack();
		}
	});
}