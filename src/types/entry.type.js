module.exports = function (props) {
    // private
    
    // public

    // privileged

    this.create = async function(data) {
        // we'll use this method to create a new entry storage object
        // attain geolocation information
        const geo = await props.method.utils.geolocation().getCurrentPosition();
        // create a new entry
        const entry = {
            _id: props.method.uuid(),
            created_at: new Date().getTime(),
            updated_at: new Date().getTime(),
            owner_id: data.owner_id,
            title: data.title,
            description: data.description,
            geo_lat: geo.coords.latitude, // geo latitude fetched from html location api
            geo_lon: geo.coords.longitude, // geo longitude fetched from html location api
            files: data.files // associated files images taken via camera element
        }
        // here we'll add a hash: {} of data and append it within
        // send to ibd through storage util
        // { metadata: {}, data: {} }
        return await props.method.utils.storage().create({ metadata: { type: "entry", expires_at: new Date().getTime() + 86400000, rating: 1 }, data: entry, auth: localStorage.getItem("auth") });
    }

    this.store = async function(data) {
        // we'll use this method to store an existing entry sent from broadcast
        // { metadata: {}, data: {} }
        return await props.method.utils.storage().store({ metadata: { type: "entry", expires_at: new Date().getTime() + 86400000, rating: 0 }, data: data.entry });
    }

    this.readAvailable = async function() {
        // read available entries from client storage
        const keys = await props.method.utils.storage().readAllByType({ type: "entry" });
        console.log(keys);
        const entries = await Promise.all(keys.map(async (d) => { return await props.method.utils.storage().readSingleByKey({ key: d }); }));
        return props.method.utils.geolocation().filterRange({ data: entries, filtering: props.method.utils.settings().read().geo_data });
    }

    this.readSingleById = async function(data) {
        // read single entry by _id
        // { _id: "" }
        return await props.method.utils.storage().readSingleByKey({ key: `entry.${data._id}` });
    }

    this.updateMetadata = async function(data) {
        // update metadata
        // append key
        data.key = `entry.${data._id}`;
        await props.method.utils.storage().updateMetadata(data);
    }

    this.removeSingleById = async function(data) {
        // remove single entry by _id
        // { _id: "" }
        return await props.method.utils.storage().removeSingleByKey({ key: `entry.${data._id}` });
    }


};