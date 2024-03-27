import { Schema, model, models } from "mongoose";

export interface UserDocument {
  email: string;
  password: string;
  name: string;
  mongodbKey: string;
  stripeSecret: string;
  stripePublic: string;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<UserDocument>({
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Email is invalid",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    select: false,
  },
  name: {
    type: String,
    required: [true, "Fullname is required"],
    minLength: [3, "fullname must be at least 3 characters"],
    maxLength: [25, "fullname must be at most 25 characters"],
  },
  mongodbKey: {
    type: String,
    required: [true, "MongoDB URI is required"],
  },
  stripeSecret: {
    type: String,
    required: [true, "Stripe Secret is required"],
  },
  stripePublic: {
    type: String,
    required: [true, "Stripe Public is required"],
  },
},
  {
    timestamps: true,
  }
);

const User = models.User || model<UserDocument>('User', UserSchema);
export default User;