import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {formatDistanceToNowStrict} from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function moneyFormater(amount:number){
  return Intl.NumberFormat("en-US", {
    style:"currency",
    currency: "USD",
  }).format(amount)
}


export function dateFormater(from:Date){
  return formatDistanceToNowStrict(from, {addSuffix:true})
}