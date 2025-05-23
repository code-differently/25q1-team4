"use client"

import { useState } from "react"
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api"
import { MapPin, Star, Navigation } from "lucide-react"

// Delaware center coordinates
const delawareCenter = {
  lat: 39.1582,
  lng: -75.5244,
}

// Location data for Delaware planting sites
const locations = [
  {
    id: 1,
    name: "Riverfront Nature Reserve",
    location: "Wilmington, DE",
    coordinates: { lat: 39.7391, lng: -75.5353 },
    description:
      "A scenic riverside forest with paved walking paths and diverse native tree species along the Christina River.",
    trees: ["Oak", "Maple", "Sycamore"],
    rating: 4.7,
    distance: "1.2 miles",
    
  },
  {
    id: 2,
    name: "Brandywine Park",
    location: "Wilmington, DE",
    coordinates: { lat: 39.7618, lng: -75.5651 },
    description:
      "Historic park along Brandywine Creek with open meadows and wooded areas perfect for tree planting initiatives.",
    trees: ["Pine", "Birch", "Cherry"],
    rating: 4.9,
    distance: "2.5 miles",
    
  },
  {
    id: 3,
    name: "City Center Green Space",
    location: "Dover, DE",
    coordinates: { lat: 39.1582, lng: -75.5244 },
    description:
      "Urban green space in downtown Dover with opportunities for street tree planting and small garden development.",
    trees: ["Dogwood", "Redbud", "Serviceberry"],
    rating: 4.2,
    distance: "0.8 miles",
    
  },
  {
    id: 4,
    name: "Mountain View Preserve",
    location: "Newark, DE",
    coordinates: { lat: 39.6837, lng: -75.7497 },
    description:
      "Elevated conservation area with panoramic views and diverse ecological zones for native tree restoration.",
    trees: ["Oak", "Hickory", "Walnut"],
    rating: 4.5,
    distance: "3.7 miles",
    
  },
  {
    id: 5,
    name: "Lakeside Conservation Area",
    location: "Rehoboth Beach, DE",
    coordinates: { lat: 38.7168, lng: -75.0767 },
    description:
      "Wetland conservation area with lakefront access and opportunities for water-tolerant tree species planting.",
    trees: ["Willow", "River Birch", "Bald Cypress"],
    rating: 4.8,
    distance: "5.2 miles",
    
  },
  {
    id: 6,
    name: "Forest Edge Wildlife Refuge",
    location: "Smyrna, DE",
    coordinates: { lat: 39.3004, lng: -75.6041 },
    description:
      "Protected wildlife area with forest edge habitat that needs native tree species to expand forest coverage.",
    trees: ["Pine", "Oak", "Maple"],
    rating: 4.6,
    distance: "4.1 miles",
    
  },
  {
    id: 7,
    name: "Glasgow Park",
    location: "Newark, DE",
    coordinates: { lat: 39.6022, lng: -75.7437 },
    description:
      "Community park with open fields and recreational areas seeking tree coverage for shade and beautification.",
    trees: ["Maple", "Oak", "Elm"],
    rating: 4.4,
    distance: "2.8 miles",
  },
]

