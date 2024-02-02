module.exports = function(props) {
	const search = props.method.ui.text({ body: `
### ${props.data.name}, ${props.data.admin1_code}
	` });

	search.style({ cursor: "pointer" });
	
	setTimeout(() => {
		document.getElementById(`element-${search.props._id}`).onclick = async function() {
			// reinitialize with given geolocation of city
			// attain existing settings
			const geo_data = props.method.utils.settings().read().geo_data;
			// initialize app for the desired radius range using the setting established
			geo_data.geo_lat = props.data.coordinates.lat;
			geo_data.geo_lon = props.data.coordinates.lon;
			await props.method.initializers.construct(geo_data);
			// send them home mountain mommma
			props.method.routes.home();
		}
	}, 10);
}
