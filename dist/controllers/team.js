"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var team_1 = require("../models/team");
var team_2 = require("../validation/team");
exports.viewTeams = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var teams, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, team_1.Team.find().sort({ name: 1 })];
            case 1:
                teams = _a.sent();
                res.send(teams);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                res.status(400).send({ error: error_1.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createTeam = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var error, _a, name, nick_name, website, coach, founded, stadium_name, stadium_capacity, checkTeam, newTeam;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                error = team_2.validateTeam(req.body).error;
                if (error)
                    return [2 /*return*/, res.status(400).send(error.details[0].message)];
                _a = req.body, name = _a.name, nick_name = _a.nick_name, website = _a.website, coach = _a.coach, founded = _a.founded, stadium_name = _a.stadium_name, stadium_capacity = _a.stadium_capacity;
                return [4 /*yield*/, team_1.Team.findOne({ nick_name: nick_name })];
            case 1:
                checkTeam = _b.sent();
                if (checkTeam) {
                    return [2 /*return*/, res.status(404).send({ message: "Nick name already in use" })];
                }
                return [4 /*yield*/, new team_1.Team({
                        name: name,
                        nick_name: nick_name,
                        website: website,
                        coach: coach,
                        founded: founded,
                        stadium_name: stadium_name,
                        stadium_capacity: stadium_capacity,
                    })];
            case 2:
                newTeam = _b.sent();
                return [4 /*yield*/, newTeam.save()];
            case 3:
                _b.sent();
                res.send({ message: "Team " + name + " created succesfully, A.K.A " + nick_name });
                return [2 /*return*/];
        }
    });
}); };
exports.updateTeam = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var updateTeam_1, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, team_1.Team.findByIdAndUpdate(req.params.id, req.body)];
            case 1:
                updateTeam_1 = _a.sent();
                res.status(200).send("Team " + updateTeam_1.name + " has been updated succesfully.");
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                res.status(400).send(error_2.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteTeam = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var deleteTeam_1, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, team_1.Team.findByIdAndDelete({ _id: req.params.id })];
            case 1:
                deleteTeam_1 = _a.sent();
                res.status(200).send("Team " + deleteTeam_1.name + " has been deleted succesfully");
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                res.status(400).send(error_3.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
//# sourceMappingURL=team.js.map