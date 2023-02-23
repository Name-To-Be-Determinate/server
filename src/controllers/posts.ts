import { Request, Response } from 'express';

import { InfosSchema, VirusSchema } from '../models/posts';

export async function getter(req: Request, res: Response) {
    const { type } = req.params;

    if (!/^(infos|virus)$/i.test(type)) res.status(404).json({ message: "Not found" });

    try {
        let query: any;

        if (type === 'infos') {
            query = await InfosSchema.find();
        } else query = await VirusSchema.find();

        res.status(200).json(query);
    } catch (error) {
        res.status(500).json({ message: "An unknow error has been encountered by the server." });
    }
};

export async function setter(req: Request, res: Response) {
    const { type } = req.params;

    if (!/^(infos|virus)$/i.test(type)) res.status(404).json({ message: "Not found" });
    const schema = type === 'infos' ? InfosSchema : VirusSchema;

    try {
        const newPost = new schema(req.body);
        await newPost.save();

        res.status(201).json({ message: "Content successfully added." });
    } catch (error) {
        res.status(500).json({ message: "An unknow error has been encountered by the server." });
    }
};
