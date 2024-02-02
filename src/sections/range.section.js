module.exports = function(props) {
    // private

    const that = this;

    var state = {}

    function init() {
    }

	function render() {
		props.method.components.Header({ ui: props.method.ui, routes: props.method.routes }); 
		props.method.ui.text({ body: `
### Change your range, attitude and perceptions.

To find the spectacles we must adjust our spectacles. Adjust the distance you 
send and receive glorious messaging and candids.
		` });

		props.method.ui.image({ src: "/sections/range/station.jpg" });


		const range = props.method.ui.selection();

		range.option({ label: "🌎 Region (60 miles)" }, async () => {
			// attain existing settings
			const geo_data = props.method.utils.settings().read().geo_data;
			// update radius property
			geo_data.radius = 60;
			// initialize app for the desired radius range
			await props.method.initializers.construct(geo_data);
			// send them home, country home mountain momma
			props.method.routes.home();
		});

		range.option({ label: "🏟️ City (20 miles)" }, async () => {
			// attain existing settings
			const geo_data = props.method.utils.settings().read().geo_data;
			// update radius property
			geo_data.radius = 20;
			// initialize app for the desired radius range
			await props.method.initializers.construct(geo_data);
			// send them home, country home mountain momma
			props.method.routes.home();
		});

		range.option({ label: "🏠 Building (1 mile)" }, async () => {
			// attain existing settings
			const geo_data = props.method.utils.settings().read().geo_data;
			// update radius property
			geo_data.radius = 1;
			// initialize app for the desired radius range
			await props.method.initializers.construct(geo_data);
			// send them home, country home mountain momma
			props.method.routes.home();
		});

		range.option({ label: "🪑 Room (500 feet)" }, async () => {
			// attain existing settings
			const geo_data = props.method.utils.settings().read().geo_data;
			// update radius property
			geo_data.radius = 0.09;
			// initialize app for the desired radius range
			await props.method.initializers.construct(geo_data);
			// send them home, country home mountain momma
			props.method.routes.home();
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