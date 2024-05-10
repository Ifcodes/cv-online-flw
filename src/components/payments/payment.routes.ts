import { Router } from "express";
import chargeCard from "./payment.action";

const paymentRouter: Router = Router();

paymentRouter.post("/", chargeCard);

export default paymentRouter;
