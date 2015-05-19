var styleSwitcher = {
		init: function() {
			this.setActiveStyle(this.getCachedStyle());

			$("#styleswitcher a").click(function() {
				styleSwitcher.setActiveStyle($(this).attr("id"));
			});
		},

		setActiveStyle: function(title) {
			$("link").each(function() {
				if ($(this).attr("rel").indexOf("style") != -1) {
					$(this).prop("disabled", true);
				}
				if ($(this).attr("title") == title) {
					$(this).prop("disabled", false);
				}
			});
			this.setStyleCredits(title);
			this.setCachedStyle(title);
		},

		setStyleCredits: function(title) {
			var credits = "";
			switch(title) {
				case "word":
					credits = "Word by Rodrigo Costa";
				break;
				case "black":
					credits = "Black by Rodrigo Costa";
				break;
				case "splash":
					credits = "Splash by Rodrigo Costa";
				break;
			}
			$("#stylecredits").html(credits);
		},

		getCachedStyle: function() {
			var style;
			if (typeof(Storage) !== "undefined") {
				style = localStorage.getItem("rmcStyle");
			}
			return style ? style : "word";
		},

		setCachedStyle: function(title) {
			if (typeof(Storage) !== "undefined") {
				localStorage.setItem("rmcStyle", title);
			}
		}
}
