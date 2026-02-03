function holeRightClick(labelID,data,id1,id2,idTest){
				if(window.event.button == 2)
				{
					var newMenu = document.createElement('nav');
					newMenu.className = "edgeLabels-menu";
					newMenu.id = "edgeLabels-menu";
					//console.log(document.getElementById("edgeLabels-menu"));
					var holeMenu = document.getElementById("edgeLabels-menu");
					if(!holeMenu)
					{
						console.log("menu not found");
						document.body.appendChild(newMenu);
					}
					//document.body.infoviz.appendChild(newMenu);
					//console.log(data);
						var contextMenu = document.getElementById("context-menu");
						if (contextMenu){contextMenu.style.display = "none";}
						var labellineMenu = document.getElementById("labelline-menu");
						if (labellineMenu){labellineMenu.style.display = "none";}
						var killsMenu = document.getElementById("kills-menu");
						if (killsMenu){killsMenu.style.display = "none";}
						var nodekills = "circle";
						function getPosition(e)						{
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
						var killsmenuClassName = "edgeLabels-menu";//edgeLabels
						var killsmenuItemClassName = "edgeLabels-menu__item";
						var killsmenuLinkClassName = "edgeLabels-menu__link";
						var killsmenuActive = "edgeLabels-menu--active";						
						var menu = document.querySelector("#edgeLabels-menu");
						var menuItems = menu.querySelectorAll(".edgeLabels-menu__item");
						
						var taskItemClassName = "task",
						 taskItemInContext,
						 clickCoords,
						 clickCoordsX,
						 clickCoordsY,
						 menuState = 0,
						 menuWidth,
						 menuHeight,
						 menuPosition,
						 menuPositionX,
						 menuPositionY,
						 windowWidth,
						 windowHeight,
						 opened = 0,
						 hole = "";
						function init_edge() 						{	
							document.addEventListener( "contextmenu", conteventoff);
							document.addEventListener( "click", clickeventoff);
							keyupListener();
							resizeListener();
						}
						function clickInsideElement( e, className,clicktoff,contoff) {								
							var el = e.srcElement || e.target;
							//console.log(el);
							if (( nodekills == 'circle') || (el.className == "killimg") || (el.className == "edgeLabels-menu__link"))
							{	
								//console.log("link=line? - " + (nodekills == "line") + "; clicked inside? - " + (el.classList.contains(className)));
								//console.log(el);
								document.removeEventListener ('click',clicktoff,false);
								document.removeEventListener ('click',contoff,false);
								return el;
							} 	
							return false;
						}
						function clickeventoff(e){
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
									//console.log("menuoff - missclick");
									toggleMenu(0);
								}
							}
						}
						function conteventoff(e){
							//console.log("contevent");
							taskItemInContext = clickInsideElement( e, taskItemClassName);
							
							if ( taskItemInContext ) 
							{
								//console.log("taskItemInContext = YES");
								//console.log(nodekills);
								e.preventDefault();
								toggleMenu(1);
								positionMenu(e);	
								nodekills = "opened";
							} 
							else 
							{
								//console.log("taskItemInContext = NO");
								taskItemInContext = null;
								toggleMenu(0);								
								document.removeEventListener ('click',clickeventoff,false);
								document.removeEventListener ('contextmenu',conteventoff,false);
							}
						}
						function keyupListener(){
							window.onkeyup = function(e) 
							{
								if ( e.keyCode === 27 ) 
								{
									toggleMenu(0);
								}
							}
						}
						function resizeListener(){
							window.onresize = function(e) 
							{
								toggleMenu(0);
							};
						}
						function toggleMenu(state){
							if (state == 1){
							if ( menuState !== 1 ) 
							{
								menuState = 1;
								//console.log("menu:ON");
								document.getElementById("edgeLabels-menu").className = "edgeLabels-menu edgeLabels-menu--active";
								var starthtml = '<ul class="edgeLabels-menu__items">';	
								var	tagType = "edgeLabels-menu__item";
								menu.innerHTML = starthtml;	
								var holes = "????";							
								//console.log(labelID);
								if (labelID == (data.$Sys2+data.$Sys1))
								{
									holes = data.$HoleTypes1;
									//console.log(labelID);
								}
								else 	
								{
									holes = data.$HoleTypes2;
									//console.log(labelID);
								}
								var holesCount = holes.length/4;
								for (i = 0; i < holesCount; i++) 
								{
									menu.innerHTML = menu.innerHTML + ' <li class="'+tagType+'"><a href="#" class="edgeLabels-menu__link" data-action="'+holes.substring(i*4,(i+1)*4)+'"><i class="fa fa-eye"></i>'+holes.substring(i*4,(i+1)*4)+'</a></li>';
								}
								menu.innerHTML = menu.innerHTML + ' <li class="'+tagType+'"></li>';
								var endhtml = '</ul>';
								
								menu.innerHTML = menu.innerHTML + endhtml;
								//console.log(label.id);						
							}}
							if (state == 0){
							if ( menuState !== 0 ) 
							{
								//console.log("menu:OFF");
								nodekills = "menu:OFF";
								menuState = 0;
								document.getElementById("edgeLabels-menu").className = "edgeLabels-menu";
								if (contextMenu){contextMenu.style.display = "";}
								if (labellineMenu){labellineMenu.style.display = "";}
								if (killsMenu){killsMenu.style.display = "";}
								//menu.classList.remove( killsmenuActive );
								//console.log("WE DID IT");								
							}}
						}
						function positionMenu(e){
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
						function menuItemListener( link ){
							var labID = id2+id1;
							//console.log("it was "+label.id+" ");
							//console.log(label.id);
							if(	labelID != labID)
							{		
								var linkfrom = id1;
								var linkto = id2;
							}else{
								var linkfrom = id2;
								var linkto = id1;
							}
							var task = "setHole";	
							// //setTask(task);
							var k162at = linkfrom;
							console.log("k162 set at: "+k162at+";");
							parent.linkdel.src = "action/link_edit.php?linkfrom=" + k162at +"&linkto=" + linkto + "&task=" + task + "&hole=" + link.getAttribute("data-action");	
							console.log(parent.linkdel.src);
							document.getElementById(k162at+linkto).innerHTML = link.getAttribute("data-action");
							document.getElementById(linkto+k162at).innerHTML = "K162";
							toggleMenu(0);
						}
						init_edge();
				}
}