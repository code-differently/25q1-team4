import { Plus, Minus, TreesIcon as Tree } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

export default function TreeFinder() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <main className="flex flex-1 overflow-hidden">
        <div className="w-full md:w-[400px] overflow-y-auto border-r">
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Tree className="h-5 w-5 text-green-600" />
              <h2 className="text-xl font-bold">Tree Reservations in Delaware</h2>
            </div>
            <p className="text-gray-600 mb-4">Found 7 locations</p>

            <div className="space-y-4">
              <LocationCard
                name="Riverfront Nature Reserve"
                location="Wilmington, DE"
                description="A scenic riverside forest with paved walking paths and diverse native tree species along the Christina River."
                trees={["Oak", "Maple", "Sycamore"]}
                rating={4.7}
                distance="1.2 miles"
              />

              <LocationCard
                name="Brandywine Park Arboretum"
                location="Wilmington, DE"
                description="Historic park featuring centuries-old trees, flowering gardens, and educational tree identification trails."
                trees={["Tulip Poplar", "Beech", "Dogwood"]}
                rating={4.9}
                distance="2.4 miles"
              />

              <LocationCard
                name="City Center Urban Forest"
                location="Wilmington, DE"
                description="Urban tree sanctuary with rare specimen trees and community garden spaces in the heart of downtown."
                trees={["Ginkgo", "London Plane", "Cherry"]}
                rating={4.3}
                distance="0.5 miles"
              />

              <LocationCard
                name="Mountain View Preserve"
                location="Newark, DE"
                description="Elevated woodland area with panoramic views and hiking trails featuring old growth forest sections."
                trees={["Hickory", "Oak", "Pine"]}
                rating={4.6}
                distance="5.3 miles"
              />

              <LocationCard
                name="Lakeside Tree Sanctuary"
                location="Newark, DE"
                description="Peaceful lakefront forest with boardwalks and viewing platforms showcasing wetland tree species."
                trees={["Willow", "Cypress", "Red Maple"]}
                rating={4.5}
                distance="4.1 miles"
              />

              <LocationCard
                name="Forest Edge Conservation Area"
                location="New Castle, DE"
                description="Protected boundary forest with interpretive trails and rare native Delaware tree species."
                trees={["American Holly", "Sweetgum", "Sassafras"]}
                rating={4.8}
                distance="3.7 miles"
              />
              <LocationCard
                name="Glasgow Park Woodland"
                location="Newark, DE"
                description="Expansive park featuring a diverse collection of native trees, paved walking trails, and dedicated conservation areas with seasonal wildflowers."
                trees={["White Oak", "Black Walnut", "Eastern Redbud"]}
                rating={4.7}
                distance="3.2 miles"
              />
            </div>
          </div>
        </div>

    }
}
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '500px'
};

const center = {
  lat: 39.7392, // Example: Wilmington, DE
  lng: -75.5398
};

export default function TreeMap() {
  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
}

interface LocationCardProps {
  name: string
  location: string
  description: string
  trees: string[]
  rating: number
  distance: string
}

function LocationCard({ name, location, description, trees, rating, distance }: LocationCardProps) {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-lg">{name}</h3>
          <p className="text-gray-600 text-sm">{location}</p>
        </div>
        <div className="text-gray-600 text-sm">{distance}</div>
      </div>

      {description && <p className="mt-2 text-sm">{description}</p>}

      {trees.length > 0 && (
        <div className="mt-2 flex items-center gap-1">
          <Tree className="h-4 w-4 text-green-600" />
          <span className="text-sm">{trees.join(", ")}</span>
        </div>
      )}

      {rating > 0 && (
        <div className="mt-2 flex items-center">
          <span className="text-yellow-500 mr-1">★</span>
          <span className="font-medium">{rating.toFixed(1)}</span>
        </div>
      )}
    </div>
  )
}
