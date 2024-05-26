// Auto-load config
import "./src/init/config.mjs";

// Import process
import process from "node:process";

// Import modules
import {
    APP_NAME as appName,
} from "./src/init/const.mjs";
import {
    getOverview,
} from "./src/config.mjs";
import {
    invokeApp,
} from "./src/execute.mjs";

import {
    exitHandler as tmppathExitHandler,
} from "./src/init/tmppath.mjs";

// Define plugin promises
const pluginPromises = [];

// Define router names
const routerNames = [
    "root",
    "session",
    "text",
    "file",
];

// Define display
const displayStatus = (protocolStatus) => {
    const viewIt = ({protocol, hostname, port}) => {
        const {node, runtime} = getOverview();
        console.info(appName, `(environment: ${node}, ${runtime})`);
        console.info("====");
        console.info(`Protocol "${protocol}" is listening at`);
        console.info(`${protocol}://${hostname}:${port}`);
    };
    protocolStatus.forEach(viewIt);
};

// Mount application and execute it
invokeApp().
    loadPromises(pluginPromises).
    loadRoutes(routerNames).
    execute().
    then(displayStatus);

// Handle exit signals
const exitHandler = () => {
    tmppathExitHandler();
    process.exit(0);
};
const exitSignals = [
    "SIGINT",
    "SIGTERM",
    "SIGQUIT",
];
exitSignals.forEach((signal) => {
    process.on(signal, exitHandler);
});
