import { Sondage } from "../../sondage/interfaces/Sondage.interface";

export interface Userdto {
    id: string;
    email: string;
    password: string;
    phone: number;
    Role: {
      type: String,
      enum: [ "ADMIN", "USER"]
  },
  sondages: [any]
  }
  