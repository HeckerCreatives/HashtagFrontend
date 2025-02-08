import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MoveLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-950 px-4">
      <div className="text-center flex flex-col items-center justify-center">
        <h1 className="text-6xl font-bold text-zinc-red-600 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-zinc-500 mb-6">Page Not Found</h2>
        <p className="text-xl text-zinc-500 mb-8">Oops! The page you're looking for doesn't exist or has been moved.</p>
        <a href="/">
          <Button className="inline-flex items-center">
            <MoveLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </a>
      </div>
    </div>
  )
}

