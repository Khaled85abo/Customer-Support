import bcrypt from "bcryptjs";
import { ROLES } from "../../constants/employee";

export const employees = [
  {
    name: "admin",
    email: "admin@se.se",
    password: bcrypt.hashSync("123456", 10),
    role: ROLES.admin,
    activated: true,
  },
  {
    name: "Johan",
    email: "Johan@se.se",
    password: bcrypt.hashSync("123456", 10),
    role: ROLES.support_agent,
    activated: true,
  },
];

export const clients = [
  {
    name: "su",
    email: "su@se.se",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Moa",
    email: "moa@se.se",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Erik",
    email: "erik@se.se",
    password: bcrypt.hashSync("123456", 10),
  },
];
