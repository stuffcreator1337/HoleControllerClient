// function create_link(new_id,old_id,type){
	// if(type == 'labelline'){
		// getDistance(new_id,old_id,function(data1,data2){
			// var CurrentUser = activeCharTab; 
			// var openDate = new Date();
			// var jsonReady = {
				// "sys1" : ""+new_id+"",
				// "sys2" : ""+old_id+"",
				// "date" : ""+openDate.getTime()+"",
				// "status" : "0", 
				// "founder" : "", 
				// "alive" : "1",
				// "deleted" : "",
				// "type" : type,
				// "labelCenter" : data2.length+" ("+data1.length+") jumps"
				// };
			// socket.emit('new_link', {'user':CurrentUser, 'link': jsonReady});	
		// });	
	// }
	// else
	// {
		// var CurrentUser = activeCharTab; 
		// var openDate = new Date();
		// var jsonReady = {
			// "sys1" : ""+new_id+"",
			// "sys2" : ""+old_id+"",
			// "date" : ""+openDate.getTime()+"",
			// "status" : "0", 
			// "founder" : "", 
			// "alive" : "1",
			// "deleted" : "",
			// "type" : type
			// };
		// socket.emit('new_link', {'user':CurrentUser, 'link': jsonReady});
	// }
// }

function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}


function restoreLast(){
	console.log("%c Restoring last deleted.",'background: green; color: white');
	socket.emit("restore_last",{'user': activeCharTab});
}