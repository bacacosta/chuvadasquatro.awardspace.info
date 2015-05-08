var content = {
		getContent: function(page) {
			$("#menu li").removeClass("highlight").addClass("normal");
			$("#" + page).removeClass("normal").addClass("highlight");
			$("#content").removeClass("normal").addClass("loading");
			$.getJSON(app.serviceURL + "rest/" + page, function(data) {
				var html = [];
				content.buildHTML(html, data.data, false);
				$("#content").html(html.join(""));
				// print generated HTML in console
				// console.log($("#content").html());
				$("#content").removeClass("loading").addClass("normal");
			});
		},

		buildHTML: function(html, data, recursive) {
			if (recursive) {
				html.pop(); // "<li>"
				html.pop(); // "</li>"
			}
			html.push("<ul>");
			$.each(data, function(key, value) {
				html.push("<li>");
				if (value instanceof Object) {
					content.buildHTML(html, value, true);
				} else {
					html.push(value.indexOf("http://") > -1 || value.indexOf("https://") > -1 ? content.buildLink(value) : value);
				}
				html.push("</li>");
			});
			html.push("</ul>");
			if (recursive) {
				html.push("</li>");
			}
		},

		buildLink: function(text) {
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
}
