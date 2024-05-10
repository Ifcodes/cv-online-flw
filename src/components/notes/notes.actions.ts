import { Response, Request } from "express";
import NoteModel from "./notes.model";
import middlewares from "../../utils/middlewares";
import z from "zod";
import { INoteType } from "./notes.types";
import { addNoteSchema } from "./notes.policy";

let notes = [
  {
    title: "Hello world",
    content: "This is the hello world description",
    isImportant: true,
  },
  {
    title: "Hello world check",
    content: "This is the hello world check description ",
    isImportant: true,
  },
];

const addNote = async (req: Request, res: Response) => {
  const { title }: z.infer<typeof addNoteSchema> = req.body;

  try {
    const existingNote = notes.find((note) => note.title === title);

    if (existingNote) {
      res
        .status(400)
        .json({ error: `Note with title ${req.body.title} already exists` });
    } else {
      notes = notes.concat(req.body);

      res.json(req.body);
    }
  } catch (error) {
    res.status(500).json({ error: "Error creating notes" });
  }
};

const getNotes = async (req: Request, res: Response) => {
  try {
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: "Error getting notes" });
  }
};

export { addNote, getNotes };
