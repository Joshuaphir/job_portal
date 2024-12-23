
import FilterSideBar from "@/components/FilterSideBar";
import Joblisting from "@/components/JobListing";
import H1 from "@/components/ui/h1";
import { jobFilterValues } from "@/lib/validation";
import { Metadata } from "next";

interface PageProps{
  searchParams: {
    query?: string,
    type?: string,
    location?: string,
    remote?: string,
  }
}

function getTitle({
  query,
  type,
  location,
  remote,
}: jobFilterValues){
  const pageTitle = query ? `${query} jobs`: type ? `${type} jobs`: remote? "Remote jobs" : "All jobs"
  const titlePager = location ? ` in ${location}`: ""
  return `${pageTitle}${titlePager}`
}

export function generateMetadata({
  searchParams:{
    query,type,location,remote
  }
}:PageProps):Metadata{
  return {
    title: `${getTitle(
      {
        query,
        type,
        location,
        remote: remote === "true",
      }
  )} || jobSite`
  }
}


export default async function Home({searchParams: {
  query,type,location,remote
}}:PageProps) {
  const filteredValues : jobFilterValues = {
    query,
    type,
    location,
    remote: remote === "true",
  }
  return (
    <main className="max-w-5xl m-auto px-3 my-10 space-y-10">
      <div className="space-y-5 text-center">
        <H1>
          {getTitle(filteredValues)}
        </H1>
        <p className="text-muted-foreground">Find your dream job</p>
      </div>
      <section className="flex flex-col md:flex-row">
        <FilterSideBar  defaultValues={filteredValues}/>
        <Joblisting  filterValues={filteredValues}/>
      </section>
      
    </main>
  );
}
