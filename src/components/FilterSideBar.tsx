import prisma from "@/lib/prisma";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import Select from "./ui/select";
import { jobTypes } from "@/lib/job-types";
import { jobFilterSchema, jobFilterValues } from "@/lib/validation";
import { redirect } from "next/navigation";
import SubmitButtonLoader from "./SubmitLoadingButton";

async function filterJobs(formData: FormData){
    "use server"
    // turn form values to a javascript object
    const values = Object.fromEntries(formData.entries())
    const {query, type, location, remote} = jobFilterSchema.parse(values)
    const searchParam = new URLSearchParams({
        ...(query && {query: query.trim()}),
        ...(type && {type}),
        ...(location && {location}),
        ...(remote && {remote: "true"}),
    })
    redirect(`/?${searchParam.toString()}`)
}

interface JobFilterSidebarProps{
    defaultValues: jobFilterValues
}

export default async function FilterSideBar({defaultValues}:JobFilterSidebarProps){
    const uniquelocations = (await prisma.job.findMany({
        where: {approved:true},
        select: {location:true},
        distinct:["location"]
    }).then(locations => locations.map(({location}) => location).filter(Boolean),)) as string[]
    return <aside className="md:w-[250px] sticky p-4 top-0 bg-background border rounded-lg h-fit">
        <form action={filterJobs} key={JSON.stringify(defaultValues)}>
            <div className="space-y-4">
                <div className="flex flex-col gap-2">
                    <Label htmlFor="query">Search</Label>
                    <Input id="query" name="query" placeholder="Title , Company etc" 
                    defaultValue={defaultValues.query} />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="type">Type</Label>
                    <Select id="type" name="type" defaultValue={defaultValues.type || ""}>
                        <option value="">All Types</option>
                        {jobTypes.map(type => (
                            <option key={type} value={type}>
                                {type}
                            </option>                        
                        ))}
                    </Select>
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="location">Location</Label>
                    <Select id="location" name="location" defaultValue={defaultValues.location || ""}>
                        <option value="">All Locations</option>
                        {uniquelocations.map(location => (
                            <option key={location} value={location}>
                                {location}
                            </option>                        
                        ))}
                    </Select>
                </div>
                <div className="flex items-center space-x-2">
                    <Input 
                        id="remote"
                        name="remote"
                        type="checkbox"
                        className="h-4 w-4" 
                        defaultChecked={defaultValues.remote}
                    />
                    <Label htmlFor="remote" className="text-sm font-medium">
                        Remote jobs
                    </Label>
                </div>


                <SubmitButtonLoader className="w-full">Filter jobs</SubmitButtonLoader>
            </div>

        </form>
    </aside>
}