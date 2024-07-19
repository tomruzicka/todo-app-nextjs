import { TodoPriority, TodoStatus } from "@/types";
import { z } from "zod";

export const formSchema = z.object({
  id: z.string(),
  title: z.string().min(2, { message: "Please set the title!" }).max(20),
  description: z.string().max(200),
  createdAt: z.string(),
  due: z.date({ message: "Please set the due date!" }),
  status: z.nativeEnum(TodoStatus),
  priority: z.nativeEnum(TodoPriority),
  tags: z.string().array(),
});
