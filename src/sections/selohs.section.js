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

		props.method.ui.image({ src: "/sections/dwellings/1_squared.png" });

		props.method.ui.image({ src: "/sections/dwellings/2_squared.png" });

		props.method.ui.image({ src: "/sections/dwellings/3_squared.png" });

		props.method.ui.image({ src: "/sections/dwellings/4_squared.png" });

		props.method.ui.image({ src: "/sections/dwellings/5_squared.png" });

		props.method.ui.image({ src: "/sections/dwellings/6_squared.png" });

		props.method.ui.image({ src: "/sections/dwellings/7_squared.png" });

		props.method.ui.image({ src: "/sections/dwellings/8_squared.png" });

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