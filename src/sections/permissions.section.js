module.exports = function(props) {
    // private

    const that = this;

    var state = {}

    function init() {
    }

	function render() {
		const header = props.method.ui.text({ body: `
# Candeek
	` });
	
		header.style({ backgroundColor: "rgba(0, 0, 0, 0)", userSelect: "none" });

		props.method.ui.text({ body: `
### Permissions

Candeek needs access to the following permissions:

- Geolocation Information
		` });

		props.method.ui.image({ src: "/sections/enable/forest.jpg" });

		const getStartedBottom = props.method.ui.selection();
		getStartedBottom.option({ label: "Enable Permissions" }, async () => {
			// first grab the geolocation info of the client
			const geo = await props.method.utils.geolocation().getCurrentPosition();

			// initialize app for the desired geolocation and radius range
			await props.method.initializers.construct({ geo_lat: geo.coords.latitude, geo_lon: geo.coords.longitude, radius: 60 });
			// send them to review the guidelines section
			props.method.routes.guidelines();
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