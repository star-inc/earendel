// Earendel - Simple cache server for DevOps.
// SPDX-License-Identifier: BSD-3-Clause

import "../../src/init/config.mjs";

import {describe, it} from "mocha";
import {expect} from "chai";
import request from "supertest";

import {useApp, StatusCodes} from "../../src/init/express.mjs";
import mountRoute from "../../src/routes/file.mjs";

describe("File Routes", () => {
    let app;

    before(function() {
        mountRoute();
        app = useApp();
    });

    it("GET /file/:token should return 404 if file not found", async () => {
        const res = await request(app).get("/file/nonexistenttoken");
        expect(res.status).to.equal(StatusCodes.NOT_FOUND);
    });

    it("PUT /file/:token should return 400 if no file is uploaded", async () => {
        const res = await request(app).put("/file/testtoken");
        expect(res.status).to.equal(StatusCodes.BAD_REQUEST);
    });

    it("PUT /file/:token should return 200 if file is uploaded", async () => {
        const res = await request(app)
            .put("/file/testtoken")
            .attach("file", Buffer.from("test content"), "testfile.txt");
        expect(res.status).to.equal(StatusCodes.OK);
    });

    it("DELETE /file/:token should return 404 if file not found", async () => {
        const res = await request(app).delete("/file/nonexistenttoken");
        expect(res.status).to.equal(StatusCodes.NOT_FOUND);
    });

    it("DELETE /file/:token should return 200 if file is deleted", async () => {
        // First upload a file
        await request(app)
            .put("/file/testtoken")
            .attach("file", Buffer.from("test content"), "testfile.txt");

        // Then delete the file
        const res = await request(app).delete("/file/testtoken");
        expect(res.status).to.equal(StatusCodes.OK);
    });
});
