import {
  DropdownMenu as DropdownMenuCn,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ReactNode } from "react";

interface DropdownMenuItem<T> {
  label: string;
  value: T;
}

interface DropdownMenuProps<T> {
  triggerComponent: ReactNode;
  items: DropdownMenuItem<T>[];
  disabledCondition: (value: T) => boolean;
  onClickHandler: (value: T) => void;
}

export const DropdownMenu = <T,>({
  triggerComponent,
  items,
  disabledCondition,
  onClickHandler,
}: DropdownMenuProps<T>) => (
  <DropdownMenuCn>
    <DropdownMenuTrigger>{triggerComponent}</DropdownMenuTrigger>
    <DropdownMenuContent>
      {items.map((item, index) => (
        <DropdownMenuItem
          key={`${item.label}-${index}`}
          disabled={disabledCondition(item.value)}
          onClick={() => onClickHandler(item.value)}
        >
          {item.label}
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  </DropdownMenuCn>
);
