import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.jpg"
import { Button } from "./ui/button";


export default function Navbar(){
    return <header className="shadow-sm">
        <nav className="flex max-w-5xl m-auto px-3 py-5 items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
                <Image
                src={logo}
                width={40}
                height={40}
                alt="smartInt"
                className=""
                />
                <span className="text-xl font-bold tracking-tight">SmartInt</span>
            </Link>
            <Button asChild>
                <Link href="/jobs/new">Create Job</Link>
            </Button> 
        </nav>
    </header>
}