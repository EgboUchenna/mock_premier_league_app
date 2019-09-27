"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_1 = __importDefault(require("../../middleware/auth"));
var admin_1 = __importDefault(require("../../middleware/admin"));
var team_1 = require("../../controllers/team");
var router = express_1.Router();
router
    .get('/', auth_1.default, team_1.viewTeams)
    .post('/', [auth_1.default, admin_1.default], team_1.createTeam)
    .put('/:id', [auth_1.default, admin_1.default], team_1.updateTeam)
    .delete('/:id', [auth_1.default, admin_1.default], team_1.deleteTeam);
exports.default = router;
//# sourceMappingURL=team.js.map