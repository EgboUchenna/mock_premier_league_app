"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable: variable-name
var ts_mongoose_1 = require("ts-mongoose");
var shortid_1 = __importDefault(require("shortid"));
var FixtureSchema = ts_mongoose_1.createSchema({
    homeTeam: ts_mongoose_1.Type.objectId({ ref: 'Team' }),
    awayTeam: ts_mongoose_1.Type.objectId({ ref: 'Team' }),
    homeScore: ts_mongoose_1.Type.number({ default: 0 }),
    awayScore: ts_mongoose_1.Type.number({ default: 0 }),
    time: ts_mongoose_1.Type.string(),
    stadium: ts_mongoose_1.Type.string(),
    played: ts_mongoose_1.Type.optionalBoolean({ default: false }),
    link: ts_mongoose_1.Type.mixed({
        default: function () {
            return "http://localhost:" + process.env.PORT + "/api/v1/fixtures/" + shortid_1.default.generate();
        },
    })
});
exports.Fixture = ts_mongoose_1.typedModel('Fixture', FixtureSchema);
//# sourceMappingURL=Fixture.js.map