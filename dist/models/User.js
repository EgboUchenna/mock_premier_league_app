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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ts_mongoose_1 = require("ts-mongoose");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = __importDefault(require("config"));
var UserSchema = ts_mongoose_1.createSchema(__assign({ name: ts_mongoose_1.Type.string(), email: ts_mongoose_1.Type.string({ unque: true }), password: ts_mongoose_1.Type.string(), isAdmin: ts_mongoose_1.Type.optionalBoolean() }, {}));
UserSchema.methods.getAuthToken = function () {
    var token = jsonwebtoken_1.default.sign({ _id: this._id, isAdmin: this.isAdmin }, config_1.default.get('jwtPrivateKey'));
    return token;
};
exports.User = ts_mongoose_1.typedModel('User', UserSchema);
//# sourceMappingURL=User.js.map