"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function admin(req, res, next) {
    if (!req['checkUser'].isAdmin) {
        return res.status(403).send({ message: 'Unauthorized access.' });
    }
    next();
}
exports.default = admin;
//# sourceMappingURL=admin.js.map