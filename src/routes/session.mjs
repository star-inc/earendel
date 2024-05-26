// Import modules
import {useApp, express} from "../init/express.mjs";

import {nanoid} from "nanoid";

// Create router
const {Router: newRouter} = express;
const router = newRouter();

// Request body parser middleware
router.use(express.json());

// Create a new session
router.get("/", (_, res) => {
    res.send({token: nanoid()});
});

// Export routes mapper (function)
export default () => {
    // Use application
    const app = useApp();

    // Mount the router
    app.use("/session", router);
};
