"use client"

import type React from "react"
import { useState, useEffect, useMemo } from "react"
import { ChevronDown, ChevronUp, SlidersHorizontal, Search, X } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface FilterSection {
  title: string
  options: string[]
}

const filterSections: FilterSection[] = [
  {
    title: "Type Beats",
    options: [
      "Drake Type Beat", "Kendrick Lamar Type Beat", "Travis Scott Type Beat", "Kanye West Type Beat",
      "Lil Baby Type Beat", "Future Type Beat", "Playboi Carti Type Beat", "21 Savage Type Beat",
      "Gunna Type Beat", "Young Thug Type Beat", "Lil Uzi Vert Type Beat", "Post Malone Type Beat",
      "J. Cole Type Beat", "Juice WRLD Type Beat", "Pop Smoke Type Beat", "Roddy Ricch Type Beat",
      "DaBaby Type Beat", "Polo G Type Beat", "Lil Durk Type Beat", "NBA YoungBoy Type Beat",
      "Jack Harlow Type Beat", "Tyler The Creator Type Beat", "A$AP Rocky Type Beat", "Kid Cudi Type Beat",
      "Don Toliver Type Beat", "Trippie Redd Type Beat", "Lil Tjay Type Beat", "Lil Tecca Type Beat",
      "Yeat Type Beat", "Ken Carson Type Beat", "Eminem Type Beat", "Jay-Z Type Beat", "Nas Type Beat",
      "50 Cent Type Beat", "Snoop Dogg Type Beat", "Dr. Dre Type Beat", "Lil Wayne Type Beat",
      "2Pac Type Beat", "Notorious B.I.G. Type Beat", "Ice Cube Type Beat", "DMX Type Beat",
      "Outkast Type Beat", "The Weeknd Type Beat", "SZA Type Beat", "Bryson Tiller Type Beat",
      "Frank Ocean Type Beat", "Brent Faiyaz Type Beat", "Summer Walker Type Beat", "H.E.R. Type Beat",
      "Khalid Type Beat", "6LACK Type Beat", "PARTYNEXTDOOR Type Beat", "Jhené Aiko Type Beat",
      "Kehlani Type Beat", "Chris Brown Type Beat", "Usher Type Beat", "Beyoncé Type Beat",
      "Rihanna Type Beat", "Alicia Keys Type Beat", "Daniel Caesar Type Beat", "Giveon Type Beat",
      "Ari Lennox Type Beat", "Nicki Minaj Type Beat", "Cardi B Type Beat", "Megan Thee Stallion Type Beat",
      "Doja Cat Type Beat", "Ice Spice Type Beat", "Saweetie Type Beat", "GloRilla Type Beat",
      "Central Cee Type Beat", "Dave Type Beat", "Stormzy Type Beat", "Skepta Type Beat",
      "J Hus Type Beat", "Headie One Type Beat", "Digga D Type Beat", "AJ Tracey Type Beat",
      "Fredo Type Beat", "Giggs Type Beat", "Burna Boy Type Beat", "Wizkid Type Beat",
      "Davido Type Beat", "Tems Type Beat", "Rema Type Beat", "Asake Type Beat", "Fireboy DML Type Beat",
      "CKay Type Beat", "Omah Lay Type Beat", "Ayra Starr Type Beat", "Bad Bunny Type Beat",
      "J Balvin Type Beat", "Ozuna Type Beat", "Anuel AA Type Beat", "Karol G Type Beat",
      "Maluma Type Beat", "Daddy Yankee Type Beat", "Rauw Alejandro Type Beat", "Myke Towers Type Beat",
      "Feid Type Beat", "Peso Pluma Type Beat", "Rosalía Type Beat", "Bizarrap Type Beat",
      "Taylor Swift Type Beat", "Ariana Grande Type Beat", "Billie Eilish Type Beat", "Dua Lipa Type Beat",
      "Ed Sheeran Type Beat", "Justin Bieber Type Beat", "Harry Styles Type Beat", "Olivia Rodrigo Type Beat",
      "Sabrina Carpenter Type Beat", "Lady Gaga Type Beat", "Miley Cyrus Type Beat", "Selena Gomez Type Beat",
      "Shawn Mendes Type Beat", "Charlie Puth Type Beat", "Tame Impala Type Beat", "The Neighbourhood Type Beat",
      "Arctic Monkeys Type Beat", "Twenty One Pilots Type Beat", "Imagine Dragons Type Beat",
      "Coldplay Type Beat", "The 1975 Type Beat", "Joji Type Beat", "Lorde Type Beat",
      "Glass Animals Type Beat", "Calvin Harris Type Beat", "The Chainsmokers Type Beat",
      "Marshmello Type Beat", "Kygo Type Beat", "Martin Garrix Type Beat", "David Guetta Type Beat",
      "Skrillex Type Beat", "Diplo Type Beat", "Flume Type Beat", "Odesza Type Beat",
      "Chief Keef Type Beat", "King Von Type Beat", "Fivio Foreign Type Beat", "Sheff G Type Beat",
      "Sleepy Hallow Type Beat", "Kay Flock Type Beat", "G Herbo Type Beat", "42 Dugg Type Beat",
      "Babyface Ray Type Beat", "Veeze Type Beat", "Baby Smoove Type Beat", "Rio Da Yung OG Type Beat",
      "Migos Type Beat", "Quavo Type Beat", "Offset Type Beat", "Gucci Mane Type Beat",
      "Young Nudy Type Beat", "Lil Yachty Type Beat", "Lil Peep Type Beat", "XXXTentacion Type Beat",
      "Iann Dior Type Beat", "Destroy Lonely Type Beat", "SoFaygo Type Beat", "SSGKobe Type Beat",
      "Summrs Type Beat", "Metro Boomin Type Beat", "Pierre Bourne Type Beat", "Wheezy Type Beat",
      "Nick Mira Type Beat", "Kenny Beats Type Beat", "Mike Will Made-It Type Beat", "Murda Beatz Type Beat",
      "Tay Keith Type Beat", "Southside Type Beat", "DJ Mustard Type Beat", "YG Type Beat",
      "Schoolboy Q Type Beat", "Nipsey Hussle Type Beat", "Blxst Type Beat", "Ty Dolla Sign Type Beat",
      "Larry June Type Beat", "Kodak Black Type Beat", "Rick Ross Type Beat", "Denzel Curry Type Beat",
      "Rod Wave Type Beat", "Three 6 Mafia Type Beat", "Juicy J Type Beat", "Project Pat Type Beat",
      "Vybz Kartel Type Beat", "Popcaan Type Beat", "Sean Paul Type Beat", "Shenseea Type Beat",
      "Skillibeng Type Beat", "Morgan Wallen Type Beat", "Luke Combs Type Beat", "Kane Brown Type Beat",
      "Chris Stapleton Type Beat", "BTS Type Beat", "BLACKPINK Type Beat", "Stray Kids Type Beat",
      "NewJeans Type Beat", "Nujabes Type Beat", "J Dilla Type Beat", "MF DOOM Type Beat",
      "Madlib Type Beat", "Meek Mill Type Beat", "Big Sean Type Beat", "Wiz Khalifa Type Beat",
      "French Montana Type Beat", "Moneybagg Yo Type Beat", "EST Gee Type Beat", "Pooh Shiesty Type Beat",
      "Key Glock Type Beat", "NLE Choppa Type Beat", "Lil Mosey Type Beat", "Lil Nas X Type Beat",
      "Machine Gun Kelly Type Beat", "Logic Type Beat", "Cordae Type Beat", "JID Type Beat",
      "Joey Bada$$ Type Beat", "Anderson .Paak Type Beat", "Baby Keem Type Beat", "Vince Staples Type Beat",
      "Freddie Gibbs Type Beat", "Pusha T Type Beat", "Benny The Butcher Type Beat",
      "Conway The Machine Type Beat", "Westside Gunn Type Beat", "Boldy James Type Beat",
      "Tory Lanez Type Beat", "Nav Type Beat", "Swae Lee Type Beat", "Rae Sremmurd Type Beat",
      "A Boogie Type Beat", "PnB Rock Type Beat", "Lil Skies Type Beat", "Ski Mask Type Beat",
      "Smokepurpp Type Beat", "Lil Pump Type Beat",
    ],
  },
{
  title: "Genre",
  options: [
    // Hip Hop & Sub-genres
    "Hip Hop", "Trap", "Drill", "Boom Bap", "Lo-Fi", "Phonk", "Jersey Club", "Detroit Trap", "PluggnB", "Glitchcore", 
    "West Coast", "East Coast", "Southern", "Midwest", "Old School", "Underground",
    
    // R&B & Soul
    "R&B", "Soul", "Neo-Soul", "Funk", "Gospel", "Contemporary R&B", "Quiet Storm", "Disco",
    
    // Pop & Alternative
    "Pop", "Alternative", "Indie Pop", "Hyperpop", "Synthpop", "K-Pop", "Dark Pop",
    
    // Electronic
    "Electronic", "EDM", "House", "Techno", "Dubstep", "Synthwave", "Garage", "Drum & Bass", "Future Bass",
    
    // Global / World
    "Afrobeats", "Amapiano", "Dancehall", "Reggae", "Latin", "Reggaeton", "Bachata", "Trap Latino", "Salsa", "Dembow",
    
    // Rock & Heavy
    "Rock", "Indie", "Punk", "Metal", "Hardcore", "Grunge", "Psychedelic",
    
    // Organic & Scoring
    "Country", "Folk", "Acoustic", "Jazz", "Blues", "Classical", "Cinematic", "Orchestral", "World",
    
    // Mood-Based / Experimental
    "Experimental", "Ambient", "Industrial", "Noise"
  ],
},
{
  title: "Mood/Feel",
  options: [
    // High Energy & Aggression
    "Aggressive", "Hard", "Intense", "Energetic", "Bouncy", "Hype", "Powerful", "Angry", "Epic", "Triumphant", "Rowdy",
    
    // Dark & Mysterious
    "Dark", "Evil", "Gritty", "Scary", "Mysterious", "Trippy", "Creepy", "Eerie", "Haunting", "Gothic",
    
    // Calm & Smooth
    "Chill", "Smooth", "Relaxing", "Mellow", "Lazy", "Zen", "Minimalist", "Peaceful",
    
    // Atmospheric & Spacey
    "Atmospheric", "Dreamy", "Ethereal", "Spacey", "Ambient", "Lush", "Cloudy", "Hypnotic",
    
    // Emotional & Deep
    "Emotional", "Sad", "Soulful", "Melancholic", "Depressing", "Lonely", "Nostalgic", "Reflective", "Heartbroken",
    
    // Positive & Bright
    "Uplifting", "Motivational", "Happy", "Inspirational", "Bright", "Hopeful", "Joyful", "Fun",
    
    // Sophisticated & Romantic
    "Romantic", "Sexy", "Sensual", "Elegant", "Luxury", "Sophisticated", "Cinematic", "Regal",
    
    // Raw & Lo-Fi
    "Raw", "Dirty", "Vintage", "Lo-fi", "Industrial", "Distorted"
  ],
},
  {
    title: "Key",
    options: [
      "C Major", "C Minor", "C# Major", "C# Minor", "D Major", "D Minor", "Eb Major", "Eb Minor",
      "E Major", "E Minor", "F Major", "F Minor", "F# Major", "F# Minor", "G Major", "G Minor",
      "G# Major", "G# Minor", "A Major", "A Minor", "Bb Major", "Bb Minor", "B Major", "B Minor",
    ],
  },
]

