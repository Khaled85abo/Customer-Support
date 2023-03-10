import { ROLES } from "../constants/roles";

type ObjectValues<T> = T[keyof T];

export type RolesType = ObjectValues<typeof ROLES>;
