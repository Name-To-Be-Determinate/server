import { Request, Response } from 'express';

import { compareSync, hashSync } from 'bcryptjs';
import jwt from 'jsonwebtoken';

import userSchema from '../models/user';

const SECRET = process.env.SECRET || new Uint8Array(16).join('');

export default async function (req: Request, res: Response) {
    try {
        const { username, password } = req.body;

        const existingUser = await userSchema.findOne({ username }).exec();
        if (!existingUser) return res.status(404).json({ message: "User not found" });

        const correctPassword = compareSync(password, existingUser.password || '');
        if (!correctPassword) return res.status(404).json({ message: "User not found" });

        const token = jwt.sign({ username: existingUser.username, id: existingUser._id }, SECRET);

        res.status(200).json({ user: {
            username: existingUser.username, _id: existingUser._id
        }, token });
    } catch (error) {
        res.send(500).json({ message: "An unknown error has been encountered by the server." });
    }
};
