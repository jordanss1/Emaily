"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertUserOrUserProps = void 0;
const assertUserOrUserProps = (req, props) => {
    if (typeof req.user === "undefined") {
        throw new Error("Request object not user type");
    }
    if (props && props.some((prop) => typeof req.user?.[prop] === "undefined")) {
        throw new Error("Property(ies) is/are undefined on user");
    }
};
exports.assertUserOrUserProps = assertUserOrUserProps;
