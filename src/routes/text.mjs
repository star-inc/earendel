// Earendel - Simple cache server for DevOps.
// SPDX-License-Identifier: BSD-3-Clause

// Import modules
import {
    useApp,
    express,
} from "../init/express.mjs";
import {
    StatusCodes,
} from "http-status-codes";

import {
    useCache,
} from "../init/cache.mjs";

import {
    useClientAuth,
} from "../middleware/auth.mjs";

const {Router: newRouter} = express;
const router = newRouter();

// Request body parser middleware
router.use(express.text());

const clientAuth = useClientAuth();

router.get("/:token", clientAuth,
    (req, res) => {
        const cache = useCache();
        const token = req.client("text");

        if (!cache.has(token)) {
            res.sendStatus(StatusCodes.NOT_FOUND);
            return;
        }

        const data = cache.get(token);
        res.send(data);
    },
);

router.put("/:token", clientAuth,
    (req, res) => {
        const cache = useCache();
        const token = req.client("text");

        cache.set(token, req.body);
        res.sendStatus(StatusCodes.OK);
    },
);

router.delete("/:token", clientAuth,
    (req, res) => {
        const cache = useCache();
        const token = req.client("text");

        if (!cache.has(token)) {
            return res.sendStatus(StatusCodes.NOT_FOUND);
        }

        cache.del(token);
        res.sendStatus(StatusCodes.OK);
    },
);

// Export routes mapper (function)
export default () => {
    // Use application
    const app = useApp();

    // Mount the router
    app.use("/text", router);
};
