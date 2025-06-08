import type React from "react";
import Hide from "@/assets/hide.svg?react";
import Logo from "@/assets/icon.svg?react";
import Kanban from "@/assets/kanban.svg?react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

import BoardItems from "../BoardItems";

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  const { toggleSidebar } = useSidebar();

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      {/* Sidebar Header */}
      <div className="sm:h-20 px-7 py-8 flex gap-4 bg-white dark:bg-dark-grey">
        <Logo />
        <Kanban className="fill-[#000112] dark:fill-white" />
      </div>

      {/* Sidebar Content */}
      <SidebarContent className="p-0 bg-white dark:bg-dark-grey">
        <BoardItems />
      </SidebarContent>

      {/* Sidebar Footer */}
      <SidebarFooter className="p-0 pb-8 bg-white dark:bg-dark-grey pr-6 group">
        <button
          onClick={toggleSidebar}
          className=" flex items-center justify-start gap-2.5 px-6 py-4 rounded-tr-[100px] rounded-br-[100px] active:bg-main-purple/10 active:dark:bg-white"
        >
          <Hide className="fill-medium-grey group-active:fill-main-purple" />
          <h1 className="heading-m text-medium-grey active:text-main-purple">
            Hide Sidebar
          </h1>
        </button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
