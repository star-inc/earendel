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

    req.client = token;
    next();
};
