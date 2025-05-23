import { Timestamp } from "firebase/firestore"

export interface Location {
    id: string
    name: string
    lat: number
    lng: number
  }
  
export interface Reservation {
    id: string
    name: string
    type: string
    description: string
    location: string
    trees: string
    rating: number
    distance: number
    lat: number
    lng: number
    date: Timestamp
  }