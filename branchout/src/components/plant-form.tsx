"use client"

import React from "react"
import { useState } from "react"
import { Leaf, MapPin, CalendarIcon, Upload, Plus } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import Image from "next/image"

// Include MapComponent directly instead of importing it
const MapComponent = ({ onLocationSelect }: { onLocationSelect: (location: string) => void }) => {
  const [selectedMarker, setSelectedMarker] = useState<number | null>(null)

  // Sample map markers with coordinates and location names
  const markers = [
    { id: 1, x: 20, y: 30, location: "Riverfront" },
    { id: 2, x: 60, y: 40, location: "Brandywine Park" },
    { id: 3, x: 30, y: 70, location: "City Center" },
    { id: 4, x: 70, y: 20, location: "Mountain View" },
    { id: 5, x: 80, y: 60, location: "Lakeside" },
    { id: 6, x: 40, y: 50, location: "Forest Edge" },
  ]

  const handleMarkerClick = (id: number, location: string) => {
    setSelectedMarker(id)
    onLocationSelect(location)
  }

  return (
    <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-medium">Select Planting Location</h2>
      </div>

      <div className="relative h-[300px] w-full overflow-hidden rounded-md bg-gray-100">
        {/* Simple grid background */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        >
          {/* River or water feature */}
          <div
            className="absolute left-[10%] top-[40%] h-[10px] w-[80%] rounded-full bg-blue-200"
            style={{ transform: "rotate(-5deg)" }}
          ></div>
        </div>

        {/* Map markers */}
        {markers.map((marker) => (
          <button
            key={marker.id}
            type="button"
            className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
            style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
            onClick={() => handleMarkerClick(marker.id, marker.location)}
          >
            <div className={`flex flex-col items-center ${selectedMarker === marker.id ? "scale-110" : ""}`}>
              <MapPin
                className={`h-8 w-8 ${
                  selectedMarker === marker.id
                    ? "text-green-600 fill-green-200"
                    : "text-gray-500 group-hover:text-green-600 group-hover:fill-green-100"
                }`}
              />
              <span
                className={`mt-1 rounded-md bg-white px-2 py-1 text-xs font-medium shadow-sm ${
                  selectedMarker === marker.id ? "text-green-600" : "text-gray-700"
                }`}
              >
                {marker.location}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

// Include Button component directly
const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
    size?: "default" | "sm" | "lg" | "icon"
  }
>(({ className, variant = "default", size = "default", ...props }, ref) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        {
          "bg-primary text-primary-foreground hover:bg-primary/90": variant === "default",
          "bg-destructive text-destructive-foreground hover:bg-destructive/90": variant === "destructive",
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground": variant === "outline",
          "bg-secondary text-secondary-foreground hover:bg-secondary/80": variant === "secondary",
          "hover:bg-accent hover:text-accent-foreground": variant === "ghost",
          "text-primary underline-offset-4 hover:underline": variant === "link",
          "h-10 px-4 py-2": size === "default",
          "h-9 rounded-md px-3": size === "sm",
          "h-11 rounded-md px-8": size === "lg",
          "h-10 w-10 p-0": size === "icon",
        },
        className,
      )}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

// Include Input component directly
const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Input.displayName = "Input"

// Include Label component directly
const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
          className,
        )}
        {...props}
      />
    )
  },
)
Label.displayName = "Label"

// Include Select component directly - simplified version
const Select = ({ children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) => {
  return (
    <div className="relative">
      <select
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          props.className,
        )}
        {...props}
      >
        {children}
      </select>
      <div className="absolute right-3 top-3 pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 opacity-50"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </div>
  )
}

