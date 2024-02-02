const Entry = require("./entry.type");
const PublicMessage = require("./public_message.type");

const { v4: uuid } = require("uuid");
const utils = require("../utils");

const method = { uuid: uuid, utils: utils };

module.exports = {
  entry: (data) => { return new Entry({ ...data, method: method }) },
  public_message: (data) => { return new PublicMessage({ ...data, method: method }) }
};