import { Request, Response } from "express";
import { db } from "@/db/db";
import bcrypt from "bcrypt";

export async function createUsers(req: Request, res: Response) {
  const {
    email,
    username,
    password,
    firstName,
    lastName,
    phone,
    dob,
    gender,
    image,
  } = req.body;

  try {
    // check if user exists
    const existingUserByEmail = await db.user.findUnique({
      where: { email },
    });

    if (existingUserByEmail) {
      return res.status(409).json({
        error: "User already exists",
        data: null,
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const newUser = await db.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        firstName,
        lastName,
        phone,
        dob: dob ? new Date(dob) : undefined,
        gender,
        image: image? image:"https://pixabay.com/vectors/profile-user-internet-man-42914/"
      },
    });

    return res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
}

export async function getUsers(req: Request, res: Response) {
  try {
    const users = await db.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      error: "Something went wrong",
      data: null
    });
  }
}

export async function getUsersById(req: Request, res: Response) {
  const id = req.params.id as string;
  const {
    email,
    username,
    password,
    firstName, 
    lastName,
    phone,
    dob, 
    gender,
    image,
           } = req.body;

  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return res.status(404).json({
        data: null,
        error: "User not found",
      });
    }

    const { password, ...other } = user;

    return res.status(200).json({
      data: other,
      error: null,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}


export async function UpdateUserById(req: Request, res: Response) {
  const id = req.params.id as string;

  const {
    email,
    username,
    password,
    firstName,
    lastName,
    phone,
    dob,
    gender,
    image,
  } = req.body;

  try {
    const existingUser = await db.user.findUnique({
      where: {
        id,
      },
    });

    if (!existingUser) {
      return res.status(404).json({
        data: null,
        error: "User not found",
      });
    }

    const updatedUser = await db.user.update({
      where: {
        id,
      },
      data: {
        email,
        username,
        password,
        firstName,
        lastName,
        phone,
        dob: new Date(dob),
        gender,
        image,
      },
    });

    const { password: userPassword, ...other } = updatedUser;

    return res.status(200).json({
      data: other,
      error: null,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}

export async function DeleteUserById(req: Request, res: Response) {
  const id = req.params.id as string;

  try {
    const existingUser = await db.user.findUnique({
      where: {
        id,
      },
    });

    if (!existingUser) {
      return res.status(404).json({
        data: null,
        error: "User not found",
      });
    }

    await db.user.delete({
      where: {
        id,
      },
    });

    return res.status(200).json({
      data: null,
      error: null,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}