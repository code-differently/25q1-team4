import Link from "next/link"
import { GiTreeBranch } from "react-icons/gi"

export default function Footer() {
  return (
    <footer className="border-t bg-white mt-auto">
      <div className="container mx-auto px-4 flex flex-col gap-4 py-10 md:flex-row md:items-center md:justify-between md:py-12">
        <div className="flex items-center gap-2">
          <GiTreeBranch className="h-5 w-5 text-green-600" />
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
  )
}