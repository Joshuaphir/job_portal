interface BargeProps{
    children : React.ReactNode;
}

export default function Barge({children}:BargeProps){
    return <span className="border rounded-sm px-2 py-0.5 bg-muted text-muted-foreground text-sm font-medium">
        {children}
    </span>

}