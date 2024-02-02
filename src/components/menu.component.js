module.exports = function(props) {
	const element = props.ui.text({ body: "" });

	element.option({ label: "..." }, () => {
		
	});

	element.option({ label: "🍬 Home" }, () => {
		props.routes.home();
	});

	element.option({ label: "🦁 Create a Candid" }, () => {
		props.routes.addEntry();
	});

	element.option({ label: "❓ About Candeek" }, () => {
		props.routes.about();
	});

	element.option({ label: "📱 Install Mobile" }, () => {
		props.routes.mobile();
	});

	element.option({ label: "🔒 Privacy Policy" }, () => {
		props.routes.privacy();
	});

	element.option({ label: "🔥 Self Destruct" }, () => {
		props.routes.reset();
	});
}
