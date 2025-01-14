import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { forwardRef } from "react";

export default forwardRef<HTMLSelectElement, React.HTMLProps<HTMLSelectElement>> (function Select({className, ...props}, ref
 ) {
    return (
        <div className="relative">
            <select
                {...props}
                ref={ref}
                className={cn(
                    "h-10 w-full border rounded-md appearance-none py-2 text-sm pl-3 pr-8 truncate bg-background border-input ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
            />
            <ChevronDown className="absolute right-3 top-3 h-4 w-4 opacity-50" />
        </div>
    );
})
 