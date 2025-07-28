import { ChatController } from "../../controllers/chatController";
import { validate } from "../../middleware/validate";
import { ChatSchema } from "../../models/Chats";
import { Router } from "express";

const router = Router();

router.post("/message", validate(ChatSchema), ChatController.process);

export default router;
