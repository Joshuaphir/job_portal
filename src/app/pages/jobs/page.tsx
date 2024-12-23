import { Metadata } from "next";
import NewJobForm from "./NewJobPage";

export const metadata: Metadata = {
    title:"Create a job"
}

export default function Page(){
    return <NewJobForm />
}