import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer inline-flex shrink-0 items-center border border-transparent shadow-xs outline-none transition-all disabled:cursor-not-allowed disabled:opacity-50",
        "bg-main-purple rounded-[12px] h-[20px] w-[40px] active:bg-main-purple-hover",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block rounded-full ring-0 transition-transform",
          "bg-background size-[14px]", // Thumb size
          // Translation = track width (40px) - thumb size (14px) - 2px margin = 24px
          "data-[state=checked]:translate-x-[22px]",
          "data-[state=unchecked]:translate-x-[2px]",
          "dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground",
          "bg-white!"
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
