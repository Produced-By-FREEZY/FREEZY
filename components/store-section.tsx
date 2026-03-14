"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "./ui/button"
import { ProductCard } from "./product-card"

interface Kit {
  id: string
  title: string
  price: number
  image: string
  category: string
  description: string
  previewUrls: string[]
  createdBy: string
  isFeatured: boolean
  tags?: string[] // Added tags field to Kit interface
}

export function StoreSection() {
  const [kits, setKits] = useState<Kit[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchKits() {
      try {
        console.log("[v0] Fetching featured kits from API...")
        const response = await fetch("/api/kits?featured=true")

        if (!response.ok) {
          console.error("[v0] Failed to fetch kits:", response.statusText)
          return
        }

        const data = await response.json()
        console.log("[v0] Featured kits fetched:", data)
        // Show only first 6 featured kits
        setKits((data.kits || []).slice(0, 6))
      } catch (err) {
        console.error("[v0] Error fetching kits:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchKits()
  }, [])

  if (loading) {
    return (
      <section id="kits" className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-foreground">KITS</h2>
        </div>
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#8c52ff] border-r-transparent"></div>
        </div>
      </section>
    )
  }

  if (kits.length === 0) {
    return null // Don't show section if no featured kits
  }

  return (
    <section id="kits" className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-foreground">KITS</h2>
        <Link href="/kits">
          <Button className="bg-[#8c52ff] hover:bg-[#7a3fee] text-white font-semibold px-6 py-2 transition-all duration-200 shadow-lg shadow-[#8c52ff]/20 hover:shadow-[#8c52ff]/40">
            View All Kits
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {kits.map((kit) => (
          <ProductCard
            key={kit.id}
            title={kit.title}
            price={`$${kit.price.toFixed(2)}`}
            image={kit.image}
            category={kit.category}
            tags={kit.tags} // Pass tags to ProductCard
            previewUrls={kit.previewUrls} // Pass real preview URLs from Notion API
            description={kit.description} // Pass description from Notion API
          />
        ))}
      </div>
    </section>
  )
}
