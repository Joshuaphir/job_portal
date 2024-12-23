import { Job } from "@prisma/client";
import Image from "next/image";
import previewlogo from "@/assets/preview.jpg"
import companylogo from "@/assets/logo.jpg"
import {Banknote, Briefcase, Clock, Globe2, MapPin} from "lucide-react"
import { dateFormater, moneyFormater } from "@/lib/utils";
import Barge from "./Barge";

interface JobListItemProps{
    job:Job;
}

export default function JobListItem({ job : {
    title,
    companyName,
    type,
    locationType,
    location,
    salary,
    companyLogoUrl,
    createdAt
} }: JobListItemProps){

    return(
        <article className="flex gap-3 border rounded-lg p-5 hover:bg-muted/65">
            <Image
            src={previewlogo || companylogo}
            alt={`${companyName} logo`}
            width={100}
            height={100}
            className="rounded-lg self-center"
            />
            <div className="flex-grow space-y-3">
                <div>
                    <h2 className="text-xl font-medium">{title}</h2>
                    <p className="text-muted-foreground">{companyName}</p>
                </div>

                <div className="text-muted-foreground">
                    <p className="flex items-center gap-1.5 sm:hidden">
                        <Briefcase size={16} className="shrink-0"/>
                        {type}
                    </p>
                    <p className="flex items-center gap-1.5">
                        <MapPin size={16} className="shrink-0"/>
                        {locationType}
                    </p>
                    <p className="flex items-center gap-1.5">
                        <Globe2 size={16} className="shrink-0"/>
                        {location || "worldwide "}
                    </p>
                    <p className="flex items-center gap-1.5">
                        <Banknote size={16} className="shrink-0"/>
                        {moneyFormater(salary)}
                    </p>
                    <p className="flex items-center gap-1.5 sm:hidden">
                        <Clock size={16} className="shrink-0"/>
                        {dateFormater(createdAt)}
                    </p>
                    
                </div>

            </div>
            <div className="hidden sm:flex flex-col shrink-0 items-end justify-between">
                <Barge>{type}</Barge>
                <span className="flex items-center gap-1.5 text-muted-foreground">
                    <Clock size={16} />
                    {dateFormater(createdAt)}
                </span>
            </div>

        </article>
    )

}