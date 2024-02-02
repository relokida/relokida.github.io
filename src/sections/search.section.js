module.exports = function(props) {
    // private

    const that = this;

    var state = {}

    async function init() {
		// load a city list either by keyword or geolocation
		if(props.hasOwnProperty("keyword")) {
			const results = await props.method.utils.search().searchCity({ keyword: props.keyword });
			state.cities = results;
		}
		else {
			const geo_data = props.method.utils.settings().read().geo_data;
			const results = await props.method.utils.search().searchGeolocation({ geo_lat: geo_data.geo_lat, geo_lon: geo_data.geo_lon });
			state.cities = results;
		}
    }

	async function render() {
		props.method.components.Header({ ui: props.method.ui, routes: props.method.routes });
		props.method.ui.text({ body: `
### Ready to take a trip?

Search for a place beyond the one you currently reside.
		` });

		const currentLocation = props.method.ui.selection();
		currentLocation.option({ label: "🍭 Current Location" }, async () => {
			// first grab the geolocation info of the client
			const geo = await props.method.utils.geolocation().getCurrentPosition();

			// attain existing settings
			const geo_data = props.method.utils.settings().read().geo_data;

			// initialize app for the desired geolocation and radius range
			await props.method.initializers.construct({ geo_lat: geo.coords.latitude, geo_lon: geo.coords.longitude, radius: geo_data.radius });
			// send them to review the guidelines section
			props.method.routes.home();
		});

		const search = ui.form();
		search.input({ name: "search", type: "text", placeholder: "🌎 Search a City" });
		search.submit((data) => {
			props.method.routes.search({ keyword: data.search });
		});

		// create a list of cities
		for(var i = 0; i < state.cities.length; ++i) {
			props.method.components.Search({ method: props.method, data: state.cities[i] });
		}
	}

	this.display = async function() {
		// initialize state data...
		await init();
		// clean slate the existing interface...
		await props.method.ui.clear();
		// render the new interface elements...
        render();
		// scroll to top
		props.method.utils.window().scrollToTop();
	}
  
};