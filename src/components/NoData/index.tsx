import { useDialog } from "@/components/Dialog/DialogProvider";
import { Button } from "@/components/ui/button";
import { Frown } from "lucide-react";

export const NoData = () => {
  const { openDialog } = useDialog();

  return (
    <div className="flex flex-col items-center gap-5">
      <Frown className="w-28 h-28" />
      <h1 className="text-[20px] text-center">You don't have any todos.</h1>
      <Button onClick={() => openDialog("add")}>Add Todo</Button>
    </div>
  );
};
