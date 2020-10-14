
import { Document } from 'mongoose';
export interface Sondage extends Document{
  id: string;
  question: string;
  voted: boolean;
  oui : number;
  non : number;
  date:Date,
  userId:string,
  usersVoted:[any];
  }
  