"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { FilterSidebar, type FilterState } from "@/components/filter-sidebar"
import { MarketplaceGrid } from "@/components/marketplace-grid"
import { Footer } from "@/components/footer"
import { Breadcrumb } from "@/components/breadcrumb"

interface BeatsPageProps {
  searchParams: { search?: string; artist?: string }
}

export default function BeatsPage({ searchParams }: BeatsPageProps) {
  const searchQuery = searchParams.search
  const artistParam = searchParams.artist
  const [filters, setFilters] = useState<FilterState | undefined>(undefined)
  const [initialFilters, setInitialFilters] = useState<Partial<FilterState> | undefined>(undefined)
  const router = useRouter()

  useEffect(() => {
    if (!artistParam && !searchQuery) {
      setInitialFilters(undefined)
      setFilters(undefined)
    }
  }, [artistParam, searchQuery])

  useEffect(() => {
    if (artistParam) {
      const typeBeatFilter = `${artistParam} Type Beat`
      const newFilters: FilterState = {
        bpmRange: [60, 180],
        selectedTypeBeats: [typeBeatFilter],
        selectedGenres: [],
        selectedMoods: [],
        selectedKeys: [],
        showFreeOnly: false,
      }
      setInitialFilters(newFilters)
      setFilters(newFilters)
    }
  }, [artistParam])

  const handleClearFilters = () => {
    setFilters(undefined)
    setInitialFilters(undefined)
    router.push("/beats")
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "All Beats" }]} />

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">All Beats</h1>
          <p className="text-muted-foreground">
            {artistParam
              ? `Showing ${artistParam} Type Beats`
              : searchQuery
                ? `Search results for "${searchQuery}"`
                : "Browse the complete collection of beats by FЯEEZY"}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <FilterSidebar
            searchQuery={searchQuery}
            initialFilters={initialFilters}
            onFiltersChange={setFilters}
            onClearFilters={handleClearFilters}
          />
          <div className="flex-1">
            <MarketplaceGrid searchQuery={searchQuery} filters={filters} onClearFilters={handleClearFilters} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
