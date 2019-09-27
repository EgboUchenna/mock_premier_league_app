"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var fixture_1 = require("../../controllers/fixture");
var router = express_1.Router();
router
    .get('/', fixture_1.viewFixtures)
    .get('/one', fixture_1.getFixture)
    .post('/', fixture_1.createFixtures)
    .put('/:id', fixture_1.updateFixture)
    .delete('/:id', fixture_1.deleteFixture);
exports.default = router;
//# sourceMappingURL=fixture.js.map