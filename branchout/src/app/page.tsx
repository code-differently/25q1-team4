"use client"

import { useState } from "react"
import Link from "next/link"
import { MapPin, User, Plus, Heart } from "lucide-react"
import { GiTreeBranch } from "react-icons/gi"

export default function Home() {
  const [hoveredTree, setHoveredTree] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState("map")
  const [detailsTab, setDetailsTab] = useState("details")

  // Sample tree data
  const trees = [
    { id: 1, x: 25, y: 30, type: "Oak", date: "01/05/25" },
    { id: 2, x: 45, y: 60, type: "Pine", date: "03/15/25" },
    { id: 3, x: 70, y: 40, type: "Maple", date: "04/20/25" },
    { id: 4, x: 85, y: 75, type: "Oak", date: "05/01/25" },
    { id: 5, x: 15, y: 65, type: "Pine", date: "05/10/25" },
  ]

  // Get color based on tree type
  const getTreeColor = (type: string) => {
    switch (type) {
      case "Oak":
        return "text-green-600"
      case "Pine":
        return "text-green-800"
      case "Maple":
        return "text-green-400"
      default:
        return "text-green-600"
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="sticky top-0 z-50 border-b bg-white">
        <div className="container mx-auto px-4 flex h-18 items-center justify-between">
          <div className="flex items-center gap-2">
<GiTreeBranch/>
            <span className="text-xl font-bold">BranchOut</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 justify-evenly flex-1">
            <Link href="#" className="text-sm font-medium hover:text-green-600 transition-colors">
              Donate
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-green-600 transition-colors">
              About
            </Link>
            <Link href="" className="text-sm font-medium hover:text-green-600 transition-colors">
              Learn More
            </Link>
            <Link href="tree-finder" className="text-sm font-medium hover:text-green-600 transition-colors">
              Map
            </Link>
            <Link href="/profile" className="text-sm font-medium hover:text-green-600 transition-colors">
              Profile
            </Link>
          </nav>
          <div className="flex items-center justify-evenly gap-10">
            <button className="hidden md:flex h-9 px-4 py-2 text-sm font-medium border rounded-md items-center justify-center transition-colors hover:bg-gray-100">
              <User className="mr-2 h-4 w-4" />
              Sign In
            </button>
            <Link href="/plant-tree">
            <button className="h-9 px-4 py-2 text-sm font-medium rounded-md bg-green-600 text-white hover:bg-green-700 transition-colors flex items-center justify-center">
              <Plus className="mr-2 h-4 w-4" />
              Plant a Tree
            </button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-12 md:py-24 bg-gradient-to-b from-green-50 to-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Track Your Impact, <span className="text-green-600">Tree by Tree</span>
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join our community of tree planters making the world greener. Map, track, and share your contribution
                  to a healthier planet.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <button className="px-4 py-2 text-sm font-medium rounded-md bg-green-600 text-white hover:bg-green-700 transition-colors">
                    Get Started
                  </button>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative w-full max-w-[500px] aspect-square rounded-lg overflow-hidden border shadow-lg">
                  {/* Map Component */}
                  <div className="relative w-full h-full bg-gray-50 overflow-hidden">
                    {/* Map background with subtle grid */}
                    <div
                      className="absolute inset-0 bg-white"
                      style={{
                        backgroundImage: `
                          linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
                          linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px)
                        `,
                        backgroundSize: "20px 20px",
                      }}
                    >
                      {/* Map features - rivers, paths */}
                      <svg width="100%" height="100%" className="absolute inset-0">
                        <path d="M10,50 Q30,40 50,60 T90,50" stroke="#e0f2fe" strokeWidth="8" fill="none" />
                        <path
                          d="M20,20 L40,30 L60,25 L80,40"
                          stroke="#d4d4d8"
                          strokeWidth="2"
                          strokeDasharray="4 2"
                          fill="none"
                        />
                      </svg>
                    </div>

                    {/* Tree markers */}
                    {trees.map((tree) => (
                      <div
                        key={tree.id}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 cursor-pointer"
                        style={{ left: `${tree.x}%`, top: `${tree.y}%` }}
                        onMouseEnter={() => setHoveredTree(tree.id)}
                        onMouseLeave={() => setHoveredTree(null)}
                      >
                        <MapPin
                          className={`${getTreeColor(tree.type)} ${hoveredTree === tree.id ? "h-8 w-8 -mt-1" : "h-6 w-6"}`}
                          fill={hoveredTree === tree.id ? "rgba(22, 163, 74, 0.2)" : "rgba(22, 163, 74, 0.1)"}
                        />

                        {/* Tooltip */}
                        {hoveredTree === tree.id && (
                          <div className="absolute z-10 bottom-full left-1/2 transform -translate-x-1/2 -translate-y-1 bg-white shadow-lg rounded-md p-2 text-xs w-32">
                            <div className="font-bold">{tree.type}</div>
                            <div className="text-gray-500">Planted: {tree.date}</div>
                            <div className="text-gray-500">ID: #{tree.id}</div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-800">Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Map, Track, and Grow</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Plant, share, and grow your impact  one tree at a time.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-12">
              {/* Feature Card 1 */}
              <div className="border-2 border-green-100 rounded-lg">
                <div className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="rounded-full bg-green-100 p-3">
                    <MapPin className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold">Map Your Trees</h3>
                  <p className="text-gray-500">
                  Pinpoint and track each planted tree on our user-friendly map.
                  </p>
                </div>
              </div>

              {/* Feature Card 2 */}
              <div className="border-2 border-green-100 rounded-lg">
                <div className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="rounded-full bg-green-100 p-3">
<GiTreeBranch/>
                  </div>
                  <h3 className="text-xl font-bold">Track Growth</h3>
                  <p className="text-gray-500">
                  Celebrate your tree planting journey and see your impact flourish over time.
                  </p>
                </div>
              </div>

              {/* Feature Card 3 */}
              <div className="border-2 border-green-100 rounded-lg">
                <div className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="rounded-full bg-green-100 p-3">
                    <Heart className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold">Share Impact</h3>
                  <p className="text-gray-500">
                  Share your impact on social media and connect with other tree planters showcasing your environmental contribution
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        
      </main>

      <footer className="border-t bg-white">
        <div className="container mx-auto px-4 flex flex-col gap-4 py-10 md:flex-row md:items-center md:justify-between md:py-12">
          <div className="flex items-center gap-2">
<GiTreeBranch/>
            <span className="text-xl font-bold">BranchOut</span>
          </div>
          <p className="text-sm text-gray-500">© 2025 BranchOut. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm font-medium hover:text-green-600 transition-colors">
              Privacy
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-green-600 transition-colors">
              Terms
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-green-600 transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
