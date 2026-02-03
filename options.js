// // var fs = require('fs');
class OpenOptions{
	constructor(opt) {
		function getDefault(value, defaultValue) {
			return value === undefined ? defaultValue : value;
		}
		function getColor(opt, colorName, defaultColor) {
			return opt && opt[colorName] !== undefined ? opt[colorName] : defaultColor;
		}
        this.opt_compact = getDefault(opt ? opt.opt_compact : undefined, false);
        this.Always_On_top = getDefault(opt ? opt.Always_On_top : undefined, false);
        this.Show_pilots = getDefault(opt ? opt.Show_pilots : undefined, false);
        this.Circles = getDefault(opt ? opt.Circles : undefined, false);
        this.Node_size = getDefault(opt ? opt.Node_size : undefined, 9);
        this.Angular_Widths = getDefault(opt ? opt.Angular_Widths : undefined, 0);
        this.frameBorder = getDefault(opt ? opt.frameBorder : undefined, true);
        this.opt_colorStatics = getDefault(opt ? opt.opt_colorStatics : undefined, false);
		
        this.colors = {};
        for (let key in all_colors) {
            if (all_colors.hasOwnProperty(key)) {
                this.colors[key] = getColor(opt, key, all_colors[key]);
            }
        }
		//this.colors = {
		//	color_back: getColor(opt, 'color_back', "#1A1A1A"),
		//	color_t1: getColor(opt, 'color_t1', "#FFFFFF"),
		//	color_t2: getColor(opt, 'color_t2', "#bfbfbf"),
		//	color_fr1: getColor(opt, 'color_fr1', "#262626"),
		//	color_fr2: getColor(opt, 'color_fr2', "#1A1A1A"),
		//	color_sys: getColor(opt, 'color_sys', "#FFFFFF"),
		//	color_sys2: getColor(opt, 'color_sys2', "#000000"),
		//	color_High: getColor(opt, 'color_High', "#00CCFF"),
		//	color_Low: getColor(opt, 'color_Low', "#FFFF00"),
		//	color_Null: getColor(opt, 'color_Null', "#6633CC"),
		//	color_C1: getColor(opt, 'color_C1', "#00FF00"),
		//	color_C2: getColor(opt, 'color_C2', "#33CC00"),
		//	color_C3: getColor(opt, 'color_C3', "#55BB00"),
		//	color_C4: getColor(opt, 'color_C4', "#BB5500"),
		//	color_C5: getColor(opt, 'color_C5', "#CC2200"),
		//	color_C6: getColor(opt, 'color_C6', "#CC0000"),
		//	color_C13: getColor(opt, 'color_C13', "#CC6699"),
		//	color_C14: getColor(opt, 'color_C14', "#999966"),
		//	color_C15: getColor(opt, 'color_C15', "#999966"),
		//	color_C16: getColor(opt, 'color_C16', "#999966"),
		//	color_C17: getColor(opt, 'color_C17', "#999966"),
		//	color_Abyss: getColor(opt, 'color_Abyss', "#996633"),
		//	color_Thera: getColor(opt, 'color_Thera', "#660033"),
		//	color_Pochven: getColor(opt, 'color_Pochven', "#660000")
		//};

	}
	save(opt){//console.log(this);
		var to_save = {
			"opt_compact" : this.opt_compact,
			"Always_On_top" : this.Always_On_top,
			"Show_pilots" : this.Show_pilots,
			"Circles" : this.Circles,
			"Node_size" : this.Node_size,
			"Angular_Widths" : this.Angular_Widths,
			"frameBorder" : this.frameBorder,		
			"opt_colorStatics" : this.opt_colorStatics			
		};
		setCookie('options',this);
	}

