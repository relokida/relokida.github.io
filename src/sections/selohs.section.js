module.exports = function(props) {
    // private

    const that = this;

    var state = {}

    function init() {
    }

	function render() {
		props.method.components.Header({ ui: props.method.ui, routes: props.method.routes }); 
		props.method.components.Menu({ ui: props.method.ui, routes: props.method.routes });

		props.method.ui.image({ src: "/sections/dwellings/0_squared.png" });

		props.method.ui.text({ body: `
### Selo HS

- 1 bed, 1 bath, 1 kitchen
- 560 square feet of living space

Two domes are better than one, an altogether humble dwelling fit for one or two 
intimate residence, an exceptional starting place that can grow alongside your living demands.

### Specs (per dome)

Size & Weight

- Floor Area: 280 sq.ft. (26 sq. meters)

- Ceiling Center Height: 11 ft. 9 in. (3.6 meters)

- Approx. Dome Weight: 630 lbs. (286 kg.)

- Bay Window: 8ft. h x 11ft. w (2.4 x 3.4 meters)

- Frame Package: 72″ x 20″ x 18″. (1.8 x .5 x .5 meters)

- Cover Package: 40″ x 40″ x 30″ (1 x 1 x .75 meters)

 

Engineering

- No. of Struts: 95

- Frequency: 3

- Max Wind w/ No Snow: 150mph

- Max Snow w/ Wind Load: 20lbs @130mph

- Dome Volume: 1900 cubic feet

Assembly

- Assembly Time: 4 to 8 hours with crew of 3 or 4

- Required Equipment: 8 A- Frame Ladder, 12 Material Lift
		` });

		props.method.ui.image({ src: "/sections/dwellings/1_squared.png" });

		props.method.ui.image({ src: "/sections/dwellings/2_squared.png" });

		props.method.ui.image({ src: "/sections/dwellings/3_squared.png" });

		props.method.ui.image({ src: "/sections/dwellings/4_squared.png" });

		props.method.ui.image({ src: "/sections/dwellings/5_squared.png" });

		props.method.ui.image({ src: "/sections/dwellings/6_squared.png" });


		props.method.components.FAQ({ method: props.method });
		
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