interface FilterSidebarProps {
  searchQuery?: string
  initialFilters?: Partial<FilterState>
  onFiltersChange?: (filters: FilterState) => void
  onClearFilters?: () => void
}

export interface FilterState {
  bpmRange: [number, number]
  selectedTypeBeats: string[]
  selectedGenres: string[]
  selectedMoods: string[]
  selectedKeys: string[]
  showFreeOnly: boolean
}

export function FilterSidebar({ searchQuery, initialFilters, onFiltersChange, onClearFilters }: FilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(["Genre", "Mood/Feel"])
  const [bpmRange, setBpmRange] = useState<[number, number]>([60, 180])
  const [selectedTypeBeats, setSelectedTypeBeats] = useState<string[]>([])
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [selectedMoods, setSelectedMoods] = useState<string[]>([])
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const [showFreeOnly, setShowFreeOnly] = useState(false)
  
  // Local search for the long "Type Beats" list
  const [artistSearch, setArtistSearch] = useState("")

  // Initial Sync
  useEffect(() => {
    if (initialFilters) {
      if (initialFilters.bpmRange) setBpmRange(initialFilters.bpmRange as [number, number])
      if (initialFilters.selectedTypeBeats) setSelectedTypeBeats(initialFilters.selectedTypeBeats)
      if (initialFilters.selectedGenres) setSelectedGenres(initialFilters.selectedGenres)
      if (initialFilters.selectedMoods) setSelectedMoods(initialFilters.selectedMoods)
      if (initialFilters.selectedKeys) setSelectedKeys(initialFilters.selectedKeys)
      if (initialFilters.showFreeOnly !== undefined) setShowFreeOnly(initialFilters.showFreeOnly)
    }
  }, [initialFilters])

  // Trigger parent update
  useEffect(() => {
    onFiltersChange?.({
      bpmRange,
      selectedTypeBeats,
      selectedGenres,
      selectedMoods,
      selectedKeys,
      showFreeOnly,
    })
  }, [bpmRange, selectedTypeBeats, selectedGenres, selectedMoods, selectedKeys, showFreeOnly])

  const toggleSection = (title: string) => {
    setExpandedSections((prev) => (prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]))
  }

  const handleFilterChange = (section: string, option: string, checked: boolean) => {
    const setters: Record<string, React.Dispatch<React.SetStateAction<string[]>>> = {
      "Type Beats": setSelectedTypeBeats,
      "Genre": setSelectedGenres,
      "Mood/Feel": setSelectedMoods,
      "Key": setSelectedKeys,
    }
    
    const setter = setters[section]
    if (setter) {
      setter(prev => checked ? [...prev, option] : prev.filter(i => i !== option))
    }
  }

  const getSelectedItems = (section: string): string[] => {
    if (section === "Type Beats") return selectedTypeBeats
    if (section === "Genre") return selectedGenres
    if (section === "Mood/Feel") return selectedMoods
    if (section === "Key") return selectedKeys
    return []
  }

  const clearAllFilters = () => {
    setBpmRange([60, 180])
    setSelectedTypeBeats([])
    setSelectedGenres([])
    setSelectedMoods([])
    setSelectedKeys([])
    setShowFreeOnly(false)
    onClearFilters?.()
  }

  return (
    <aside className="w-full lg:w-72 space-y-6 bg-card p-4 rounded-xl border border-border">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-bold">Filters</h3>
          </div>
          {(selectedGenres.length > 0 || selectedTypeBeats.length > 0) && (
             <Button variant="ghost" size="sm" onClick={clearAllFilters} className="h-8 px-2 text-xs text-muted-foreground">
               Reset
             </Button>
          )}
        </div>

        {/* BPM SLIDER */}
        <div className="space-y-4 pb-4 border-b">
          <div className="flex justify-between">
            <Label className="text-sm font-semibold">BPM</Label>
            <span className="text-xs font-mono text-primary">{bpmRange[0]} - {bpmRange[1]}</span>
          </div>
          <Slider 
            value={bpmRange} 
            onValueChange={(val) => setBpmRange(val as [number, number])} 
            min={40} max={220} step={1} 
          />
        </div>

        {/* FREE ONLY TOGGLE */}
        <div className="flex items-center justify-between py-2">
          <Label htmlFor="free-beats" className="text-sm font-medium cursor-pointer">Free Download Only</Label>
          <Checkbox 
            id="free-beats" 
            checked={showFreeOnly} 
            onCheckedChange={(val) => setShowFreeOnly(!!val)} 
          />
        </div>

        {/* DYNAMIC SECTIONS */}
        {filterSections.map((section) => {
          const isExpanded = expandedSections.includes(section.title)
          const activeCount = getSelectedItems(section.title).length

          return (
            <div key={section.title} className="space-y-3 pb-4 border-b border-border/50">
              <Button
                variant="ghost"
                className="w-full justify-between p-0 h-auto hover:bg-transparent group"
                onClick={() => toggleSection(section.title)}
              >
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm">{section.title}</span>
                  {activeCount > 0 && (
                    <Badge variant="secondary" className="h-5 px-1.5 text-[10px] bg-primary/10 text-primary">
                      {activeCount}
                    </Badge>
                  )}
                </div>
                {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
              </Button>

              {isExpanded && (
                <div className="space-y-3 pt-1">
                  {/* Internal search for Type Beats */}
                  {section.title === "Type Beats" && (
                    <div className="relative mb-2">
                      <Search className="absolute left-2 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                      <Input
                        placeholder="Search artists..."
                        className="pl-8 h-8 text-xs bg-muted/50"
                        value={artistSearch}
                        onChange={(e) => setArtistSearch(e.target.value)}
                      />
                    </div>
                  )}

                  <div className="space-y-2 max-h-52 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-border">
                    {section.options
                      .filter(opt => section.title !== "Type Beats" || opt.toLowerCase().includes(artistSearch.toLowerCase()))
                      .map((option) => (
                      <div key={option} className="flex items-center space-x-2 py-0.5">
                        <Checkbox
                          id={`${section.title}-${option}`}
                          checked={getSelectedItems(section.title).includes(option)}
                          onCheckedChange={(checked) => handleFilterChange(section.title, option, !!checked)}
                        />
                        <Label
                          htmlFor={`${section.title}-${option}`}
                          className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                        >
                          {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </aside>
  )
}
