"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { ChevronDown, ChevronUp, SlidersHorizontal } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

interface FilterSection {
  title: string
  options: string[]
}

const filterSections: FilterSection[] = [
  {
    title: "Category",
    options: ["SAMPLE PACK", "DRUM KIT", "LOOP KIT"],
  },
  {
    title: "Tags",
    options: [
      "Loops",
      "Drum Kit",
      "Samples",
      "808s",
      "Hi-Hats",
      "Snares",
      "Kicks",
      "Percussion",
      "Melodies",
      "Vocals",
      "FX",
      "One Shots",
      "MIDI",
      "Presets",
    ],
  },
]

interface KitFilterSidebarProps {
  onFiltersChange?: (filters: KitFilterState) => void
  onClearFilters?: () => void
}

export interface KitFilterState {
  selectedCategories: string[]
  selectedTags: string[]
  selectedMoods: string[]
  showFeaturedOnly: boolean
  priceRange: [number, number]
}

export function KitFilterSidebar({ onFiltersChange, onClearFilters }: KitFilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>([
    ...filterSections.map((section) => section.title),
    "Style/Mood",
  ])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedMoods, setSelectedMoods] = useState<string[]>([])
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200])

  const moodOptions = [
    "Dark",
    "Chill",
    "Aggressive",
    "Emotional",
    "Uplifting",
    "Energetic",
    "Melodic",
    "Hard",
    "Smooth",
    "Atmospheric",
    "Bouncy",
    "Groovy",
    "Intense",
    "Relaxing",
  ]

  useEffect(() => {
    if (onFiltersChange) {
      onFiltersChange({
        selectedCategories,
        selectedTags,
        selectedMoods,
        showFeaturedOnly,
        priceRange,
      })
    }
  }, [selectedCategories, selectedTags, selectedMoods, showFeaturedOnly, priceRange, onFiltersChange])

  const toggleSection = (title: string) => {
    setExpandedSections((prev) => (prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]))
  }

  const handleFilterChange = (section: string, option: string, checked: boolean) => {
    const setterMap: Record<string, React.Dispatch<React.SetStateAction<string[]>>> = {
      Category: setSelectedCategories,
      Tags: setSelectedTags,
      "Style/Mood": setSelectedMoods,
    }

    const setter = setterMap[section]
    if (setter) {
      setter((prev) => (checked ? [...prev, option] : prev.filter((item) => item !== option)))
    }
  }

  const getSelectedItems = (section: string): string[] => {
    const itemsMap: Record<string, string[]> = {
      Category: selectedCategories,
      Tags: selectedTags,
      "Style/Mood": selectedMoods,
    }
    return itemsMap[section] || []
  }

  const clearAllFilters = () => {
    setSelectedCategories([])
    setSelectedTags([])
    setSelectedMoods([])
    setShowFeaturedOnly(false)
    setPriceRange([0, 200])
    if (onClearFilters) {
      onClearFilters()
    }
  }

  return (
    <aside className="w-full lg:w-72 space-y-6">
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-bold text-foreground">Filter Kits</h3>
        </div>

        <div className="space-y-3 pb-4 border-b border-border">
          <h4 className="text-sm font-semibold text-foreground">Price Range</h4>
          <div className="px-2">
            <Slider
              min={0}
              max={200}
              step={5}
              value={priceRange}
              onValueChange={(value) => setPriceRange(value as [number, number])}
              className="w-full"
            />
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>${priceRange[0]}</span>
              <span>to</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        </div>

        <div className="space-y-3 pb-4 border-b border-border">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="featured-kits-only"
              checked={showFeaturedOnly}
              onCheckedChange={(checked) => setShowFeaturedOnly(checked as boolean)}
            />
            <Label
              htmlFor="featured-kits-only"
              className="text-sm font-semibold text-foreground cursor-pointer hover:text-primary"
            >
              Featured Kits Only
            </Label>
          </div>
        </div>

        {filterSections.map((section) => (
          <div key={section.title} className="space-y-3 pb-4 border-b border-border">
            <Button
              variant="ghost"
              className="w-full justify-between p-0 h-auto font-semibold text-foreground hover:bg-transparent"
              onClick={() => toggleSection(section.title)}
            >
              <span className="flex items-center gap-2">
                {expandedSections.includes(section.title) ? (
                  <ChevronDown className="h-4 w-4 text-primary" />
                ) : (
                  <ChevronUp className="h-4 w-4" />
                )}
                {section.title}
              </span>
            </Button>

            {expandedSections.includes(section.title) && (
              <div className="space-y-2 pl-6 max-h-64 overflow-y-auto scrollbar-hide">
                {section.options.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <Checkbox
                      id={`${section.title}-${option}`}
                      checked={getSelectedItems(section.title).includes(option)}
                      onCheckedChange={(checked) => handleFilterChange(section.title, option, checked as boolean)}
                    />
                    <Label
                      htmlFor={`${section.title}-${option}`}
                      className="text-sm text-muted-foreground cursor-pointer hover:text-foreground"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        <div className="space-y-3 pb-4 border-b border-border">
          <Button
            variant="ghost"
            className="w-full justify-between p-0 h-auto font-semibold text-foreground hover:bg-transparent"
            onClick={() => toggleSection("Style/Mood")}
          >
            <span className="flex items-center gap-2">
              {expandedSections.includes("Style/Mood") ? (
                <ChevronDown className="h-4 w-4 text-primary" />
              ) : (
                <ChevronUp className="h-4 w-4" />
              )}
              Style/Mood
            </span>
          </Button>

          {expandedSections.includes("Style/Mood") && (
            <div className="space-y-2 pl-6 max-h-64 overflow-y-auto scrollbar-hide">
              {moodOptions.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox
                    id={`Style/Mood-${option}`}
                    checked={getSelectedItems("Style/Mood").includes(option)}
                    onCheckedChange={(checked) => handleFilterChange("Style/Mood", option, checked as boolean)}
                  />
                  <Label
                    htmlFor={`Style/Mood-${option}`}
                    className="text-sm text-muted-foreground cursor-pointer hover:text-foreground"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          )}
        </div>

        <Button variant="outline" className="w-full bg-transparent" onClick={clearAllFilters}>
          Clear All Filters
        </Button>
      </div>
    </aside>
  )
}
