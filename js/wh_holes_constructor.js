function str10(m,imgName,str){
	var str11 = createImg(imgName)+" "+str+"<font color=green>"+m+"</font><br>";
	return str11;
}
function str20(t,imgName,str){
	var str22 = createImg(imgName)+" "+str+"<font color=green>"+t+"h</font>";
	return str22;
}
function setHole(type){
	var eff;
	//console.log(holeTypes1().holes[type]);
	eff = createHole(holeTypes1().holes[type].mass, holeTypes1().holes[type].jumpmass, holeTypes1().holes[type].time / 60);
	return eff;
}
function createHole(mass,jump,time){
var effect = document.createElement('div');
	effect.innerHTML =	str10(addDots(mass),"Mass", "Max Mass : ")+
						str10(addDots(jump),"ShipIcon", "Jump Mass : ")+
						str20(time, "Time", "Stable Time : ");
	return effect;
}
function addDots(number) {
	// Преобразуем число в строку и заменяем каждое 3-е число с конца на  точку
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

