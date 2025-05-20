"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Loader2, Upload } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "@/components/ui/use-toast"

export default function PlantForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    plantLocation: "",
    treeType: "",
    notes: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image under 5MB",
        variant: "destructive",
      })
      return
    }

    // Check file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file",
        variant: "destructive",
      })
      return
    }

    // Create a preview
    const reader = new FileReader()
    reader.onload = (event) => {
      setPhotoPreview(event.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.plantLocation || !date || !photoPreview) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields and upload a photo.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // In a real application, you would upload the image to a storage service
      // and then save the URL along with the form data

      const response = await fetch("/api/trees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          plantDate: date?.toISOString(),
          photoUrl: photoPreview, // In a real app, this would be the URL from your storage service
        }),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Success!",
          description: "Your tree planting has been recorded.",
        })

        // Reset form
        setFormData({
          plantLocation: "",
          treeType: "",
          notes: "",
        })
        setDate(new Date())
        setPhotoPreview(null)

        // Redirect to a success page or the map
        router.push("/map")
      } else {
        throw new Error(data.message || "Something went wrong")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to record your tree planting. Please try again.",
        variant: "destructive",
      })
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="plantLocation">Where was the tree planted? *</Label>
        <Input
          id="plantLocation"
          name="plantLocation"
          placeholder="e.g., City Park, North Section"
          value={formData.plantLocation}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="plantDate">Date you planted the tree *</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Select a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <Label htmlFor="photo">Upload a photo of your tree *</Label>
        <div className="grid gap-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors">
            <Input id="photo" type="file" accept="image/*" className="hidden" onChange={handleFileChange} required />
            <Label htmlFor="photo" className="cursor-pointer flex flex-col items-center justify-center gap-2">
              <Upload className="h-8 w-8 text-gray-400" />
              <span className="text-sm text-gray-500">Click to upload a photo</span>
              <span className="text-xs text-gray-400">(Max size: 5MB)</span>
            </Label>
          </div>

          {photoPreview && (
            <div className="relative aspect-video rounded-lg overflow-hidden border">
              <img
                src={photoPreview || "/placeholder.svg"}
                alt="Tree photo preview"
                className="object-cover w-full h-full"
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
                onClick={() => setPhotoPreview(null)}
              >
                Remove
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="treeType">Type of tree (optional)</Label>
        <Input
          id="treeType"
          name="treeType"
          placeholder="e.g., Oak, Pine, Maple"
          value={formData.treeType}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Additional notes (optional)</Label>
        <Textarea
          id="notes"
          name="notes"
          placeholder="Any additional information about the tree planting"
          value={formData.notes}
          onChange={handleChange}
          rows={3}
        />
      </div>

      <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          "Submit Tree Planting"
        )}
      </Button>
    </form>
  )
}
