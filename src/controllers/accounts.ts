import { Request, Response } from 'express';

import { compareSync, hashSync } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import userSchema from '../models/user';

const SECRET = process.env.SECRET || new Uint8Array(16).join('');

export async function login(req: Request, res: Response) {
    try {
        const { password, username } = req.body;

        const existingUser = await userSchema.findOne({ username }).exec();
        if (!existingUser) return res.status(404).json({ message: "User not found" });

        const correctPassword = compareSync(password, existingUser.password || '');
        if (!correctPassword) return res.status(404).json({ message: "User not found" });

        const token = sign({ username: existingUser.username, id: existingUser._id }, SECRET);

        res.status(200).json({ user: {
            admin: existingUser.admin, username: existingUser.username, _id: existingUser._id
        }, token });
    } catch (error) {
        res.status(500).json({ message: "An unknown error has been encountered by the server." });
    }
};

export async function newUser(req: Request, res: Response) {
    const { body } = req;

    try {
        const existingUser = await userSchema.findOne({ username: body.username }).exec();
        if (existingUser) return res.status(401).json({ message: "User already exists, choose an other username." });

        let encryptedPassword = hashSync(body.password);
        const newUser = new userSchema({ ...body, password: encryptedPassword });

        await newUser.save();

        res.status(201).json({ message: "User successfully added !" });
    } catch (error) {
        res.status(500).json({ message: "An unknown error has been encountered by the server." });
    }
};

export async function deleteUser(req: Request, res: Response) {
    try {
        const { username } = req.params;
        const query = userSchema.findOneAndRemove({ username });

        await query.exec();

        res.status(200).json({ message: "User successfully removed from base." });
    } catch (error) {
        res.status(500).json({ message: "An unkown error has benn encountered by the server." });
    }
};
