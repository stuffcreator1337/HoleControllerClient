function createImg(name){
	var	img = "<img style='height:12px; width:12px' src='img/"+name+".png'>"
	return img;
}

function str1(color,ch, perc, imgName, str){
	var str2 = "<font color="+color+">"+ch+""+perc+"%</font> "+createImg(imgName)+" "+str+"<br>";
	return str2;
}
function setEffect(type,power){
	var eff;
	//console.log(type,power);
	switch (type) {
		case "Cataclysmic<br>Variable":        eff = createCat(power); return eff;        break;
		case "Black Hole":        			eff = createBla(power); return eff;        break;
		case "Magnetar":        			eff = createMag(power); return eff;        break;
		case "Pulsar":       				eff = createPul(power); return eff;        break;
		case "Wolf Rayet":        			eff = createWol(power); return eff;        break;
		case "Red Giant":        			eff = createRed(power); return eff;        break;
	}
}
function createCat(p){
var effect = document.createElement('div');
	effect.innerHTML = 	str1("red", "-", 15+ 7*(p-1), "SelfRep", "LOCAL ARMOR REPAIR AMOUNT")+
						str1("red", "-", 15+ 7*(p-1), "SelfBoost", "LOCAL SHIELD BOOST AMOUNT")+
						str1("green", "+", 30+ 14*(p-1), "ShieldTransfer", "SHIELD REMOTE BOOST")+
						str1("green", "+", 30+ 14*(p-1), "RemoteArmor", "ARMOR REMOTE REPAIR")+
						str1("green", "+", 30+ 14*(p-1), "CapBuffer", "CAPACITOR CAPACITY")+
						str1("red", "+", 15+ 7*(p-1), "CapRecharge", "CAPACITOR RECHARGE TIME")+
						str1("red", "-", 15+ 7*(p-1), "CapTransf", "REMOTE CAPACITOR TRANSFER AMOUNT");
	return effect;
}

function createRed(p){
var effect = document.createElement('div');
	effect.innerHTML = 	str1("red", "+", 15+ 7*(p-1), "Overload", "HEAT DAMAGE")+
						str1("green", "+", 30+ 14*(p-1), "Overload", "OVERLOAD BONUS")+
						str1("green", "+", 30+ 14*(p-1), "Smartbomb", "SMART BOMB RANGE")+
						str1("green", "+", 30+ 14*(p-1), "Smartbomb", "SMART BOMB DAMAGE")+
						str1("green", "+", 30+ 14*(p-1), "BombDamage", "BOMB DAMAGE");
	return effect;
}

function createPul(p){
var effect = document.createElement('div');
	effect.innerHTML = 	str1("green", "+", 30+ 14*(p-1), "ShieldBuffer", "SHIELD AMOUNT")+
						str1("red", "-", 15+ 7*(p-1), "ArmorRes", "ARMOR RESISTANCES")+
						str1("green", "-", 15+ 7*(p-1), "CapRecharge", "CAP RECHARGE TIME")+
						str1("red", "+", 30+ 14*(p-1), "Signature", "SIGNATURE RADIUS")+
						str1("green", "+", 30+ 14*(p-1), "CapNosf", "NOS/NEUT DRAIN AMOUNT");
	return effect;
}

function createWol(p){
var effect = document.createElement('div');
	effect.innerHTML = 	str1("green", "+", 30+ 14*(p-1), "ArmorBuffer", "ARMOR HITPOINTS")+
						str1("red", "-", 15+ 7*(p-1), "ShieldRes", "SHIELD RESISTANCES")+
						str1("green", "+", 60+ 28*(p-1), "SmallDamage", "SMALL WEAPON DAMAGE")+
						str1("green", "-", 15+ 7*(p-1), "Signature", "SIGNATURE RADIUS");
	return effect;
}

function createBla(p){
var effect = document.createElement('div');
	effect.innerHTML = 	str1("green", "+", 15+ 7*(p-1), "MissileDamage", "MISSILE VELOCITY")+
						str1("green", "+", 30+ 14*(p-1), "MissileSpeed", "MISSILE EXPLOSION VELOCITY")+
						str1("green", "+", 30+ 14*(p-1), "Speed", "SHIP VELOCITY")+
						str1("red", "-", 15+ 7*(p-1), "StasisWeb", "STASIS WEBIFIER STRENGTH")+
						str1("red", "+", 15+ 7*(p-1), "Inertia", "INERTIA")+
						str1("green", "+", 30+ 15*(p-1), "Optimal", "TARGETING RANGE");
	return effect;
}

function createMag(p){
var effect = document.createElement('div');
	effect.innerHTML = 	str1("green", "+", 30+ 14*(p-1), "DamageMod", "DAMAGE")+
						str1("red", "+", 15+ 7*(p-1), "DamageProfile", "MISSILE EXPLOSION RADIUS")+
						str1("red", "-", 15+ 7*(p-1), "DroneDamage", "DRONE TRACKING")+
						str1("red", "-", 15+ 7*(p-1), "Optimal", "TARGETING RANGE")+
						str1("red", "-", 15+ 7*(p-1), "Tracking", "TRACKING SPEED")+
						str1("red", "-", 15+ 7*(p-1), "TargetPaint", "TARGET PAINTER STRENGTH");
	return effect;
}