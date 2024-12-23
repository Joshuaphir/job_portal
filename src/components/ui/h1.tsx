import { cn } from "@/lib/utils";
import { HTMLProps } from "react";

export default function H1(props: HTMLProps<HTMLHeadingElement>){
    return <h1
        {...props}
        className={cn(
            "text-4xl font-semibold tracking-tight lg:text-5xl", props.className
        )}
        />
}