import { Schema, Model, model } from "mongoose";

interface IUser {
  name: string;
  username: string;
  email: string;
  role: string;
  department: string;
  password: string;
  last_login: Date;
  contact: number;
}

type UserModel = Model<IUser>;

const userSchema = new Schema<IUser, UserModel>({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },

  email: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["director", "officer", "admin"],
    required: true,
  },

  department: {
    type: String,
    required: false

  },
  password: {
    type: String,
    required: true,
  },

  last_login: {
    type: Date,
  },

  contact: {
    type: Number,
    required: true,
  },
},
{
	timestamps: {
		createdAt: "created_at",
		updatedAt: true
	}

});


const User = model<IUser, UserModel>("User", userSchema)

export { User, IUser }
