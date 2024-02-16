import "react-app-polyfill/stable";
import * as serviceWorker from "./serviceWorker";

// import test from "./tests/service.test";
import sections from "./sections";

async function start() {
	sections.AbbaHS().display();
}

// start the app :)
start();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
