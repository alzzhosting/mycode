import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center px-4">
      <h1 className="text-4xl font-bold mb-6">Welcome to CodeShare</h1>
      <p className="text-xl mb-8 max-w-2xl">
        Discover, share, and learn from a vast collection of code snippets across various programming languages.
      </p>
      <Link href="/posts">
        <Button size="lg">Get Started</Button>
      </Link>
    </div>
  )
}

