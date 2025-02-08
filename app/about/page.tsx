"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"
import { toast } from "sonner"

export default function About() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log(formData)
    toast.success("Message sent successfully!")
    setFormData({ name: "", email: "", message: "" })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">About Me</CardTitle>
          <CardDescription className="text-center">Get to know the developer behind CodeShare</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">Raol Mukarrozi</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Welcome to my page! I'm Raol, a Fullstack developer from Indonesia, South Kalimantan, currently living in
              Banjarbaru, Cempaka.
            </p>
          </div>
          <div className="flex justify-center space-x-4">
            <Button variant="outline" size="icon" asChild>
              <a href="https://github.com/RaolM" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </Button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input placeholder="Your Name" name="name" value={formData.name} onChange={handleChange} required />
            <Input
              type="email"
              placeholder="Your Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Textarea
              placeholder="Your Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
            <Button type="submit" className="w-full">
              Send Message
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

