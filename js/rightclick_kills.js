let popup;
let input;
let accept;

document.addEventListener('DOMContentLoaded', function () {

	popup = document.getElementById('numberInputPopup');
	input = document.getElementById('numberInputField');
	accept = document.getElementById('numberInputAccept');


	input.addEventListener('input', function () {
		this.value = this.value.replace(/\D/g, '');
	});
	input.addEventListener('keydown', function (e) {
		if (e.key === 'Enter') {
			accept.click();
		}
	});
	accept.addEventListener('click', function (e) {
		e.stopPropagation();

		const value = input.value;

		if (numberCallback) {
			numberCallback(value);
		}

		closePopup();
	});

});
let numberCallback = null;

function openNumberInput(x, y, callback) {
	numberCallback = callback;

	popup.style.left = x + 'px';
	popup.style.top = y + 'px';
	popup.style.display = 'block';

	input.value = '';
	input.focus();
}
document.addEventListener('click', function (e) {
	if (!popup.contains(e.target)) {
		closePopup();
	}
});

function closePopup() {
	popup.style.display = 'none';
}
document.addEventListener('click', function (e) {

	const btn = e.target.closest('.set_designator');
	if (!btn) return;
	e.preventDefault();

	const pos = $jit.util.event.getPos(e);

	openNumberInput(pos.x, pos.y, function (value) {

		console.log("¬ведено число:", value);

		SetSysDesignator(value, btn.getAttribute("data-sysid"));

	});

});
function SetSysDesignator(val, sysid) {
	const root = document.getElementById(sysid);
	if (!root) return;

	const el = root.querySelector('#designator');
	if (!el) return;

	el.textContent = val;

	socket.emit('designator_from_client', { "user": activeCharTab, "id": sysid, "system": document.getElementById("hiddenSyst").innerHTML, "designator": val });	

}
function kill_rightclick(nodeselected, core, nodekills, graph) {	
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
			console.log(nodeselected);
			//console.log(clientInfo.systems_data);
			for (var system_info in clientInfo.systems_data) {
				if (system_info.sysid == nodeselected.data.$sysid) {
					console.log(system_info.last_zkb);
					return;
				}
			}
			
			socket.emit('kill_checked', { "user": activeCharTab, "id": nodeselected.data.$sysid });	

			var starthtml = '<ul class="kills-menu__items">';
			var endhtml = '</ul>';
			menu.innerHTML = starthtml;
			menu.innerHTML = menu.innerHTML + ' <li class="kills-menu__item"><a href="https://zkillboard.com/system/' + nodeselected.data.$sysid + '/" target="_blank" class="killhref">Open system zkb page</a></li>';
			menu.innerHTML = menu.innerHTML + ' <li class="kills-menu__item"><a href="#" class="set_designator" data-sysid=' + nodeselected.data.$sysid +'>Set #</a></li>';
			menu.innerHTML = menu.innerHTML + endhtml;
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
