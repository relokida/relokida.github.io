const services = require("../services");
const utils = require("../utils");
const io = require("socket.io-client");
const axios = require("axios");
const socket = io();

async function userUtilTest() {
    // create user jwt auth for localstorage
    await utils.user().create();
    console.log(await utils.user().read());
}

async function socketTestTwo() {
    // testing the subscribe and broadcast routes

    // first grab the geolocation info of the client
    const geo = await utils.geolocation().getCurrentPosition();
    console.log(geo.coords);
    // second attain the user info
    const user = await services.user().read();
    console.log(user);
    // create subscribe object to emit
    // { _id: "", geo_lat: 0, geo_lon: 0, radius: 0 }
    socket.emit("/subscribe", { _id: user.data._id, geo_lat: geo.coords.latitude, geo_lon: geo.coords.longitude, radius: 50 });
    // create an entry to "broadcast"
    const entry = await services.entry().create({
        owner_id: user.data._id,
        title: "title",
        description: "description",
        files: []
    });

    // read available entries
    const entries = await services.entry().readAvailable();
    // console.log(entries);

    // send the broadcast entry
    socket.emit("/broadcast", { entry: entries[0].data })

    // receive the broadcast transmission
    socket.on("/transmission", (data) => {
        console.log("entry received");
        console.log(data);
    });
}

async function socketTest() {
    socket.emit("/broadcast", { message: "hello world" });
}

async function geolocate() {
    const geo = await utils.geolocation().getCurrentPosition();
    console.log(geo.coords);
    // attain region
    const region = utils.geolocation().getRegion({ geo_lat: geo.coords.latitude, geo_lon: geo.coords.longitude });
    console.log(region);
}

async function entry_tests() {
    // attain user information
    const user = await services.user().read();
    console.log(user);
    // create entry
    const entry = await services.entry().create({
        owner_id: user.data._id,
        title: "title",
        description: "description",
        files: []
    });

    // read available entries
    const entries = await services.entry().readAvailable();
    console.log(entries);

    // read single entry by it's _id
    console.log(await services.entry().readSingleById({ _id: entries[0].data._id }))

    // promote entry
    await services.entry().promote({ _id: entries[0].data._id });

    // demote entry
    await services.entry().demote({ _id: entries[0].data._id });

    // compare incoming entry to existing storage entries
    await services.entry().scanIncoming({ entry: entries[0] });

    // read entries to be broadcasted
    console.log((await services.entry().readBroadcasts()).length);

    // remove expired entries
    await services.entry().removeExpired();
}

async function hashTest() {
    // create a post request
    const response = await axios.post("/hash/create", { data: { title: "title" } });
    console.log(response);
}

// hashTest();
// entry_tests();
geolocate();
// socketTest();
// socketTestTwo();
// userUtilTest();