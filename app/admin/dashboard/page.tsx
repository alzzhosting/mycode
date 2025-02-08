"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Upload, Trash2, BarChart, Users } from "lucide-react"
import { db } from "@/lib/firebase"
import { collection, addDoc, deleteDoc, doc, onSnapshot, query, orderBy } from "firebase/firestore"
import CodeManagementTable from "@/components/CodeManagementTable"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CodeSnippet {
  id: string
  title: string
  description: string
  language: string
  code: string
  author: string
  date: string
  pluginType?: string
  category: string
}

export default function AdminDashboard() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [uploading, setUploading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [snippets, setSnippets] = useState<CodeSnippet[]>([])
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    code: "",
    language: "JavaScript",
    category: "CASE",
    pluginType: "",
    watermark: "",
  })

  useEffect(() => {
    if (!loading && !user) {
      router.push("/admin/login")
    }
  }, [user, loading, router])

  useEffect(() => {
    if (!user) return

    const q = query(collection(db, "snippets"), orderBy("date", "desc"))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const snippetData: CodeSnippet[] = []
      querySnapshot.forEach((doc) => {
        snippetData.push({ id: doc.id, ...(doc.data() as CodeSnippet) })
      })
      setSnippets(snippetData)
    })

    return () => unsubscribe()
  }, [user])

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type === "application/javascript") {
      setSelectedFile(file)
      const text = await file.text()
      setFormData((prev) => ({ ...prev, code: text }))
      toast.success("JavaScript file loaded successfully")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setUploading(true)

    try {
      const codeData = {
        ...formData,
        author: user?.email,
        date: new Date().toISOString(),
      }

      await addDoc(collection(db, "snippets"), codeData)
      toast.success("Code snippet uploaded successfully!")
      setFormData({
        title: "",
        description: "",
        code: "",
        language: "JavaScript",
        category: "CASE",
        pluginType: "",
        watermark: "",
      })
      router.push("/posts")
    } catch (error) {
      toast.error("Failed to upload code snippet")
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "snippets", id))
      toast.success("Code snippet deleted successfully!")
    } catch (error) {
      toast.error("Failed to delete code snippet")
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Loading...</h2>
          <p className="text-gray-400">Please wait while we verify your credentials.</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-2xl text-white">Admin Dashboard</CardTitle>
          <CardDescription className="text-gray-400">Manage your code snippets and monitor activity</CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="upload" className="space-y-6">
        <TabsList className="bg-gray-800">
          <TabsTrigger value="upload" className="data-[state=active]:bg-gray-700">
            <Upload className="w-4 h-4 mr-2" />
            Upload Code
          </TabsTrigger>
          <TabsTrigger value="manage" className="data-[state=active]:bg-gray-700">
            <Trash2 className="w-4 h-4 mr-2" />
            Manage Code
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-gray-700">
            <BarChart className="w-4 h-4 mr-2" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="users" className="data-[state=active]:bg-gray-700">
            <Users className="w-4 h-4 mr-2" />
            Users
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Upload New Code Snippet</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    placeholder="Title (Required)"
                    value={formData.title}
                    onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                    className="bg-gray-800 border-gray-700 text-white"
                    required
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Description (Required)"
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    className="bg-gray-800 border-gray-700 text-white min-h-[100px]"
                    required
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Code (Required)"
                    value={formData.code}
                    onChange={(e) => setFormData((prev) => ({ ...prev, code: e.target.value }))}
                    className="bg-gray-800 border-gray-700 text-white min-h-[200px]"
                    required
                  />
                </div>
                <div>
                  <Input
                    type="file"
                    accept=".js"
                    onChange={handleFileChange}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        category: value,
                        pluginType: value === "PLUGINS" ? "ESM" : "",
                      }))
                    }
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CASE">CASE</SelectItem>
                      <SelectItem value="PLUGINS">PLUGINS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {formData.category === "PLUGINS" && (
                  <div>
                    <Select
                      value={formData.pluginType}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, pluginType: value }))}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue placeholder="Select plugin type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ESM">ESM</SelectItem>
                        <SelectItem value="CJS">CJS</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
                <div>
                  <Input
                    placeholder="Watermark (Optional)"
                    value={formData.watermark}
                    onChange={(e) => setFormData((prev) => ({ ...prev, watermark: e.target.value }))}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-400 to-pink-500"
                  disabled={uploading}
                >
                  {uploading ? "Uploading..." : "Upload Code Snippet"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="manage">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Manage Code Snippets</CardTitle>
            </CardHeader>
            <CardContent>
              <CodeManagementTable snippets={snippets} onDelete={handleDelete} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-gray-400">Analytics features coming soon...</div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">User Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-gray-400">User management features coming soon...</div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

