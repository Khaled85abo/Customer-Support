import mongoose, { Schema, InferSchemaType, Types } from "mongoose";
import bcrypt from "bcryptjs";
import { ROLES } from "../constants/employee";

export type RolesTypes = typeof ROLES[keyof typeof ROLES];

const employeeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: [ROLES.admin, ROLES.support_agent],
      default: ROLES.support_agent,
      required: true,
    },
    processing: {
      type: Types.ObjectId,
      ref: "Refund",
      default: null,
      required: false,
    },
    activated: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

employeeSchema.methods.matchPassword = async function (
  enteredPassword: string
) {
  return await bcrypt.compare(enteredPassword, this.password);
};

employeeSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

employeeSchema.methods.validatePassword = function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

export interface IEmplyee extends InferSchemaType<typeof employeeSchema> {
  matchPassword: () => boolean;
  validatePassword: (password: string) => Promise<boolean>;
}

const Employee = mongoose.model<IEmplyee>("Employee", employeeSchema);

export default Employee;
