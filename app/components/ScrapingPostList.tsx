"use client"

import { useState, useEffect } from "react"
import ScrapingPostCard from "./ScrapingPostCard"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { collection, query, orderBy, onSnapshot } from "firebase/firestore"
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

const categories = ["All", "Web Scraping", "API Scraping", "Data Extraction"]

export default function ScrapingPostList() {
  const [posts, setPosts] = useState<ScrapingSnippet[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  useEffect(() => {
    const q = query(collection(db, "scraping_snippets"), orderBy("date", "desc"))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const snippetData: ScrapingSnippet[] = []
      querySnapshot.forEach((doc) => {
        snippetData.push({ id: doc.id, ...(doc.data() as ScrapingSnippet) })
      })
      setPosts(snippetData)
    })

    return () => unsubscribe()
  }, [])

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "All" || post.category === selectedCategory),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4 bg-blue-900/20 p-4 rounded-lg shadow-md">
        <Input
          type="text"
          placeholder="Search scraping snippets..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-64 bg-blue-950/50 text-blue-100 placeholder-blue-300"
        />
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-48 bg-blue-950/50 text-blue-100">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <ScrapingPostCard
            key={post.id}
            id={post.id}
            title={post.title}
            description={post.description}
            language={post.language}
            date={post.date}
            author={post.author}
            category={post.category}
          />
        ))}
      </div>
    </div>
  )
}

