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
### 🍊 Android
		
Just tap ⋮ then "Install app...".
		` });

		props.method.ui.text({ body: `
### 🍏 Ios

Just tap 📤 then "Add to Home Screen".
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