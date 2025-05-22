import type { Location, Reservation } from "../lib/types"
import { Timestamp } from "firebase/firestore"

// Mock data for locations
const mockLocations: Record<string, Location[]> = {
  "san jose": [
    { id: "sj1", name: "San Jose, CA", lat: 37.3382, lng: -121.8863 },
    { id: "sj2", name: "San Jose State University", lat: 37.3352, lng: -121.8811 },
  ],
  portland: [
    { id: "po1", name: "Portland, OR", lat: 45.5152, lng: -122.6784 },
    { id: "po2", name: "Portland State University", lat: 45.5109, lng: -122.683 },
  ],
}

// Mock data for tree reservations
const mockReservations: Reservation[] = [
    {
        id: "r1",
        name: "Oakwood Nature Reserve",
        type: "Nature Reserve",
        description: "A beautiful oak forest with hiking trails and wildlife viewing opportunities.",
        location: "Portland, OR",
        trees: "Oak, Maple...",
        rating: 4.8,
        distance: 2.3,
        lat: 45.5372,
        lng: 0,
        date: Timestamp.fromDate(new Date())
    },
    {
        id: "r2",
        name: "Redwood Park",
        type: "Park",
        description: "Home to some of the oldest redwood trees in the region with guided tours available.",
        location: "Portland, OR",
        trees: "Redwood, Cedar...",
        rating: 4.6,
        distance: 3.1,
        lat: 45.5052,
        lng: -122.6784,
        date: Timestamp.fromDate(new Date())
    },
        
    {
        id: "r3",
        name: "Evergreen Sanctuary",
        type: "Sanctuary",
        description: "A protected area featuring diverse evergreen species and educational programs.",
        location: "Portland, OR",
        trees: "Spruce, Hemlock...",
        rating: 4.5,
        distance: 4.5,
        lat: 45.4652,
        lng: -122.6584,
        date: Timestamp.fromDate(new Date())
    },
    {
        id: "r4",
        name: "Sullivan's Gulch Arboretum",
        type: "Arboretum",
        description: "Urban arboretum with rare tree species and seasonal guided walks.",
        location: "Portland, OR",
        trees: "Birch, Elm, Pine...",
        rating: 4.3,
        distance: 1.8,
        lat: 45.5312,
        lng: -122.6384,
        date: Timestamp.fromDate(new Date())
    },
  ]


// Simulate API call to search for locations
export async function searchLocations(query: string): Promise<Location[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const normalizedQuery = query.toLowerCase().trim()

  // Find matching locations
  for (const [key, locations] of Object.entries(mockLocations)) {
    if (key.includes(normalizedQuery)) {
      return locations
    }
  }

  // Return empty array if no matches
  return []
}

// Simulate API call to get reservations
export async function getReservations(): Promise<Reservation[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  return mockReservations
}