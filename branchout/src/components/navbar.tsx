"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GiTreeBranch } from "react-icons/gi";
import { User, Plus, LogOut } from "lucide-react";
import { useAuth } from "@/src/context/auth-context";

export default function Navbar() {
  const { user, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="container mx-auto px-4 flex h-18 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 hover:text-green-600 transition-colors">
          <GiTreeBranch className="h-5 w-5 text-green-600" />
          <span className="text-xl font-bold">BranchOut</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6 justify-evenly flex-1">
          <Link href="/donate" className="text-sm font-medium hover:text-green-600 transition-colors">
            Donate
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-green-600 transition-colors">
            About
          </Link>

          <Link href="/map" className="text-sm font-medium hover:text-green-600 transition-colors">

            Map
          </Link>
        </nav>
        
        <div className="flex items-center justify-evenly gap-4">
          {user ? (
            <>
              <Link href="/profile">
                <Button variant="outline" className="hidden md:flex h-9 items-center justify-center">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Button>
              </Link>
              <Button 
                variant="outline" 
                className="hidden md:flex h-9 items-center justify-center text-red-500 hover:text-red-600"
                onClick={signOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </>
          ) : (
            <Link href="/login">
              <Button variant="outline" className="hidden md:flex h-9 items-center justify-center">
                <User className="mr-2 h-4 w-4" />
                Sign In
              </Button>
            </Link>
          )}
          
          <Link href="/plant-tree">
            <Button className="h-9 bg-green-600 text-white hover:bg-green-700 flex items-center justify-center">
              <Plus className="mr-2 h-4 w-4" />
              Plant a Tree
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}