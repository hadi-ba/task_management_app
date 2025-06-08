import { useIsTablet } from "@/hooks/shared/use-tablet";
import type { ReactNode } from "react";
import { SidebarProvider } from "../ui/sidebar";
import Header from "./header/Header";
import AppSidebar from "./sidebar/Sidebar";
import SidebarShowButton from "./sidebar/SidebarShowButton";

const Layout = (props: { children: ReactNode }) => {
  const isTablet = useIsTablet();

  return (
    <SidebarProvider
      defaultOpen={true}
      style={
        {
          "--sidebar-width": isTablet ? "261px" : "300px",
        } as React.CSSProperties
      }
    >
      <div className="flex flex-1 overflow-hidden">
        <AppSidebar />

        <div className="h-full w-px bg-lines-light dark:bg-lines-dark"></div>

        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />

          {/* Content */}
          <div className="flex-1 bg-light-grey dark:bg-very-dark-grey overflow-auto">
            {props.children}
          </div>
        </div>
      </div>
      <SidebarShowButton />
    </SidebarProvider>
  );
};

export default Layout;
