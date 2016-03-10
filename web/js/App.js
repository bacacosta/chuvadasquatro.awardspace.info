var app = {
		serviceURL: "http://cvservicespring-chuvadasquatro.rhcloud.com/",

		init: function() {
			menu.init();
			styleSwitcher.init();

			$("#download a").attr({
				target: '_blank',
				href: this.serviceURL + "public/Rodrigo-Costa.pdf"
			});
		}
}

app.init();
