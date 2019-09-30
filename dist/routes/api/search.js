"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var search_1 = require("../../controllers/search");
var router = express_1.Router();
router
    .get('/team/:id', search_1.searchTeam)
    .get('/fixtures/:id', search_1.searchFixture);
exports.default = router;
//# sourceMappingURL=search.js.map