export const assertHasUser = (req) => {
    if (typeof req.user === "undefined") {
        throw new Error("Request object not user type");
    }
};
export const assertUserHasId = (req) => {
    if (typeof req.user?.id === "undefined") {
        throw new Error("Id property is undefined on user");
    }
};
