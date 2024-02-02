module.exports = function (props) {
    // private
    
    // public

    // privileged

    this.create = async function(data) {
        // { metadata: {}, data: {} }
        const response = (await props.method.axios.post("/hash/create", { data: data.data, type: data.metadata.type, auth: data.auth }));
        if(response.data.error) {
            throw new Error(response.data.error);
        }
        await props.method.idb.set(`${data.metadata.type}.${data.data._id}`, { metadata: data.metadata, data: response.data.data.data });
        return { _id: data.data._id }
    }

    this.store = async function(data) {
        // { metadata: {}, data: {} }
        await props.method.idb.set(`${data.metadata.type}.${data.data._id}`, { metadata: data.metadata, data: data.data });
        return { _id: data.data._id }
    }

    this.readAllByType = async function(data) {
        // read all entries by type
        // { type: "" }
        const keys = await props.method.idb.keys();
        return keys.filter((d) => { return d.split(".")[0] === data.type });
    }

    this.readSingleByKey = async function(data) {
        // read single entry by key
        // { key: "" }
        return await props.method.idb.get(data.key);
    }

    this.updateMetadata = async function(data) {
        // attain storage object by key
        // update metadata
        var item = await props.method.idb.get(data.key);
        item.metadata = { ...item.metadata, ...data.metadata }
        await props.method.idb.set(data.key, item);
    }

    this.removeSingleByKey = async function(data) {
        // remove by key
        // { key: "" }
        await props.method.idb.del(data.key);
    }

    this.clearStorage = async function(data) {
        // removes everything from storage indexdb
        await props.method.idb.clear();
    }

};