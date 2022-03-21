"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paths = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const express_1 = require("express");
const translator_service_1 = require("@services/translator-service");
// Constants
const router = (0, express_1.Router)();
const { OK } = http_status_codes_1.default;
// Paths
exports.paths = {
    default: '/',
    detect: '/detect',
};
router.post(exports.paths.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { text, from, to } = req.body;
    const result = yield (0, translator_service_1.getTranslatedLanguage)((text || '').trim(), from, to);
    return res.status(OK).json(result);
}));
router.post(exports.paths.detect, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { text } = req.body;
    const langCode = yield (0, translator_service_1.detectLanguage)(text);
    return res.status(OK).json({ langCode });
}));
// Export default
exports.default = router;
