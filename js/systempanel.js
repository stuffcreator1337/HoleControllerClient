function sigsClick(test){
	console.log(test);
	var body = parent.linkedit.contentDocument.body;
	// body.getElementsByClassName('tabLabel')[0].id = "checkedyes";
	// body.getElementsByClassName('tabLabel')[1].id = "checkedno";
	// body.getElementsByClassName('tabLabel')[2].id = "checkedno";
	
	var br = document.createElement("br");
var form = body.querySelector(".leftform");
//if(form){}
var form = document.createElement('form');
	form.className = 'leftform';
	form.id = 'form1';
	form.name = 'form1';
	form.method = 'form1';
//console.log(parent.linkedit.contentDocument.body);
body.appendChild(form);
	
	form.appendChild(document.createElement("br"));
	var div = document.createElement('div');
		div.style = 'overflow-y: auto;height:auto;max-height: 151px;min-height: 25px;';
	form.appendChild(div);

		var table = document.createElement('table');
			table.className = 'sigos';
		div.appendChild(table);
	
	var input = document.createElement('textarea');
		input.style='resize: none;color:#ffffff;background-color:#332933;';
		input.rows='2';
		input.cols='28';
		input.id='sigsid';
		input.name='sigsname';	
	form.appendChild(input);
	form.appendChild(document.createElement("br"));	
		
	var clickabbleSystem = document.createElement('text');
		clickabbleSystem.id='sigs'
		clickabbleSystem.style='text-align:center;';
	form.appendChild(clickabbleSystem);

		// var link = document.createElement('a');
		// 	link.style='color:#$sys_color';
		// 	link.onclick='CCPEVE.showInfo(5, $sys_id); return false;';
		// 	link.href='#';
		// 	link.innerHTML =  '<?php echo $sig_post; ?>';
		// console.log(link.innerHTML);
		// clickabbleSystem.appendChild(link);	
		
			
	
}
function dscanClick(){
	var body = parent.linkedit.contentDocument.body;
	// body.getElementsByClassName('tabLabel')[0].id = "checkedno";
	// body.getElementsByClassName('tabLabel')[1].id = "checkedyes";
	// body.getElementsByClassName('tabLabel')[2].id = "checkedno";
}
function commentsClick(){
	var body = parent.linkedit.contentDocument.body;
	// body.getElementsByClassName('tabLabel')[0].id = "checkedno";
	// body.getElementsByClassName('tabLabel')[1].id = "checkedno";
	// body.getElementsByClassName('tabLabel')[2].id = "checkedyes";
}