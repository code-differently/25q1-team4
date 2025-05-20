"use client"

import { GiTreeBranch } from "react-icons/gi";
import Link from "next/link";
import { Leaf } from "lucide-react";
import { useState } from "react";
import PlantForm from "@/components/plant-form";

export default function PlantFormPage({ children }: { children: React.ReactNode }) {
    return (
        <PlantForm/>
    )
}