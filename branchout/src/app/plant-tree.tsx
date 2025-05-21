"use client"

import PlantForm from "@/components/plant-form"

export default function PlantTreePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Plant a Tree</h1>
      <PlantForm />
    </div>
  )
}