"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BeatCard } from "./beat-card"

export function FeaturedSection() {
  const [featuredBeats, setFeaturedBeats] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFeaturedBeats = async () => {
      try {
        const response = await fetch("/api/beats?featured=true")
        if (!response.ok) {
          throw new Error("Failed to fetch featured beats")
        }
        const data = await response.json()
        setFeaturedBeats(data.beats.slice(0, 8))
      } catch (err) {
        console.error("[v0] Error fetching featured beats:", err)
        setError("Failed to load featured beats")
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedBeats()
  }, [])

  if (loading) {
    return (
      <section id="beats" className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-foreground">FEATURED BEATS</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="aspect-square bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="beats" className="container mx-auto px-4 py-12">
        <div className="text-center py-16">
          <p className="text-xl text-muted-foreground">{error}</p>
        </div>
      </section>
    )
  }

  return (
    <section id="beats" className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-foreground">FEATURED BEATS</h2>
        <Link href="/beats">
          <Button className="bg-[#8c52ff] hover:bg-[#7a3fee] text-white font-semibold px-6 py-2 transition-all duration-200 shadow-lg shadow-[#8c52ff]/20 hover:shadow-[#8c52ff]/40">
            View All Beats
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {featuredBeats.map((beat) => (
          <BeatCard key={beat.id} {...beat} />
        ))}
      </div>
    </section>
  )
}
