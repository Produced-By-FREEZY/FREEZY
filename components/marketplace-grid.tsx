"use client"

import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { BeatCard } from "./beat-card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowUp } from "lucide-react"
import type { FilterState } from "./filter-sidebar"

interface MarketplaceGridProps {
  searchQuery?: string
  filters?: FilterState
  onClearFilters?: () => void
}

export function MarketplaceGrid({ searchQuery, filters, onClearFilters }: MarketplaceGridProps) {
  const [sortBy, setSortBy] = useState("newest")
  const [displayCount, setDisplayCount] = useState(25)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [beats, setBeats] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBeats = async () => {
      try {
        const response = await fetch("/api/beats")
        if (!response.ok) throw new Error("Failed to fetch beats")
        const data = await response.json()
        setBeats(data.beats)
      } catch (err) {
        console.error("Error fetching beats:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchBeats()
  }, [])

  useEffect(() => {
    setDisplayCount(25)
  }, [searchQuery, filters])

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

  const filteredBeats = useMemo(() => {
    let result = [...beats]

    // 1. Search Query Filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter((beat) => {
        return (
          beat.title.toLowerCase().includes(query) ||
          (typeof beat.genres === "string" && beat.genres.toLowerCase().includes(query)) ||
          (typeof beat.tags === "string" && beat.tags.toLowerCase().includes(query)) ||
          beat.bpm.toString().includes(query) ||
          (beat.typeBeat && beat.typeBeat.toLowerCase().includes(query)) ||
          (beat.musicalKey && beat.musicalKey.toLowerCase().includes(query)) ||
          (typeof beat.mood === "string" && beat.mood.toLowerCase().includes(query))
        )
      })
    }

    // 2. Sidebar Filters
    if (filters) {
      result = result.filter((beat) => {
        // BPM Range
        if (beat.bpm < filters.bpmRange[0] || beat.bpm > filters.bpmRange[1]) return false

        // Free Only
        if (filters.showFreeOnly && !beat.isFree) return false

        // Type Beat (Artist)
        if (filters.selectedTypeBeats.length > 0) {
          if (!beat.typeBeat) return false
          const normalizedFilters = filters.selectedTypeBeats.map((f: string) => f.replace(" Type Beat", "").trim().toLowerCase())
          if (!normalizedFilters.includes(beat.typeBeat.toLowerCase())) return false
        }

        // Genre Filter (Fixed for String Lists & TypeScript)
        if (filters.selectedGenres.length > 0) {
          if (typeof beat.genres !== "string") return false
          const beatGenreArray = beat.genres.toLowerCase().split(",").map((g: string) => g.trim())
          const hasMatch = filters.selectedGenres.some((selected: string) => 
            beatGenreArray.includes(selected.toLowerCase().trim())
          )
          if (!hasMatch) return false
        }

        // Mood Filter (Fixed for String Lists & TypeScript)
        if (filters.selectedMoods.length > 0) {
          if (typeof beat.mood !== "string") return false
          const beatMoodArray = beat.mood.toLowerCase().split(",").map((m: string) => m.trim())
          const hasMatch = filters.selectedMoods.some((selected: string) => 
            beatMoodArray.includes(selected.toLowerCase().trim())
          )
          if (!hasMatch) return false
        }

        // Key Filter
        if (filters.selectedKeys.length > 0) {
          if (!beat.musicalKey || !filters.selectedKeys.includes(beat.musicalKey)) return false
        }

        return true
      })
    }

    // 3. Sorting
    switch (sortBy) {
      case "oldest": result.sort((a, b) => a.id.localeCompare(b.id)); break
      case "bpm-low": result.sort((a, b) => a.bpm - b.bpm); break
      case "bpm-high": result.sort((a, b) => b.bpm - a.bpm); break
      case "newest":
      default: result.sort((a, b) => b.id.localeCompare(a.id)); break
    }

    return result
  }, [searchQuery, filters, sortBy, beats])

  const displayedBeats = filteredBeats.slice(0, displayCount)
  const hasMore = displayCount < filteredBeats.length
  const loadMore = () => setDisplayCount((prev) => prev + 25)

  const hasActiveFilters = useMemo(() => {
    if (!filters) return !!searchQuery
    return (
      filters.selectedTypeBeats.length > 0 ||
      filters.selectedGenres.length > 0 ||
      filters.selectedMoods.length > 0 ||
      filters.selectedKeys.length > 0 ||
      filters.bpmRange[0] !== 60 ||
      filters.bpmRange[1] !== 180 ||
      filters.showFreeOnly ||
      !!searchQuery
    )
  }, [filters, searchQuery])

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="aspect-square bg-muted animate-pulse rounded-lg" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">{searchQuery ? "Search Results" : "All Beats"}</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {filteredBeats.length} beat{filteredBeats.length !== 1 ? "s" : ""} available
          </p>
        </div>
        <div className="flex items-center gap-3">
          {hasActiveFilters && onClearFilters && (
            <Button variant="outline" onClick={onClearFilters} className="bg-[#8c52ff] text-white hover:bg-[#7a45e8]">
              Clear Filters
            </Button>
          )}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="bpm-low">BPM: Low to High</SelectItem>
              <SelectItem value="bpm-high">BPM: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredBeats.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl text-muted-foreground mb-2">No beats found</p>
          <p className="text-sm text-muted-foreground">Try adjusting your filters</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedBeats.map((beat) => (
              <BeatCard key={beat.id} {...beat} />
            ))}
          </div>
          {hasMore && (
            <div className="flex justify-center pt-8">
              <Button variant="outline" size="lg" onClick={loadMore}>SHOW MORE</Button>
            </div>
          )}
        </>
      )}

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 h-12 w-12 rounded-full bg-[#8c52ff] hover:bg-[#7a45e8] text-white shadow-lg flex items-center justify-center transition-all duration-300"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </div>
  )
}
