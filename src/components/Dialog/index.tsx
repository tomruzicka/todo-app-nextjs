"use client";

import { addNewTodo, getTodoById, updateTodoById } from "@/api";
import { LoadingSkeleton } from "@/components//LoadingSkeleton";
import { useDialog } from "@/components/Dialog/DialogProvider";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog as DialogCn,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TagInput } from "@/components/ui/tag-input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { formSchema } from "@/schemas";
import { TodoPriority, TodoStatus } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

export const Dialog = () => {
  const { todoId, open, edit, title, description, closeDialog, handleOnClick } =
    useDialog();
  const { toast } = useToast();
  const buttonLabel = edit ? "Save changes" : "Add";
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (edit) return onEditSubmit(values.id, values);

    try {
      const result = await addNewTodo(values);
      if (result) {
        form.reset();
        handleOnClick();
        toast({
          title: `Todo "${values.title}" was added!`,
        });
      }
    } catch (error) {
      if (error instanceof Error) toast({ title: error.message });
      else toast({ title: "An unknown error occurred" });
    }
  };

  const onEditSubmit = async (todoId: string, newTodo: any) => {
    try {
      const result = await updateTodoById(todoId, newTodo);
      if (result) {
        form.reset();
        handleOnClick();
        toast({
          title: `Todo "${newTodo.title}" was updated!`,
        });
      }
    } catch (error) {
      if (error instanceof Error) toast({ title: error.message });
      else toast({ title: "An unknown error occurred" });
    }
  };

  const getSelectedTodo = async (todoId: string) => {
    try {
      setIsLoading(true);
      const todo = await getTodoById(todoId);
      if (!todo) return;
      form.reset({
        id: todo.id,
        title: todo.title,
        description: todo.description,
        createdAt: todo.createdAt,
        due: new Date(todo.due),
        status: todo.status,
        priority: todo.priority,
        tags: todo.tags,
      });
    } catch (error) {
      if (error instanceof Error) toast({ title: error.message });
      else toast({ title: "An unknown error occurred" });
      closeDialog();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!edit || !todoId || !open) return;
    getSelectedTodo(todoId);
  }, [edit, todoId, open]);

  useEffect(() => {
    if (edit) return;
    form.reset({
      id: uuidv4(),
      title: "",
      description: "",
      createdAt: new Date().toString(),
      due: undefined,
      status: TodoStatus.Draft,
      priority: TodoPriority.Low,
      tags: [],
    });
  }, [edit]);

  return (
    <DialogCn open={open} onOpenChange={closeDialog}>
      <DialogContent className="overflow-y-auto h-full max-h-[860px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {!isLoading ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="inprogress">In Progress</SelectItem>
                        <SelectItem value="done">Done</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Write the title of the todo..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="due"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Due</FormLabel>
                    <FormControl>
                      <Popover modal>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Priority</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Empty" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <TagInput
                        tags={field.value!}
                        setTags={field.onChange}
                        placeholder="Add some tags"
                      />
                    </FormControl>
                    <FormDescription className="text-left">
                      Add tags by pressing "enter", "space" or ",".
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value.length <= 200) field.onChange(value);
                        }}
                        placeholder="Write the description of the todo..."
                      />
                    </FormControl>
                    <FormDescription className="text-right">
                      {field.value.length}/200
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">{buttonLabel}</Button>
              </DialogFooter>
            </form>
          </Form>
        ) : (
          <LoadingSkeleton />
        )}
      </DialogContent>
    </DialogCn>
  );
};
