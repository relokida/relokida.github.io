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
### Flying solo or living amongst a herd?
		
Relokida domes are made to scale with your dwelling style, whether living with a few or as if 
Steve Martin in cheaper by the dozen, we've got a home for all gatherings.
			`, width: "full" });
		
		props.method.ui.image({ src: "/sections/dwellings/0_squared.png" });

		props.method.ui.text({ body: `
### Selo HS

- 1 bed, 1 bath, 1 kitchen
- 560 square feet of living space

Two domes are better than one, an altogether humble dwelling fit for one or two 
intimate residence, an exceptional starting place that can grow alongside your living demands.
		` });

props.method.ui.selection().option({ label: "🌿 Learn More" }, () => {
	props.method.routes.seloHS();
});

props.method.ui.image({ src: "/sections/dwellings/9_squared.png" });

		props.method.ui.text({ body: `
### Omaka HS

- 2 bed, 2 bath, 1 kitchen
- 840 square feet of living space 

Goldilox would choose this intermediate, enough room for 2 to 3 residence, and of course room to 
scale and grow to meet your demands.
		` });

props.method.ui.selection().option({ label: "🌿 Learn More" }, () => {
	props.method.routes.omakaHS();
});

props.method.ui.image({ src: "/sections/dwellings/17_squared.png" });

		props.method.ui.text({ body: `
### Abba HS

- 3 bed, 3 bath, 1 kitchen
- 1120 square feet of living space 

Abba is smiling down on you, not in a condescending way of course! Some of us need room for our 
crew. A pad fit for 3 to 4 residence, and of course options to scale larger if you're the go big or go home, literally 
in this case.
		` });

props.method.ui.selection().option({ label: "🌿 Learn More" }, () => {
	props.method.routes.abbaHS();
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