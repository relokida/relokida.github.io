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
### What's this Candeek all about? What kind of candy does it dispense?
		
Created with a kind of care and concern for the candy that promotes a quiet inner spirit.
			` });
		
				props.method.ui.image({ src: "/sections/about/peppermints.jpg" });

		const description = props.method.ui.text({ body: `
### What makes Candeek different from the other socials?

I've never liked the term social "platform", reminds me of getting up on a soap box 
and promoting one's own agendas. Candeek is the antiplatform, in that, it attemps to 
defeat the toxicities that make other social sites characteristically and morally backwards.

### How does Candeek provide healthier social engagement?

In an era where self promotion is at an all 
time high, Candeek offers a form of both anonymity, and loss of identity that allows 
one to find their authentic selves and interact authentically without concern for 
public image within one's local community, and tribe.
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