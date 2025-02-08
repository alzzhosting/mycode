"use client"

import Link from "next/link"
import { Code2 } from "lucide-react"

interface ScrapingPostCardProps {
  id: string
  title: string
  description: string
  language: string
  category: string
  date: string
  author: string
}

export default function ScrapingPostCard({
  id,
  title,
  description,
  language,
  category,
  date,
  author,
}: ScrapingPostCardProps) {
  return (
    <div className="overflow-hidden rounded-lg bg-blue-900/20 border border-blue-800 hover:border-blue-700 transition-all hover:scale-[1.02]">
      <div className="bg-gradient-to-r from-blue-700 to-blue-500 p-4">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>
      <div className="p-4 space-y-4">
        <p className="text-blue-100 text-sm">{description}</p>
        <div className="flex items-center justify-between text-sm">
          <div className="flex gap-2">
            <span className="bg-blue-800/50 text-blue-100 px-3 py-1 rounded-full border border-blue-700">
              {language}
            </span>
            <span className="bg-blue-800/50 text-blue-100 px-3 py-1 rounded-full border border-blue-700">
              {category}
            </span>
          </div>
          <span className="text-blue-300">{new Date(date).toLocaleDateString()}</span>
        </div>
        <div className="flex justify-between items-center text-sm text-blue-300">
          <span>By: {author}</span>
        </div>
        <Link
          href={`/posts/${id}?type=scraping`}
          className="flex items-center justify-center gap-2 bg-blue-800/50 text-blue-100 py-2 rounded-lg hover:bg-blue-700/50 transition-colors border border-blue-700"
        >
          <Code2 size={20} />
          View Scraping Code
        </Link>
      </div>
    </div>
  )
}

