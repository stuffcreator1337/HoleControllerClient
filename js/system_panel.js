
var ul1= document.createElement('ul');
	ul1.className = "tabs";
	
var li1 = new nElement('','',ul1,'li');

	var a1 = new nElement('tab-content1','',li1,'a');
		
		var label1 = new nElement('checkedyes','',a1,'label')
		
var li2 = new nElement('','',ul1,'li');

	var a2 = new nElement('tab-content4','',li2,'a');
		
		var label2 = new nElement('','',a2,'label')
			
		
var li3 = new nElement('dest','',ul1,'li');		
	var a2 = new nElement('dest','',li3,'a2');		
		var sp1 = new nElement('destcheck','checkbox',a2,'span');		
			var la2 = new nElement('setdest','',sp1,'label');		
				var img1 = new nElement('','shipImgSmall',la2,'img');		
				var sp3 = new nElement('','destinfo',sp1,'span');		
var li4 = new nElement('dest','',ul1,'li');
	var a3 = new nElement('dest','',li3,'a2');		
		var sp4 = new nElement('destcheck','checkbox',a2,'span');		
			var la5 = new nElement('setdest','',sp1,'label');		
				var img2 = new nElement('','shipImgSmall',la2,'img');		
				var sp6 = new nElement('','destinfo',sp1,'span');	
			
			
			
			
function nElement(id,clas,childTo,type){
var el = document.createElement(type);
	el.className = clas;	
	el.id = id;	
	childTo.appendChild(el);
	return el;
}