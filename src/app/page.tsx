"use client";

import { deleteTodoById, getAllTodos } from "@/api";
import { useDialog } from "@/components/Dialog/DialogProvider";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { Todo, TodoStatus } from "@/types";
import { Edit, EllipsisVertical, Trash2 } from "lucide-react";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";

const Home = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { openDialog, save } = useDialog();
  const { toast } = useToast();

  const getTodos = async () => {
    try {
      setIsLoading(true);
      const todos = await getAllTodos();
      if (todos) setTodos(todos);

      //   const date = new Date();
      //   const startOfDate = new Date(
      //     date.getFullYear(),
      //     date.getMonth(),
      //     date.getDate()
      //   );
      //   const endOfDate = new Date(
      //     startOfDate.getTime() + 24 * 60 * 60 * 1000 - 1
      //   );

      //   const todayTodos = todos.filter(
      //     (todo) =>
      //       new Date(todo.due) >= startOfDate && new Date(todo.due) <= endOfDate
      //   );

      //   console.log(todayTodos);
    } catch (error) {
      setError("Failed to load todos");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTodo = async (todoId: string) => {
    try {
      const todo = await deleteTodoById(todoId);
      if (todo)
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
      toast({ title: `Todo "${todo.title}" was removed!` });
    } catch (error) {
      toast({ title: "Somethin went wrong!" });
    }
  };
  const statusLabels: { [key in TodoStatus]: string } = {
    [TodoStatus.Draft]: "Draft",
    [TodoStatus.InProgress]: "In Progress",
    [TodoStatus.Done]: "Done",
  };

  const getStatusLabel = (status: TodoStatus) => statusLabels[status];

  const capitalizeFirstLetter = (string: string) => {
    return string[0].toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    getTodos();
  }, [save]);

  return (
    <div className="flex-1 p-10 h-screen overflow-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-semibold">Today</h1>
        <span>{DateTime.fromJSDate(new Date()).toFormat("dd.MM. yyyy")}</span>
      </div>
      <div className="flex flex-col gap-5">
        {!isLoading ? (
          todos.map((todo, index) => (
            <Card key={`${todo.id}-${index}`}>
              <CardHeader>
                <CardTitle className="mb-4 flex">
                  <div className="flex-1">{todo.title}</div>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <EllipsisVertical />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={() => openDialog("edit", todo.id)}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        <span>Edit</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => deleteTodo(todo.id)}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardTitle>
                <CardDescription className="flex flex-col gap-2">
                  <Badge variant={todo.status} className="w-fit">
                    {getStatusLabel(todo.status)}
                  </Badge>
                  <Badge variant={todo.priority} className="w-min">
                    {capitalizeFirstLetter(todo.priority)}
                  </Badge>
                </CardDescription>
              </CardHeader>
              {todo.description && (
                <CardContent>{todo.description}</CardContent>
              )}
              <CardFooter className="flex flex-col items-start gap-2">
                <div>
                  {DateTime.fromJSDate(new Date(todo.due)).toFormat(
                    "dd.MM. yyyy"
                  )}
                </div>
                <div className="flex flex-wrap gap-1">
                  {todo.tags.map((tag, tagIndex) => (
                    <Badge key={`${tag}-${tagIndex}`} variant={"secondary"}>
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardFooter>
            </Card>
          ))
        ) : (
          <LoadingSkeleton />
        )}
      </div>
    </div>
  );
};

export default Home;
