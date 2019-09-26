"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var team_1 = require("../controllers/team");
var router = express_1.Router();
router
    .get('/api/view-teams/', team_1.viewTeams)
    .post('/api/create-team', team_1.createTeam)
    .put('/api/update-team', team_1.updateTeam)
    .delete('/api/delete-team', team_1.deleteTeam);
exports.default = router;
//# sourceMappingURL=team.js.map