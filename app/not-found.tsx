import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-white mb-4">404</h1>
        <h2 className="text-4xl font-semibold text-white mb-6">Page Not Found</h2>
        <p className="text-xl text-white mb-8">Oops! The page you're looking for doesn't exist.</p>
        <Link href="/">
          <Button size="lg" variant="secondary" className="font-semibold">
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  )
}

