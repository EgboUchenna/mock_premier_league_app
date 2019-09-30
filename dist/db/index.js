"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var teams_1 = __importDefault(require("./seed/teams"));
var fixtures_1 = __importDefault(require("./seed/fixtures"));
var users_1 = __importDefault(require("./seed/users"));
var Team_1 = require("../models/Team");
var Fixture_1 = require("../models/Fixture");
var User_1 = require("../models/User");
var bcrypt_1 = __importDefault(require("bcrypt"));
var cleanDb = function () { return __awaiter(void 0, void 0, void 0, function () {
    var err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                console.log('Succesfully cleared db');
                return [4 /*yield*/, Team_1.Team.deleteMany({})];
            case 1:
                _a.sent();
                return [4 /*yield*/, Fixture_1.Fixture.deleteMany({})];
            case 2:
                _a.sent();
                return [4 /*yield*/, User_1.User.deleteMany({})];
            case 3:
                _a.sent();
                return [3 /*break*/, 5];
            case 4:
                err_1 = _a.sent();
                console.log('Error occurred', err_1);
                return [2 /*return*/, err_1];
            case 5: return [2 /*return*/];
        }
    });
}); };
var seedTeam = function () { return __awaiter(void 0, void 0, void 0, function () {
    var allTeams, res, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                allTeams = teams_1.default.map(function (team) { return __awaiter(void 0, void 0, void 0, function () {
                    var newTeam;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, new Team_1.Team(team)];
                            case 1:
                                newTeam = _a.sent();
                                return [2 /*return*/, newTeam.save()];
                        }
                    });
                }); });
                return [4 /*yield*/, Promise.all(allTeams)];
            case 1:
                res = _a.sent();
                return [2 /*return*/, res];
            case 2:
                err_2 = _a.sent();
                console.log({ err: err_2 });
                return [2 /*return*/, err_2];
            case 3: return [2 /*return*/];
        }
    });
}); };
var seedUser = function () { return __awaiter(void 0, void 0, void 0, function () {
    var allUsers, res, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                allUsers = users_1.default.map(function (user) { return __awaiter(void 0, void 0, void 0, function () {
                    var salt, _a, newUser;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, bcrypt_1.default.genSalt(10)];
                            case 1:
                                salt = _b.sent();
                                _a = user;
                                return [4 /*yield*/, bcrypt_1.default.hash(user.password, salt)];
                            case 2:
                                _a.password = _b.sent();
                                return [4 /*yield*/, new User_1.User(user)];
                            case 3:
                                newUser = _b.sent();
                                return [2 /*return*/, newUser.save()];
                        }
                    });
                }); });
                return [4 /*yield*/, Promise.all(allUsers)];
            case 1:
                res = _a.sent();
                return [2 /*return*/, res];
            case 2:
                err_3 = _a.sent();
                console.log({ err: err_3 });
                return [2 /*return*/, err_3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var seedFixture = function () { return __awaiter(void 0, void 0, void 0, function () {
    var allfixtures, res, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                allfixtures = fixtures_1.default.map(function (fixture) { return __awaiter(void 0, void 0, void 0, function () {
                    var hometeam, awayteam, newFixtures;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, Team_1.Team.findOne({ name: fixture.homeTeam }).exec()];
                            case 1:
                                hometeam = _a.sent();
                                return [4 /*yield*/, Team_1.Team.findOne({ name: fixture.awayTeam }).exec()];
                            case 2:
                                awayteam = _a.sent();
                                if (!(hometeam && awayteam)) return [3 /*break*/, 4];
                                newFixtures = new Fixture_1.Fixture(__assign(__assign({}, fixture), { homeTeam: hometeam.id, awayTeam: awayteam.id }));
                                return [4 /*yield*/, newFixtures.save()];
                            case 3:
                                _a.sent();
                                _a.label = 4;
                            case 4: return [2 /*return*/];
                        }
                    });
                }); });
                return [4 /*yield*/, Promise.all(allfixtures)];
            case 1:
                res = _a.sent();
                return [2 /*return*/, res];
            case 2:
                err_4 = _a.sent();
                console.log({ err: err_4 });
                return [2 /*return*/, err_4];
            case 3: return [2 /*return*/];
        }
    });
}); };
var seed = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, cleanDb()
                    .then(function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, seedTeam()];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, seedUser()];
                            case 2:
                                _a.sent();
                                return [4 /*yield*/, seedFixture()];
                            case 3:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); })
                    .then(function () { return console.log("Database seeded successfully."); })
                    .catch(function (err) {
                    return console.log({ err: err });
                })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.default = seed;
//# sourceMappingURL=index.js.map