// Simplified Calendar component
const Calendar = ({
  selected,
  onSelect,
  className,
}: { selected?: Date; onSelect?: (date: Date | undefined) => void; className?: string }) => {
  const days = Array.from({ length: 31 }, (_, i) => i + 1)
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 5 + i)

  const [viewDate, setViewDate] = useState(selected || new Date())

  const handleDateClick = (day: number) => {
    const newDate = new Date(viewDate)
    newDate.setDate(day)
    onSelect?.(newDate)
  }

  return (
    <div className={cn("p-3 bg-white border rounded-md shadow-md", className)}>
      <div className="flex justify-between mb-2">
        <select
          value={viewDate.getMonth()}
          onChange={(e) => {
            const newDate = new Date(viewDate)
            newDate.setMonth(Number.parseInt(e.target.value))
            setViewDate(newDate)
          }}
          className="text-sm"
        >
          {months.map((month, i) => (
            <option key={month} value={i}>
              {month}
            </option>
          ))}
        </select>
        <select
          value={viewDate.getFullYear()}
          onChange={(e) => {
            const newDate = new Date(viewDate)
            newDate.setFullYear(Number.parseInt(e.target.value))
            setViewDate(newDate)
          }}
          className="text-sm"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
          <div key={day} className="text-center text-xs font-medium text-gray-500">
            {day}
          </div>
        ))}
        {Array.from({ length: new Date(viewDate.getFullYear(), viewDate.getMonth(), 1).getDay() }, (_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {days.slice(0, new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate()).map((day) => {
          const date = new Date(viewDate.getFullYear(), viewDate.getMonth(), day)
          const isSelected = selected && date.toDateString() === selected.toDateString()
          const isToday = date.toDateString() === new Date().toDateString()

          return (
            <button
              key={day}
              type="button"
              onClick={() => handleDateClick(day)}
              className={cn(
                "h-8 w-8 rounded-md text-sm flex items-center justify-center",
                isSelected ? "bg-primary text-primary-foreground" : "",
                isToday && !isSelected ? "bg-accent text-accent-foreground" : "",
                !isSelected && !isToday ? "hover:bg-accent hover:text-accent-foreground" : "",
              )}
            >
              {day}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// Simplified Popover components
const Popover = ({ children }: { children: React.ReactNode }) => {
  return <div className="relative inline-block w-full">{children}</div>
}

const PopoverTrigger = ({ children }: { children: React.ReactNode }) => {
  return children
}

const PopoverContent = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={cn("absolute z-50 w-auto", className)}>{children}</div>
}

const treeTypes = ["Oak", "Pine", "Cedar", "Maple", "Birch", "Spruce", "Redwood", "Willow", "Ash", "Elm"]

const locations = ["Riverfront", "Brandywine Park", "City Center", "Mountain View", "Lakeside", "Forest Edge"]

export default function PlantForm() {
  const router = useRouter()
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)
  const [selectedTreeType, setSelectedTreeType] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showCalendar, setShowCalendar] = useState(false)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Check file size (limit to 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError("File size exceeds 10MB limit")
        return
      }

      // Check file type
      if (!file.type.startsWith("image/")) {
        setError("Please select an image file")
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        setSelectedImage(reader.result as string)
        setError(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validate form
    if (!selectedTreeType) {
      setError("Please select a tree type")
      return
    }

    if (!selectedLocation) {
      setError("Please select a location")
      return
    }

    if (!date) {
      setError("Please select a planting date")
      return
    }

    if (!selectedImage) {
      setError("Please upload a tree image")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/trees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          treeType: selectedTreeType,
          location: selectedLocation,
          plantDate: date.toISOString(),
          photoUrl: selectedImage,
        }),
      })

      const data = await response.json()

      if (data.success) {
        // Reset form
        setSelectedTreeType(null)
        setSelectedLocation(null)
        setDate(new Date())
        setSelectedImage(null)

        // Redirect to a success page or the map
        router.push("/map")
      } else {
        throw new Error(data.message || "Something went wrong")
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError("An unexpected error occurred")
      }
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Plant a Tree</h1>
      </div>

      <MapComponent onLocationSelect={handleLocationSelect} />

      <div className="rounded-lg border border-gray-200 bg-white p-6 mt-6">
        {error && (
          <div className="mb-6 rounded-md bg-red-50 p-4 text-red-600">
            <p>{error}</p>
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Leaf className="h-5 w-5 text-green-600" />
                <Label htmlFor="tree-type" className="text-base font-medium">
                  Tree Type
                </Label>
              </div>
              <Select
                value={selectedTreeType || ""}
                onChange={(e) => setSelectedTreeType(e.target.value)}
                id="tree-type"
              >
                <option value="" disabled>
                  Select tree type
                </option>
                {treeTypes.map((type) => (
                  <option key={type} value={type.toLowerCase()}>
                    {type}
                  </option>
                ))}
              </Select>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-green-600" />
                <Label htmlFor="location" className="text-base font-medium">
                  Location
                </Label>
              </div>
              <Select
                value={selectedLocation || ""}
                onChange={(e) => setSelectedLocation(e.target.value)}
                id="location"
              >
                <option value="" disabled>
                  Select location
                </option>
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-green-600" />
              <Label htmlFor="date" className="text-base font-medium">
                Planting Date
              </Label>
            </div>
            <Popover>
              <PopoverTrigger>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-start rounded-md border-gray-300 text-left font-normal"
                  onClick={() => setShowCalendar(!showCalendar)}
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-green-600" />
                  {date ? format(date, "MMMM d, yyyy") : "Select date"}
                </Button>
              </PopoverTrigger>
              {showCalendar && (
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    selected={date}
                    onSelect={(newDate) => {
                      setDate(newDate)
                      setShowCalendar(false)
                    }}
                  />
                </PopoverContent>
              )}
            </Popover>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Upload className="h-5 w-5 text-green-600" />
              <Label htmlFor="image" className="text-base font-medium">
                Tree Image
              </Label>
            </div>
            <div
              className={cn(
                "relative flex cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-300 p-6 text-center transition-all hover:border-green-600/50",
                selectedImage && "border-0 p-0",
              )}
            >
              {selectedImage ? (
                <div className="relative h-48 w-full overflow-hidden rounded-md">
                  <Image
                     src={selectedImage || "/placeholder.svg"}
                    alt="Selected tree"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="absolute right-2 top-2 h-6 w-6 rounded-full bg-white"
                    onClick={() => setSelectedImage(null)}
                  >
                    ✕
                  </Button>
                </div>
              ) : (
                <>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-50">
                    <Upload className="h-6 w-6 text-green-600" />
                  </div>
                  <p className="mb-1 text-sm font-medium">Drag and drop or click to upload</p>
                  <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                </>
              )}
              <Input
                id="image"
                type="file"
                accept="image/*"
                className="absolute inset-0 cursor-pointer opacity-0"
                onChange={handleImageChange}
              />
            </div>
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              className="w-full rounded-full bg-green-600 py-6 text-base font-medium hover:bg-green-700 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                "Processing..."
              ) : (
                <>
                  <Plus className="mr-2 h-5 w-5" />
                  Plant Tree
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
