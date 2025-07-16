import { NextFunction } from "express";

export class ChatController {
  static async process(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {
      next(error);
    }
  }
}
