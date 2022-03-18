"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
require("express-async-errors");
const api_1 = require("./routes/api");
const jet_logger_1 = __importDefault(require("jet-logger"));
const errors_1 = require("@shared/errors");
// Constants
const app = (0, express_1.default)();
/***********************************************************************************
 *                                  Middlewares
 **********************************************************************************/
// Common middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
// Cross-Origin-Validation Middleware
app.use((0, cors_1.default)({
    origin: ['http://localhost:3000'],
}));
// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
    app.use((0, morgan_1.default)('dev'));
}
// Security (helmet recommended in express docs)
if (process.env.NODE_ENV === 'production') {
    app.use((0, helmet_1.default)({
        contentSecurityPolicy: false,
    }));
}
/***********************************************************************************
 *                         API routes and error handling
 **********************************************************************************/
// Add api router
app.use('/api/v1', api_1.apiRouterV1);
// Error handling
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err, _req, res, _next) => {
    jet_logger_1.default.err(err, true);
    const status = (err instanceof errors_1.CustomError ? err.HttpStatus || http_status_codes_1.default.BAD_REQUEST : http_status_codes_1.default.BAD_REQUEST);
    return res.status(status).json({
        message: err.message,
    });
});
/***********************************************************************************
 *                                  Front-end content
 **********************************************************************************/
// Set views dir
// const viewsDir = path.join(__dirname, 'views');
// app.set('views', viewsDir);
// Set static dir
const staticDir = path_1.default.join(__dirname, '..', '..', 'client', 'build');
app.use(express_1.default.static(staticDir));
// Serve index.html file
app.get('*', (_, res) => {
    res.sendFile('index.html', { root: staticDir });
});
// Export here and start in a diff file (for testing).
exports.default = app;
