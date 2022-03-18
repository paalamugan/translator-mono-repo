import StatusCodes from 'http-status-codes';
import { Router, Request, Response } from 'express';

import { detectLanguage, getTranslatedLanguage } from '@services/translator-service';

// Constants
const router = Router();
const { OK } = StatusCodes;

// Paths
export const paths = {
    default: '/',
    detect: '/detect',
} as const;


router.post(paths.default, async (req: Request, res: Response) => {
    const { text, from, to } = req.body as { text: string, from: string, to: string };
    const result = await getTranslatedLanguage(text, from, to);
    return res.status(OK).json(result);
});

 router.post(paths.detect, async (req: Request, res: Response) => {
    const { text } = req.body as { text: string };
    const langCode = await detectLanguage(text);
    return res.status(OK).json({ langCode });
});

// Export default
export default router;
