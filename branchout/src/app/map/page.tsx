"use client"
import Link from "next/link"
import Map from "@/src/components/map" 
import type { Reservation } from "@/src/lib/types"
// import { fixLeafletIcon } from "../lib/leaflet-icon-fix"
// Ensure the file exists at the specified path or update the path to the correct location.

export default function MapPage({children} : {children: React.ReactNode}) {
    return (
        <Map/>
    )
}