import express from 'express';
import 'dotenv/config'
import cors from 'cors';
import router from './router';
import { connectDB } from './config/db';
import { corsConfig } from './config/cors';
import limiter from './middleware/rateLimit';
import morgan from 'morgan';

connectDB();

const app = express();

//CORS
app.use(cors(corsConfig));
//Limiter 
app.use('/auth/login', limiter);
//Leer datos de formularios

app.use(morgan('dev'))
app.use(express.json());



app.use('/',router);

export default app;
