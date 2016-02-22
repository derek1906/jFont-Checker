﻿/**
*
*  JFont Checker
*  Derek Leung
*  Original Date: 2010.8.23
*  Current: Feb 2016
*  
*  This piece of code checks for the existence of a specified font.
*  It ultilizes the font fallback mechanism in CSS for font checking.
*  
*  Compatibility:
*  Tested on Chrome, Firefox, IE9+
*  Requires CSS and JS
*  
**/
(function(){
	var containerA, containerB, html = document.getElementsByTagName("html")[0],
		filler = "random_words_#_!@#$^&*()_+mdvejreu_RANDOM_WORDS";

	function createContainers(){
		containerA = document.createElement("span");
		containerB = document.createElement("span");

		containerA.textContent = filler;
		containerB.textContent = filler;

		var styles = {
			margin: "0",
			padding: "0",
			fontSize: "32px",
			position: "absolute",
			zIndex: "-1"
		};

		for(var key in styles){
			if(styles.hasOwnProperty(key)){
				containerA.style[key] = styles[key];
				containerB.style[key] = styles[key];
			}
		}

		return function(){
			//clean up
			containerA.outerHTML = "";
			containerB.outerHTML = "";
		};
	}

	function checkDimension(){
		return containerA.offsetWidth === containerB.offsetWidth &&
			   containerA.offsetHeight === containerB.offsetHeight;
	}

	function checkfont(font, DOM){
		var rootEle = html;
		if(DOM && DOM.children && DOM.children.length) rootEle = DOM.children[0];

		var result = null,
			reg = /[\,\.\/\;\'\[\]\`\<\>\\\?\:\"\{\}\|\~\!\@\#\$\%\^\&\*\(\)\-\=\_\+]/g,
			cleanUp = createContainers();

		font = font.replace(reg, "");

		rootEle.appendChild(containerA);
		rootEle.appendChild(containerB);

		//First Check
		containerA.style.fontFamily = font + ",monospace";
		containerB.style.fontFamily = "monospace";

		if(checkDimension()){
		   	//Assume Arial exists, Second Check
			containerA.style.fontFamily = font + ",Arial";
			containerB.style.fontFamily = "Arial";
			result = !checkDimension();
		}else{
			result = true;
		}

		cleanUp();
		return result
	}

	this.checkfont = checkfont;
})();