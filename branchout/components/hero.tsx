import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function Hero() {
  return (
    <div className="flex flex-col lg:flex-row items-center gap-12 py-12">
      <div className="flex-1 space-y-6">
        <h1 className="text-5xl font-bold leading-tight">
          Track Your Impact, <span className="text-primary">Tree by Tree</span>
        </h1>
        <p className="text-lg text-gray-600">
          Join our community of tree planters making the world greener. Map, track, and share your contribution to a
          healthier planet.
        </p>
        <div className="flex gap-4">
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link href="/plant">Get Started</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/about">Learn More</Link>
          </Button>
        </div>
      </div>
      <div className="flex-1 relative">
        <div className="w-full h-[400px] relative">
          <Image
            src="/placeholder.svg?height=400&width=500"
            alt="Map with tree locations"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </div>
  )
}
