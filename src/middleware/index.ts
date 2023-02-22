import { NextFunction, Request, Response } from 'express';

import { verify } from 'jsonwebtoken';

import userSchema from '../models/user';

const SECRET = process.env.SECRET || new Uint8Array(16).join('');

export default async function (req: Request, res: Response, next: NextFunction) {
    try {
        const token = (req.headers.authorization||'').split(" ")[1];
        let decodedData = verify(token, SECRET) as Record<string, any>;

        const existingUser = await userSchema.findOne({
            username: decodedData.username,
            _id: decodedData.id
        }).exec();
        if (!existingUser || !existingUser.admin) throw "Unauthorized";

        next();
    } catch (error) {
        res.status(403).json({ message: "Unauthorized action" });
    }
};
