"use client"
import PostList from "../components/PostList"

export default function Posts() {
  //const [searchTerm, setSearchTerm] = useState("") //Removed this line as per update

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">Code Snippets</h1>
      <PostList /> {/*Updated this line as per update*/}
    </div>
  )
}

