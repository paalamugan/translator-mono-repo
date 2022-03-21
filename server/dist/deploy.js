"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
require("module-alias/register");
const path_1 = __importDefault(require("path"));
const module_alias_1 = require("module-alias");
(0, module_alias_1.addAliases)({
    '@repos': path_1.default.resolve(__dirname, 'repos'),
    '@models': path_1.default.resolve(__dirname, 'models'),
    '@shared': path_1.default.resolve(__dirname, 'shared'),
    '@server': path_1.default.resolve(__dirname, 'server'),
    '@services': path_1.default.resolve(__dirname, 'services'),
    '@routes': path_1.default.resolve(__dirname, 'routes'),
    '@config': path_1.default.resolve(__dirname, 'config'),
    '@logger': path_1.default.resolve(__dirname, 'logger'),
});
require("./pre-start");
var server_1 = require("./server");
Object.defineProperty(exports, "default", { enumerable: true, get: function () { return __importDefault(server_1).default; } });
