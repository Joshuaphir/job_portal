import JobListItem from "@/components/JobListItem";
import prisma from "@/lib/prisma";
import { jobFilterValues } from "@/lib/validation";
import { Prisma } from "@prisma/client";

interface JobResultsProps{
    filterValues: jobFilterValues
}

export default async function Joblisting({
    filterValues: {query,type,location,remote}
}:JobResultsProps){

    const searchQuery = query?.split(" ").filter(word => word.length > 0).join(" & ")
    const searchFilter : Prisma.JobWhereInput = searchQuery?
    {
        OR: [
            {title:{search: searchQuery}},
            {companyName:{search: searchQuery}},
            {type:{search: searchQuery}},
            {locationType:{search: searchQuery}},
            {location:{search: searchQuery}},
        ]
    }
    :{};
    const where: Prisma.JobWhereInput = {
        AND: [
             searchFilter,
             type ? {type} : {},
             location ? {location} : {},
             remote ? {locationType: "Remote"}:{},
             {approved: true}

        ]
    }
    const jobs = await prisma.job.findMany({
        where,
        orderBy: { createdAt: "desc"}
    })


    return (
        <div className="grow mx-2 space-y-4">
            {jobs.map(job => (
            <JobListItem job={job} key={job.id} />
            ))}
            {jobs.length === 0 && (
                <p className="text-center m-auto">
                    No results found. 
                </p>
            )}
        </div>
    );
}