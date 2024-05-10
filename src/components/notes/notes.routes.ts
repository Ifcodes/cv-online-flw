import { Router } from "express";
import middlewares from "../../utils/middlewares";
import { addNoteSchema } from "./notes.policy";
import { addNote, getNotes } from "./notes.actions";

const { policyHandler } = middlewares;

const router: Router = Router();

router.post("/", policyHandler(addNoteSchema), addNote);

router.get("/", getNotes);

export default router;
