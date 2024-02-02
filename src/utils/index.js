const Storage = require("./storage.util");
const Geolocation = require("./geolocation.util");
const User = require("./user.util");
const Settings = require("./settings.util");
const Search = require("./search.util");
const Window = require("./window.util");

const { v4: uuid } = require("uuid");
const idb = require("idb-keyval");
const axios = require("axios");
const { jwtDecode } = require('jwt-decode');
const method = { uuid: uuid, idb: idb, axios: axios, jwtDecode: jwtDecode };

module.exports = {
  storage: (data) => { return new Storage({ ...data, method: method }) },
  geolocation: (data) => { return new Geolocation({ ...data, method: method }) },
  user: (data) => { return new User({ ...data, method: method }) },
  settings: (data) => { return new Settings({ ...data, method: method }) },
  search: (data) => { return new Search({ ...data, method: method }) },
  window: (data) => { return new Window({ ...data, method: method }) }
};