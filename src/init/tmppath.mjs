// Import process
import {
    tmpdir,
} from "node:os";
import {
    join as pathJoin,
} from "node:path";
import {
    mkdirSync,
} from "node:fs";

import {
    rimrafSync,
} from "rimraf";

const tmpPathPrefix = tmpdir();
const tmpPathMap = {};

export const useTmpPath = (name) => {
    const path = pathJoin(tmpPathPrefix, name);
    const cleanup = () => {
        delete tmpPathMap[name];
        rimrafSync(path);
    };
    mkdirSync(path, {
        recursive: true,
    });
    tmpPathMap[name] = path;
    return {path, cleanup};
};

// Handle exit signals
export const exitHandler = () => {
    Object.values(tmpPathMap).forEach((path) => {
        rimrafSync(path);
    });
};
