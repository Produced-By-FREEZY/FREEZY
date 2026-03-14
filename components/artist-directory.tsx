"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

const ALL_TYPE_BEATS = [
  // Hip Hop / Rap - Top Tier
  "Drake",
  "Kendrick Lamar",
  "Travis Scott",
  "Kanye West",
  "Lil Baby",
  "Future",
  "Playboi Carti",
  "21 Savage",
  "Gunna",
  "Young Thug",
  "Lil Uzi Vert",
  "Post Malone",
  "J. Cole",
  "Juice WRLD",
  "Pop Smoke",
  "Roddy Ricch",
  "DaBaby",
  "Polo G",
  "Lil Durk",
  "NBA YoungBoy",
  "Jack Harlow",
  "Tyler The Creator",
  "A$AP Rocky",
  "Kid Cudi",
  "Don Toliver",
  "Trippie Redd",
  "Lil Tjay",
  "Lil Tecca",
  "Yeat",
  "Ken Carson",

  // Hip Hop Legends
  "Eminem",
  "Jay-Z",
  "Nas",
  "50 Cent",
  "Snoop Dogg",
  "Dr. Dre",
  "Lil Wayne",
  "2Pac",
  "Notorious B.I.G.",
  "Ice Cube",
  "DMX",
  "Outkast",

  // R&B / Soul - Top Artists
  "The Weeknd",
  "SZA",
  "Bryson Tiller",
  "Frank Ocean",
  "Brent Faiyaz",
  "Summer Walker",
  "H.E.R.",
  "Khalid",
  "6LACK",
  "PARTYNEXTDOOR",
  "Jhené Aiko",
  "Kehlani",
  "Chris Brown",
  "Usher",
  "Beyoncé",
  "Rihanna",
  "Alicia Keys",
  "Daniel Caesar",
  "Giveon",
  "Ari Lennox",

  // Female Rap
  "Nicki Minaj",
  "Cardi B",
  "Megan Thee Stallion",
  "Doja Cat",
  "Ice Spice",
  "Saweetie",
  "GloRilla",

  // UK Rap / Drill / Grime
  "Central Cee",
  "Dave",
  "Stormzy",
  "Skepta",
  "J Hus",
  "Headie One",
  "Digga D",
  "AJ Tracey",
  "Fredo",
  "Giggs",

  // Afrobeat / African
  "Burna Boy",
  "Wizkid",
  "Davido",
  "Tems",
  "Rema",
  "Asake",
  "Fireboy DML",
  "CKay",
  "Omah Lay",
  "Ayra Starr",

  // Latin / Reggaeton
  "Bad Bunny",
  "J Balvin",
  "Ozuna",
  "Anuel AA",
  "Karol G",
  "Maluma",
  "Daddy Yankee",
  "Rauw Alejandro",
  "Myke Towers",
  "Feid",
  "Peso Pluma",
  "Rosalía",
  "Bizarrap",

  // Pop - Major Artists
  "Taylor Swift",
  "Ariana Grande",
  "Billie Eilish",
  "Dua Lipa",
  "Ed Sheeran",
  "Justin Bieber",
  "Harry Styles",
  "Olivia Rodrigo",
  "Sabrina Carpenter",
  "Lady Gaga",
  "Miley Cyrus",
  "Selena Gomez",
  "Shawn Mendes",
  "Charlie Puth",

  // Alternative / Indie / Rock
  "Tame Impala",
  "The Neighbourhood",
  "Arctic Monkeys",
  "Twenty One Pilots",
  "Imagine Dragons",
  "Coldplay",
  "The 1975",
  "Joji",
  "Lorde",
  "Glass Animals",

  // Electronic / EDM
  "Calvin Harris",
  "The Chainsmokers",
  "Marshmello",
  "Kygo",
  "Martin Garrix",
  "David Guetta",
  "Skrillex",
  "Diplo",
  "Flume",
  "Odesza",

  // Drill (Chicago / NY)
  "Chief Keef",
  "King Von",
  "Fivio Foreign",
  "Sheff G",
  "Sleepy Hallow",
  "Kay Flock",
  "G Herbo",

  // Detroit
  "42 Dugg",
  "Babyface Ray",
  "Veeze",
  "Baby Smoove",
  "Rio Da Yung OG",

  // Atlanta Trap
  "Migos",
  "Quavo",
  "Offset",
  "Gucci Mane",
  "Young Nudy",
  "Lil Yachty",

  // Melodic / Emo Rap
  "Lil Peep",
  "XXXTentacion",
  "Iann Dior",

  // Rage / Plugg
  "Destroy Lonely",
  "SoFaygo",
  "SSGKobe",
  "Summrs",

  // Top Producers
  "Metro Boomin",
  "Pierre Bourne",
  "Wheezy",
  "Nick Mira",
  "Kenny Beats",
  "Mike Will Made-It",
  "Murda Beatz",
  "Tay Keith",
  "Southside",
  "DJ Mustard",

  // West Coast
  "YG",
  "Schoolboy Q",
  "Nipsey Hussle",
  "Blxst",
  "Ty Dolla Sign",
  "Larry June",

  // Florida
  "Kodak Black",
  "Rick Ross",
  "Denzel Curry",
  "Rod Wave",

  // Memphis / Phonk
  "Three 6 Mafia",
  "Juicy J",
  "Project Pat",

  // Reggae / Dancehall
  "Vybz Kartel",
  "Popcaan",
  "Sean Paul",
  "Shenseea",
  "Skillibeng",

  // Country
  "Morgan Wallen",
  "Luke Combs",
  "Kane Brown",
  "Chris Stapleton",

  // K-Pop
  "BTS",
  "BLACKPINK",
  "Stray Kids",
  "NewJeans",

  // Jazz / Lo-Fi
  "Nujabes",
  "J Dilla",
  "MF DOOM",
  "Madlib",

  // Additional Top Artists
  "Meek Mill",
  "Big Sean",
  "Wiz Khalifa",
  "French Montana",
  "Moneybagg Yo",
  "EST Gee",
  "Pooh Shiesty",
  "Key Glock",
  "NLE Choppa",
  "Lil Mosey",
  "Lil Nas X",
  "Machine Gun Kelly",
  "Logic",
  "Cordae",
  "JID",
  "Joey Bada$$",
  "Anderson .Paak",
  "Baby Keem",
  "Vince Staples",
  "Freddie Gibbs",
  "Pusha T",
  "Benny The Butcher",
  "Conway The Machine",
  "Westside Gunn",
  "Boldy James",
  "Tory Lanez",
  "Nav",
  "Swae Lee",
  "Rae Sremmurd",
  "A Boogie",
  "PnB Rock",
  "Lil Skies",
  "Ski Mask",
  "Smokepurpp",
  "Lil Pump",
]

