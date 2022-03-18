export interface IConfig {
    microsoftTranslateAppId: string,
}

export default {
    microsoftTranslateAppId: process.env.MICROSOFT_TRANSLATE_APP_ID,
} as IConfig