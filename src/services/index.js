const Entry = require("./entry.service");
const PublicMessage = require("./public_message.service");

const types = require("../types");

const method = { types: types };

module.exports = {
  entry: (data) => { return new Entry({ ...data, method: method }) },
  public_message: (data) => { return new PublicMessage({ ...data, method: method }) }
};