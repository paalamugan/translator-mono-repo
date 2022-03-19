import 'module-alias/register';

import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import 'express-async-errors';

import { apiRouterV1 } from './routes/api';
import logger from 'jet-logger';
import { CustomError } from '@shared/errors';

// Constants
const app = express();


/***********************************************************************************
 *                                  Middlewares
 **********************************************************************************/

// Common middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

// Cross-Origin-Validation Middleware
app.use(cors({
    origin: ['http://localhost:3000'],
}));
// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Security (helmet recommended in express docs)
if (process.env.NODE_ENV === 'production') {
    app.use(helmet({
        contentSecurityPolicy: false,
    }));
}


/***********************************************************************************
 *                         API routes and error handling
 **********************************************************************************/

// Add api router
app.use('/api/v1', apiRouterV1);

// Error handling
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error | CustomError, _req: Request, res: Response, _next: NextFunction) => {
    logger.err(err, true);
    const status = (err instanceof CustomError ? err.HttpStatus || StatusCodes.BAD_REQUEST : StatusCodes.BAD_REQUEST);
    return res.status(status).json({
        message: err.message,
    });
});


/***********************************************************************************
 *                                  Front-end content
 **********************************************************************************/

// Set views dir
// const viewsDir = path.join(__dirname, 'views');
// app.set('views', viewsDir);

// Set static dir
const staticDir = path.join(__dirname, '..', '..', 'client', 'build');
app.use(express.static(staticDir));

// Serve index.html file
app.get('*', (_: Request, res: Response) => {
    res.sendFile('index.html', { root: staticDir });
});



// Export here and start in a diff file (for testing).
export default app;
