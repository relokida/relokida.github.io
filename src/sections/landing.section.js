module.exports = function(props) {
    // private

    const that = this;

    var state = {}

    function init() {
    }

	function render() {
		props.method.components.Header({ ui: props.method.ui, routes: props.method.routes }); 
		props.method.components.Menu({ ui: props.method.ui, routes: props.method.routes });

		props.method.ui.image({ src: "/sections/landing/0_squared.png" });

		props.method.ui.text({ body: `
### Affordable, Scaleable, Liveable
		
Old innovations, new packaging, meet the geodesic dwellings, that fits your style.
			` });

		props.method.ui.image({ src: "/sections/dwellings/1_squared.png" });

		props.method.ui.image({ src: "/sections/dwellings/11_squared.png" });

		props.method.ui.image({ src: "/sections/dwellings/18_squared.png" });

		props.method.ui.text({ body: `
### What makes Relokida different?

Offering a scaleable, renewable and decentralized 
way to live, with a shelter that aligns with the geometry of nature.
		` });


		// image or video square of assemble process, 3d printing
		props.method.ui.image({ src: "/sections/landing/assembly/18_squared.png" });

		props.method.ui.text({ body: `
### Assembled like a tent, rigid like a house, fit for any environment.

Each piece fits together like lego blocks, to form repeating patterns of triangles, and a structure that is 
strong and rigid, ready for challenging weather conditions, or simply bluesky days.
		`, width: "full" });

		// beauty shots of dome renders in natural environments, trees, mountains, lakes, streams.
		props.method.ui.image({ src: "/sections/landing/21_squared.png" });

		props.method.ui.image({ src: "/sections/landing/29_squared.png" });

		props.method.ui.image({ src: "/sections/landing/41_squared.png" });

props.method.ui.text({ body: `
### Ready to find a geodesic home that fits your unique living style?

Find a model that suits you, whether you're lounging solo, or in need of a family unit, 
we've got you covered, and sheltered.
		` });

		const selectLiving = props.method.ui.selection();

		selectLiving.option({ label: "🌿 Find my style!" }, () => {
			props.method.routes.dwellings();
		});

		// video of community 
		props.method.ui.image({ src: "/sections/landing/assembly/7_squared.png" });

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