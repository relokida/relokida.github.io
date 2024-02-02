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
### How does Candeek keep my identity safe and secure and out of the caramel swamps?

While Candeek does use geolocation information, ultimately one's identity is carefully 
concealed behind systems that obfuscate one's actual positioning, within the range selected. 
That is to say, no other user will be able to find your location.

### Privacy and security starts with every individual first and foremost.

Safety and security starts with you, be careful not to give information 
that could lead to compromising your whereabouts or happenings.
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