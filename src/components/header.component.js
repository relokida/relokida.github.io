module.exports = function(props) {
	const header = props.ui.text({ body: `
# Relokida
	` });
	
	header.style({ backgroundColor: "rgba(0, 0, 0, 0)", cursor: "pointer", userSelect: "none" });
	setTimeout(() => {
		document.getElementById(`element-${header.props._id}`).onclick = function() {
			props.routes.about();
		}
	}, 100);
}
