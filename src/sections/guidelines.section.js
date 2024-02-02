module.exports = function(props) {
    // private

    const that = this;

    var state = {}

    function init() {
    }

	function render() {
		props.method.components.Header({ ui: props.method.ui, routes: props.method.routes }); 
		props.method.ui.text({ body: `
### Help us keep wonderland, wonderful and Alice safe.

A few guidelines to adhere, to keep the community safe.
		` });

		props.method.ui.image({ src: "/sections/rules/waterfall.jpg" });

		props.method.ui.text({ body: `
### First rule of Candeek Club, is don't talk about Candeek Club or expose your identity.

Candeek is an anonymous platform for local engagement, important not to inform anyone of 
your whereabouts so you can remain safely a candy ghost.
		` });

		props.method.ui.image({ src: "/sections/rules/grassland.jpg" });

	props.method.ui.text({ body: `
### Second rule, keep conversations respectful, and don't be a malicious gossip.
		
Nobody likes a bad gumdrop, be kind to others, be kind to yourself, keep our environment 
friendly. As my gingerbread horse informs me, contempt for others is contempt for oneself.
		` });

		props.method.ui.image({ src: "/sections/rules/seaside.jpg" });

		props.method.ui.text({ body: `
### Third rulette, be authentic, be real, true to oneself and others.
				
Candeek is a vision for how social platforms can be both more secure and authentically engaging. 
Let's build a land of sweets together.
			` });

		const getStartedBottom = props.method.ui.selection();
		getStartedBottom.option({ label: "Ok, let's go!" }, () => {
			// send them home, country home mountain momma
			props.method.routes.home();
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