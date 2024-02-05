module.exports = function(props) {
    // private

    const that = this;

    var state = {}

    function init() {
    }

	function render() {
		props.method.components.Header({ ui: props.method.ui, routes: props.method.routes }); 
		props.method.components.Menu({ ui: props.method.ui, routes: props.method.routes });

		props.method.ui.text({ body: `
### Affordable, Scaleable, Liveable
		
Old innovations, new packaging, meet the geodesic dwellings of the future liberated from traditional 
and overbearing construction costs, that fits your style.
			` });
		
		// video of beautiful domes, the architecture, the 3d printing
		props.method.ui.image({ src: "/placeholder.jpg" });

		props.method.ui.text({ body: `
### What makes Relokida different?

Housing that is altogether aligned with our anthropological roots, governed not by the power of 
banking entities, but that of which is affordable, sustainable and decentralizing from conventions 
only designed to ensnare.
		` });


		// image or video square of assemble process, 3d printing
		props.method.ui.image({ src: "/placeholder.jpg" });

		props.method.ui.text({ body: `
### Assembled like a tent, rigid like a house, fit for any environment.

Each piece fits together like lego blocks, to form repeating patterns of triangles, and a structure that is 
strong and rigid, ready for challenging weather conditions, or simply bluesky days.
		` });

		// beauty shots of dome renders in natural environments, trees, mountains, lakes, streams.
		props.method.ui.image({ src: "/placeholder.jpg" });

		props.method.ui.image({ src: "/placeholder.jpg" });

		props.method.ui.image({ src: "/placeholder.jpg" });

props.method.ui.text({ body: `
### Ready to find a geodesic home that fits your unique living style?

Find a model that suits you, whether you're lounging solo, or in need of a family unit, 
we've got you covered, and sheltered.
		` });

		const selectLiving = props.method.ui.selection();

		selectLiving.option({ label: "🌿 Find my style!" }, () => {
			props.method.routes.search();
		});

		// video of community 
		props.method.ui.image({ src: "/placeholder.jpg" });

props.method.ui.text({ body: `
### Solving the housing dilemma together, one triangle at a time.
		
Take a peak at our community, see what is going up and down at Relokida.
		` });
		
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