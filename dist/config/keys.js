"use strict";
module.exports = {
    mongoURI: 'mongodb://localhost:27017/premier-league' || process.env.PROD,
    key: 'secret' || process.env.JWT_PRIVATE_KEY,
};
//# sourceMappingURL=keys.js.map