module.exports = function(props) {
    // private

    const that = this;

    var state = {}

    function register() {
		// route to permissions section
		props.method.routes.permissions();
    }

	function init() {}

	function render() {
		const header = props.method.ui.text({ body: `
# Candeek
	` });
	
		header.style({ backgroundColor: "rgba(0, 0, 0, 0)", userSelect: "none" });

		props.method.ui.text({ body: `
### Like a flame to a candle, connect with locals and illuminate your surroundings.

Hear the buzz and find the fuzz, without leaving the comfort of anonymity.
		` });

		const getStartedTop = props.method.ui.selection();
		getStartedTop.option({ label: "Get Started" }, () => {
			register();
		});

		props.method.ui.image({ src: "/sections/landing/campfire.jpg" });

		props.method.ui.text({ body: `
### Get a birds eye view of your social surroundings.

Candeek offers a neutral place for others to speak freely, with local anonymous chat and posting.
		` });

		props.method.ui.image({ src: "/sections/landing/mountains.jpg" });

	props.method.ui.text({ body: `
### Talk direct and candid, if not candied with another.
		
Candeek offers an anonymous one on one chat to connect face to face if actually faceless conversation.
		` });

		props.method.ui.image({ src: "/sections/landing/walking.jpg" });

		const getStartedBottom = props.method.ui.selection();
		getStartedBottom.option({ label: "Get Started" }, () => {
			register();
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