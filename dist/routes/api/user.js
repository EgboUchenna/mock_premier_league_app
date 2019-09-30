"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var login_1 = require("../../controllers/login");
var signup_1 = require("../../controllers/signup");
var router = express_1.Router();
router
    .post('/signup', signup_1.signup)
    .post('/login', login_1.login);
exports.default = router;
//# sourceMappingURL=user.js.map