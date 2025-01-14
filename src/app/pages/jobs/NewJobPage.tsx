"use client"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import H1 from "@/components/ui/h1"
import { createJobSchema, CreateJobValues } from "@/lib/validation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import Select from "@/components/ui/select"
import { jobTypes, locationTypes } from "@/lib/job-types"
import Locationsearch from "@/components/ui/Locationsearch"
import { X } from "lucide-react"
import { Label } from "@/components/ui/label"
import ReachTextEditor from "@/components/ReachTextEditor"

export default function NewJobForm(){
    const form = useForm<CreateJobValues>({
        resolver: zodResolver(createJobSchema)
    }) 

    const {
        handleSubmit,
        watch,
        trigger,
        control,
        setValue,
        setFocus,
        formState: {isSubmitting},

    } = form

    async function onSubmit(values: CreateJobValues){
        alert(JSON.stringify(values, null, 2))
    }
    return <main className="max-w-3xl m-auto my-10 space-y-10">
        <div>
            <H1>Find your perfect Job</H1>
            <p>Get your Job post by thousands of job seekers</p>
        </div>
        <div className="space-y-6 border rounded-lg p-4">
            <div>
                <h2 className="font-semibold">Job details</h2>
                <p className="text-muted-foreground">
                    Please provide job details
                </p>
            </div>
            <Form {...form}>
                <form className="space-y-4" noValidate onSubmit={handleSubmit(onSubmit)}>
                    <FormField 
                        control={control}
                        name="title"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Job title</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g information technology" {...field}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField 
                        control={control}
                        name="type"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Job type</FormLabel>
                                <FormControl>
                                    <Select {...field} defaultValue="">
                                        <option value="" hidden>
                                            Select an option
                                        </option>
                                        {jobTypes.map(jobType =>(
                                            <option key={jobType} value={jobType}>
                                                {jobType}
                                            </option>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField 
                        control={control}
                        name="companyName"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Company</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g information technology" {...field}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField 
                        control={control}
                        name="companyLogoUrl"
                        render={({field : {value, ...fieldValues}}) => (
                            <FormItem>
                                <FormLabel>Company logo</FormLabel>
                                <FormControl>
                                    <Input {...fieldValues}
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0]
                                        fieldValues.onChange(file)
                                    }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField 
                        control={control}
                        name="locationType"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Location</FormLabel>
                                <FormControl>
                                    <Select {...field} defaultValue="">
                                        <option value="" hidden>
                                            Select an option
                                        </option>
                                        {locationTypes.map(locationType =>(
                                            <option key={locationType} value={locationType}>
                                                {locationType}
                                            </option>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField 
                        control={control}
                        name="location"
                        render={({field }) => (
                            <FormItem>
                                <FormLabel>Office Location</FormLabel>
                                <FormControl>
                                    <Locationsearch onLocationSelected={ field.onChange}
                                    ref={field.ref} />

                                </FormControl>
                                {watch("location") && (
                                    <div className="flex items-center gap-1">
                                        <button type="button"
                                        onClick={()=>{
                                            setValue("location", "" , {shouldValidate: true})
                                        }}
                                        >
                                            <X size={20} />
                                        </button>
                                        <span className="text-sm">{watch("location")}</span>
                                    </div>
                                )}
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="space-y-2">
                        <Label htmlFor="applicationemail">How to apply</Label>
                        <div className="flex justify-between">
                            <FormField 
                                control={control}
                                name="applicationEmail"
                                render={({field}) => (
                                    <FormItem className="grow">
                                        <FormLabel>Job title</FormLabel>
                                        <FormControl>
                                            <div className="flex items-center">
                                                <Input
                                                    id="applicationemail" 
                                                    type="email"
                                                    placeholder="Email" 
                                                    {...field}
                                                />
                                                <span className="mx-2"></span>
                                            </div>
                                            
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            /> 
                            <FormField 
                                control={control}
                                name="applicationURL"
                                render={({field}) => (
                                    <FormItem className="grow">
                                        <FormLabel>Job title</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="url"
                                                placeholder="Website link" 
                                                {...field}
                                                onChange={(e) => {
                                                    field.onChange(e)
                                                    trigger("applicationEmail")
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            /> 
                        </div>
                    </div>
                    <FormField 
                        control={control}
                        name="description"
                        render={({field}) => (
                            <FormItem>
                                <Label>Description</Label>
                                <FormControl>
                                    <ReachTextEditor />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </form>
            </Form>

        </div>

    </main>
}