import z from "zod";
import { INoteType } from "./notes.types";

const addNoteSchema = z.object({
  title: z.string().min(5, "Must have at least 5 characters text"),
  content: z.string().min(5, "Must have at least 5 characters text"),
  isImportant: z.boolean(),
});

export { addNoteSchema };
