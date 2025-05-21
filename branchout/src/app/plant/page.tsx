"use client";

import { GiTreeBranch } from "react-icons/gi";
import { User, Plus } from "lucide-react";
import Link from "next/link";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white">
        <div className="container mx-auto px-4 flex h-18 items-center justify-between">
          <div className="flex items-center gap-2">
            <GiTreeBranch />
            <span className="text-xl font-bold">BranchOut</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 justify-evenly flex-1">
            <Link href="#" className="text-sm font-medium hover:text-green-600 transition-colors">Donate</Link>
            <Link href="#" className="text-sm font-medium hover:text-green-600 transition-colors">About</Link>
            <Link href="#" className="text-sm font-medium hover:text-green-600 transition-colors">Learn More</Link>
            <Link href="/tree-finder" className="text-sm font-medium hover:text-green-600 transition-colors">Map</Link>
            <Link href="/profile" className="text-sm font-medium hover:text-green-600 transition-colors">Profile</Link>
          </nav>
          <div className="flex items-center justify-evenly gap-10">
            <Link href="/login">
            <button className="hidden md:flex h-9 px-4 py-2 text-sm font-medium border rounded-md items-center justify-center transition-colors hover:bg-gray-100">
              <User className="mr-2 h-4 w-4" />
              Sign In
            </button>
            </Link>
            <Link href= "/plant-tree">
            <button className="h-9 px-4 py-2 text-sm font-medium rounded-md bg-green-600 text-white hover:bg-green-700 transition-colors flex items-center justify-center">
              <Plus className="mr-2 h-4 w-4" />
              Plant a Tree
            </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Scrollable Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
      {/* Footer */}
      <footer className="border-t bg-white mt-auto">
        <div className="container mx-auto px-4 flex flex-col gap-4 py-10 md:flex-row md:items-center md:justify-between md:py-12">
          <div className="flex items-center gap-2">
            <GiTreeBranch />
            <span className="text-xl font-bold">BranchOut</span>
          </div>
          <p className="text-sm text-gray-500">© 2025 TreeMapper. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm font-medium hover:text-green-600 transition-colors">Privacy</Link>
            <Link href="#" className="text-sm font-medium hover:text-green-600 transition-colors">Terms</Link>
            <Link href="#" className="text-sm font-medium hover:text-green-600 transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