	// this.createOptions = function(prop,val){
		// // var opt = {
			// // "Always_On_top": false,
			// // "Show_pilots": false,
			// // "Circles": false,
			// // "Node_size": 9,
			// // "Angular_Widths": 0,
			// // "frameBorder": true
		// // };
		// // setCookie('options',saved_options);
	// };

}	
const colortypes = [
	"color_back",
	"color_t1",
	"color_t2",
	"color_fr1",
	"color_fr2",
	"color_sys",
	"color_sys2",
	"color_High",
	"color_Low",
	"color_Null",
	"color_C1",
	"color_C2",
	"color_C3",
	"color_C4",
	"color_C5",
	"color_C6",
	"color_C13",
	"color_C14",
	"color_C15",
	"color_C16",
	"color_C17",
	"color_C18",
	"color_C19",
	"color_Abyss",
	"color_Thera",
	"color_Pochven",
	"color_Jove",
	"color_GPMR"
];
const all_colors = {
	"color_back": "#1A1A1A",
	"color_t1": "#FFFFFF",
	"color_t2": "#bfbfbf",
	"color_fr1": "#262626",
	"color_fr2": "#1A1A1A",
	"color_sys": "#FFFFFF",
	"color_sys2": "#000000",
	"color_High": "#00CCFF",
	"color_Low": "#FFFF00",
	"color_Null": "#6633CC",
	"color_C1": "#00FF00",
	"color_C2": "#33CC00",
	"color_C3": "#55BB00",	
	"color_C4": "#BB5500",	
	"color_C5": "#CC2200",	
	"color_C6": "#CC0000",	
	"color_C13": "#CC6699",	
	"color_C14": "#999966",	
	"color_C15": "#999966",	
	"color_C16": "#999966",	
	"color_C17": "#999966",	
	"color_C18": "#999966",	
	"color_C19": "#CC99FF",	
	"color_Abyss": "#996633",
	"color_Thera": "#660033",
	"color_Pochven": "#660000",
	"color_Jove": "#004D00",
	"color_GPMR": "#F2E6FF"
};

function loadOptions(data){
	if(!data){data = '{}';}
	// console.log(data);
	// console.log(JSON.parse(data));
	if(data){
		saved_options = new OpenOptions(JSON.parse(data));		
	}
	else{
		saved_options = new OpenOptions();
	}
	// console.log(saved_options);
	// console.log(saved_options[0].Always_On_top);
	document.getElementById("opt_compact") ? document.getElementById("opt_compact").checked = saved_options.opt_compact : null;
	document.getElementById("onTop") ? document.getElementById("onTop").checked = saved_options.onTop : null;
	document.getElementById("opt_pilots") ? document.getElementById("opt_pilots").checked = saved_options.Show_pilots : null;
	document.getElementById("opt_circles") ? document.getElementById("opt_circles").checked = saved_options.Circles : null;
	document.getElementById("opt_statics") ? document.getElementById("opt_statics").checked = saved_options.opt_statics : null;
	document.getElementById("opt_colorStatics") ? document.getElementById("opt_colorStatics").checked = saved_options.opt_colorStatics : null;
	document.getElementById("totalAngularWidths") ? document.getElementById("totalAngularWidths").value = saved_options.Angular_Widths : null;
	document.getElementById("nodeSize") ? document.getElementById("nodeSize").value = saved_options.Node_size : null;
	document.getElementById("noBorder") ? document.getElementById("noBorder").checked = !saved_options.frameBorder : null;

	for (let colorKey in all_colors) {
		// Если ключ существует в saved_options, используем его, иначе значение из all_colors
		saved_options.colors[colorKey] = saved_options.colors[colorKey] || all_colors[colorKey];

		// Применяем значение через setJsColor и opt_setNewColor
		setJsColor(colorKey, saved_options.colors[colorKey]);
		opt_setNewColor(document.getElementById(colorKey), saved_options.colors[colorKey]);
	}


	saved_options.save();
// console.log(document.getElementById("color_High"));
// console.log(saved_options.color_High);


fullmap = fullmap1(saved_options);
// constellations = constellations1(saved_options);
systemJumps = systemJumps1(saved_options);
regions = regions1(saved_options);
// holeTypes = holeTypes1(saved_options);
whSysInfo = whSysInfo1(saved_options);
// console.log(saved_options);
}
function setJsColor(id,color){
	document.getElementById(id) ? (document.getElementById(id).style.color = color, document.getElementById(id).style.backgroundColor = color, document.getElementById(id).value = color) : null;
}
function setColorDefault() {
    for (let colorKey in all_colors) {
        if (all_colors.hasOwnProperty(colorKey)) {  // Проверка на собственное свойство
            let colorValue = all_colors[colorKey];  // Получаем значение цвета по ключу

            // Динамически вызываем setJsColor и opt_setNewColor с использованием colorKey
            setJsColor(colorKey, colorValue);
            opt_setNewColor(document.getElementById(colorKey), colorValue);
        }
    }
}
function check(that){
	console.log(that.id);
	writeOptions(that.id,that.checked);
	// var win = remote.getCurrentWindow();	
	// if(that.id == "onTop"){
		// win.setAlwaysOnTop(that.checked);	
		// // console.log(that.checked);
		 
	// }
	if(that.id == "opt_colorStatics"){		
		var allTxt = document.querySelectorAll('text[wh_color_check],a[wh_color_check]');
		for(var i=0;i<allTxt.length;i++){
			// console.log(allTxt[i]);
			allTxt[i].setAttribute('wh_color_check',that.checked);
		}
		writeOptions("opt_colorStatics",that.checked)
	}
	if(that.id == "opt_compact"){
		// var nodes = document.getElementsByClassName("nodeDiv");
		// if(nodes.length == 0){nodes = document.getElementsByClassName("nodeDiv_false");}
		// // console.log(nodes);
		// for(var i=0;i<nodes.length;i++){
		// console.log(nodes[i]);
			// if(nodes[i].className == "nodeDiv"){nodes[i].className = "nodeDiv_false";}else{nodes[i].className = "nodeDiv";} 
		// }
	}
	if(that.id == "opt_circles"){
		// console.log(this.$jit.Canvas.Background);
		// this.$jit.Canvas.Background = true;
	}
	if(that.id == "opt_statics"){
		// console.log(this.$jit.Canvas.Background);
		var staticsShort = document.getElementsByClassName("statics_short");
		// console.log(staticsShort);
		for (var i=0;i < staticsShort.length; i++){
			// console.log(staticsShort[i].style);
			if(that.checked == true)	{staticsShort[i].style.display = '';}
			if(that.checked == false)	{staticsShort[i].style.display = 'none';}
			
		}
		// writeOptions('ShowStatics',that.checked);
	}
	
}

