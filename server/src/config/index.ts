export interface IConfig {
    appId: string,
}

export default {
    appId: process.env.MICROSOFT_TRANSLATE_APP_ID,
} as IConfig