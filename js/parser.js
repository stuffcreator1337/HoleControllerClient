var st, labelType, useGradients, nativeTextSupport, animate;

const NodeOffset = -100;
(function() {
  var ua = navigator.userAgent,
      iStuff = ua.match(/iPhone/i) || ua.match(/iPad/i),
      typeOfCanvas = typeof HTMLCanvasElement,
      nativeCanvasSupport = (typeOfCanvas == 'object' || typeOfCanvas == 'function'),
      textSupport = nativeCanvasSupport 
        && (typeof document.createElement('canvas').getContext('2d').fillText == 'function');
  //I'm setting this based on the fact that ExCanvas provides text support for IE
  //and that as of today iPhone/iPad current text support is lame
  labelType = (!nativeCanvasSupport || (textSupport && !iStuff))? 'Native' : 'HTML';
  nativeTextSupport = labelType == 'Native';
  useGradients = nativeCanvasSupport;
  animate = !(iStuff || !nativeCanvasSupport);
})();

function init(json,localsjs,json2,task,custom_sys_names){//,coord) {
    
        //end
        //init RGraph
        var resizing = false; 

    if(document.getElementById("opt_compact").checked){
    
    }
    else{
    var json3 = spacetreeParse(json);
    // console.log(json3);
    // console.log(json);
    // console.log($jit);
        var arr = json3.children, len = arr.length;
        for(var i=0;i<len;i++){
            if(CheckStatus999(arr[i].id,json)){
                // console.log(arr[i]);
                arr[i].data.$orn = 'right';
                $jit.json.each(arr[i], function(n) {
                    n.data.$orn = 'right';
                });
            }else{
                arr[i].data.$orn = 'left';
                $jit.json.each(arr[i], function(n) {
                    n.data.$orn = 'left';
                });				
            }
        }
        st = new $jit.ST({
            //id of viz container element
            injectInto: 'infovis',
            //set duration for the animation
            multitree: true,
            duration: 300,
            //set animation transition type
            transition: $jit.Trans.Quart.easeInOut,
            //set distance between node and its children
            levelDistance: 50,
            //enable panning
            Navigation: {
            enable:true,
            panning:true
            },
            //set node and edge styles
            //set overridable=true for styling individual
            //nodes or edges
            Node: {
                // height: document.getElementById(node.id).offsetHeight,
                // height: 50,
                width: 100,
                // type: 'rectangle',
                // color: '#aaa',
                overridable: true
            },
            
            Edge: {
                type: 'bezier',
                overridable: true,
                lineWidth: 3.0
            },	
            Events: {
                enable: true,
                type: 'Native',
                //Change cursor style when hovering a node
                //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                onMouseEnter: function(object, win, event) {
                    if(morphBusy)return;
                    st.graph.saveOrgInfo(object,json);
                    st.canvas.getElement().style.cursor = 'move';
					
					object.data.$scolor = "#FFF";
					object.data.$blur = 10; 

                    st.fx.animate({modes: ['node-style:shadowBlur'], duration: 2000 });	
									
					if(object.what == 'edge'){
						var label = "SampleText";
						console.log(object);
						showEdgeTooltip(label, event.clientX, event.clientY);
					}
                },				
				onMouseMove: function (object, win, event) {				
					if(object.what == 'edge'){
						var edgetooltip = document.getElementById('edge-tooltip');
						if (!edgetooltip || edgetooltip.style.opacity == 0) return;
						moveEdgeTooltip(event.clientX, event.clientY);
					}
				},
                onMouseLeave: function(object) {
                    if(morphBusy)return;
                    st.canvas.getElement().style.cursor = '';	
                    st.graph.restoreOrgInfo(object.data);
                    st.fx.animate({modes: ['node-style:shadowBlur'], duration: 2000 });	
					hideEdgeTooltip();
                },                
                onDragMove: function(object, eventInfo, e){ 
                    var pos = eventInfo.getPos();   
                    // console.log("onDragMove");
                    // console.log("onDragMove",pos,object.pos);
                    // object.pos.setc(pos.x-this.nodeClickedX, pos.y-this.nodeClickedY);  
                    if(object.pos)object.pos.setc(pos.x, pos.y);  
                    st.fx.plot();
                },  
                onDragEnd: function(object, eventInfo, e){  
                    // console.log("onDragEnd");
                    st.compute('end');  
                    st.fx.animate( {  
                    modes: [  
                      'linear'  
                    ],  
                    duration: 700,  
                    transition: $jit.Trans.Elastic.easeOut  
                  });  
                },  
                //touch events  
                onTouchStart: function(object, eventInfo, e) {  
                    this.nodeClickedX = eventInfo.getPos().x;
                    this.nodeClickedY = eventInfo.getPos().y;
                  //stop the default event  
                  $jit.util.event.stop(e);  
                },  
                onTouchMove: function(object, eventInfo, e){  
                    console.log("onTouchMove");
                  //stop the default event  
                  $jit.util.event.stop(e);  
                  var pos = eventInfo.getPos();  
                  object.pos.setc(pos.x, pos.y);  
                  st.fx.plot();  
                },  
                onTouchEnd: function(object, eventInfo, e){  
                    console.log("onTouchEnd");
                  //stop the default event  
                  $jit.util.event.stop(e);  
                  st.compute('end');  
                  st.fx.animate( {  
                    modes: [  
                      'linear'  
                    ],  
                    duration: 700,  
                    transition: $jit.Trans.Elastic.easeOut  
                  });  
                } 
            },
            
            onBeforeCompute: function(object){
                // Log.write("loading " + object.name);
            },
            
            onAfterCompute: function(){
                // Log.write("done");
            },
            
            //This method is called on DOM label creation.
            //Use this method to add event handlers and styles to
            //your node.
            
            onCreateLabel: function(domElement, node){
                st.graph.createNodeStyle(st,domElement, node,localsjs,socket);
            },
            
            onPlaceLabel: function(domElement, node){
                // console.log(node);
                // console.log(document.getElementById(node.id).offsetHeight);
                // console.log(domElement.offsetWidth);
                // console.log(domElement.offsetHeight);
                // var opt_Compact = document.getElementById("opt_compact").checked;		
                var style = domElement.style;
                // var left = parseInt(style.left);
                // var top = parseInt(style.top);
                // var w = domElement.offsetWidth;
                // var h = domElement.offsetHeight;
                // style.left = (left - w / 2) + 'px';
                // opt_Compact == true ? style.top = (top + 10) + 'px' : style.top = (top - h / 2) + 'px';	
                // console.log(node.data.$color);
                style.color = node.data.$color;
                // style.display = '';
            },
            //This method is called right before plotting
            //a node. It's useful for changing an individual node
            //style properties before plotting it.
            //The data properties prefixed with a dollar
            //sign will override the global node style properties.
            onBeforePlotNode: function(node){
                //add some color to the nodes in the path between the
                //root node and the selected node.
                // if (node.selected) {
                    // // node.data.$color = "#ff7";
                // }
                // else {
                    // delete node.data.$color;
                    // //if the node belongs to the last plotted level
                    // if(!node.anySubnode("exist")) {
                        // //count children number
                        // var count = 0;
                        // node.eachSubnode(function(n) { count++; });
                        // //assign a node color based on
                        // //how many children it has
                        // // node.data.$color = ['#aaa', '#baa', '#caa', '#daa', '#eaa', '#faa'][count];                    
                    // }
                // }
            },
            
            //This method is called right before plotting
            //an edge. It's useful for changing an individual edge
            //style properties before plotting it.
            //Edge data proprties prefixed with a dollar sign will
            //override the Edge global style properties.
            onBeforePlotLine: function(adj){
                // if (adj.nodeFrom.selected && adj.nodeTo.selected) {
                    // // adj.data.$color = "#eed";
                    // adj.data.$lineWidth = 3;
                // }
                // else {
                    // // delete adj.data.$color;
                    // delete adj.data.$lineWidth;
                // }
            }
        });
        //load json data
        st.loadJSON(json3);
        //compute node positions and layout
        // console.log(st.graph);
        st.graph.socket(socket,json,st,'st');
        // console.log($jit.util);
        st.compute();
        //optional: make a translation of the tree
        
		// getCookieJS('canvasoffsetX', false, function(dataX){
			// getCookieJS('canvasoffsetY', false, function(dataY){
				// canvas.translate(0,0);
        // st.geom.translate(new $jit.Complex(dataX, dataY), "current");
        st.geom.translate(new $jit.Complex(0,0), "current");
        // st.geom.translate(new $jit.Complex(coord["dataX"],coord["dataY"]), "current");
                // st.geom.translate(new $jit.Complex(getCookieJS('canvasoffsetX', false, function(dataX){return dataX;}), getCookieJS('canvasoffsetY', false, function(dataY){return dataY;})), "current");
		
		// 	},this);
		// },this);
        //emulate a click on the root node.
        st.onClick(st.root);
        st.graph.setHoleNames(st,custom_sys_names);


    }
    create_link("","","normal");
    // console.log('end init');
}

