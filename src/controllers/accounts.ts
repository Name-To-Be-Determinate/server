import { Request, Response } from 'express';

import { compareSync } from 'bcryptjs';
import jwt from 'jsonwebtoken';

import userSchema from '../models/user';

const SECRET = process.env.SECRET || new Uint8Array(16).join('');

export async function login(req: Request, res: Response) {
    try {
        const { password, username } = req.body;

        const existingUser = await userSchema.findOne({ username }).exec();
        if (!existingUser) return res.status(404).json({ message: "User not found" });

        const correctPassword = compareSync(password, existingUser.password || '');
        if (!correctPassword) return res.status(404).json({ message: "User not found" });

        const token = jwt.sign({ username: existingUser.username, id: existingUser._id }, SECRET);

        res.status(200).json({ user: {
            admin: existingUser.admin, username: existingUser.username, _id: existingUser._id
        }, token });
    } catch (error) {
        res.status(500).json({ message: "An unknown error has been encountered by the server." });
    }
};

export async function newUser(req: Request, res: Response) {
    try {
        // 
    } catch (error) {
        res.status(500).json({ message: "" });
    }
};
