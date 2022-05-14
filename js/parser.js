﻿var labelType, useGradients, nativeTextSupport, animate;

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

function init(json,localsjs,json2,task,custom_sys_names) {
    
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
        var st = new $jit.ST({
            //id of viz container element
            injectInto: 'infovis',
            //set duration for the animation
            multitree: true,
            duration: 0,
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
                // height: 70,
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
                onMouseEnter: function(eventInfo) {
                // console.log(morphBusy);
                // console.log(st.busy);
                    if(morphBusy)return;
                    st.graph.saveOrgInfo(eventInfo,json);
                    st.canvas.getElement().style.cursor = 'move';
                            
                    // var syst_selected = 0;
                    // if((eventInfo.Config.type == 'line')&&(eventInfo.data.$type!='labelline'))
                    // {
                        // syst_selected = rgraph.canvas.viz.graph.labelcovered(eventInfo);
                    // }
                    // if (syst_selected == 0){
                        eventInfo.data.$scolor = "#FFF";
                        eventInfo.data.$blur = 10; 
                    // }
                    st.fx.animate({modes: ['node-style:shadowBlur'], duration: 2000 });	
                },
                onMouseLeave: function(eventInfo) {
                    if(morphBusy)return;
                    st.canvas.getElement().style.cursor = '';	
                    st.graph.restoreOrgInfo(eventInfo.data);
                    st.fx.animate({modes: ['node-style:shadowBlur'], duration: 2000 });	
                }
            },
            
            onBeforeCompute: function(node){
                // Log.write("loading " + node.name);
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
        st.geom.translate(new $jit.Complex(-200, 0), "current");
        //emulate a click on the root node.
        st.onClick(st.root);
        st.graph.setHoleNames(st,custom_sys_names);


    }
    create_link("","","normal");
    // console.log('end init');
}

