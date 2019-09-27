"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_1 = __importDefault(require("../../middleware/auth"));
var admin_1 = __importDefault(require("../../middleware/admin"));
var fixture_1 = require("../../controllers/fixture");
var router = express_1.Router();
router
    .get('/', auth_1.default, fixture_1.viewFixtures)
    .get('/played', fixture_1.viewPlayedMatches)
    .get('/pending', fixture_1.viewPendingMatches)
    .get('/one', fixture_1.getFixture)
    .post('/', [auth_1.default, admin_1.default], fixture_1.createFixtures)
    .put('/:id', [auth_1.default, admin_1.default], fixture_1.updateFixture)
    .delete('/:id', [auth_1.default, admin_1.default], fixture_1.deleteFixture);
exports.default = router;
//# sourceMappingURL=fixture.js.map