module.exports = function (props) {
    // private
    
    // public

    // privileged

    this.create = async function(data) {
        // create a new public_message
        await props.method.types.public_message().create(data);
    }

    this.readAvailable = async function() {
        // read available entries from client storage
        // or a subset to present to the main section
        // perhaps by newest to oldest
        // fetch them all for now...
        return await props.method.types.public_message().readAvailable();
    }

    this.readChronological = async function() {
        // read available entries from client storage
        // or a subset to present to the main section
        // perhaps by newest to oldest
        // fetch them all for now...
        return (await props.method.types.public_message().readAvailable()).sort((a, b) => { return a.data.created_at - b.data.created_at; });
    }

    this.readSingleById = async function(data) {
        // read a single public_message by id from client storage
        return await props.method.types.public_message().readSingleById(data);
    }

    this.promote = async function(data) {
        // { _id: "" }
        // update metadata rating: 1
        await props.method.types.public_message().updateMetadata({ metadata: { rating: 1 }, _id: data._id });
    }

    this.demote = async function(data) {
        // { _id: "" }
        // update metadata rating: -1
        await props.method.types.public_message().updateMetadata({ metadata: { rating: -1 }, _id: data._id });
    }

    this.transmission = async function(data) {
        // { public_message: {} }
        // from the broadcast socket scan entries and determine integration
        const entries = await props.method.types.public_message().readAvailable();
        for(var i = 0; i < entries.length; ++i) {
            // if public_message is found by key don't store it
            if(data.public_message._id === entries[i].data._id) {
                return;
            }
        }
        // store the public_message other
        await props.method.types.public_message().store(data);
    }

    this.readBroadcasts = async function(data) {
        // create an array of public messages "all" to be broadcasted
        return await props.method.types.public_message().readAvailable();
    }

    this.removeExpired = async function() {
        // scan entries in storage and determine expiration
        const entries = await props.method.types.public_message().readAvailable();
        for(var i = 0; i < entries.length; ++i) {
            // if you find an expires_at that is less than the current time ms remove that public_message
            if(entries[i].metadata.expires_at < new Date().getTime()) {
                await props.method.types.public_message().removeSingleById({ _id: entries[i].data._id });
            }
        }
    }

};