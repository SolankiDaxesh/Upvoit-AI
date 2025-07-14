import { Request, Response } from "express";

export const getHelloWorld = (req: Request, res: Response) => {
  res.json({ message: "Hello World!" });
};

export const getHello = (req: Request, res: Response) => {
  res.json({
    message: "Hello from Node.js TypeScript API!",
    timestamp: new Date().toISOString(),
  });
};

export const getHelloByName = (req: Request, res: Response) => {
  const { name } = req.params;
  res.json({
    message: `Hello, ${name}!`,
    name: name,
    timestamp: new Date().toISOString(),
  });
};
