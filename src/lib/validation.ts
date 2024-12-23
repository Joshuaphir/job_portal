
import {  z } from "zod";
import { jobTypes, locationTypes } from "./job-types";

const requiredString = z.string().min(1, "Required")
//const numericRequired = requiredString.regex(/^\d+$/)
const numericalString = z
  .string()
  .regex(/^\d+$/, "Must be a number")
  .max(9, "Number cannot be more than 9 digits")
  .optional();

const companyLogoSchema = z.custom<File|undefined>()
.refine(
    file => {
        return !file || (file instanceof File && file.type.startsWith("image/"))
    }, 
    "Must be an image file"
)
.refine(
    file => {
        return !file || file.size < 1024*1024*2
    },
    "file must be less than 2MB"
)

const applicationSchema = z.object({
    applicationEmail: z.string().max(100).email().optional().or(z.literal("")),
    applicationURL : z.string().max(100).url().optional().or(z.literal(""))
})
.refine(data => data.applicationEmail || data.applicationURL, {
    message: "Email or Url is Required",
    path : ["applicationEmail"]
})

const locationSchema = z.object({
    locationType: requiredString.refine(
        value => locationTypes.includes(value),
        "invalid location type"
    ),
    location : z.string().max(100).optional()
}).refine(
    data => !data.locationType || data.locationType === "Remote" || data.location,
    {
        message: "location is required for onsite job",
        path: ["location"]
    }
)

export const createJobSchema = z.object({
    title: requiredString.max(100),
    type: requiredString.refine(
        value => jobTypes.includes(value),
        "invalid job type"
    ),
    companyName: requiredString.max(100),
    companyLogoUrl: companyLogoSchema,
    description: z.string().max(5000).optional(),
    salary: numericalString,
})
.and(applicationSchema)
.and(locationSchema)

export type CreateJobValues = z.infer<typeof createJobSchema>

export const jobFilterSchema = z.object({
    query: z.string().optional(),
    type: z.string().optional(),
    location: z.string().optional(),
    remote: z.coerce.boolean().optional(),
});

export type jobFilterValues = z.infer<typeof jobFilterSchema>;
