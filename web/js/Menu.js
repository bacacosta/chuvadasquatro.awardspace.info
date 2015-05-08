var menu = {
		init: function() {
			this.buildMenu();
		},

		buildMenu: function() {
			$.getJSON(app.serviceURL + "rest/pages", function(data) {
				var html = [];
				$.each(data.data, function(key, value) {
					html.push("<li id=\"" + value + "\"><a href=\"#\">" + (value.charAt(0).toUpperCase() + value.slice(1)).replace("-", " ") + "</a></li>");
				});
				$("#menu ul").html(html.join(""));
				$("#menu a").click(function() {
					content.getContent($(this).parent().attr("id"));
				});
				content.getContent("personal-info");
			});
		}
}
