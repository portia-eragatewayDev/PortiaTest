import { createUsers, getUsersById,getUsers, UpdateUserById,DeleteUserById} from "@/controllers/users";
import express  from "express";
const UserRouter= express.Router();


UserRouter.post ("/users", createUsers)
UserRouter.get ("/users", getUsers)
UserRouter.get ("/users/:id", getUsersById)
UserRouter.put ("/users/:id", UpdateUserById)
UserRouter.delete ("/users/:id", DeleteUserById)

export  default UserRouter