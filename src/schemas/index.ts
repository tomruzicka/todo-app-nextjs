import { z } from "zod";

export const formSchema = z.object({
  id: z.string(),
  title: z.string().min(2, { message: "Please set title!" }).max(50),
  description: z.string().max(200),
  createdAt: z.string(),
  due: z.date(),
  status: z.enum(["draft", "inprogress", "done"]),
  priority: z.enum(["low", "medium", "high"]),
  tags: z.string().array(),
});
