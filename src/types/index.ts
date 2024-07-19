export type Todo = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  due: Date;
  status: TodoStatus;
  priority: TodoPriority;
  tags: string[];
};
export enum TodoStatus {
  Draft = "draft",
  InProgress = "inprogress",
  Done = "done",
}
export enum TodoPriority {
  Low = "low",
  Medium = "medium",
  High = "high",
}
