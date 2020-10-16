import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: Number },
  Role: {
    type: String,
    enum: [ "ADMIN", "USER"]
},
filename: { type: String },
sondages: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: "Sondage"
}],
});

