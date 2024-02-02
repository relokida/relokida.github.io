module.exports = function(props) {
    // private

    const that = this;

    var state = {
		media: [],
		display_index: 0
	}

    function init() {
    }

	function rotateDisplay(data) {
		// { display: {} }
		if(state.media.length === 0) {
			return;
		}
		if(state.display_index === state.media.length - 1) {
			state.display_index = 0;
		}
		else {
			state.display_index += 1;
		}
		data.display.update({ src: state.media[state.display_index] });
	}

	function filterForJPEGandPNG(files) {
		const allowedTypes = ['image/jpeg', 'image/png'];
		const filteredFiles = [];
	  
		for (let i = 0; i < files.length; i++) {
		  const file = files[i];
		  if (allowedTypes.includes(file.type)) {
			filteredFiles.push(file);
		  }
		}
	  
		return filteredFiles;
	  }

	function resizeImageWithBackground(file, maxWidth, maxHeight) {
		return new Promise((resolve, reject) => {
		  const reader = new FileReader();
		  reader.onload = function(event) {
			const img = new Image();
			img.onload = function() {
			  const canvas = document.createElement('canvas');
			  const maxSide = Math.max(maxWidth, maxHeight);
			  const scaleFactor = maxSide / Math.max(img.width, img.height);
	  
			  const width = img.width * scaleFactor;
			  const height = img.height * scaleFactor;
	  
			  canvas.width = maxSide;
			  canvas.height = maxSide;
	  
			  const ctx = canvas.getContext('2d');
	  
			  // Fill the canvas with a black background
			  ctx.fillStyle = 'black';
			  ctx.fillRect(0, 0, maxSide, maxSide);
	  
			  // Calculate the positioning for centering the image
			  const offsetX = (maxSide - width) / 2;
			  const offsetY = (maxSide - height) / 2;
	  
			  // Draw the resized image on the black background
			  ctx.drawImage(img, offsetX, offsetY, width, height);
	  
			  const resizedBase64 = canvas.toDataURL('image/jpeg'); // Change the format if needed
	  
			  resolve(resizedBase64);
			};
			img.onerror = function(error) {
			  reject(error);
			};
			img.src = event.target.result;
		  };
		  reader.onerror = function(error) {
			reject(error);
		  };
		  reader.readAsDataURL(file);
		});
	  }

	function render() {
		props.method.components.Header({ ui: props.method.ui, routes: props.method.routes }); 
		props.method.components.Menu({ ui: props.method.ui, routes: props.method.routes });

		
		props.method.ui.text({ body: `
### Found something to share? Finders seekers, lemon squeakers.

Great! Take some shots (photographs), the sheriff is photogenic, but the deputy is off limits according to Bob Marley.
		` });

		const display = props.method.ui.image({ src: "/sections/add_entry/galaxy.jpg" })

		props.method.ui.text({ body: `
### Give a few words, like a wedding at a funeral.

Ashes to ashes, dust to dust, tell us about what you found! What is it? Where is it? How do I get my grubby grippers on it?
		` });

		const entry = props.method.ui.form();
		const files = entry.input({ name: "files", type: "file" });
		entry.input({ name: "title", type: "text", placeholder: "What is it?" });
		entry.input({ name: "description", type: "textarea", placeholder: "Tell us more about that..." });
		entry.submit(async (data) => {
			// request user client data
			const user = await props.method.utils.user().read();
			// create entry
			const entry = await props.method.services.entry().create({
				owner_id: user._id,
				title: data.title,
				description: data.description,
				files: state.media
			});
			// direct to newly created entry
			props.method.routes.viewEntry({ entry: await props.method.services.entry().readSingleById({ _id: entry._id }) });
		});

		// set an on change event for file uploads
		setTimeout(function() {
			document.getElementById(files._id).onchange = async function(event) {
				const media = filterForJPEGandPNG(event.target.files);
				for(var i = 0; i < media.length; ++i) {
					state.media.push(await resizeImageWithBackground(media[i], 512, 512));
				}
			}
		}, 500);

		state.display_update = setInterval(() => { rotateDisplay({ display: display }); }, 5000);
		// deconstruct timing interval for chatbox
		props.method.ui.deconstructor({ deconstructor: async function() { clearInterval(state.display_update); } });
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
