"use client"

import Link from "next/link"
import { Code } from "lucide-react"

interface PostCardProps {
  id: string
  title: string
  description: string
  language: string
  category: string
  pluginType?: string
  date: string
  author: string
  watermark?: string
}

export default function PostCard({
  id,
  title,
  description,
  language,
  category,
  pluginType,
  date,
  author,
  watermark,
}: PostCardProps) {
  return (
    <div className="overflow-hidden rounded-lg bg-gray-900 border border-gray-800 hover:border-gray-700 transition-all hover:scale-[1.02]">
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>
      <div className="p-4 space-y-4">
        <p className="text-gray-300 text-sm">{description}</p>
        <div className="flex items-center justify-between text-sm">
          <div className="flex gap-2">
            <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full border border-gray-700">{language}</span>
            <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full border border-gray-700">{category}</span>
            {pluginType && (
              <span className="bg-blue-900 text-blue-100 px-3 py-1 rounded-full border border-blue-800">
                {pluginType}
              </span>
            )}
          </div>
          <span className="text-gray-400">{new Date(date).toLocaleDateString()}</span>
        </div>
        <div className="flex justify-between items-center text-sm text-gray-400">
          <span>By: {author}</span>
          {watermark && <span>Watermark: {watermark}</span>}
        </div>
        <Link
          href={`/posts/${id}`}
          className="flex items-center justify-center gap-2 bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors border border-gray-700"
        >
          <Code size={20} />
          View Code
        </Link>
      </div>
    </div>
  )
}

