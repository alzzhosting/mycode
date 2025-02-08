"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Code2 } from "lucide-react"
import ThemeToggle from "./ThemeToggle"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white">
              CodeShare
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                href="/"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === "/" ? "text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-300"
                }`}
              >
                Home
              </Link>
              <Link
                href="/posts"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === "/posts" ? "text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-300"
                }`}
              >
                Snippets
              </Link>
              <Link
                href="/scraping"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === "/scraping" ? "text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-300"
                }`}
              >
                <Code2 className="inline-block w-4 h-4 mr-1" />
                Scraping
              </Link>
              <Link
                href="/about"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === "/about" ? "text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-300"
                }`}
              >
                About
              </Link>
              <ThemeToggle />
            </div>
          </div>
          <div className="md:hidden flex items-center">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 ml-2"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname === "/" ? "text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-300"
              }`}
            >
              Home
            </Link>
            <Link
              href="/posts"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname === "/posts" ? "text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-300"
              }`}
            >
              Snippets
            </Link>
            <Link
              href="/scraping"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname === "/scraping" ? "text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-300"
              }`}
            >
              <Code2 className="inline-block w-4 h-4 mr-1" />
              Scraping
            </Link>
            <Link
              href="/about"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname === "/about" ? "text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-300"
              }`}
            >
              About
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}