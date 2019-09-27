"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable: import-name
var fixture_1 = __importDefault(require("./fixture"));
var user_1 = __importDefault(require("./user"));
var team_1 = __importDefault(require("./team"));
var express_1 = require("express");
var router = express_1.Router();
router.use('/fixtures', fixture_1.default);
router.use('/teams', team_1.default);
router.use('/users', user_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map