import * as mongoose from 'mongoose';

export const SondageSchema = new mongoose.Schema({

  question: { type: String, required: true },
  voted: { type: Boolean},
  oui : { type: Number },
  non : { type: Number },
  date:{ type: Date, required: true },
  userId: { type: String, required: true },
  usersVoted:{type:Array ,default:[]}
});

