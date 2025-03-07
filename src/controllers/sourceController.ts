import { Request, Response } from "express";
import { saveSource } from "../services/sourceService";

export const createSource = async (req: Request, res: Response) => {
    try {
        const { userId, type, content } = req.body;
        const source = await saveSource({ userId, type, content });
        res.status(201).json(source);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
