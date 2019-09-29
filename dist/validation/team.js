"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line: import-name
var joi_1 = __importDefault(require("joi"));
exports.validateTeam = function (input) {
    var schema = {
        name: joi_1.default.string()
            .min(3)
            .max(255)
            .required(),
        nick_name: joi_1.default.string()
            .min(3)
            .max(255)
            .required(),
        coach: joi_1.default.string().
            min(3).
            max(50)
            .required(),
        website: joi_1.default.string()
            .min(3)
            .max(255)
            .required(),
        stadium_name: joi_1.default.string()
            .min(3)
            .max(255)
            .required(),
        stadium_capacity: joi_1.default.string()
            .min(3)
            .max(255)
            .required(),
        founded: joi_1.default.number().required(),
        wins: joi_1.default.number().optional(),
        losses: joi_1.default.number().optional(),
        goals: joi_1.default.number().optional(),
    };
    return joi_1.default.validate(input, schema);
};
//# sourceMappingURL=team.js.map