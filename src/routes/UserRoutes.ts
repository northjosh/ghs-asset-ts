import { Router } from "express";
import { getUsers, updateUser, createUser, deleteUser, getUserById, loginUser } from "../controllers/User.controller";

const router = Router();

router.post("/create", createUser as any);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/update/:id", updateUser as any);
router.delete("/delete/:id", deleteUser as any);
router.post("/login", loginUser as any);


export default router;
