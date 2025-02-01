// Earendel - Simple cache server for DevOps.
// SPDX-License-Identifier: BSD-3-Clause

// Validate the "token" param.

import {
    StatusCodes,
} from "http-status-codes";

export const useClientAuth = () => (req, res, next) => {
    const {token} = req.params;
    if (!token) {
        res.sendStatus(StatusCodes.UNAUTHORIZED);
        return;
    }

    req.client = (type) => `${type}_${token}`;
    next();
};