export function ArtistDirectory() {
  const [dbArtists, setDbArtists] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchArtists() {
      try {
        const response = await fetch("/api/beats/artists")
        const data = await response.json()
        setDbArtists(data.artists || [])
      } catch (error) {
        console.error("Failed to fetch artists:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchArtists()
  }, [])

  const allArtists = Array.from(new Set([...dbArtists, ...ALL_TYPE_BEATS])).sort()

  if (loading) {
    return null
  }

  return (
    <section className="bg-[#0f1419] border-t border-border py-8">
      <div className="container mx-auto px-4">
        <div className="space-y-3">
          <div className="flex items-start gap-x-3 text-sm">
            <span className="text-gray-400 font-medium min-w-[120px] pt-1">TYPE BEATS:</span>
            <div className="flex-1 flex flex-wrap items-center gap-x-2 gap-y-2">
              {allArtists.map((artist, index) => (
                <>
                  <Link
                    key={artist}
                    href={`/beats?artist=${encodeURIComponent(artist)}`}
                    className="text-gray-500 hover:text-white hover:font-bold transition-all duration-200 whitespace-nowrap"
                  >
                    {artist}
                  </Link>
                  {index < allArtists.length - 1 && (
                    <span key={`sep-${index}`} className="text-gray-700">
                      |
                    </span>
                  )}
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
