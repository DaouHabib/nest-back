
import { Document } from 'mongoose';
import { Sondage } from '../../sondage/interfaces/Sondage.interface';

export interface User extends Document{
    id: string;
    email: string;
    password: string;
    phone: number;
    Role: {
      type: String,
      enum: [ "ADMIN", "USER"]
  },
  filename:string,
  sondages: [any]
  }
  