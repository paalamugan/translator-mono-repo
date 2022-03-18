import StatusCodes from 'http-status-codes';
import { Router, Request, Response } from 'express';

import userService from '@services/user-service';
import { ParamMissingError } from '@shared/errors';
import { IUser } from '@models/user-model';



// Constants
const router = Router();
const { CREATED, OK } = StatusCodes;

// Paths
export const paths = {
    get: '/all',
    add: '/add',
    update: '/update',
    delete: '/delete/:id',
} as const;



/**
 * Get all users.
 */
router.get(paths.get, async (req: Request, res: Response) => {
    const users = await userService.getAll();
    return res.status(OK).json({users});
});


/**
 * Add one user.
 */
router.post(paths.add, async (req: Request, res: Response) => {
    const { user } = req.body as { user: IUser };
    // Check param
    if (!user) {
        throw new ParamMissingError();
    }
    // Fetch data
    await userService.addOne(user);
    return res.status(CREATED).end();
});


/**
 * Update one user.
 */
router.put(paths.update, async (req: Request, res: Response) => {
    const { user } = req.body as { user: IUser };
    // Check param
    if (!user) {
        throw new ParamMissingError();
    }
    // Fetch data
    await userService.updateOne(user);
    return res.status(OK).end();
});


/**
 * Delete one user.
 */
router.delete(paths.delete, async (req: Request, res: Response) => {
    const { id } = req.params as  { id: string };
    // Check param
    if (!id) {
        throw new ParamMissingError();
    }
    // Fetch data
    await userService.delete(Number(id));
    return res.status(OK).end();
});


// Export default
export default router;
