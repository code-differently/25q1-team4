"use client"

import { useState } from "react"
import { MapPin } from "lucide-react"

export default function TreeMap() {
  const [hoveredTree, setHoveredTree] = useState<number | null>(null)

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
          <path d="M20,20 L40,30 L60,25 L80,40" stroke="#d4d4d8" strokeWidth="2" strokeDasharray="4 2" fill="none" />
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
  )
}
