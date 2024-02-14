module.exports = function(props) {
	const element = props.ui.text({ body: "" });

	element.option({ label: "..." }, () => {
		
	});

	element.option({ label: "🌍 Home" }, () => {
		props.routes.landing();
	});

	element.option({ label: "🌿 Dwellings" }, () => {
		props.routes.dwellings();
	});

	element.option({ label: "📱 Install Mobile" }, () => {
		props.routes.mobile();
	});

}
