import 'source-map-support/register';

import * as bodyParser from 'body-parser';
import * as express from 'express';

import * as db from './db';
import { allowCors } from './middlewares/allowCors';
import { notFound } from './middlewares/errors';
import * as errors from './middlewares/errors';
import { router as pokemonRoutes } from './routes';
import * as settings from './settings';
import * as appService from './api/services/app';

db.connect();

const publicDir = __dirname + '/../dist';
const app = express();

app.use(express.static(publicDir));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(allowCors);

app.use('/', pokemonRoutes);
app.get('/*', notFound);

app.use(errors.notFound);
app.use(errors.parser);

app.listen(settings.port, () => console.log(`server started: PORT: ${settings.port} | ENV: ${settings.env}`));
process.on('unhandledRejection', (reason: any, p: any) => { /* ignore */ });

appService.getApps(5).catch(console.error);
