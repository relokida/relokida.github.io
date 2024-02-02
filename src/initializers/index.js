const Entry = require("./entry.initializer");
const PublicMessage = require("./public_message.initializer");

import io from "socket.io-client";
const socket = io();
import services from "../services";
import utils from "../utils";

const method = { socket: socket, services: services, utils: utils };

const inits = {
  entry: (data) => { return new Entry({ ...data, method: method }) },
  public_message: (data) => { return new PublicMessage({ ...data, method: method }) }
};

// static globals for objects
var globals = {}

export default {
  construct: async (data) => {
    // { geo_lat: 0, geo_lon: 0, radius: 0 }
    // deconstruct any existing globals before reconstructing
    if(globals.hasOwnProperty("entry") && globals.hasOwnProperty("public_message")) {
      globals.entry.deconstruct();
      globals.public_message.deconstruct();
    }

    if(data.radius > 60) {
      throw new Error("radius property must be less than 60 miles...");
    }
    // create user auth if not exists
	  if(!await utils.user().read()) {
		  await utils.user().create();
	  }

	  // then calculate the region based on latitude and longitude
	  const region = utils.geolocation().getRegion({ geo_lat: data.geo_lat, geo_lon: data.geo_lon });

	  // set filtering in settings global local storage
	  const filtering = { region: region, geo_lat: data.geo_lat, geo_lon: data.geo_lon, radius: data.radius }
    // first check if settings exists in local storage
    const settings = utils.settings().read() ? utils.settings().read() : {}
    settings.geo_data = filtering;
    console.log(settings);
    utils.settings().update({ data: settings });

    // set initializers globally
    globals.entry = inits.entry({ filtering: filtering });
    globals.public_message = inits.public_message({ filtering: filtering });
    // construct initializer components
    globals.entry.construct();
    globals.public_message.construct();
  },
  userExists: async () => {
    // create user auth if not exists
	  if(!await utils.user().read()) {
		  return false;
	  }
    return true;
  },
  removeUser: async () => {
    // remove all user data and auth credentials, settings
    
    // deconstruct any existing globals before removing user
    if(globals.hasOwnProperty("entry") && globals.hasOwnProperty("public_message")) {
      globals.entry.deconstruct();
      globals.public_message.deconstruct();
    }
    // clear from indexdb
    await utils.storage().clearStorage();
    // remove from localstorage
    localStorage.removeItem("auth");
    localStorage.removeItem("settings");
  }
}