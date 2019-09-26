"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable: variable-name
var ts_mongoose_1 = require("ts-mongoose");
var Team_1 = require("./Team");
var FixtureSchema = ts_mongoose_1.createSchema({
    home: ts_mongoose_1.Type.schema().of(Team_1.Team),
    away: ts_mongoose_1.Type.schema().of(Team_1.Team),
    date: ts_mongoose_1.Type.date(),
    score: ts_mongoose_1.Type.optionalObject(),
    stadium: ts_mongoose_1.Type.string(),
    played: ts_mongoose_1.Type.optionalBoolean(),
});
exports.Fixture = ts_mongoose_1.typedModel('Fixture', FixtureSchema);
//# sourceMappingURL=Fixture.js.map