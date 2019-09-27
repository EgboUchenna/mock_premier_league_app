"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var team_1 = require("../../controllers/team");
var router = express_1.Router();
router
    .get('/', team_1.viewTeams)
    .post('/', team_1.createTeam)
    .put('/:id', team_1.updateTeam)
    .delete('/:id', team_1.deleteTeam);
exports.default = router;
//# sourceMappingURL=team.js.map