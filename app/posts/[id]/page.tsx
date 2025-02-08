"use client"

import { useEffect, useState } from "react"
import { useParams, useSearchParams } from "next/navigation"
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
  author: string
  date: string
  pluginType?: string
  watermark?: string
}

export default function PostDetail() {
  const params = useParams()
  const searchParams = useSearchParams()
  const [post, setPost] = useState<CodeSnippet | null>(null)
  const [copied, setCopied] = useState(false)

  const isScrapingPost = searchParams.get("type") === "scraping"

  useEffect(() => {
    const fetchPost = async () => {
      if (typeof params.id === "string") {
        const collectionName = isScrapingPost ? "scraping_snippets" : "snippets"
        const docRef = doc(db, collectionName, params.id)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          setPost({ id: docSnap.id, ...(docSnap.data() as CodeSnippet) })
        } else {
          console.log("No such document!")
        }
      }
    }

    fetchPost()
  }, [params.id, isScrapingPost])

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

  const bgColor = isScrapingPost ? "bg-blue-900/20" : "bg-gray-900"
  const gradientFrom = isScrapingPost ? "from-blue-700" : "from-purple-400"
  const gradientTo = isScrapingPost ? "to-blue-500" : "to-pink-500"
  const textColor = isScrapingPost ? "text-blue-100" : "text-gray-300"
  const buttonBgColor = isScrapingPost ? "bg-blue-800/50" : "bg-gray-800"
  const buttonHoverBgColor = isScrapingPost ? "hover:bg-blue-700/50" : "hover:bg-gray-700"

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className={`space-y-6 ${bgColor} rounded-lg p-6`}>
        <div className={`bg-gradient-to-r ${gradientFrom} ${gradientTo} -mx-6 -mt-6 p-6 rounded-t-lg`}>
          <h1 className="text-3xl font-bold text-white">{post.title}</h1>
        </div>
        <p className={textColor}>{post.description}</p>
        <div className="flex items-center justify-between text-sm">
          <div className="flex gap-2">
            <span className={`${buttonBgColor} ${textColor} px-3 py-1 rounded-full`}>{post.language}</span>
            <span className={`${buttonBgColor} ${textColor} px-3 py-1 rounded-full`}>{post.category}</span>
            {post.pluginType && (
              <span className={`${buttonBgColor} ${textColor} px-3 py-1 rounded-full`}>{post.pluginType}</span>
            )}
          </div>
          <span className={textColor}>{new Date(post.date).toLocaleDateString()}</span>
        </div>
        <div className="flex justify-between items-center text-sm text-gray-400">
          <span>By: {post.author}</span>
          {post.watermark && <span>Watermark: {post.watermark}</span>}
        </div>
        <div className="relative">
          <Button variant="outline" size="icon" className="absolute right-4 top-4" onClick={copyCode}>
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
          <pre className={`${buttonBgColor} p-4 rounded-lg overflow-x-auto text-sm ${textColor}`}>
            <code>{post.code}</code>
          </pre>
        </div>
        <Link href="/posts">
          <Button variant="outline" className={`${textColor} ${buttonBgColor} ${buttonHoverBgColor}`}>
            Back to Snippets
          </Button>
        </Link>
      </div>
    </div>
  )
}

