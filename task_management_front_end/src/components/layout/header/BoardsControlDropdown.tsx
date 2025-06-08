import { useState } from "react";
import DownArrow from "@/assets/downArrow.svg?react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import BoardItems from "@/components/layout/BoardItems";
import { useActiveBoard } from "@/providers/BoardProvider";

const BoardsControlDropdown = () => {
  const [open, setOpen] = useState(false);

  const { activeBoard } = useActiveBoard();

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-2 relative z-50">
          <h1 className="heading-l">{activeBoard?.name ?? "Boards List"}</h1>
          <DownArrow />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={cn(
          "w-[264px] p-0 rounded-[8px] z-50",
          "shadow-[0_0_0_100vmax_rgba(0,0,0,0.4)]"
        )}
        align="start"
        sideOffset={42}
      >
        <BoardItems onSelectItem={() => setOpen(false)} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default BoardsControlDropdown;
