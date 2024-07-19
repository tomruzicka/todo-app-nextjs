"use client";

import { ReactNode, createContext, useContext, useState } from "react";

const DialogContext = createContext({
  open: false,
  edit: false,
  title: "",
  description: "",
  todoId: "",
  openDialog: (editMode: "add" | "edit", todoId?: string) => {},
  closeDialog: () => {},
});

export const DialogProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todoId, setTodoId] = useState("");

  const openDialog = (editMode: "add" | "edit", todoId?: string) => {
    if (editMode === "edit" && todoId) {
      setEdit(true);
      setTodoId(todoId);
      setTitle("Edit Todo");
      setDescription("You can change your Todo.");
    } else {
      setEdit(false);
      setTitle("Add new Todo");
      setDescription("Fill in the details of the new Todo.");
    }
    setOpen(true);
  };
  const closeDialog = () => setOpen(false);

  return (
    <DialogContext.Provider
      value={{
        open,
        edit,
        title,
        description,
        todoId,
        openDialog,
        closeDialog,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
};

export const useDialog = () => {
  return useContext(DialogContext);
};
