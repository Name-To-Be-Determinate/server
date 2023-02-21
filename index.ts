import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import { json, urlencoded } from 'body-parser';
import { config } from 'dotenv';

import router from './src/router';

const app = express();
config();

// Encoding
app.use(json({ limit: '30mb' }));
app.use(urlencoded({ extended: true, limit: '30mb' })); // @ts-ignore
app.use(cors());

// Routing
app.use('/', router);

// Run app
const PORT = process.env.PORT || 5000;

mongoose.set('strictQuery', true); // @ts-ignore
mongoose.connect(process.env.MONGO_DB || "", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log("Server running at port : " + PORT)))
    .catch(err => console.error(err));
