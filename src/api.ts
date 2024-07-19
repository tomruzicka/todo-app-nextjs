export const getAllTodos = async (): Promise<Todo[] | null> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos`);
    if (response.ok) return response.json();
    return null;
  } catch (error) {
    return null;
  }
};

export const getTodoById = async (todoId: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/todos/${todoId}`
    );
    return response.json();
  } catch (error) {
    return error;
  }
};

export const addNewTodo = async (newTodo: Todo) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newTodo),
    });
    if (response.ok) return response;
  } catch (error) {
    return error;
  }
};

export const deleteTodoById = async (todoId: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/todos/${todoId}`,
      { method: "DELETE" }
    );
    if (response.ok) return response.json();
  } catch (error) {
    return error;
  }
};

interface Todo {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  due: Date;
  status: "draft" | "inprogress" | "done";
  priority: "low" | "medium" | "high";
  tags: string[];
}
