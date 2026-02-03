function kbparse(new_kills) {
	getCookieJS("lastKill", false, function(saved_cokie){
		var old_kills = {};
		if (saved_cokie) {
			old_kills = JSON.parse(saved_cokie);
		}
		//console.log(saved_cokie);
		//console.log("old_kills", old_kills);
		actual_kills = new_kills;
		//console.log("actual_kills", actual_kills);
		for (var system in new_kills) {
			var color = "white";
			var namecont = document.getElementById(system.substring(2, 10));
			if (isRecentKill(new_kills[system][1])) {
				//console.log("is kill recent?", isRecentKill(new_kills[system][1]), system);
				//console.log(old_kills[system], new_kills[system]);
				//console.log("old_kills", typeof (old_kills), old_kills);
				try {
					//console.log(new_kills[system][1], old_kills[system][1]);
					if (new_kills[system][1] == old_kills[system][1]) {
						//console.log("1 no new kills in system", system);
						color = "orange";
					} else {
						console.log("%c new kills in system " + system, "background:orange;color:white");
						color = "red";
					}
				}
				catch (e) {
					console.log("%c new kills in system " + system, "background:orange;color:white");
					color = "red";
				}
			}
			if (namecont)namecont.children["nodeDivID"].children["nameContId"].style.color = color;
		}
	});
}		
function isRecentKill(killmail_time, hours = 12) {
	let killDate;
	// Определяем тип входных данных
	if (typeof killmail_time === 'string') {
		// Это ISO строка
		killDate = new Date(killmail_time);
	} else if (typeof killmail_time === 'number') {
		// Это timestamp
		killDate = new Date(killmail_time);
	} else if (killmail_time instanceof Date) {
		// Это уже объект Date
		killDate = killmail_time;
	} else {
		// Неизвестный формат
		console.error("Неизвестный формат времени:", killmail_time);
		return false;
	}
	const now = new Date();
	const diffMs = now - killDate;
	return diffMs <= hours * 60 * 60 * 1000;
}
function callAjaxfunc(sysid,callback) {		
		return;
$.ajax({
    type: 'GET',
    url: 'https://zkillboard.com/api/systemID/'+sysid+'/pastSeconds/43200/',

    success: function(result) {
	// console.log("test5");
	// console.log(sysid,result);
		var color = "white";
		if(result.length>0){

			var url1 = 'https://esi.evetech.net/latest/killmails/'+result[0].killmail_id+'/'+result[0]["zkb"].hash+'/?datasource=tranquility';
			$.when(getAjax(url1)).done(function(data1){	
				var a1 = 'sys_'+data1.solar_system_id;
				var a2 = 'kill_'+data1.killmail_id;	
				color = "red";
				getCookieJS("lastKill", false, function(cok){
					// console.log(cok);
					if(cok){
					var val = JSON.parse(cok);
					// console.log(val);
					for(var prop in val) {
						// console.log(result[0].solar_system_id);
						if (prop == a1){
							// console.log("system found");
							if(val[prop] == a2){
								// console.log("no new kills",prop,val[prop],result[0].killmail_id);
								color = "orange";
							}else{
								// console.log("yes new kills",prop,val[prop],result[0].killmail_id);
								color = "red";
								// val[prop] = result[0].killmail_id;
							}
						}
						else{
							// val[result[0].solar_system_id] = result[0].killmail_id;
						}
						
					}
					setCookie('lastKill',val);
					// console.log(val);
					
					}
					callback(result,color);
				});
			});
		}
		
	
	
       
		
		//var token = result;
    },
    //complete: function (jqXHR, textStatus) {
    //},
    error: function (req, status, error) {
    //alert(error);
    console.log(error);
    }
});
}