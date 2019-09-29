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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable: import-name
// tslint:disable: ter-arrow-parens
var supertest_1 = __importDefault(require("supertest"));
var mongoose_1 = __importDefault(require("mongoose"));
var app_1 = __importDefault(require("../app"));
var User_1 = require("../models/User");
var Team_1 = require("../models/Team");
var auth_1 = __importDefault(require("../middleware/auth"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var db_1 = __importDefault(require("../db"));
var key = require('../config/keys').key;
var token;
var adminToken;
var teamA;
var teamB;
var fixturesId;
var fixtureLink;
var session;
beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, User_1.User.deleteMany({})];
            case 1:
                _a.sent();
                return [4 /*yield*/, supertest_1.default(app_1.default)
                        .post('/api/v1/users/signup')
                        .send({
                        name: 'Egbo Uchenna',
                        email: 'uche@gmail.com',
                        password: 'pass123456',
                    })];
            case 2:
                user = _a.sent();
                token = user.body.token;
                return [4 /*yield*/, db_1.default()];
            case 3:
                _a.sent();
                return [4 /*yield*/, Team_1.Team.findOne({ name: 'Liverpool' })];
            case 4:
                teamA = _a.sent();
                return [4 /*yield*/, Team_1.Team.findOne({ name: 'Manchester City' })];
            case 5:
                teamB = _a.sent();
                return [2 /*return*/];
        }
    });
}); });
afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, mongoose_1.default.connection.close()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
describe('User SignUp Routes', function () {
    it('A user can sign up', function () {
        return supertest_1.default(app_1.default)
            .post('/api/v1/users/signup')
            .send({
            name: 'Ben Mark',
            email: 'benmark@gmail.com',
            password: 'pass123456',
        })
            .expect(function (res) {
            expect(Object.keys(res.body.data)).toContain('name');
            expect(Object.keys(res.body.data)).toContain('email');
        });
    });
    it('Should display sign up success', function () {
        return supertest_1.default(app_1.default)
            .post('/api/v1/users/signup')
            .send({
            name: 'Egbo Uchenna',
            email: 'uchenna@gmail.com',
            password: 'pass123456',
        })
            .expect(function (res) {
            expect(res.body.output).toBe('Sign up successful.');
        });
    });
    it('should warn if same user sign up again', function () {
        return supertest_1.default(app_1.default)
            .post('/api/v1/users/signup')
            .send({
            name: 'Egbo Uchenna',
            email: 'uchee@gmail.com',
            password: 'pass123456',
        })
            .expect(function (res) {
            expect(res.body.message).toBe("Email already exists.");
        });
    });
});
describe('User Login Routes', function () {
    it('A registered user can login', function () {
        return supertest_1.default(app_1.default)
            .post('/api/v1/users/login')
            .send({
            email: 'uchee@gmail.com',
            password: 'pass12345',
        })
            .expect(function (res) {
            expect(res.body.message).toBe("Welcome Uchenna Matt");
        });
    });
    it('A non registered user cannot login', function () {
        return supertest_1.default(app_1.default)
            .post('/api/v1/users/login')
            .send({
            email: 'bash@gmail.com',
            password: 'pass123456',
        })
            .expect(function (res) {
            expect(res.body.message).toBe("Email does not exist.");
        });
    });
    it('Admin can login', function () {
        return supertest_1.default(app_1.default)
            .post('/api/v1/users/login')
            .send({
            email: 'bash@example.com',
            password: 'pass12345',
        })
            .expect(function (res) {
            adminToken = res.body.token;
            expect(res.body.message).toBe("Welcome Bash Phil");
        });
    });
    it('Passwords should match', function () {
        return supertest_1.default(app_1.default)
            .post('/api/v1/users/login')
            .send({
            email: 'sewa@example.com',
            password: 'pass2',
        })
            .expect(function (res) {
            expect(res.body.message).toBe("Password is incorrect.");
        });
    });
});
// mocking the auth middleware
jest.mock('../middleware/auth');
var mockedAuth = auth_1.default;
mockedAuth.mockImplementation(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var payload, decoded;
    return __generator(this, function (_a) {
        // mock req.session
        // session store
        session = {};
        try {
            payload = req.headers.authorization.split(' ')[1];
            if (!payload) {
                return [2 /*return*/, res.status(401).send({ message: 'Access denied no token provided' })];
            }
            decoded = jsonwebtoken_1.default.verify(payload, key);
            // say the user has already logged in / sign up
            // @ts-ignore
            session[decoded._id] = { token: payload };
            if (decoded) {
                // check the session store
                // @ts-ignore
                if (!session[decoded._id]) {
                    return [2 /*return*/, res.status(401).send({ message: 'Session over, Pls login...' })];
                }
                // @ts-ignore
                if (payload !== session[decoded._id].token) {
                    return [2 /*return*/, res.status(401).send({ message: 'Invalid Token' })];
                }
                req['checkUser'] = decoded;
                next();
            }
            else {
                res.status(401).send({ message: 'user does not exist' });
            }
        }
        catch (error) {
            res.status(400).send({ data: { error: error } });
        }
        return [2 /*return*/];
    });
}); });
describe('Fixtures Routes', function () {
    it('Authenticated users should see fixtures', function () {
        return supertest_1.default(app_1.default)
            .get('/api/v1/fixtures')
            .set('Authorization', "Bearer " + token)
            .expect(function (res) {
            expect(res.body.message).toHaveLength(5);
        });
    });
    it('Unauthorized users should not see fixtures', function () {
        return supertest_1.default(app_1.default)
            .get('/api/v1/fixtures')
            .expect('Content-Type', /json/)
            .set('Authorization', "abcd")
            .expect(function (res) {
            expect(res.body.message).toBe('Access denied no token provided');
        });
    });
    it('Unauthenticated users should not see fixtures', function () {
        return supertest_1.default(app_1.default)
            .get('/api/v1/fixtures')
            .set('Authorization', "Bearer " + 'gibberish')
            .expect(function (res) {
            expect(res.body.data.error.message).toBe('jwt malformed');
        });
    });
    it('Users should see completed fixtures', function () {
        return supertest_1.default(app_1.default)
            .get('/api/v1/fixtures/played')
            .set('Authorization', "Bearer " + token)
            .expect(function (res) {
            expect(res.body.message[0]).toHaveProperty('homeScore');
            expect(res.body.message[0]).toHaveProperty('awayScore');
            expect(res.body.message[0]).toHaveProperty('played');
            expect(res.body.message[0]).toHaveProperty('homeTeam');
            expect(res.body.message[0]).toHaveProperty('awayTeam');
            expect(res.body.message[0]).toHaveProperty('time');
            expect(res.body.message[0]).toHaveProperty('stadium');
        });
    });
    it('Users should see pending fixtures', function () {
        return supertest_1.default(app_1.default)
            .get('/api/v1/fixtures/pending')
            .set('Authorization', "Bearer " + token)
            .expect(200);
    });
    it('Admin should create fixtures', function () {
        return supertest_1.default(app_1.default)
            .post('/api/v1/fixtures')
            .set('Authorization', "Bearer " + adminToken)
            .send({
            homeTeam: teamA._id,
            awayTeam: teamB._id,
            time: '7:00pm',
            homeScore: 0,
            awayScore: 0,
            stadium: 'Anfield',
            played: false,
        })
            .expect(function (res) {
            // add fixtures properties
            fixturesId = res.body.message._id;
            fixtureLink = res.body.message.link;
            expect(res.body.message).toMatchObject({
                homeScore: 0,
                awayScore: 0,
                stadium: 'Anfield',
                played: false,
            });
        });
    });
    it('Users should see a fixtures by link', function () {
        var link = fixtureLink.split('/');
        var linkID = link[link.length - 1];
        return supertest_1.default(app_1.default)
            .get("/api/v1/fixtures/" + linkID)
            .set('Authorization', "Bearer " + token)
            .expect(function (res) {
            expect(res.body.message).toMatchObject({
                homeScore: 0,
                awayScore: 0,
                stadium: 'Anfield',
                homeTeam: { name: 'Liverpool', coach: 'Jurgen Klopp' },
                awayTeam: { name: 'Manchester City', coach: 'Pep Guardiola' },
                time: '7:00pm',
                played: false,
            });
        });
    });
    it('Admin should update fixtures', function () {
        return supertest_1.default(app_1.default)
            .put("/api/v1/fixtures/" + fixturesId)
            .set('Authorization', "Bearer " + adminToken)
            .send({
            homeScore: 4,
            awayScore: 2,
            played: true,
        })
            .expect(function (res) {
            expect(res.body.message).toBe("Fixture " + fixturesId + " was updated successfully.");
        });
    });
    it('Admin should delete fixtures', function () {
        return supertest_1.default(app_1.default)
            .delete("/api/v1/fixtures/" + fixturesId)
            .set('Authorization', "Bearer " + adminToken)
            .expect(function (res) {
            expect(res.body.message).toBe("Fixture " + fixturesId + " was deleted successfully.");
        });
    });
});
describe('Teams Routes', function () {
    it('Users should view teams', function () {
        return supertest_1.default(app_1.default)
            .get("/api/v1/teams")
            .set('Authorization', "Bearer " + token)
            .expect(function (res) {
            expect(res.body.message[0]).toHaveProperty('name');
            expect(res.body.message[0]).toHaveProperty('founded');
            expect(res.body.message[0]).toHaveProperty('website');
            expect(res.body.message[0]).toHaveProperty('nick_name');
        });
    });
    it('Admin should create teams', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, supertest_1.default(app_1.default)
                    .post("/api/v1/teams")
                    .set('Authorization', "Bearer " + adminToken).send({
                    name: 'Leeds United',
                    nick_name: 'The Bulls',
                    website: 'https://leedsunited.com',
                    coach: 'Marcelo Bielsa',
                    founded: 1908,
                    stadium_name: 'Barlos Road',
                    stadium_capacity: '43,000',
                }).expect(function (res) {
                    expect(res.body.data.message).toBe("Team Leeds United A.K.A \"The Bulls\" created successfully.");
                })];
        });
    }); });
    it('User should not create teams', function () {
        return supertest_1.default(app_1.default)
            .post("/api/v1/teams")
            .set('Authorization', "Bearer " + token)
            .send({
            name: 'Swansea',
            nick_name: 'The Swans',
            website: 'https://swanseafc.com',
            coach: 'Richard Greene',
            founded: 1970,
            stadium_name: 'Liberty Stadium',
            stadium_capacity: '45,050',
        })
            .expect(function (res) {
            expect(res.body.message).toBe("Unauthorized access.");
        });
    });
    it('Admin should update teams', function () {
        return supertest_1.default(app_1.default)
            .put("/api/v1/teams/" + teamA._id)
            .set('Authorization', "Bearer " + adminToken)
            .send({
            coach: 'Jurgen Klopp',
            nick_name: 'The Reds',
            founded: 1892,
            stadium_name: 'Anfield',
            stadium_capacity: '60,234',
        })
            .expect(function (res) {
            expect(res.body.message).toBe("Team Liverpool has been updated successfully.");
        });
    });
    it('Users should not update teams', function () {
        return supertest_1.default(app_1.default)
            .put("/api/v1/teams/" + teamA._id)
            .set('Authorization', "Bearer " + token)
            .send({
            coach: 'Willams James',
            website: 'https://brightonfc.com',
            founded: 1877,
            stadium_name: 'Seagulls',
            stadium_capacity: '30,033',
        })
            .expect(function (res) {
            expect(res.body.message).toBe("Unauthorized access.");
        });
    });
    it('Admin should remove team', function () {
        return supertest_1.default(app_1.default)
            .delete("/api/v1/teams/" + teamA._id)
            .set('Authorization', "Bearer " + adminToken)
            .expect(function (res) {
            expect(res.body.message).toBe("Team Liverpool has been deleted successfully.");
        });
    });
});
//# sourceMappingURL=users.js.map