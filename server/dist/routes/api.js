"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouterV1 = void 0;
const v1_1 = __importDefault(require("./v1"));
exports.apiRouterV1 = v1_1.default;
exports.default = {
    v1: exports.apiRouterV1
};
