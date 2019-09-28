"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable: import-name
var joi_1 = __importDefault(require("joi"));
// @ts-ignore
var joi_objectid_1 = __importDefault(require("joi-objectid"));
var myJoiObjectId = joi_objectid_1.default(joi_1.default);
exports.validateFixture = function (input) {
    var schema = {
        homeTeam: myJoiObjectId().required(),
        awayTeam: myJoiObjectId().required(),
        homeScore: joi_1.default.number(),
        awayScore: joi_1.default.number(),
        time: joi_1.default.string(),
        stadium: joi_1.default.string(),
        played: joi_1.default.boolean(),
    };
    return joi_1.default.validate(input, schema);
};
exports.validateUpdateFixture = function (input) {
    var schema = {
        homeScore: joi_1.default.number().required(),
        awayScore: joi_1.default.number().required(),
        time: joi_1.default.string(),
        stadium: joi_1.default.string(),
        played: joi_1.default.boolean().required()
    };
    return joi_1.default.validate(input, schema);
};
//# sourceMappingURL=fixture.js.map