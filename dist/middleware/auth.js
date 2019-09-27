"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable: import-name
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var key = require('../config/keys').key;
function auth(req, res, next) {
    var token = req.header('x-auth-token');
    if (!token)
        return res.status(401).send('Permission unathorized');
    try {
        var decoded = jsonwebtoken_1.default.verify(token, key);
        req['checkUser'] = decoded;
        next();
    }
    catch (error) {
        res.status(400).send('Invalid token.');
    }
}
exports.default = auth;
//# sourceMappingURL=auth.js.map