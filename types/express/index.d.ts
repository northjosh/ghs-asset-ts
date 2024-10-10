import { IUser } from "../../src/models/User";

export {}

declare global {
  namespace Express {
    export interface Request {
      user?: IUser;
    }
  }
}