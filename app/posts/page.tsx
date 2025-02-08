"use client"

import { useState } from "react"
import PostList from "../components/PostList"
import ScrapingPostList from "../components/ScrapingPostList"
import { Button } from "@/components/ui/button"

export default function Posts() {
  const [activeCategory, setActiveCategory] = useState<"posts" | "scraping">("posts")

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">Code Snippets</h1>
      <div className="flex justify-center mb-6 space-x-4">
        <Button variant={activeCategory === "posts" ? "default" : "outline"} onClick={() => setActiveCategory("posts")}>
          Regular Posts
        </Button>
        <Button
          variant={activeCategory === "scraping" ? "default" : "outline"}
          onClick={() => setActiveCategory("scraping")}
          className={activeCategory === "scraping" ? "bg-blue-600 hover:bg-blue-700" : ""}
        >
          Scraping Posts
        </Button>
      </div>
      {activeCategory === "posts" ? <PostList /> : <ScrapingPostList />}
    </div>
  )
}

