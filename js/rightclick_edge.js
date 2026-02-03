function edge_rightclick(lineselected, core, linktodel) 	{
// console.log(lineselected, core, linktodel);	
var type = linktodel;
function getPosition(e) 
{	
// console.log('test');					
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
if((type == "line")||(type == "punktir")||(type == "bezier")||(type == "bezier-punktir")){	
// console.log(type);
	var navMenu = document.createElement('nav');
		navMenu.className = "context-menu";
		navMenu.id = "context-menu";
	var holeMenu = document.getElementById("context-menu");
	if(!holeMenu)
	{
		// document.body.appendChild(navMenu);	
		// var newUl = document.createElement('ul');
			// newUl.className = "context-menu__items";
			// newUl.id = "contextUL";
		// document.body.children["context-menu"].appendChild(newUl);	
		
		// var liMenuT = new list('Time', 'Switch Time-Crit', 'img/Time.png');
		// var liMenuM = new list('Mass', 'Switch Mass-Crit', 'img/Mass.png');
		// var liMenuF = new list('Frig', 'Switch Frig-Size', 'img/small.png');
		// var liMenuD = new list('Delete', 'Delete', 'img/Delete.png');
	}	
	function list(task, inner, source)
	{
		var li = document.createElement('li');
			li.className = 'context-menu__item';
			li.id = 'li'+task;
			document.body.children["context-menu"].children["contextUL"].appendChild(li);	
			var a = document.createElement('a');
				a.className = 'context-menu__link';
				a.href = '#';
				a.id = "a"+task;
				a["data-action"] = task;
				a.innerHTML = inner;
				document.body.children["context-menu"].children["contextUL"].children['li'+task].appendChild(a);	
				var img = document.createElement('img');
					img.className = 'menuimg';
					img["data-action"] = task;
					img.height = '16';
					img.width = '16';
					img.src = source;
					document.body.children["context-menu"].children["contextUL"].children['li'+task].children['a'+task].appendChild(img);		
		//return li;
	}
	var contextMenuClassName = "context-menu";
	var contextMenuItemClassName = "context-menu__item";
	var contextMenuLinkClassName = "context-menu__link";
	var contextMenuActive = "context-menu--active";
	var menu = document.querySelector("#context-menu");
	var menuItems = menu.querySelectorAll(".context-menu__item");
}
if(type == "labelline"){
	
	var newMenu = document.createElement('nav');
	newMenu.className = "kills-menu";
	newMenu.id = "kills-menu";
	var holeMenu = document.getElementById("kills-menu");
	if(!holeMenu)
	{	document.body.appendChild(newMenu);	}	
	var contextMenuClassName = "labelline-menu";
	var contextMenuItemClassName = "labelline-menu__item";
	var contextMenuLinkClassName = "labelline-menu__link";
	var contextMenuActive = "labelline-menu--active";
	var menu = document.querySelector("#labelline-menu");
	var menuItems = menu.querySelectorAll(".labelline-menu__item");
}
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
function init() 						{							
	contextListener();
	clickListener();
	keyupListener();
	resizeListener();
}
function	addEvent(a,b)						{
	document.addEventListener(a,b);
}			
function	RemoveEvent(a,b,c)						{
	document.removeEventListener(a,b,c);						}					
function clickInsideElement( e, className,clicktoff,contoff)						{						
	var el = e.srcElement || e.target;
	if (( linktodel == "line")||( linktodel == "labelline")||( linktodel == "bezier")||( linktodel == "punktir")||( linktodel == "bezier-punktir")||(( el.className == "menuimg" ) || (el.className == "context-menu__link") || (el.className == "labelline-menu__link")))							{
		RemoveEvent('click',clicktoff,false);								
		RemoveEvent('click',contoff,false);
		return el;
	}
	return false;
}
function clickeventoff(e) 						{	
// console.log('test4');					
	var clickeElIsLink = clickInsideElement( e, contextMenuLinkClassName, clickeventoff, conteventoff );
	if ( clickeElIsLink ) 
	{
		e.preventDefault();
		menuItemListener( clickeElIsLink );
		RemoveEvent('click',clickeventoff,false);
		RemoveEvent('click',conteventoff,false);
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
// console.log('test3');					
	taskItemInContext = clickInsideElement( e, taskItemClassName);
	//console.log("contevent");
	if ( taskItemInContext ) 
	{	
		//console.log("taskItemInContext = YES");
		//console.log(linktodel);
		e.preventDefault();
		toggleMenuOn();	
		positionMenu(e);	
		linktodel = "opened";
	} 
	else 
	{
		//console.log("taskItemInContext = NO");
		taskItemInContext = null;
		toggleMenuOff();								
		RemoveEvent('click',clickeventoff,false);
		RemoveEvent('contextmenu',conteventoff,false);
	}
}
function contextListener() 						{
	//console.log("contextListener");
	//console.log(linktodel);
	if ( linktodel == "line" || linktodel == "labelline" || linktodel == "bezier"|| linktodel == "punktir"|| linktodel == "bezier-punktir") 
	{
		addEvent("contextmenu", conteventoff);

	}
}
function clickListener() 						{	
// console.log('test5');					
	addEvent("click", clickeventoff);

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
		if(type == "labelline"){	document.getElementById("labelline-menu").className = "labelline-menu labelline-menu--active";	}
		else{						document.getElementById("context-menu").className = "context-menu context-menu--active";		}
	}
}
function toggleMenuOff() 						{
	if ( menuState !== 0 ) 
	{						
		linktodel = "";
		menuState = 0;
		//menu.classList.remove( contextMenuActive );
		document.getElementById("context-menu").className = "context-menu";
		document.getElementById("labelline-menu").className = "labelline-menu";
		//console.log("WE DID IT");								
	}
}
function positionMenu(e) 						{	
// console.log('test2');					
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
function setTask(job)						{
	
}
function menuItemListener( link ) 
{
	var linkfrom = lineselected.nodeFrom.data.$sysid;	
	var linkto = lineselected.nodeTo.data.$sysid;	
	console.log( "Task ID - " + lineselected.nodeFrom.id +"<>" + lineselected.nodeTo.id + ", Task action - " + link.getAttribute("data-action"));						
	if (link.getAttribute("data-action")=="Time")
	{
		// console.log(link,lineselected.data.$type);
		if 	(lineselected.data.$type == "punktir")	{	lineselected.data.$type = "line";		}
		else if 	(lineselected.data.$type == "bezier")	{	lineselected.data.$type = "bezier-punktir";		}
		else if 	(lineselected.data.$type == "bezier-punktir")	{	lineselected.data.$type = "bezier";		}
		else if 	(lineselected.data.$type == "line")	{	lineselected.data.$type = "punktir";		}
	}
	if (link.getAttribute("data-action")=="Mass")
	{	//console.log(link,lineselected.data.$color);
		if (lineselected.data.$color !== "#FF4719")	{	lineselected.data.$color = "#FF4719";lineselected.data.$colorTrue = "#FF4719";	}
		else										{	lineselected.data.$color = "#CCCCBB";lineselected.data.$colorTrue = "#CCCCBB";	}
	}
	if (link.getAttribute("data-action")=="Frig")
	{//console.log(link,lineselected.data.$color);
		if (lineselected.data.$color !== "#CC6699")	{	lineselected.data.$color = "#CC6699";lineselected.data.$colorTrue = "#CC6699";	}
		else										{	lineselected.data.$color = "#CCCCBB";lineselected.data.$colorTrue = "#CCCCBB";	}
	}
	if (link.getAttribute("data-action")=="Delete")
	{//console.log(link,lineselected.$type);
		lineselected.data.$alpha=0;
		lineselected.data.$type = "none";
		core.viz.graph.removeAdjacence(lineselected.nodeFrom.id,lineselected.nodeTo.id);
		//console.log();
	}
	var CurrentUser = activeCharTab;
	var date = new Date();
	//console.log(link,lineselected);
	socket.emit('link_edit',{'user': CurrentUser, 'sys1': linkfrom, 'sys2': linkto,'action': link.getAttribute("data-action"), 'date': date.getTime()});	
	core.fx.animate({modes: ['edge-property:alpha'], duration: 500 });
	toggleMenuOff();
}
init();
}