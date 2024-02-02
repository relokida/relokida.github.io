module.exports = function (props) {
    // private
    
    // public

    // privileged

    this.create = async function(data) {
        // we'll use this method to create a new public_message storage object
        // attain geolocation information
        const geo = await props.method.utils.geolocation().getCurrentPosition();
        // create a new public_message
        const public_message = {
            _id: props.method.uuid(),
            created_at: new Date().getTime(),
            updated_at: new Date().getTime(),
            owner_id: data.owner_id,
            icon: data.icon,
            message: data.message,
            geo_lat: geo.coords.latitude, // geo latitude fetched from html location api
            geo_lon: geo.coords.longitude, // geo longitude fetched from html location api
            radius: props.method.utils.settings().read().geo_data.radius
        }
        // here we'll add a hash: {} of data and append it within
        // send to ibd through storage util
        // { metadata: {}, data: {} }
        await props.method.utils.storage().create({ metadata: { type: "public_message", expires_at: new Date().getTime() + 86400000, rating: 0 }, data: public_message, auth: localStorage.getItem("auth") });
    }

    this.store = async function(data) {
        // we'll use this method to store an existing public_message sent from broadcast
        // { metadata: {}, data: {} }
        await props.method.utils.storage().store({ metadata: { type: "public_message", expires_at: new Date().getTime() + 86400000, rating: 0 }, data: data.public_message });
    }

    this.readAvailable = async function() {
        // read available entries from client storage
        const keys = await props.method.utils.storage().readAllByType({ type: "public_message" });
        console.log(keys);
        // retrieve public_messages
        const public_messages = await Promise.all(keys.map(async (d) => { return await props.method.utils.storage().readSingleByKey({ key: d }); }));
        // collect only those of specified range in settings
        const ranged = props.method.utils.geolocation().filterRange({ data: public_messages, filtering: props.method.utils.settings().read().geo_data });
        // return only those that are transmittable
        return props.method.utils.geolocation().transmittable({ data: ranged, filtering: props.method.utils.settings().read().geo_data });
    }

    this.readSingleById = async function(data) {
        // read single public_message by _id
        // { _id: "" }
        return await props.method.utils.storage().readSingleByKey({ key: `public_message.${data._id}` });
    }

    this.updateMetadata = async function(data) {
        // update metadata
        // append key
        data.key = `public_message.${data._id}`;
        await props.method.utils.storage().updateMetadata(data);
    }

    this.removeSingleById = async function(data) {
        // remove single public_message by _id
        // { _id: "" }
        return await props.method.utils.storage().removeSingleByKey({ key: `public_message.${data._id}` });
    }


};