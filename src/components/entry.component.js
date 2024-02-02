module.exports = function(props) {
	const thumbnail = props.ui.image({ src: props.entry.data.files[0] });
	thumbnail.style({ cursor: "pointer" });
	
	setTimeout(() => {
		document.getElementById(`element-${thumbnail.props._id}`).onclick = function() {
			props.routes.viewEntry({ entry: props.entry });
		}
	}, 10);
}
