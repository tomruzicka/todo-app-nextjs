"use client";

import { ReactNode, createContext, useContext, useState } from "react";

const DialogContext = createContext({
  open: false,
  edit: false,
  save: false,
  title: "",
  description: "",
  todoId: "",
  openDialog: (editMode: "add" | "edit", todoId?: string) => {},
  closeDialog: () => {},
  handleOnClick: () => {},
});

export const DialogProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [save, setSave] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todoId, setTodoId] = useState("");

  const openDialog = (editMode: "add" | "edit", todoId?: string) => {
    setSave(false);
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
  const handleOnClick = () => {
    setSave(true);
    setOpen(false);
  };

  return (
    <DialogContext.Provider
      value={{
        open,
        edit,
        save,
        title,
        description,
        todoId,
        openDialog,
        closeDialog,
        handleOnClick,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
};

export const useDialog = () => {
  return useContext(DialogContext);
};
