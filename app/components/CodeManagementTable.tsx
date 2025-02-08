"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface CodeSnippet {
  id: string
  title: string
  description: string
  language: string
  author: string
  date: string
}

interface CodeManagementTableProps {
  snippets: CodeSnippet[]
  onDelete: (id: string) => Promise<void>
}

export default function CodeManagementTable({ snippets, onDelete }: CodeManagementTableProps) {
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!deleteId) return

    setIsDeleting(true)
    try {
      await onDelete(deleteId)
      toast.success("Code snippet deleted successfully")
    } catch (error) {
      toast.error("Failed to delete code snippet")
    } finally {
      setIsDeleting(false)
      setDeleteId(null)
    }
  }

  return (
    <>
      <div className="rounded-md border border-gray-800">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-gray-800/50">
              <TableHead className="text-gray-400">Title</TableHead>
              <TableHead className="text-gray-400">Language</TableHead>
              <TableHead className="text-gray-400">Author</TableHead>
              <TableHead className="text-gray-400">Date</TableHead>
              <TableHead className="text-gray-400 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {snippets.map((snippet) => (
              <TableRow key={snippet.id} className="hover:bg-gray-800/50">
                <TableCell className="font-medium text-gray-200">{snippet.title}</TableCell>
                <TableCell className="text-gray-300">{snippet.language}</TableCell>
                <TableCell className="text-gray-300">{snippet.author}</TableCell>
                <TableCell className="text-gray-300">{new Date(snippet.date).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" className="hover:bg-gray-800">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-red-900/20 text-red-400 hover:text-red-300"
                      onClick={() => setDeleteId(snippet.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="bg-gray-900 border-gray-800">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the code snippet.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-800 hover:bg-gray-700" disabled={isDeleting}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction className="bg-red-600 hover:bg-red-500" onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

