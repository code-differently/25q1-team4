import PlantForm from "@/components/plant-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function PlantPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Plant a Tree</CardTitle>
          <CardDescription>Fill out the form below to record your tree planting contribution.</CardDescription>
        </CardHeader>
        <CardContent>
          <PlantForm />
        </CardContent>
      </Card>
    </div>
  )
}
