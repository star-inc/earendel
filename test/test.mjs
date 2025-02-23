// Lavateinn - Tiny and flexible microservice framework.
// SPDX-License-Identifier: BSD-3-Clause (https://ncurl.xyz/s/mI23sevHR)

import {describe, it} from "mocha";
import {assert} from "chai";

describe("Engine Test", function() {
    describe("process#env", function() {
        it("should return test from NODE_ENV", function() {
            assert.equal(process.env["NODE_ENV"], "test");
        });
    });

    describe("Array#indexOf()", function() {
        it("should return -1 when the value is not present", function() {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });
});
