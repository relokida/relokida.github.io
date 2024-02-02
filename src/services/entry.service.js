module.exports = function (props) {
    // private
    
    // public

    // privileged

    this.create = async function(data) {
        // create a new entry
        return await props.method.types.entry().create(data);
    }

    this.readAvailable = async function() {
        // read available entries from client storage
        // or a subset to present to the main section
        // perhaps by newest to oldest
        // fetch them all for now...
        return await props.method.types.entry().readAvailable();
    }

    this.readSingleById = async function(data) {
        // { _id: "" }
        // read a single entry by id from client storage
        return await props.method.types.entry().readSingleById(data);
    }

    this.promote = async function(data) {
        // { _id: "" }
        // update metadata rating: 1
        await props.method.types.entry().updateMetadata({ metadata: { rating: 1 }, _id: data._id });
    }

    this.demote = async function(data) {
        // { _id: "" }
        // update metadata rating: -1
        await props.method.types.entry().updateMetadata({ metadata: { rating: -1 }, _id: data._id });
    }

    this.transmission = async function(data) {
        // { entry: {} }
        // from the broadcast socket scan entries and determine integration
        const entries = await props.method.types.entry().readAvailable();
        for(var i = 0; i < entries.length; ++i) {
            // if entry is found by key don't store it
            if(data.entry._id === entries[i].data._id) {
                return;
            }
        }
        // store the entry other
        await props.method.types.entry().store(data);
    }

    this.readBroadcasts = async function(data) {
        // create an array of entries where rating is 1 to be broadcast
        const entries = await props.method.types.entry().readAvailable();
        return entries.filter((d) => { return d.metadata.rating === 1 });
    }

    this.removeExpired = async function() {
        // scan entries in storage and determine expiration
        const entries = await props.method.types.entry().readAvailable();
        for(var i = 0; i < entries.length; ++i) {
            // if you find an expires_at that is less than the current time ms remove that entry
            if(entries[i].metadata.expires_at < new Date().getTime()) {
                await props.method.types.entry().removeSingleById({ _id: entries[i].data._id });
            }
        }
    }

};