import * as React from "react"
import { cn } from "@/lib/utils"
import { useState } from "react"

// Importing eye icons
import { FiEye, FiEyeOff } from "react-icons/fi"

interface InputProps extends React.ComponentProps<"input"> {
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
}

function Input({ className, type, startIcon, endIcon, ...props }: InputProps) {
  // Manage visibility state for password field
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  // Toggle visibility function for password
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev)
  }

  // Only show the eye icon for password type input
  const isPasswordField = type === "password"

  return (
    <div className="relative w-full flex items-center">
      {startIcon && (
        <span className="absolute left-3 flex items-center text-muted-foreground">
          {startIcon}
        </span>
      )}
      <input
        type={isPasswordField && !isPasswordVisible ? "password" : "text"} // Toggle input type based on state
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-11 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[0px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          startIcon ? "pl-10" : "",
          endIcon ? "pr-10" : "",
          className
        )}
        {...props}
      />
      {isPasswordField && (
        <span
          className="absolute right-3 flex items-center text-muted-foreground cursor-pointer"
          onClick={togglePasswordVisibility} // Toggle password visibility on click
        >
          {isPasswordVisible ? <FiEyeOff /> : <FiEye />}
        </span>
      )}
    </div>
  )
}

export { Input }
