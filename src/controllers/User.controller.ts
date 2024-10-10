import { User } from "../models/User";
import { configDotenv } from "dotenv";
import { hash, compareSync } from "bcrypt";
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";


configDotenv()

const getUsers = async (req: Request, res:Response) => {
    try {
      const users = await User.find();
      res.status(202).json(users);
    } catch (error) {
      res.status(500).json({ message: "Unable to fetch Users" });
    }
  };
  
  const createUser = async (req: Request, res:Response) => {
    console.log("Role: ", req.user?.role);
    // Check if the user is an admin
    // if (req.user?.role !== "admin") {
    //   return res
    //     .status(403)
    //     .json({ message: "Forbidden: Only admins can create users" });
    // }
  
    try {
      const { username } = req.body;
      const existingUser = await User.findOne({ username: username });
  
      if (existingUser) {
        return res.status(200).json({ message: "User already exists" });
      } else {
        const userData = req.body;
        userData.last_login = Date.now();
        userData.password = await hash(userData.password, 10);
  
        const newUser = new User(userData);
        await newUser.save();
  
        res.status(200).json({ message: "User created successfully" });
      }
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  };
  
  const loginUser = async (req: Request, res:Response) => {
    const { username, password } = req.body;
  
    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }
  
    // Check if password is correct
    const isPasswordValid = compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid username or password" });
    }
    console.log("User: ", user);
    // Generate JWT token
    const token = sign(
      {
        id: user._id,
        role: user.role,
        department: user.department,
      },
      process.env.AUTH_SECRET!
    );
  
    res.json({
      message: "Logged in successfully",
      token,
      role: user.role,
      userId: user._id,
    });
  };
  
  const deleteUser = async (req: Request, res:Response) => {
    try {
      const { id } = req.params;
      const existingUser = await User.findById(id);
  
      if (existingUser) {
        await User.findOneAndDelete({ username: existingUser.username });
        res.status(202).json({ message: "User deleted successfully" });
      } else {
        res.status(204).json({ message: "Unable to delete user" });
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  const updateUser = async (req: Request, res:Response) => {
    const { id } = req.params;
    const { name, username, department, position, password, last_login } =
      req.body;
    const updateFields: any = {
      name,
      username,
      department,
      position,
      password,
      last_login,
    };
  
    // Remove undefined fields from the update object
    Object.keys(updateFields).forEach(
      (key) => updateFields[key] === undefined && delete updateFields[key]
    );
  
    try {
      const user = await User.findByIdAndUpdate(id, updateFields, { new: true });
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }
      res.status(202).json({ message: "User updated successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  };
  
  const getUserById = async (req: Request, res:Response) => {
    try {
      const { id } = req.params;
  
      const user = await User.findById(id);
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };


  export {getUsers, getUserById, createUser, deleteUser, updateUser, loginUser, }