function openOptPanel(){
	console.log("%c Opening options","background: #fff; color: orange");
	var rightPaneltable = document.getElementById("right_panel");
	var expandButton = document.getElementById("expand_button");
	if(rightPaneltable.style.display == "table"){
		rightPaneltable.style.display = "none";
		expandButton.style.right = "0px";
	}
	else{
		rightPaneltable.style.display = "table";
		expandButton.style.right = "150px";
	}
				
}

function writeOptions(prop,val){
		saved_options[prop] = val;
		// console.log(saved_options);
		setCookie('options',saved_options);
}

function opt_setNewBackGround(that,color){
	
}
function opt_setNewColor(that,color,nodeDiv){
	var type = that.id.substring(6,11);
	// console.log(type);
	var objects = document.querySelectorAll("[color_type='"+type+"']");
	that.style.color = color;
	if(type == 'back'){
		for(var i=0;i<objects.length;i++){
			objects[i].style.backgroundColor = color;
		}	
	}else if(type == 't1'){
		var objects = document.querySelectorAll("[color_type='back']");	
		for(var i=0;i<objects.length;i++){
			objects[i].style.color = color;
		}	
	}else if(type == 'sys2'){
		var objects = document.querySelectorAll("[color_type='sys']");	
		for(var i=0;i<objects.length;i++){
			objects[i].style.backgroundColor = color;
		}	
	}else if(type == 'fr1' || type == 'fr2'){
		
		var objects = document.querySelectorAll("[color_type='fr1']");

			// console.log(objects.length,objects);	
			for(var i=0;i<objects.length;i++){
							// console.log(objects[i]);
				objects[i].style.background = '-webkit-linear-gradient(top,'+saved_options.colors.color_fr1+' 0%,'+saved_options.colors.color_fr2+' 100%)';	
			}	
		
		// background: -webkit-linear-gradient(top,#262626 0%,#1A1A1A 100%);	
	}else{
		// console.log(that);
		// var objects = document.querySelectorAll("text[color_type='"+type+"'][wh_color_check='true']");
		var d=0;
		for(var i=0;i < objects.length;i++){
			d++;
			// console.log(objects[i]);
			objects[i].style.color= color;
			// objects[i].setAttribute('style','color:'+color);
		}
		// console.log(objects.length,d);
		
		var objects = document.querySelectorAll("text[color_type='"+type+"'][wh_color_check='false']");
		// console.log(objects);
		for(var i=0;i<objects.length;i++){
			// console.log(objects[i]);
			objects[i].style.color= saved_options.color_t2;;
			// objects[i].setAttribute('style','color:'+color);
		}
		// saved_options.color_High = color;
			// saved_options.save();
	}
	if(!jQuery.isEmptyObject(saved_options)){
	// console.log(saved_options);
	writeOptions('color_'+type,color);
	}
}