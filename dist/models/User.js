"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts_mongoose_1 = require("ts-mongoose");
var UserSchema = ts_mongoose_1.createSchema({
    name: ts_mongoose_1.Type.string(),
    email: ts_mongoose_1.Type.string({ unque: true }),
    password: ts_mongoose_1.Type.string(),
    isAdmin: ts_mongoose_1.Type.optionalBoolean(),
});
UserSchema.methods.getAuthToken = function () { };
exports.User = ts_mongoose_1.typedModel('User', UserSchema);
//# sourceMappingURL=User.js.map