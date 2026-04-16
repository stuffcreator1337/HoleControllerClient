function kbparse() {
	//console.log(clientInfo);
	for (var i = 0; i<clientInfo.systems_data.length; i++) {
		var system_info = clientInfo.systems_data[i];
		var color = "white";
		var namecont = document.getElementById(system_info.solarSystemID);
		var j = 0;
		for (var user in system_info.last_zkb.user_data) {
			color = "white";
			user = system_info.last_zkb.user_data[j];
			var code1 = user.code;
			var code2 = unique_code;
			if (typeof code1 === 'string') {
				code1 = Number(code1.replace(/\D/g, ''));
			}
			if (typeof code2 === 'string') {
				code2 = Number(code2.replace(/\D/g, ''));
			}
			if (code1 == code2)
			{
				if(isRecentKill(system_info.last_zkb.timestamp))color = "orange";
				if(user.viewed_zkb < system_info.last_zkb.killmail_id)
				{
					color = "red";
				}					
			}
			j++;
		}
		if (namecont)namecont.children["nodeDivID"].children["nameContId"].style.color = color;		
	}
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
}