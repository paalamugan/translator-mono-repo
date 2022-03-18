"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_router_1 = __importDefault(require("./user-router"));
const translator_router_1 = __importDefault(require("./translator-router"));
// Export the base-router
const baseRouter = (0, express_1.Router)();
// Setup routers
baseRouter.use('/users', user_router_1.default);
baseRouter.use('/translator', translator_router_1.default);
// Export default.
exports.default = baseRouter;
