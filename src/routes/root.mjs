// Earendel - Simple cache server for DevOps.
// SPDX-License-Identifier: BSD-3-Clause

// Import modules
import {
    StatusCodes,
} from "http-status-codes";

import {
    useApp,
} from "../init/express.mjs";

import {
    nanoid,
} from "nanoid";

// Export routes mapper (function)
export default () => {
    // Use application
    const app = useApp();

    // API Index Message
    app.get("/", (_, res) => {
        const meetMessage = `
        earendel <br />
        <a href="https://github.com/star-inc/earendel" target="_blank">
            https://github.com/star-inc/earendel
        </a>
        `;
        res.status(StatusCodes.IM_A_TEAPOT).send(meetMessage);
    });

    // Get the token
    app.get("/token", (_, res) => {
        res.send(nanoid());
    });

    // The handler for robots.txt (deny all friendly robots)
    app.get("/robots.txt", (_, res) => {
        res.type("txt").send("User-agent: *\nDisallow: /");
    });
};
