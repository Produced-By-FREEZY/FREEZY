"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { useState, type FormEvent } from "react"

export function SearchHero() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/beats?search=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <div className="relative w-full overflow-hidden bg-background py-24 md:py-32 px-4">
      <div className="absolute inset-0 hero-gradient-animation opacity-30" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="music-note music-note-1">♪</div>
        <div className="music-note music-note-2">♫</div>
        <div className="music-note music-note-3">♪</div>
        <div className="music-note music-note-4">♫</div>
        <div className="music-note music-note-5">♪</div>
      </div>

      <div className="container max-w-5xl mx-auto text-center space-y-8 relative z-10">
        <div className="space-y-4">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter hero-glitch-text">
            <span className="inline-block hero-text-shimmer bg-gradient-to-r from-[#8c52ff] via-[#a855f7] to-[#8c52ff] bg-clip-text text-transparent">
              FЯEEZY
            </span>
          </h1>
          <div className="flex items-center justify-center gap-3 text-sm md:text-base text-muted-foreground font-medium">
            <span className="px-3 py-1 rounded-full bg-[#8c52ff]/10 border border-[#8c52ff]/20 text-[#8c52ff] animate-pulse-slow">
              Premium Beats
            </span>
            <span className="text-muted-foreground/50">•</span>
            <span className="px-3 py-1 rounded-full bg-[#a855f7]/10 border border-[#a855f7]/20 text-[#a855f7] animate-pulse-slow animation-delay-300">
              Type Beats
            </span>
            <span className="text-muted-foreground/50">•</span>
            <span className="px-3 py-1 rounded-full bg-[#8c52ff]/10 border border-[#8c52ff]/20 text-[#8c52ff] animate-pulse-slow animation-delay-600">
              Sound Kits
            </span>
          </div>
        </div>

        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Premium instrumentals crafted for your next hit
        </p>

        <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto group">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#8c52ff] via-[#a855f7] to-[#8c52ff] rounded-2xl blur-lg opacity-25 group-hover:opacity-40 transition duration-500" />
          <div className="relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-hover:text-[#8c52ff] transition-colors" />
            <Input
              type="search"
              placeholder="Search beats by genre, mood, or BPM..."
              className="h-16 pl-14 pr-6 text-base bg-card/80 backdrop-blur-sm border-2 border-border hover:border-[#8c52ff]/50 focus:border-[#8c52ff] rounded-xl transition-all shadow-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>

        <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto pt-8">
          <div className="space-y-1 hero-stat-fade-in">
            <div className="text-3xl md:text-4xl font-bold text-[#8c52ff] counter-animation">500+</div>
            <div className="text-xs md:text-sm text-muted-foreground">Premium Beats</div>
          </div>
          <div className="space-y-1 hero-stat-fade-in animation-delay-200">
            <div className="text-3xl md:text-4xl font-bold text-[#a855f7] counter-animation">50K+</div>
            <div className="text-xs md:text-sm text-muted-foreground">Downloads</div>
          </div>
          <div className="space-y-1 hero-stat-fade-in animation-delay-400">
            <div className="text-3xl md:text-4xl font-bold text-[#8c52ff] counter-animation">100+</div>
            <div className="text-xs md:text-sm text-muted-foreground">Artists Served</div>
          </div>
        </div>
      </div>
    </div>
  )
}
