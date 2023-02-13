import mongoose, { Schema, InferSchemaType, Types } from "mongoose";
import bcrypt from "bcryptjs";

export const CLIENTROLES = {
  client: "client",
} as const;

type ClientROlesTypes = typeof CLIENTROLES[keyof typeof CLIENTROLES];

const clientSchema = new Schema(
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
  },
  {
    timestamps: true,
  }
);

clientSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

clientSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

clientSchema.methods.validatePassword = function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

export interface IClient extends InferSchemaType<typeof clientSchema> {
  matchPassword: () => boolean;
  validatePassword: (password: string) => Promise<boolean>;
}

const Client = mongoose.model<IClient>("Client", clientSchema);

export default Client;
