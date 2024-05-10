import { Mongoose, Schema, model } from "mongoose";
import { INoteType } from "./notes.types";

const NoteSchema = new Schema<INoteType>({
  title: {
    type: String,
    required: [true, "This field is required"],
    minlength: [5, "Must have at least 5 characters text"],
  },
  content: {
    type: String,
    required: [true, "This field is required"],
    minlength: [5, "Must have at least 5 characters text"],
  },
});

const noteModel = model<INoteType>("Note", NoteSchema);

export default noteModel;
