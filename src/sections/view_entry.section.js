module.exports = function(props) {
    // private

    const that = this;

    var state = {}

    function init() {
    }

	async function render() {
		props.method.components.Header({ ui: props.method.ui, routes: props.method.routes }); 
		props.method.components.Menu({ ui: props.method.ui, routes: props.method.routes });
		
		props.method.ui.text({ body: `
### ${props.entry.data.title}

${props.entry.data.description}
` });

		for(var i = 0; i < props.entry.data.files.length; ++i) {
			props.method.ui.image({ src: props.entry.data.files[i] });
		}
		// props.method.ui.image({ src: "https://cdn.pixabay.com/photo/2016/07/11/17/45/abstract-1510190_640.png" });
		
		const feedback = props.method.ui.text({ body: `
### Was this entry helpful?

Feedback keeps entries useful for the community! Feedback can feed a family of four, maybe more.
		` });

		const select = props.method.ui.selection();

select.option({ label: "👍 Yes!" }, async () => {
	// promote entry
    await props.method.services.entry().promote({ _id: props.entry.data._id });
	feedback.update({ body: `
### Thanks for the feedback!

📦 We'll pass this one along, signed sealed delivered.
	` });

});

select.option({ label: "👎 Nope." }, async () => {
	// demote entry
	await props.method.services.entry().demote({ _id: props.entry.data._id });
	feedback.update({ body: `
### Thanks for letting us know.
	
🗑️🔥 As they say, dumpster fires only come in one flavor, except for gutter oil sushi. 🍣
		` });
});

		// read available entries
		const entries = await props.method.services.entry().readAvailable();
		for(var i = 0; i < entries.length; ++i) {
			props.method.components.Entry({ ui: props.method.ui, routes: props.method.routes, entry: entries[i] });
		}
	}

	this.display = async function(data) {
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