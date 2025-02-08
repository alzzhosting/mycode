"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Copy, Check } from "lucide-react"
import { toast } from "sonner"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"

interface CodeSnippet {
  id: string
  title: string
  description: string
  code: string
  language: string
  category: string
  pluginType?: string
  author: string
  date: string
  watermark?: string
}

export default function PostDetail() {
  const params = useParams()
  const [post, setPost] = useState<CodeSnippet | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const fetchPost = async () => {
      if (typeof params.id === "string") {
        const docRef = doc(db, "snippets", params.id)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          setPost({ id: docSnap.id, ...(docSnap.data() as CodeSnippet) })
        } else {
          // Handle the case where the document doesn't exist
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
    return <div className="text-center py-10">Loading...</div>
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="space-y-6 bg-gray-900 rounded-lg p-6">
        <div className="bg-gradient-to-r from-purple-400 to-pink-500 -mx-6 -mt-6 p-6 rounded-t-lg">
          <h1 className="text-3xl font-bold text-white">{post.title}</h1>
        </div>
        <p className="text-gray-300">{post.description}</p>
        <div className="flex items-center justify-between text-sm">
          <div className="flex gap-2">
            <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full">{post.language}</span>
            <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full">{post.category}</span>
            {post.pluginType && (
              <span className="bg-blue-900 text-blue-100 px-3 py-1 rounded-full">{post.pluginType}</span>
            )}
          </div>
          <span className="text-gray-400">{new Date(post.date).toLocaleDateString()}</span>
        </div>
        <div className="flex justify-between items-center text-sm text-gray-400">
          <span>By: {post.author}</span>
          {post.watermark && <span>Watermark: {post.watermark}</span>}
        </div>
        <div className="relative">
          <Button variant="outline" size="icon" className="absolute right-4 top-4" onClick={copyCode}>
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
          <pre className="bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm text-gray-300">
            <code>{post.code}</code>
          </pre>
        </div>
        <Link href="/posts">
          <Button variant="outline" className="text-gray-300">
            Back to Snippets
          </Button>
        </Link>
      </div>
    </div>
  )
}

