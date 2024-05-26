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
    useTemp,
} from "../init/temp.mjs";

import {
    useClientAuth,
} from "../middleware/auth.mjs";

import {
    rmSync,
} from "node:fs";

import fileUpload from "express-fileupload";

import {
    isObjectPropExists,
} from "../utils/native.mjs";

const {Router: newRouter} = express;
const router = newRouter();

const clientAuth = useClientAuth();

const temp = useTemp("earendel_file");

const downloadHandler = (req, res) => {
    const cache = useCache();
    const token = req.client("file");

    if (!cache.has(token)) {
        res.sendStatus(StatusCodes.NOT_FOUND);
        return;
    }

    const tempFilePath = cache.get(token);
    res.download(tempFilePath, "cache.bin");
};

const uploadHandler = (req, res, next) => fileUpload({
    useTempFiles: true,
    tempFileDir: temp.path,
    limits: {
        fileSize: 50 * 1024 * 1024,
    },
})(req, res, next);

const invalidRequestCleaner = (req) => {
    Object.entries(req.files).forEach(([_, value]) => {
        rmSync(value.tempFilePath);
    });
};

const validHandler = (req, res) => {
    if (
        !isObjectPropExists(req.files, "file") ||
        Object.keys(req.files).length !== 1
    ) {
        invalidRequestCleaner(req);
        res.sendStatus(StatusCodes.BAD_REQUEST);
        return;
    }

    const cache = useCache();
    const token = req.client("file");

    if (cache.has(token)) {
        cache.del(token);
    }

    const {file} = req.files;
    cache.set(token, file.tempFilePath);
    res.sendStatus(StatusCodes.OK);
};

const deleteHandler = (req, res) => {
    const cache = useCache();
    const token = req.client("file");

    if (!cache.has(token)) {
        res.sendStatus(StatusCodes.NOT_FOUND);
        return;
    }

    cache.del(token);
    res.sendStatus(StatusCodes.OK);
};

router.get("/:token", clientAuth,
    downloadHandler,
);

router.put("/:token", clientAuth,
    uploadHandler,
    validHandler,
);

router.delete("/:token", clientAuth,
    deleteHandler,
);

// Export routes mapper (function)
export default () => {
    // Use application
    const app = useApp();

    // Mount the router
    app.use("/file", router);

    const cache = useCache();
    cache.on("del", (key, value) => {
        if (key.startsWith("file_")) {
            rmSync(value);
        }
    });
};
