import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Leaf } from "lucide-react"

export default function Header() {
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-primary font-bold text-xl">
          <Leaf className="h-5 w-5" />
          <span>TreeMapper</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium">
            Home
          </Link>
          <Link href="/map" className="text-sm font-medium">
            Map
          </Link>
          <Link href="/plant" className="text-sm font-medium">
            Plant
          </Link>
          <Link href="/about" className="text-sm font-medium">
            About
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/signin" className="text-sm font-medium">
            Sign In
          </Link>
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link href="/plant">
              <span className="flex items-center gap-1">
                <span className="text-sm">Plant a Tree</span>
              </span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
