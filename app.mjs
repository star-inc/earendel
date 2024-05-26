// Auto-load config
import "./src/init/config.mjs";

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
    exitHandler as tempExitHandler,
} from "./src/init/temp.mjs";

// Define plugin promises
const pluginPromises = [];

// Define router names
const routerNames = [
    "root",
    "text",
    "file",
];

// Define exit handlers
const exitHandlers = [
    tempExitHandler,
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
    loadExits(exitHandlers).
    execute().
    then(displayStatus);
