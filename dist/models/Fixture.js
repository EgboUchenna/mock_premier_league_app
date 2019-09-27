"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable: variable-name
var ts_mongoose_1 = require("ts-mongoose");
var FixtureSchema = ts_mongoose_1.createSchema({
    homeTeam: ts_mongoose_1.Type.objectId(),
    awayTeam: ts_mongoose_1.Type.objectId(),
    homeScore: ts_mongoose_1.Type.number(),
    awayScore: ts_mongoose_1.Type.number(),
    time: ts_mongoose_1.Type.string(),
    stadium: ts_mongoose_1.Type.string(),
    played: ts_mongoose_1.Type.optionalBoolean({ default: false }),
});
exports.Fixture = ts_mongoose_1.typedModel('Fixture', FixtureSchema);
//# sourceMappingURL=Fixture.js.map