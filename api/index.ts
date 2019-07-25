import { config } from 'dotenv';
import express from 'express';
import { PORT } from './constants';
import { filingsController } from './filings.controller';

// Configure Environmental Variables
config();

const app = express();

app.get('/filings', filingsController);

app.listen(PORT, () => console.log(`Server listening on port ${PORT} ...`));
