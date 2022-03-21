/**
 * Pre-start is where we want to place things that must run BEFORE the express server is started.
 * This is useful for environment variables, command-line arguments, and cron-jobs.
 */

import path from 'path';
import dotenv from 'dotenv';
import commandLineArgs from 'command-line-args';
import logger from '@logger';

(() => {
    // Setup command line options
    const options = commandLineArgs([
        {
            name: 'env',
            alias: 'e',
            defaultValue: (process.env.NODE_ENV || 'development').trim(),
            type: String,
        },
    ]);

    // Set the env file
    const result2 = dotenv.config({
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        path: path.join(__dirname, `env/${options.env}.env`),
    });

    import('../config').then((config) => {
        if (!config.default.microsoftTranslateAppId) {
            throw new Error(`"MICROSOFT_TRANSLATE_APP_ID" is not defined in the path "src/pre-start/env/${options.env}.env" file.`);
        }
    }).catch((err: Error) => {
        logger.err(err, true);
        process.exit(1);
    });

    if (result2.error) {
        throw result2.error;
    }
})();
