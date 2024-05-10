import { Router } from "express";
import router from "./notes/notes.routes";
import paymentRouter from "./payments/payment.routes";

const appRouter: Router = Router();

appRouter.use("/api/notes", router);
appRouter.use("/api/payment", paymentRouter);

export default appRouter;
