"use client"

import { useState } from "react"
import { MapPin } from "lucide-react"

interface MapComponentProps {
  onLocationSelect: (location: string) => void
}

export default function MapComponent({ onLocationSelect }: MapComponentProps) {
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
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 group`}
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
