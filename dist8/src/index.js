"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const application_1 = require("./application");
exports.IxApplication = application_1.IxApplication;
async function main(options) {
    const app = new application_1.IxApplication(options);
    await app.boot();
    await app.start();
    return app;
}
exports.main = main;
//# sourceMappingURL=index.js.map