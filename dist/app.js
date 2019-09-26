"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable: import-name
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var api_1 = __importDefault(require("./routes/api"));
var body_parser_1 = __importDefault(require("body-parser"));
var app = express_1.default();
// Body Parser middleware
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
// DB CONFIG
var db = require('./config/keys').mongoURI;
// Connect to MongoDB
mongoose_1.default
    .connect(db, { useNewUrlParser: true })
    .then(function () { return console.log('MongoDB connected'); })
    .catch(function (err) { return console.log(err); });
mongoose_1.default.set('useFindAndModify', false);
mongoose_1.default.set('useCreateIndex', true);
// Use Routes
app.use('/api/v1', api_1.default);
var port = process.env.PORT || 4000;
app.listen(port, function () { return console.log("Server running on port " + port); });
//# sourceMappingURL=app.js.map