$(document).ready(function() {
	setActiveStyle("word");
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
	$.get("data/" + page + ".html", function(data) {
		$("#content").addClass("normal");
		$("#content").html(data);
	});
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
	$("#styleCredits").html(credits);
}