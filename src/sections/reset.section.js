module.exports = function(props) {
    // private

    const that = this;

    var state = {}

    function init() {
    }

	function render() {
		props.method.components.Header({ ui: props.method.ui, routes: props.method.routes }); 
		props.method.components.Menu({ ui: props.method.ui, routes: props.method.routes });
		const description = props.method.ui.text({ body: `
### Are you ready to head out for good? Perhaps your spiritual journey is taking you to a solitary place.

Tap the ... to clean slate the application.
		` });

		
		description.option({ label: "FACTORY RESET" }, async () => {
			await props.method.initializers.removeUser();
			props.method.routes.landing();
		});
	}

	this.display = async function() {
		// clean slate the existing interface...
		await props.method.ui.clear();
		// render the new interface elements...
        render();
		// initialize state data...
		init();
		// scroll to top
		props.method.utils.window().scrollToTop();
	}
  
};