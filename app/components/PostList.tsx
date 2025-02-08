"use client"

import { useState, useEffect } from "react"
import PostCard from "./PostCard"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { collection, query, orderBy, onSnapshot } from "firebase/firestore"
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

const categories = ["All", "CASE", "PLUGINS"]
const pluginTypes = ["All", "ESM", "CJS"]

export default function PostList() {
  const [posts, setPosts] = useState<CodeSnippet[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedPluginType, setSelectedPluginType] = useState("All")

  useEffect(() => {
    const q = query(collection(db, "snippets"), orderBy("date", "desc"))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const snippetData: CodeSnippet[] = []
      querySnapshot.forEach((doc) => {
        snippetData.push({ id: doc.id, ...(doc.data() as CodeSnippet) })
      })
      setPosts(snippetData)
    })

    return () => unsubscribe()
  }, [])

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "All" || post.category === selectedCategory) &&
      (selectedCategory !== "PLUGINS" || selectedPluginType === "All" || post.pluginType === selectedPluginType),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4 bg-card p-4 rounded-lg shadow-md">
        <Input
          type="text"
          placeholder="Search snippets..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-64 bg-background"
        />
        <div className="flex flex-col sm:flex-row gap-4">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-48 bg-background">
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
          {selectedCategory === "PLUGINS" && (
            <Select value={selectedPluginType} onValueChange={setSelectedPluginType}>
              <SelectTrigger className="w-full sm:w-48 bg-background">
                <SelectValue placeholder="Select plugin type" />
              </SelectTrigger>
              <SelectContent>
                {pluginTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <PostCard
            key={post.id}
            id={post.id}
            title={post.title}
            description={post.description}
            language={post.language}
            date={post.date}
            code={post.code}
            author={post.author}
            category={post.category}
            pluginType={post.pluginType}
            watermark={post.watermark}
          />
        ))}
      </div>
    </div>
  )
}

