export function logger(req, res, next) {
    console.log(`[${new Date().toISOString()}] ${req.method} request targeting path: ${req.url}`);
    next();
}