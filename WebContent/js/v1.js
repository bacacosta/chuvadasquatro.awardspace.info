var xmlHttp;

window.onload = function() {
	var cookie = getCookie("rmcStyle");
	setActiveStyle(cookie ? cookie : getPreferredStyle());
	getPage("info");
}

window.onunload = function() {
	setCookie("rmcStyle", getActiveStyle(), 365);
}

function getRequestObject() {
	xmlHttp = null;
	try {
		//Firefox, Opera 8.0+, Safari
		xmlHttp = new XMLHttpRequest();
	} catch (e) {
		try {
			//Internet Explorer 6.0+
			xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			//Internet Explorer 5.5+
			xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
		}
	}
	return xmlHttp;
}

function getMenuItems() {
	var nodeList = document.getElementById("menu").getElementsByTagName("li");
	var menuItems = new Array();
	for (i = 0; i < nodeList.length; i++)
		menuItems[i] = nodeList.item(i).id;
	return menuItems;
}

function clearSelect() {
	var menuItems = getMenuItems();
	for (i in menuItems)
		document.getElementById(menuItems[i]).className = "normal";
}

function itemSelect(item) {
	document.getElementById(item).className = "highlight";
}

function loadPage() {
	if (xmlHttp.readyState > 0 && xmlHttp.readyState < 4) {
		document.getElementById("content").className = "loading";
	} else if (xmlHttp.readyState == 4) {
		document.getElementById("content").className = "normal";
		document.getElementById("content").innerHTML = xmlHttp.responseText;
	}
}

function getPage(page) {
	xmlHttp = getRequestObject();
	if (xmlHttp == null) {
		alert("Your browser does not support AJAX!");
		return false;
	}
	clearSelect();
	itemSelect(page);
	xmlHttp.onreadystatechange = loadPage;
	xmlHttp.open("GET", "data/" + page + ".html", true);
	xmlHttp.send(null);
}

function setStyleCredits(title) {
	var credits;
	switch(title) {
		case "word":
			credits = "Word by Rodrigo Costa";
		break;
		case "black":
			credits = "Black by Rodrigo Costa";
		break;
	}
	document.getElementById("styleCredits").innerHTML = credits;
}

function setActiveStyle(title) {
	var linkList = document.getElementsByTagName("link");
	for (i = 0; i < linkList.length; i++) {
		if (linkList[i].getAttribute("rel").indexOf("style") != -1 && linkList[i].getAttribute("title"))
			linkList[i].disabled = true;
		if (linkList[i].getAttribute("title") == title)
			linkList[i].disabled = false;
	}
	setStyleCredits(title);
}

function getActiveStyle() {
	var linkList = document.getElementsByTagName("link");
	for (i = 0; i < linkList.length; i++)
		if (linkList[i].getAttribute("rel").indexOf("style") != -1 && linkList[i].getAttribute("title") && !linkList[i].disabled)
			return linkList[i].getAttribute("title");
	return null;
}

function getPreferredStyle() {
	var linkList = document.getElementsByTagName("link");
	for (i = 0; i < linkList.length; i++)
		if (linkList[i].getAttribute("rel").indexOf("style") != -1 && linkList[i].getAttribute("rel").indexOf("alt") == -1 && linkList[i].getAttribute("title"))
			return linkList[i].getAttribute("title");
	return null;
}

function setCookie(name, value, expireDaysLeft) {
	var expireDate = new Date();
	expireDate.setDate(expireDate.getDate() + expireDaysLeft);
	document.cookie = name + "=" + escape(value) + ";expires=" + expireDate.toUTCString();
}

function getCookie(name) {
	var valueStart, valueEnd;
	if (document.cookie.length > 0) {
		valueStart = document.cookie.indexOf(name + "=");
		if (valueStart != -1) {
			valueStart = valueStart + name.length + 1;
			valueEnd = document.cookie.indexOf(";", valueStart);
			if (valueEnd == -1)
				valueEnd = document.cookie.length;
			return unescape(document.cookie.substring(valueStart, valueEnd));
		}
	}
	return null;
}