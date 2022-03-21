import 'module-alias/register';
import path from 'path';
import { addAliases } from 'module-alias';

addAliases({
    '@repos': path.resolve(__dirname, 'repos'),
    '@models': path.resolve(__dirname, 'models'),
    '@shared': path.resolve(__dirname, 'shared'),
    '@server': path.resolve(__dirname, 'server'),
    '@services': path.resolve(__dirname, 'services'),
    '@routes': path.resolve(__dirname, 'routes'),
    '@config': path.resolve(__dirname, 'config'),
    '@logger': path.resolve(__dirname, 'logger'),
});

import './pre-start';
export { default as default } from './server';
