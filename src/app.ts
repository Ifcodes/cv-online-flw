import express, { Application, json } from "express";
import cors from "cors";
import appRouter from "./components/componentRouter";

const app: Application = express();

app.use(cors()).use(json()).use(appRouter);

export default app;
