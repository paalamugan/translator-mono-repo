"use strict";
/**
 * Pre-start is where we want to place things that must run BEFORE the express server is started.
 * This is useful for environment variables, command-line arguments, and cron-jobs.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const dotenv_1 = __importDefault(require("dotenv"));
const command_line_args_1 = __importDefault(require("command-line-args"));
const _logger_1 = __importDefault(require("@logger"));
(() => {
    // Setup command line options
    const options = (0, command_line_args_1.default)([
        {
            name: 'env',
            alias: 'e',
            defaultValue: (process.env.NODE_ENV || 'development').trim(),
            type: String,
        },
    ]);
    const defaultEnv = path_1.default.resolve('.env');
    const isEnvPathExist = fs_1.default.existsSync(defaultEnv);
    if (options.env === 'development' && !isEnvPathExist) {
        _logger_1.default.warn('Please create ".env" file in root directory. So you can easily change environment variable values in development mode.');
    }
    const configPath = isEnvPathExist ? defaultEnv : path_1.default.join(__dirname, `env/${options.env}.env`);
    // Set the env file
    const result2 = dotenv_1.default.config({
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        path: configPath,
    });
    Promise.resolve().then(() => __importStar(require('../config'))).then((config) => {
        if (!config.default.microsoftTranslateAppId) {
            throw new Error(`"MICROSOFT_TRANSLATE_APP_ID" is not defined in the path "src/pre-start/env/${options.env}.env" file.`);
        }
    }).catch((err) => {
        _logger_1.default.err(err, true);
        process.exit(1);
    });
    if (result2.error) {
        throw result2.error;
    }
})();
