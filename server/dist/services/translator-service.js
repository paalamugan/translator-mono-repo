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
exports.getTranslatedLanguage = exports.detectLanguage = void 0;
const http_1 = __importDefault(require("http"));
const https_1 = __importDefault(require("https"));
const index_1 = __importDefault(require("@config/index"));
const errors_1 = require("@shared/errors");
const newRequest = (url) => {
    return new Promise((resolve, reject) => {
        const options = new URL(url);
        const request = options.protocol.includes('https') ? https_1.default.request : http_1.default.request;
        const httpRequest = request(options, (httpResponse) => {
            httpResponse.setEncoding('utf-8');
            let body = "";
            httpResponse.on('data', (chunk) => {
                body += chunk;
            });
            httpResponse.on('end', () => {
                return resolve(body.trim());
            });
        });
        httpRequest.on('error', reject);
        httpRequest.end();
    });
};
const detectLanguage = (text = '') => __awaiter(void 0, void 0, void 0, function* () {
    if (!text) {
        throw new errors_1.TranslatorError('Translate "text" value is missing.');
    }
    const queryParams = new URLSearchParams({
        appId: index_1.default.microsoftTranslateAppId,
        text
    });
    let languageCode = yield newRequest(`https://api.microsofttranslator.com/V2/Ajax.svc/Detect?${queryParams.toString()}`);
    languageCode = languageCode.replace(/"/g, '');
    return languageCode;
});
exports.detectLanguage = detectLanguage;
const getTranslatedLanguage = (text, from, to) => __awaiter(void 0, void 0, void 0, function* () {
    if (!text) {
        throw new errors_1.TranslatorError('Translate "text" value is missing.');
    }
    if (!to) {
        throw new errors_1.TranslatorError('Translate "to" value is missing.');
    }
    let detectedLang = '';
    if (!from) {
        detectedLang = yield (0, exports.detectLanguage)(text);
    }
    const queryParams = new URLSearchParams({
        appId: index_1.default.microsoftTranslateAppId,
        text,
        from: from || detectedLang,
        to
    });
    try {
        const translatedText = yield newRequest(`https://api.microsofttranslator.com/V2/Ajax.svc/Translate?${queryParams.toString()}`);
        if (translatedText.includes('ArgumentException:')) {
            throw new errors_1.TranslatorError(translatedText);
        }
        return {
            translatedText: (translatedText === null || translatedText === void 0 ? void 0 : translatedText.replace(/"/g, '').trim()) || '',
            text,
            detectedLang,
            from,
            to
        };
    }
    catch (err) {
        throw new errors_1.TranslatorError(err.message);
    }
});
exports.getTranslatedLanguage = getTranslatedLanguage;
