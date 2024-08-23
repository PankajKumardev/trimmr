import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    (<input
      type={type}
      className={cn(
        "flex h-10 w-full px-2 py-1 border rounded border-[#262626] text-slate-200 bg-[#08090A] focus:outline-none focus:border-[#4A4A4A] focus:ring-1 focus:ring-[#4A4A4A] transition duration-300 ease-in resize-none",
        className
      )}
      ref={ref}
      {...props} />)
  );
})
Input.displayName = "Input"

export { Input }
