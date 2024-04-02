import { Schema, model, models } from "mongoose";

export interface PrivateUserDocument {
  email: string;
  password: string;
  name: string;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

const PrivateUserSchema = new Schema<PrivateUserDocument>({
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
  }
},
  {
    timestamps: true,
  }
);

const PrivateUser = models.PrivateUser || model<PrivateUserDocument>('PrivateUser', PrivateUserSchema);
export default PrivateUser;