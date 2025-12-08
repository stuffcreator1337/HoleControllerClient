function kbparse(data) {
	// var a1 = 'sys_'+data1.solar_system_id;
	// var a2 = 'kill_'+data1.killmail_id;	
	// color = "red";
	getCookieJS("lastKill", false, function(cok){
		console.log("lastKill");
		console.log(cok);
		if(cok){
		var val = JSON.parse(cok);
		console.log(val,data);
		// console.log(val);
		for(var s in data) {
			if(val[s]){
				// console.log("system found");
				var color = "white";
				var namecont = document.getElementById(s.substring(4, 12));
				// console.log(namecont.children["nodeDivID"].children["nameContId"].style);
				console.log(s,data[s],val[s]);
				if(data[s] == ''){
					color = "white";
				}else if(data[s] == val[s]){
					// console.log("no new kills",prop,val[prop],result[0].killmail_id);
					color = "orange";
				}else{
					// console.log("yes new kills",prop,val[prop],result[0].killmail_id);
					color = "red";
					// val[prop] = result[0].killmail_id;
				}
				namecont.children["nodeDivID"].children["nameContId"].style.color = color;
			}else{
				val[s] = data[s];
			}			
		}
		console.log(val);
		setCookie('lastKill',val);
		// console.log(val);
		
		}
		// callback(result,color);
	});
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