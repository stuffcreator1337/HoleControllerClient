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
	console.log(holeTypes1().holes[type]);
	eff = createHole(holeTypes1().holes[type].mass, holeTypes1().holes[type].jumpmass, holeTypes1().holes[type].time / 60);
	return eff;
	//console.log(type,power);
	switch (type) {
		case "G024":        eff = createHole("2.000","300","16"); return eff;        break;
		case "W237":        eff = createHole("3.000","1.350","24"); return eff;        break;
		case "V911":        eff = createHole("3.000","1.350","24"); return eff;        break;
		case "L477":        eff = createHole("2.000","300","16"); return eff;        break;
		case "Q317":        eff = createHole("500","20","16"); return eff;        break;
		case "Z457":        eff = createHole("2.000","300","16"); return eff;        break;
		case "E175":        eff = createHole("2.000","300","16"); return eff;        break;
		case "H296":        eff = createHole("3.000","1.350","24"); return eff;        break;
		case "M267":        eff = createHole("1.000","300","16"); return eff;        break;
		case "V753":        eff = createHole("3.000","1.350","24"); return eff;        break;
		case "Y790":        eff = createHole("500","20","16"); return eff;        break;
		case "D364":        eff = createHole("1.000","300","16"); return eff;        break;
		case "C247":        eff = createHole("2.000","300","16"); return eff;        break;
		case "H900":        eff = createHole("3.000","300","16"); return eff;        break;
		case "X877":        eff = createHole("2.000","300","16"); return eff;        break;
		case "P060":        eff = createHole("500","20","16"); return eff;        break;
		case "U574":        eff = createHole("3.000","300","24"); return eff;        break;
		case "N766":        eff = createHole("2.000","300","16"); return eff;        break;
		case "U210":        eff = createHole("2.000","300","24"); return eff;        break;
		case "K346":        eff = createHole("2.000","300","16"); return eff;        break;
		case "D845":        eff = createHole("5.000","300","16"); return eff;        break;
		case "Z647":        eff = createHole("500","20","16"); return eff;        break;
		case "N062":        eff = createHole("2.000","300","24"); return eff;        break;
		case "D382":        eff = createHole("2.000","300","16"); return eff;        break;
		case "R474":        eff = createHole("2.000","300","24"); return eff;        break;
		case "Y683":        eff = createHole("2.000","300","16"); return eff;        break;
		case "O477":        eff = createHole("2.000","300","16"); return eff;        break;
		case "N110":        eff = createHole("1.000","20","24"); return eff;        break;
		case "Z060":        eff = createHole("1.000","20","24"); return eff;        break;
		case "J244":        eff = createHole("1.000","20","24"); return eff;        break;
		case "B274":        eff = createHole("2.000","300","24"); return eff;        break;
		case "E545":        eff = createHole("2.000","300","24"); return eff;        break;
		case "A239":        eff = createHole("2.000","300","24"); return eff;        break;
	}
}
function createHole(mass,jump,time){
var effect = document.createElement('div');
	effect.innerHTML = 	str10(mass,"Mass", "Max Mass : ")+
						str10(jump,"ShipIcon", "Jump Mass : ")+
						str20(time, "Time", "Stable Time : ");
	return effect;
}
