import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import dotenv from "dotenv";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksController from './routes/mocks.router.js';

const app = express();
dotenv.config();
const PORT = process.env.PORT||8080;
const MONGOURL = process.env.MONGOURL
const connection = mongoose.connect(MONGOURL);

app.use(express.json());
app.use(cookieParser());

app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);
app.use('/api/mocks',mocksController)

app.listen(PORT,()=>console.log(`Listening on ${PORT}`))

const swaggerOptions = {
	definition: {
		openapi: "3.0.1",
		info: {
			title: "Documentación Adoptme",
			description: "API para la página de adopciones"
		}
	},
	apis:["./src/docs/**/*.yaml"]
}
const specs = swaggerJSDoc(swaggerOptions)
app.use("/apidocs",swaggerUiExpress.serve,swaggerUiExpress.setup(specs))
