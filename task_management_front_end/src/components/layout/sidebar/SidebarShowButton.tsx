import { useSidebar } from "@/components/ui/sidebar";

import Show from "@/assets/show.svg?react";

const SidebarShowButton = () => {
  const { open, toggleSidebar } = useSidebar();

  if (open) return null;

  return (
    <button
      title="Show"
      onClick={toggleSidebar}
      className="fixed bottom-8 z-50 bg-main-purple active:bg-main-purple-hover h-12 w-14 rounded-tr-[100px] rounded-br-[100px] flex items-center justify-center"
    >
      <Show />
    </button>
  );
};

export default SidebarShowButton;
