import * as React from "react";

import { cn } from "@/lib/utils";

function Input({
  className,
  type,
  error,
  ...props
}: React.ComponentProps<"input"> & { error?: string }) {
  return (
    <div className="w-full relative">
      <input
        type={type}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-medium-grey selection:text-primary-foreground border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "border border-[rgba(130,143,163,0.25)] body-l text-black placeholder:opacity-25 px-4 py-2 placeholder:heading-l",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          "focus-visible:border-main-purple dark:text-white",
          Boolean(error?.length) ? "border-red" : "",
          className
        )}
        {...props}
      />
      {error && (
        <p className="body-l text-red absolute top-2 right-4">{error}</p>
      )}
    </div>
  );
}

export { Input };
