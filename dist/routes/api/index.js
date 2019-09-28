"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable: import-name
var fixture_1 = __importDefault(require("./fixture"));
var search_1 = __importDefault(require("./search"));
var team_1 = __importDefault(require("./team"));
var user_1 = __importDefault(require("./user"));
var express_1 = require("express");
var router = express_1.Router();
router.use('/fixtures', fixture_1.default);
router.use('/search', search_1.default);
router.use('/teams', team_1.default);
router.use('/users', user_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map