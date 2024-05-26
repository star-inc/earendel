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
        if (cache.has(req.client)) {
            const data = cache.get(req.client);
            return res.send(data);
        } else {
            return res.sendStatus(StatusCodes.NOT_FOUND);
        }
    },
);

router.put("/:token", clientAuth,
    (req, res) => {
        const cache = useCache();
        cache.set(req.client, req.body);
        return res.sendStatus(StatusCodes.OK);
    },
);

router.delete("/:token", clientAuth,
    (req, res) => {
        const cache = useCache();
        if (cache.has(req.client)) {
            cache.del(req.client);
            return res.sendStatus(StatusCodes.OK);
        } else {
            return res.sendStatus(StatusCodes.NOT_FOUND);
        }
    },
);

// Export routes mapper (function)
export default () => {
    // Use application
    const app = useApp();

    // Mount the router
    app.use("/text", router);
};
