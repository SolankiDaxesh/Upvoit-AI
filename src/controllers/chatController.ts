import { model } from '../utils/ai_model';
import { createReactAgent } from '@langchain/langgraph/prebuilt';
import { common_rule } from '../constants/common-rule';
import { ChatSchema } from '../models/Chats';
import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import * as T from '../tools';

const agentTools = [T.InvoiceTool]; //

export class ChatController {
  static async process(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedData = ChatSchema.parse(req.body);
      const { messages } = validatedData;
      // Create agent per request with dynamic prompt
      const app = createReactAgent({
        llm: model,
        tools: agentTools,
        prompt: common_rule({}),
      });

      const result = await app.invoke(
        {
          messages: messages,
        },
        { configurable: { thread_id: Math.random(), recursionLimit: 3 } },
      );

      res.status(200).json({ content: result.messages.at(-1)?.content });
    } catch (error) {
      next(error);
    }
  }
}
