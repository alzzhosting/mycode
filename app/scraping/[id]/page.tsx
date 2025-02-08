"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Copy, Check } from "lucide-react"
import { toast } from "sonner"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"

interface ScrapingSnippet {
  id: string
  title: string
  description: string
  code: string
  language: string
  category: string
  author: string
  date: string
}

export default function ScrapingPostDetail() {
  const params = useParams()
  const [post, setPost] = useState<ScrapingSnippet | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const fetchPost = async () => {
      if (typeof params.id === "string") {
        const docRef = doc(db, "scraping_snippets", params.id)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          setPost({ id: docSnap.id, ...(docSnap.data() as ScrapingSnippet) })
        } else {
          console.log("No such document!")
        }
      }
    }

    fetchPost()
  }, [params.id])

  const copyCode = async () => {
    if (post) {
      try {
        await navigator.clipboard.writeText(post.code)
        setCopied(true)
        toast.success("Code copied to clipboard!")
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        toast.error("Failed to copy code")
      }
    }
  }

  if (!post) {
    return <div className="text-center py-10 text-red-100">Loading...</div>
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="space-y-6 bg-red-900/20 rounded-lg p-6">
        <div className="bg-gradient-to-r from-red-700 to-red-500 -mx-6 -mt-6 p-6 rounded-t-lg">
          <h1 className="text-3xl font-bold text-white">{post.title}</h1>
        </div>
        <p className="text-red-100">{post.description}</p>
        <div className="flex items-center justify-between text-sm">
          <div className="flex gap-2">
            <span className="bg-red-800/50 text-red-100 px-3 py-1 rounded-full">{post.language}</span>
            <span className="bg-red-800/50 text-red-100 px-3 py-1 rounded-full">{post.category}</span>
          </div>
          <span className="text-red-300">{new Date(post.date).toLocaleDateString()}</span>
        </div>
        <div className="flex justify-between items-center text-sm text-red-300">
          <span>By: {post.author}</span>
        </div>
        <div className="relative">
          <Button variant="outline" size="icon" className="absolute right-4 top-4" onClick={copyCode}>
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
          <pre className="bg-red-950/50 p-4 rounded-lg overflow-x-auto text-sm text-red-100">
            <code>{post.code}</code>
          </pre>
        </div>
        <Link href="/scraping">
          <Button variant="outline" className="text-red-100 border-red-700 hover:bg-red-800/50">
            Back to Scraping Snippets
          </Button>
        </Link>
      </div>
    </div>
  )
}

