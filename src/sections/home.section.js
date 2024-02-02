module.exports = function(props) {
    // private

    const that = this;

    var state = {}

	async function init() {
		// search closest city to current geolocation
		const geo_data = props.method.utils.settings().read().geo_data;
		const results = await props.method.utils.search().searchGeolocation({ geo_lat: geo_data.geo_lat, geo_lon: geo_data.geo_lon });
		if(results.length !== 0) {
			state.city = results[0];
		}
		else {
			state.city = null;
		}
    }

	async function updateChatbox(data) {
		const public_messages = await props.method.services.public_message().readChronological();
		// if no message to be found, tell the user
		if(public_messages.length === 0) {
			data.element.update({ body: `
### Early to the party it seems!

Start us off with a "hello!" if you're feeling extroverted as an introverted cat!
			` });
			return;
		}
		// otherwise list the acquired public_messages
		const messages = public_messages.map((d) => { return `
### \n
${d.data.icon} ${d.data.message}
` }).join(" ");
		data.element.update({ body: `${messages}` });
	}

	async function initializeChatbox(id) {
		const element = document.getElementById(id);
		element.scrollTop = element.scrollHeight;
	}

	async function scrollToBottom(id) {
		const element = document.getElementById(id);
		if(element.scrollTop < element.scrollHeight - 400) {
			return;
		}
		element.scrollTop = element.scrollHeight;
	}

    var state = {}

	async function render() {
		props.method.components.Header({ ui: props.method.ui, routes: props.method.routes });
		props.method.components.Menu({ ui: props.method.ui, routes: props.method.routes });

		props.method.ui.text({ body: `
### ${ state.city ? `${state.city.name}, ${state.city.admin1_code}` : "???" }
 
Hello! How are you today? Current listening radius is ${props.method.utils.settings().read().geo_data.radius} miles.
Change your location or your distance using the "Location" and "Distance" options below.
		` });

		const selectTop = props.method.ui.selection();

selectTop.option({ label: "🌿 Location" }, () => {
	props.method.routes.search();
});

selectTop.option({ label: "🌼 Distance" }, () => {
	props.method.routes.range();
});

const chatbox = props.method.ui.text({ body: `🍫 🍬 🍭 🍩 🍪 🍦 🍰 🎂 🧁 🥧 🍨 🍧 🍮 🍯 🍡 🍢 🍣 🍤 🍥` });
		// initialize chatbox
		chatbox.style({ maxHeight: "200px", overflow: "auto" });
		setTimeout(() => {
			initializeChatbox(`element-${chatbox.props._id}`);
		}, 1100);
		// set an interval to refresh chat
		state.chatbox_update = setInterval(async () => {
			await updateChatbox({ element: chatbox });
			// scroll to bottom
			scrollToBottom(`element-${chatbox.props._id}`);
		}, 1000);

		const chat = props.method.ui.form();

		chat.input({ name: "message", type: "textarea", placeholder: "💬 Message" });
		chat.submit(async (data) => {
			// request user client data
			const user = await props.method.utils.user().read();
			// create entry
			await props.method.services.public_message().create({
				owner_id: user._id,
				icon: user.icon,
				message: data.message
			});
			console.log("broadcasted");
			const public_messages = await props.method.services.public_message().readBroadcasts();
			for(var i = 0; i < public_messages.length; ++i) {
				props.method.socket.emit("/public_message/broadcast", { public_message: public_messages[i].data })
			}
		});

		props.method.ui.text({ body: `
### Post it up, post it down, post it all around. 

Local tribes, local vibes, whatever feels pertinent for the community to know, with room to be candid,
open, honest and free, a bird of anonymity.
		` });

		const selectBottom = props.method.ui.selection();

		selectBottom.option({ label: "🦁 Create a Candid" }, () => {
			props.method.routes.addEntry();
		});

		// read available entries
		const entries = await props.method.services.entry().readAvailable();
		// if no entries are present inform the user
		if(entries.length === 0) {
			props.method.ui.image({ src: "/sections/home/resort.jpg" });

			props.method.ui.text({ body: `
### No Candids as of yet!

Be a self starter and put yourself on the field, score all the goals, pass the rock, spike the football. Create a Candid.
Whatever the kids are doing these days.
		` });

		const pepTalk = props.method.ui.selection();
		pepTalk.option({ label: "🦁 Ok coach! Put me in." }, () => {
			props.method.routes.addEntry();
		});
		}
		for(var i = 0; i < entries.length; ++i) {
			props.method.components.Entry({ ui: props.method.ui, routes: props.method.routes, entry: entries[i] });
		}
		// props.method.ui.image({ src: "https://cdn.pixabay.com/photo/2016/07/11/17/45/abstract-1510190_640.png" });

		// deconstruct timing interval for chatbox
		props.method.ui.deconstructor({ deconstructor: async function() { clearInterval(state.chatbox_update); } });
	}

	this.display = async function() {
		// initialize state data...
		await init();
		// clean slate the existing interface...
		await props.method.ui.clear();
		// render the new interface elements...
        await render();
		// scroll to top
		props.method.utils.window().scrollToTop();
	}
  
};