// Location card component
const LocationCard = ({
  name,
  location,
  description,
  trees,
  rating,
  distance,
  isSelected,
  onClick,
}: {
  name: string
  location: string
  description: string
  trees: string[]
  rating: number
  distance: string
  isSelected: boolean
  onClick: () => void
}) => (
  <div
    className={`rounded-lg border p-4 transition-all duration-200 cursor-pointer bg-white ${
      isSelected ? "border-green-500 shadow-md" : "border-gray-200 hover:border-green-300"
    }`}
    onClick={onClick}
  >
    <div className="flex flex-col h-full">
      <div className="relative h-40 mb-3 overflow-hidden rounded-md">
        <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 text-xs font-medium flex items-center">
          <Star className="w-3 h-3 text-yellow-500 mr-1 fill-yellow-500" />
          {rating}
        </div>
      </div>
      <h3 className="text-lg font-bold">{name}</h3>
      <div className="flex items-center text-gray-500 text-sm mb-2">
        <MapPin className="w-4 h-4 mr-1" />
        {location}
        <span className="mx-2">•</span>
        <Navigation className="w-4 h-4 mr-1" />
        {distance}
      </div>
      <p className="text-sm text-gray-600 mb-3 flex-grow">{description}</p>
      <div className="mt-auto">
        <p className="text-xs font-medium text-gray-500 mb-1">Available Tree Species:</p>
        <div className="flex flex-wrap gap-1">
          {trees.map((tree) => (
            <span key={tree} className="px-2 py-1 text-xs font-medium rounded-full bg-green-50 text-green-700">
              {tree}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
)

export default function MapPage() {
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null)
  const [activeInfoWindow, setActiveInfoWindow] = useState<number | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  const handleLocationSelect = (locationId: number) => {
    setSelectedLocation(locationId)
    setActiveInfoWindow(locationId)
  }

  const mapContainerStyle = {
    width: "100%",
    height: "calc(100vh - 200px)",
    minHeight: "500px",
  }

  // Custom marker icon creator function
  const createMarkerIcon = (isSelected: boolean) => {
    return {
      url:
        "data:image/svg+xml;charset=UTF-8," +
        encodeURIComponent(`
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="${
            isSelected ? "#16a34a" : "#4b5563"
          }" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        `),
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Delaware Tree Planting Locations</h1>
      <p className="text-gray-600 mb-8">
        Explore available locations across Delaware where you can plant trees. Click on a location to learn more and
        select your preferred planting site.
      </p>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Location cards - 55% width on desktop */}
        <div className="w-full lg:w-[55%] space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {locations.map((loc) => (
              <LocationCard
                key={loc.id}
                name={loc.name}
                location={loc.location}
                description={loc.description}
                trees={loc.trees}
                rating={loc.rating}
                distance={loc.distance}
                isSelected={selectedLocation === loc.id}
                onClick={() => handleLocationSelect(loc.id)}
              />
            ))}
          </div>
        </div>

        {/* Map - 40% width on desktop */}
        <div className="w-full lg:w-[40%] sticky top-24 h-fit rounded-lg overflow-hidden border border-gray-200">
          <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY || ""} onLoad={() => setIsLoaded(true)}>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={
                selectedLocation ? locations.find((loc) => loc.id === selectedLocation)?.coordinates : delawareCenter
              }
              zoom={selectedLocation ? 14 : 8}
              options={{
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: true,
                styles: [
                  {
                    featureType: "poi.park",
                    elementType: "geometry.fill",
                    stylers: [{ color: "#c8e6c9" }],
                  },
                  {
                    featureType: "water",
                    elementType: "geometry.fill",
                    stylers: [{ color: "#bbdefb" }],
                  },
                ],
              }}
            >
              {isLoaded &&
                locations.map((location) => (
                  <Marker
                    key={location.id}
                    position={location.coordinates}
                    onClick={() => setActiveInfoWindow(location.id)}
                    icon={createMarkerIcon(selectedLocation === location.id)}
                  />
                ))}

              {isLoaded && activeInfoWindow !== null && (
                <InfoWindow
                  position={locations.find((loc) => loc.id === activeInfoWindow)?.coordinates}
                  onCloseClick={() => setActiveInfoWindow(null)}
                >
                  <div className="p-2 max-w-[200px]">
                    <h3 className="font-bold text-sm">{locations.find((loc) => loc.id === activeInfoWindow)?.name}</h3>
                    <p className="text-xs text-gray-600">
                      {locations.find((loc) => loc.id === activeInfoWindow)?.location}
                    </p>
                    <button
                      className="mt-2 text-xs bg-green-600 text-white px-2 py-1 rounded-md w-full"
                      onClick={() => {
                        setSelectedLocation(activeInfoWindow)
                        setActiveInfoWindow(null)
                      }}
                    >
                      Select Location
                    </button>
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          </LoadScript>
        </div>
      </div>

      {selectedLocation && (
        <div className="mt-8 p-6 bg-green-50 rounded-lg border border-green-200">
          <h2 className="text-xl font-bold text-green-800 mb-4">
            Selected Location: {locations.find((loc) => loc.id === selectedLocation)?.name}
          </h2>
          <p className="text-green-700 mb-4">
            You have selected{" "}
            <span className="font-semibold">{locations.find((loc) => loc.id === selectedLocation)?.name}</span> as your
            tree planting location. This area is perfect for planting{" "}
            {locations.find((loc) => loc.id === selectedLocation)?.trees.join(", ")} trees.
          </p>
          <div className="flex gap-4">
            <button
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              onClick={() => {
                // In a real app, this would navigate to the plant form with the selected location
                window.location.href = `/plant-tree?location=${encodeURIComponent(
                  locations.find((loc) => loc.id === selectedLocation)?.name || "",
                )}`
              }}
            >
              Continue to Planting Form
            </button>
            <button
              className="px-4 py-2 border border-green-600 text-green-600 rounded-md hover:bg-green-50 transition-colors"
              onClick={() => setSelectedLocation(null)}
            >
              Change Location
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
