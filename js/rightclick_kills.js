function kill_rightclick(nodeselected, core, nodekills, graph) 					{	
Label = document.getElementsByClassName("edgeSig1_vis");
if(!Label.length)
{
	// console.log(nodeselected);
	var newMenu = document.createElement('nav');
	newMenu.className = "kills-menu";
	newMenu.id = "kills-menu";
	var killMenu = document.getElementById("kills-menu");
	if(!killMenu)
	{	document.body.appendChild(newMenu);	}
	function getPosition(e) 
	{
		var posx = 0;
		var posy = 0;
		if (!e) var e = window.event;
		if (e.pageX || e.pageY) 
		{
			posx = e.pageX;
			posy = e.pageY;
		} 
		else if (e.clientX || e.clientY) 
		{
			posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
		}

		return {
				x: posx,
				y: posy
				}
	}
	var killsmenuClassName = "kills-menu";
	var killsmenuItemClassName = "kills-menu__item";
	var killsmenuLinkClassName = "kills-menu__link";
	var killsmenuActive = "kills-menu--active";						
	var menu = document.querySelector("#kills-menu");
	//console.log(killMenu);
	var menuItems = menu.querySelectorAll(".kills-menu__item");
	
	var taskItemClassName = "task";
	var taskItemInContext;
	var clickCoords;
	var clickCoordsX;
	var clickCoordsY;
	var menuState = 0;
	var menuWidth;
	var menuHeight;
	var menuPosition;
	var menuPositionX;
	var menuPositionY;
	var windowWidth;
	var windowHeight;
	var opened = 0;
	function init()						{	
		contextListener();
		clickListener();
		keyupListener();
		resizeListener();
	}
	function clickInsideElement( e, className,clicktoff,contoff) 						{								
		var el = e.srcElement || e.target;
		if (( nodekills == 'circle') || ( nodekills.id == 'nameContId') || (el.className == "killimg") || (el.className == "kills-menu__link"))
		{	
			//console.log("link=line? - " + (nodekills == "line") + "; clicked inside? - " + (el.classList.contains(className)));
			//console.log(el);
			document.removeEventListener ('click',clicktoff,false);
			document.removeEventListener ('click',contoff,false);
			return el;
		} 	
		return false;
	}
	function clickeventoff(e) 						{
		//console.log("clickeven");
		var clickeElIsLink = clickInsideElement( e, killsmenuLinkClassName, clickeventoff, conteventoff );
		if ( clickeElIsLink ) 
		{	//console.log("clickeElIsLink = YES");
			//console.log(clickeElIsLink);
			e.preventDefault();
			//killslist( clickeElIsLink );
			menuItemListener( clickeElIsLink );
			document.removeEventListener ('click',clickeventoff,false);
			document.removeEventListener ('click',conteventoff,false);
		} 
		else 
		{
			var button = e.which || e.button;
			if ( button === 1 ) 
			{
				toggleMenuOff();
			}
		}
	}
	
	function conteventoff(e) 						{
		//console.log("contevent");
		taskItemInContext = clickInsideElement( e, taskItemClassName);
		
		if ( taskItemInContext ) 
		{
			//console.log("taskItemInContext = YES");
			//console.log(nodekills);
			e.preventDefault();
			toggleMenuOn();
			positionMenu(e);	
			nodekills = "opened";
		} 
		else 
		{
			//console.log("taskItemInContext = NO");
			taskItemInContext = null;
			toggleMenuOff();								
			document.removeEventListener ('click',clickeventoff,false);
			document.removeEventListener ('contextmenu',conteventoff,false);
		}
	}
	function contextListener() 						{
		//console.log("contextListener");
		if ( nodekills == "circle"  || nodekills.id == 'nameContId') 
		{	//console.log("nodekills = circle");
			document.addEventListener( "contextmenu", conteventoff);
		}
	}
	function clickListener() 						{
		document.addEventListener( "click", clickeventoff);
	}
	function keyupListener() 						{
		window.onkeyup = function(e) 
		{
			if ( e.keyCode === 27 ) 
			{
				toggleMenuOff();
			}
		}
	}
	function resizeListener() 						{
		window.onresize = function(e) 
		{
			toggleMenuOff();
		};
	}
	function toggleMenuOn() 						{
		if ( menuState !== 1 ) 
		{
			menuState = 1;
			// console.log(graph);
			//menu.classList.add( killsmenuActive );
			document.getElementById("kills-menu").className = "kills-menu kills-menu--active";



			getCookieJS("lastKill", false, function (cok) {

				var a1 = 's_' + nodeselected.data.$sysid;
				//console.log(actual_kills);
                if (actual_kills == {}) return;
				var a2 = actual_kills[a1];	

				//console.log("Полученная кука:", cok);
				//console.log("Данные для сохранения:", a1, a2);

				// Инициализируем объект
				var val = {};
				if (cok) val = JSON.parse(cok);
				for (var sys in val) {
					if (val[sys] == null || val[sys] === undefined || val[sys] == "" || sys.length == 12) {
						delete val[sys];
					}
				}
				//console.log("До добавления - val[a1]:", val[a1]);
				if (a1 in val) {
					val[a1] = a2;
					//console.log("Обновлён существующий ключ:", a1);
				} else {
					val[a1] = a2;
					//console.log("Ключ не существует, добавляем:", a1);
				}
				//console.log("После добавления - val[a1]:", val[a1]);

				// Сохраняем
				//console.log('stringify lastKill перед сохранением:', JSON.stringify(val));
				//console.log('JSON lastKill перед сохранением:', val);
				//console.log('Количество ключей:', Object.keys(val).length);

				setCookie('lastKill', val);
			});	

			var starthtml = '<ul class="kills-menu__items">';
			menu.innerHTML = starthtml;
			// console.log(myArr[i]);	<img src="https://image.eveonline.com/Type/'+myArr[i].victim.ship_type_id+'_32.png" height="16" width="16" />
			menu.innerHTML = menu.innerHTML + ' <li class="kills-menu__item"><a href="https://zkillboard.com/system/' + nodeselected.data.$sysid + '" target="_blank" class="killhref">Open system zkb page</a></li>';
			var endhtml = '</ul>';
			menu.innerHTML = menu.innerHTML + endhtml;
			return;


			var nameonly = graph.clearName(nodeselected.id);

			var xmlhttp = new XMLHttpRequest();
			//var url = "toparse1.json";
			var url = "https://zkillboard.com/api/systemID/"+nodeselected.data.$sysid+"/pastSeconds/43200/";
			// setCookie('lastKill',{});
			//var url = "https://zkillboard.com/api/system/30001398/pastSeconds/50000/";	
			xmlhttp.onreadystatechange = function (link)
			{				
				//console.log("test");
				if (xmlhttp.readyState == 4 && xmlhttp.status == 200 && xmlhttp.responseText != "[]") 
				{
					// console.log(xmlhttp.responseText);
					var myArr = JSON.parse(xmlhttp.responseText);
					// console.log(myArr);
					if(myArr){
						var url1 = 'https://esi.evetech.net/latest/killmails/' + myArr[0].killmail_id + '/' + myArr[0]["zkb"].hash + '/?datasource=tranquility';
						console.log(myArr[0]);
						console.log(actual_kills);
						$.when(getAjax(url1)).done(function(data1){							
							var a1 = 'sys_'+data1.solar_system_id;
							var a2 = data1.killmail_id;	
							console.log(a1, a2, nodeselected.data.$sysid);	
							var d = new Date();
							d.setTime(d.getTime() + (1*24*60*60*1000));
							var expires = "expires="+d.toUTCString();		
							//console.log("kill cookie updated");		
							getCookieJS("lastKill", false, function(cok){
								// console.log(cok);
								// console.log(a1,a2);
								// console.log(JSON.parse(cok));
								var val = {};
								if(cok){
									var val = JSON.parse(cok);
								}
								val[a1] = a2;
								console.log('lastKill', val);
								setCookie('lastKill',val);								
							});							
						});
					}
					// document.cookie=myArr[0].solar_system_id+"LastKill="+myArr[0].killmail_id+"; " +expires;
					
					var starthtml = '<ul class="kills-menu__items">';
					menu.innerHTML = starthtml;
						// console.log(myArr[i]);	<img src="https://image.eveonline.com/Type/'+myArr[i].victim.ship_type_id+'_32.png" height="16" width="16" />
					menu.innerHTML = menu.innerHTML + ' <li class="kills-menu__item"><a href="https://zkillboard.com/system/'+ nodeselected.data.$sysid +'" target="_blank" class="killhref">Open system zkb page</a></li>';
					var endhtml = '</ul>';
					menu.innerHTML = menu.innerHTML + endhtml;

				}
				else {
					menu.innerHTML = "";
					}
			};
			xmlhttp.open("GET", url, true);
			xmlhttp.send();
			//menu.innerHTML = menu.innerHTML + '<a href="#" class="kills-menu__link" data-action="Mass"><i class="fa fa-eye"></i> Test2</a>';
			//console.log(menu.innerHTML);
		}
	}
	function getKillJson(url,task,name,check){
		console.log(url);
		return $.ajax({
			type: 'GET',
			url: url,   
			crossDomain: true,
			success: function (result) {
				console.log(result);
				if(check)console.log("%c Success AJAX request from server for "+task,"background:green;color:white");
			},
			error: function (req, status, error) {
				console.log("%c 81 sso_auth: ERROR for "+name+" "+req.responseText,'background: red; color: white');
				// console.log(req.responseText, status,error);
			}
		});
	}
	function toggleMenuOff() 						{
		if ( menuState !== 0 ) 
		{						
			nodekills = "";
			menuState = 0;
			document.getElementById("kills-menu").className = "kills-menu";
			//menu.classList.remove( killsmenuActive );
			//console.log("WE DID IT");								
		}
	}
	function positionMenu(e) 						{
		clickCoords = getPosition(e);
		clickCoordsX = clickCoords.x;
		clickCoordsY = clickCoords.y;
		menuWidth = menu.offsetWidth + 4;
		menuHeight = menu.offsetHeight + 4;
		windowWidth = window.innerWidth;
		windowHeight = window.innerHeight;
		if ( (windowWidth - clickCoordsX) < menuWidth ) 
		{	menu.style.left = windowWidth - menuWidth + "px";	} 
		else 
		{	menu.style.left = clickCoordsX + "px";	}
		if ( (windowHeight - clickCoordsY) < menuHeight ) 
		{	menu.style.top = windowHeight - menuHeight + "px";	}
		else 
		{	menu.style.top = clickCoordsY + "px";	}
	}
	function menuItemListener( link ) 						{
		//console.log( "Task ID ");							
		//link.innerHTML ='<i class="fa fa-eye"></i>jdhfjsrfukehfjsehfk';
		//console.log(link);
		//https://zkillboard.com/kill/50212850/
		var killurl = 'https://zkillboard.com/kill/'+ link.getAttribute("data-action");
		//console.log(link);							
		var win = window.open(killurl, '_blank');
		if(win)
		{
			//Browser has allowed it to be opened
			win.focus();
		}else{
			//Broswer has blocked it
			alert('Please allow popups for this site');
		}
		toggleMenuOff();
	}
	init();
}
}
