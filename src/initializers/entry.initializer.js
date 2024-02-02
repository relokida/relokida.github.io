module.exports = function (props) {
    // private

    var state = {}
    
    // public

    // privileged

    this.construct = async function(data) {
        // construct initializers
        state.event_transmission = `/entry/transmission/${props.filtering.region.geo_lat}/${props.filtering.region.geo_lon}`;
        // set an on event for broadcast transmission
	    props.method.socket.on(state.event_transmission, async (data) => {
		    console.log("transmission");
            await props.method.services.entry().transmission({ entry: data.entry });
        });

	    // remove expired entries
	    state.expirationTimer = setInterval(async () => {
		    console.log("removed expired");
		    await props.method.services.entry().removeExpired();
	    }, 20000);

	    // broadcast promoted entries
	    state.broadcastTimer = setInterval(async () => {
		    console.log("broadcasted");
		    const entries = await props.method.services.entry().readBroadcasts();
		    for(var i = 0; i < entries.length; ++i) {
			    props.method.socket.emit("/entry/broadcast", { entry: entries[i].data })
		    }
	    }, 25000);
    }

    this.deconstruct = function() {
        // remove the event listener associated with the socket transmission
        props.method.socket.off(state.event_transmission);
        // to deconstruct the timing elements
        clearInterval(state.expirationTimer);
        clearInterval(state.broadcastTimer);
    }

};