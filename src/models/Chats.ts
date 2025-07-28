import { z } from "zod";

const messageSchema = z.object({
  content: z.string().min(1, "Message content is required").max(1500),
  role: z.enum(["user", "assistant"], {
    errorMap: () => ({ message: "Role must be either user or assistant" }),
  }),
});

export const ChatSchema = z.object({
  messages: z.array(messageSchema).min(1).max(3),
  //   clientId: z.number().min(1, "Client ID is required"),
  //   clientCompanyId: z.number().min(1, "Client company ID is required"),
});

export type ChatInput = z.infer<typeof ChatSchema>;

export interface Chart<T> {
  type: string;
  data: T[];
}

export interface RenderResponse<T> {
  content: string;
  chart: Chart<T> | null;
}
