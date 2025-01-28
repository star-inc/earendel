// Earendel - Simple cache server for DevOps.
// SPDX-License-Identifier: BSD-3-Clause

import "../../src/init/config.mjs";

import {describe, it} from "mocha";
import {expect} from "chai";
import request from "supertest";

import {useApp, StatusCodes} from "../../src/init/express.mjs";
import mountRoute from "../../src/routes/text.mjs";

describe("Text Routes", () => {
    let app;

    before(function() {
        mountRoute();
        app = useApp();
    });

    it("GET /text/:token should return 404 if token is not found", async () => {
        const res = await request(app).get("/text/nonexistenttoken");
        expect(res.status).to.equal(StatusCodes.NOT_FOUND);
    });

    it("PUT /text/:token should store the text and return 200", async () => {
        const res = await request(app).
            put("/text/testtoken").
            set("content-type", "text/plain").
            send("This is a test text");
        expect(res.status).to.equal(StatusCodes.OK);
    });

    it("GET /text/:token should return the stored text", async () => {
        await request(app).
            put("/text/testtoken").
            set("content-type", "text/plain").
            send("This is a test text");

        const res = await request(app).get("/text/testtoken");
        expect(res.status).to.equal(StatusCodes.OK);
        expect(res.text).to.equal("This is a test text");
    });

    it("DELETE /text/:token should delete the token and return 200", async () => {
        await request(app).
            put("/text/testtoken").
            set("content-type", "text/plain").
            send("This is a test text");

        const res = await request(app).delete("/text/testtoken");
        expect(res.status).to.equal(StatusCodes.OK);
    });

    it("DELETE /text/:token should return 404 if token is not found", async () => {
        const res = await request(app).delete("/text/nonexistenttoken");
        expect(res.status).to.equal(StatusCodes.NOT_FOUND);
    });
});
