module.exports = function(props) {
	const element = props.ui.text({ body: "" });

	element.option({ label: "..." }, () => {
		
	});

	element.option({ label: "🍬 Home" }, () => {
		props.routes.home();
	});

	element.option({ label: "📱 Install Mobile" }, () => {
		props.routes.mobile();
	});

}
