const Home = require("./home.section");
const AddEntry = require("./add_entry.section");
const ViewEntry = require("./view_entry.section");
const About = require("./about.section");
const Landing = require("./landing.section");
const Guidelines = require("./guidelines.section");
const Range = require("./range.section");
const Search = require("./search.section");
const Mobile = require("./mobile.section");
const Privacy = require("./privacy.section");
const Reset = require("./reset.section");
const Permissions = require("./permissions.section");

import ui1 from "es5kmsv.ui1";
const ui = ui1({ target: "root" });
import services from "../services";
import utils from "../utils";
import components from "../components";

// change background color for ui1
document.body.style.backgroundColor = "rgba(0,56,89,255)";

const routes = {
  home: (data) => { return new Home({ ...data, method: method }).display(); },
  addEntry: (data) => { return new AddEntry({ ...data, method: method }).display(); },
  viewEntry: (data) => { return new ViewEntry({ ...data, method: method }).display(); },
  about: (data) => { return new About({ ...data, method: method }).display(); },
  guidelines: (data) => { return new Guidelines({ ...data, method: method }).display(); },
  range: (data) => { return new Range({ ...data, method: method }).display(); },
  search: (data) => { return new Search({ ...data, method: method }).display(); },
  landing: (data) => { return new Landing({ ...data, method: method }).display(); },
  mobile: (data) => { return new Mobile({ ...data, method: method }).display(); },
  privacy: (data) => { return new Privacy({ ...data, method: method }).display(); },
  reset: (data) => { return new Reset({ ...data, method: method }).display(); },
  permissions: (data) => { return new Permissions({ ...data, method: method }).display(); }
}

const method = { ui: ui, services: services, utils: utils, routes: routes, components: components };

export default {
  Home: (data) => { return new Home({ ...data, method: method }) },
  AddEntry: (data) => { return new AddEntry({ ...data, method: method }) },
  ViewEntry: (data) => { return new ViewEntry({ ...data, method: method }) },
  About: (data) => { return new About({ ...data, method: method }) },
  Guidelines: (data) => { return new Guidelines({ ...data, method: method }) },
  Range: (data) => { return new Range({ ...data, method: method }) },
  Search: (data) => { return new Search({ ...data, method: method }) },
  Landing: (data) => { return new Landing({ ...data, method: method }) },
  Mobile: (data) => { return new Mobile({ ...data, method: method }) },
  Privacy: (data) => { return new Privacy({ ...data, method: method }) },
  Reset: (data) => { return new Reset({ ...data, method: method }) },
  Permissions: (data) => { return new Permissions({ ...data, method: method }) }
};
