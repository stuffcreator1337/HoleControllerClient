function searchCorp(that){
	// console.log(that);
	// console.log(that.value);
	var corpList = document.getElementById('corpList');
	console.log(corpList);
	if(that.value.length > 3){
		var string = that.value;
		var url = 'https://esi.evetech.net/v2/search/?categories=corporation&datasource=tranquility&language=en-us&search='+string+'&strict=false';

		xmlrequest(url,function(data){
			var corps = data.corporation;		
			// console.log(corps);
			if(!corps){console.log("Nothing found.");}
			else if(corps.length > 10){
				console.log("Too much data to display");
				corpList.innerHTML = '';
				for(let i=0;i<10;i++){
					var url2 = 'https://esi.evetech.net/v4/corporations/'+corps[i]+'/?datasource=tranquility';
					xmlrequest(url2,function(corpData){					
						var newCorp = newObj('option');
						// console.log(corpData);
						newCorp.value = corpData.name;
						newCorp.innerHTML = corpData.name;
						corpList.appendChild(newCorp);
					});
				}
			}
			else{
				console.log(corps.length,corps);
				// console.log(corps);
				console.log(corpList);
				corpList.innerHTML = '';
				var newCorp = newObj('option');
					newCorp.value = '';
					newCorp.innerHTML = '';
					corpList.appendChild(newCorp);
				for(let i=0;i<corps.length;i++){
					var url2 = 'https://esi.evetech.net/v4/corporations/'+corps[i]+'/?datasource=tranquility';
					xmlrequest(url2,function(corpData){					
						var newCorp = newObj('option');
						// console.log(corpData);
						newCorp.value = corpData.name;
						newCorp.innerHTML = corpData.name;
						corpList.appendChild(newCorp);
					});
				}
			}
		});	
	}
}
function changeOption(opt){
	var corpInput = document.getElementById('corpInput');
	console.log(corpInput);
	corpInput.value = opt;
}
function xmlrequest(url,callback){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function ()
	{
		//console.log("test");
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200 && xmlhttp.responseText != "[]") 
		{
			callback(JSON.parse(xmlhttp.responseText));
		}
		else {
			console.log(xmlhttp.status);
		}
	};
	xmlhttp.open("GET", url, true);
	xmlhttp.send();	
}