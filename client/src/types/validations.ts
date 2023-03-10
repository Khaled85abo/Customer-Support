import { VALIDATIONS } from "../constants/validations";
import { ObjectValues } from "./objectValues";

export type ValidationType = ObjectValues<typeof VALIDATIONS>;
