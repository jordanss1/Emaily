export const requireLoginMiddleware = (req, res, next) => {
    if (!req.user) {
        return res.status(401).send({ error: "You must be logged in" });
    }
    next();
};
export default requireLoginMiddleware;
