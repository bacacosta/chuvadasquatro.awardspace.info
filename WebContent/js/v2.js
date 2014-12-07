$(document).ready(function() {
	setActiveStyle(getCachedStyle() ? getCachedStyle() : "word");
	getPage("info");
});

$("#menu a").click(function() {
	getPage($(this).parent().attr("id"));
});

$("#styleswitcher a").click(function() {
	setActiveStyle($(this).attr("id"));
});

function getPage(page) {
	$("#menu li").removeClass("highlight").addClass("normal");
	$("#" + page).removeClass("normal").addClass("highlight");
	$("#content").removeClass("normal").addClass("loading");
	$.getJSON("http://service-chuvadasquatro.rhcloud.com/" + page + "/", function(data) {
		var html = [];
		buildHTML(html, data, false);
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
			html.push(value.substring(0, 7) == "http://" ? "<a href=\"" + value + "\" target=\"_blank\">" + value + "</a>" : value);
		}
		html.push("</li>");
	});
	html.push("</ul>");
	if (recursive) {
		html.push("</li>");
	}
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