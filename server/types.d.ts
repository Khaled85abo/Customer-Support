// import { IUser } from "../../models/user";

// declare module "express" {
//   interface Request {
//     user: IUser;
//   }
// }

declare namespace Express {
  export interface Request {
    user: any;
  }
  export interface Response {
    user: any;
  }
}
