// Save this file as src/components/navbar.tsx
"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GiTreeBranch } from "react-icons/gi"
import { User, Plus } from "lucide-react"

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="container mx-auto px-4 flex h-18 items-center justify-between">
        <div className="flex items-center gap-2">
          <GiTreeBranch className="h-5 w-5 text-green-600" />
          <span className="text-xl font-bold">BranchOut</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 justify-evenly flex-1">
          <Link href="#" className="text-sm font-medium hover:text-green-600 transition-colors">
            Donate
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-green-600 transition-colors">
            About
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-green-600 transition-colors">
            Learn More
          </Link>
          <Link href="/tree-finder" className="text-sm font-medium hover:text-green-600 transition-colors">
            Map
          </Link>
          <Link href="/profile" className="text-sm font-medium hover:text-green-600 transition-colors">
            Profile
          </Link>
        </nav>
        <div className="flex items-center justify-evenly gap-10">
          <Link href="/profile">
            <Button variant="outline" className="hidden md:flex h-9 items-center justify-center">
              <User className="mr-2 h-4 w-4" />
              Sign In
            </Button>
          </Link>
          <Link href="/plant-tree">
            <Button className="h-9 bg-green-600 text-white hover:bg-green-700 flex items-center justify-center">
              <Plus className="mr-2 h-4 w-4" />
              Plant a Tree
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}