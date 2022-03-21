import http from 'http';
import https from 'https';
import config from '@config/index';
import { TranslatorError } from '@shared/errors';

const newRequest = (url: string) => {
    return new Promise((resolve, reject) => {
        const options: URL = new URL(url);
    
        const request = options.protocol.includes('https') ? https.request : http.request;

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
}

export const detectLanguage = async(text = '') => {
    if (!text) {
        throw new TranslatorError('Translate "text" value is missing.');
    }

    const queryParams = new URLSearchParams({
        appId: config.microsoftTranslateAppId,
        text
    });

    let languageCode = await newRequest(
        `https://api.microsofttranslator.com/V2/Ajax.svc/Detect?${queryParams.toString()}`
    ) as string;
    
    languageCode = languageCode.replace(/"/g, '');

    return languageCode;
}

export const getTranslatedLanguage = async (text: string, from: string, to: string): Promise<any> => {
    if (!text) {
        throw new TranslatorError('Translate "text" value is missing.');
    }

    if (!to) {
        throw new TranslatorError('Translate "to" value is missing.');
    }

    let detectedLang = '';
    if (!from) {
        detectedLang = await detectLanguage(text) ;
    }

    const queryParams = new URLSearchParams({
        appId: config.microsoftTranslateAppId,
        text: text.trim(),
        from: from || detectedLang,
        to
    });

    try {
        const translatedText = await newRequest(
            `https://api.microsofttranslator.com/V2/Ajax.svc/Translate?${queryParams.toString()}`
        ) as string;

        if (translatedText.includes('ArgumentException:')) {
            throw new TranslatorError(translatedText);
        }
        return { 
            translatedText: translatedText?.replace(/"/g, '').trim() || '', 
            text, 
            detectedLang, 
            from, 
            to 
        };
    } catch (err) {
        throw new TranslatorError(err.message as string);
    }
}
