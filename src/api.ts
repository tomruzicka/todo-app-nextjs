import { Todo } from "@/types";

export const getAllTodos = async (): Promise<Todo[] | null> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos`);
    if (response.ok) return response.json();
    throw new Error();
  } catch (error) {
    throw new Error();
  }
};

export const getTodoById = async (todoId: string): Promise<Todo | null> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/todos/${todoId}`
    );
    if (response.ok) return response.json();
    throw new Error();
  } catch (error) {
    throw new Error();
  }
};

export const addNewTodo = async (newTodo: Todo): Promise<Todo | null> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newTodo),
    });
    if (response.ok) return response.json();
    throw new Error();
  } catch (error) {
    throw new Error();
  }
};

export const deleteTodoById = async (todoId: string): Promise<Todo | null> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/todos/${todoId}`,
      { method: "DELETE" }
    );
    if (response.ok) return response.json();
    throw new Error();
  } catch (error) {
    throw new Error();
  }
};

export const updateTodoById = async (
  todoId: string,
  newTodo: Todo
): Promise<Todo | null> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/todos/${todoId}`,
      {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(newTodo),
      }
    );
    if (response.ok) return response.json();
    throw new Error();
  } catch (error) {
    throw new Error();
  }
};

export const updateTodoProperty = async (
  todoId: string,
  updates: Partial<Omit<Todo, "id" | "createdAt">>
): Promise<Todo | null> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/todos/${todoId}`,
      {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(updates),
      }
    );
    if (response.ok) return response.json();
    throw new Error();
  } catch (error) {
    throw new Error();
  }
};
