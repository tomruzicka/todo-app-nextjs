"use client";

import { deleteTodoById, getAllTodos, updateTodoProperty } from "@/api";
import { useDialog } from "@/components/Dialog/DialogProvider";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { NoData } from "@/components/NoData";
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
import { Todo, TodoPriority, TodoStatus } from "@/types";
import { Edit, EllipsisVertical, Trash2 } from "lucide-react";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";

const TodosPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [statusFilter, setStatusFilter] = useState<TodoStatus | "all">("all");
  const { openDialog, save } = useDialog();
  const { toast } = useToast();

  const getTodos = async () => {
    try {
      setIsLoading(true);
      const todos = await getAllTodos();
      if (todos) setTodos(todos);
    } catch (error) {
      toast({ title: "Something went wrong!" });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTodo = async (todoId: string) => {
    try {
      const todo = await deleteTodoById(todoId);
      if (todo) {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
        toast({ title: `Todo "${todo.title}" was removed!` });
      }
    } catch (error) {
      toast({ title: "Something went wrong!" });
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

  const changeTodoStatus = async (todoId: string, status: TodoStatus) => {
    try {
      const result = await updateTodoProperty(todoId, { status });
      if (result) {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === todoId ? { ...todo, status } : todo
          )
        );
        toast({ title: "Status was updated!" });
      }
    } catch (error) {
      toast({ title: "Something went wrong!" });
    }
  };

  const changeTodoPriority = async (todoId: string, priority: TodoPriority) => {
    try {
      const result = await updateTodoProperty(todoId, { priority });
      if (result) {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === todoId ? { ...todo, priority } : todo
          )
        );
        toast({ title: "Priority was updated!" });
      }
    } catch (error) {
      toast({ title: "Something went wrong!" });
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  useEffect(() => {
    if (!save) return;
    getTodos();
  }, [save]);

  useEffect(() => {
    if (statusFilter === "all") return setFilteredTodos(todos);
    const filteredTodos = todos.filter((todo) => todo.status === statusFilter);
    setFilteredTodos(filteredTodos);
  }, [statusFilter, todos]);

  return (
    <div className="flex-1 p-6  h-screen overflow-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-semibold mb-5">My Todos</h1>
        <div className="flex items-center gap-3">
          <p>Filter status: </p>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Badge
                variant={statusFilter !== "all" ? statusFilter : "default"}
                className="w-fit"
              >
                {statusFilter !== "all" ? getStatusLabel(statusFilter) : "All"}
              </Badge>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                disabled={statusFilter === "all"}
                onClick={() => setStatusFilter("all")}
              >
                All
              </DropdownMenuItem>
              <DropdownMenuItem
                disabled={statusFilter === TodoStatus.Draft}
                onClick={() => setStatusFilter(TodoStatus.Draft)}
              >
                Draft
              </DropdownMenuItem>
              <DropdownMenuItem
                disabled={statusFilter === TodoStatus.InProgress}
                onClick={() => setStatusFilter(TodoStatus.InProgress)}
              >
                In Progress
              </DropdownMenuItem>
              <DropdownMenuItem
                disabled={statusFilter === TodoStatus.Done}
                onClick={() => setStatusFilter(TodoStatus.Done)}
              >
                Done
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        {!isLoading && filteredTodos ? (
          filteredTodos.length > 0 ? (
            filteredTodos.map((todo, index) => (
              <Card key={`${todo.id}-${index}`}>
                <CardHeader>
                  <CardTitle className="mb-2 flex">
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
                  <CardDescription className="flex gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Badge variant={todo.status} className="w-fit">
                          {getStatusLabel(todo.status)}
                        </Badge>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          disabled={todo.status === TodoStatus.Draft}
                          onClick={() =>
                            changeTodoStatus(todo.id, TodoStatus.Draft)
                          }
                        >
                          Draft
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          disabled={todo.status === TodoStatus.InProgress}
                          onClick={() =>
                            changeTodoStatus(todo.id, TodoStatus.InProgress)
                          }
                        >
                          In Progress
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          disabled={todo.status === TodoStatus.Done}
                          onClick={() =>
                            changeTodoStatus(todo.id, TodoStatus.Done)
                          }
                        >
                          Done
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Badge variant={todo.priority} className="w-min">
                          {capitalizeFirstLetter(todo.priority)}
                        </Badge>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          disabled={todo.priority === TodoPriority.Low}
                          onClick={() =>
                            changeTodoPriority(todo.id, TodoPriority.Low)
                          }
                        >
                          Low
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          disabled={todo.priority === TodoPriority.Medium}
                          onClick={() =>
                            changeTodoPriority(todo.id, TodoPriority.Medium)
                          }
                        >
                          Medium
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          disabled={todo.priority === TodoPriority.High}
                          onClick={() =>
                            changeTodoPriority(todo.id, TodoPriority.High)
                          }
                        >
                          High
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
            <NoData />
          )
        ) : (
          <LoadingSkeleton />
        )}
      </div>
    </div>
  );
};

export default TodosPage;
