var serviceURL = window.location.href.indexOf("file:///") == 0 ? "http://localhost:8080/" : "http://cvservicespring-chuvadasquatro.rhcloud.com/";

$(document).ready(function() {
	buildMenu();
	setActiveStyle(getCachedStyle() ? getCachedStyle() : "word");
});

$("#styleswitcher a").click(function() {
	setActiveStyle($(this).attr("id"));
});

$("#download a").attr({
	target: '_blank',
	href: serviceURL + "public/Rodrigo-Costa.pdf"
});

function buildMenu() {
	$.getJSON(serviceURL + "pages", function(data) {
		var html = [];
		$.each(data.data, function(key, value) {
			html.push("<li id=\"" + value + "\"><a href=\"#\">" + (value.charAt(0).toUpperCase() + value.slice(1)).replace("-", " ") + "</a></li>");
		});
		$("#menu ul").html(html.join(""));
		$("#menu a").click(function() {
			getPage($(this).parent().attr("id"));
		});
		getPage("personal-info");
	});
}

function getPage(page) {
	$("#menu li").removeClass("highlight").addClass("normal");
	$("#" + page).removeClass("normal").addClass("highlight");
	$("#content").removeClass("normal").addClass("loading");
	$.getJSON(serviceURL + page, function(data) {
		var html = [];
		buildHTML(html, data.data, false);
		$("#content").html(html.join(""));
		// print generated HTML in console
		// console.log($("#content").html());
		$("#content").removeClass("loading").addClass("normal");
	});
}

function buildHTML(html, data, recursive) {
	if (recursive) {
		html.pop(); // "<li>"
		html.pop(); // "</li>"
	}
	html.push("<ul>");
	$.each(data, function(key, value) {
		html.push("<li>");
		if (value instanceof Object) {
			buildHTML(html, value, true);
		} else {
			html.push(value.indexOf("http://") > -1 || value.indexOf("https://") > -1 ? buildLink(value) : value);
		}
		html.push("</li>");
	});
	html.push("</ul>");
	if (recursive) {
		html.push("</li>");
	}
}

function buildLink(text) {
	var textArray = text.split(" ");
	for (var i = 0; i < textArray.length; i++) {
		var hasComma = false;
		if (textArray[i].indexOf("http://") == 0 || textArray[i].indexOf("https://") == 0) {
			if (textArray[i].substr(textArray[i].length - 1) == ",") {
				textArray[i] = textArray[i].substr(0, textArray[i].length - 1);
				hasComma = true;
			}
			textArray[i] = "<a href=\"" + textArray[i] + "\" target=\"_blank\">" + textArray[i] + "</a>" + (hasComma ? "," : "");
		}
	}
	return textArray.join(" ");
}

function setActiveStyle(title) {
	$("link").each(function() {
		if ($(this).attr("rel").indexOf("style") != -1) {
			$(this).prop("disabled", true);
		}
		if ($(this).attr("title") == title) {
			$(this).prop("disabled", false);
		}
	});
	setStyleCredits(title);
	setCachedStyle(title);
}

function setStyleCredits(title) {
	var credits = "";
	switch(title) {
		case "word":
			credits = "Word by Rodrigo Costa";
		break;
		case "black":
			credits = "Black by Rodrigo Costa";
		break;
	}
	$("#stylecredits").html(credits);
}

function getCachedStyle() {
	if (typeof(Storage) !== "undefined") {
		return localStorage.getItem("rmcStyle");
	}
}

function setCachedStyle(title) {
	if (typeof(Storage) !== "undefined") {
		localStorage.setItem("rmcStyle", title);
	}
}