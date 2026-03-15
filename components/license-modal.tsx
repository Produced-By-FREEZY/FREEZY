"use client"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { Check } from "lucide-react"

interface License {
  name: string
  price: string
  features: string[]
  isContact?: boolean
  popular?: boolean
}

const licenses: License[] = [
  {
    name: "Basic",
    price: "$29.99",
    features: ["MP3 Download", "Non-Profit Use", "2,000 Streams", "Tagged Version"],
  },
  {
    name: "Pro",
    price: "$49.99",
    popular: true,
    features: ["WAV Download", "For-Profit Use", "10,000 Streams", "Trackout Stems"],
  },
  {
    name: "Pro XL",
    price: "$99.97",
    features: ["Unlimited Streams", "Unlimited Videos", "Distro: 5k Copies", "Trackout Stems"],
  },
  {
    name: "Premium",
    price: "$199.97",
    features: ["Unlimited Everything", "All Files Included", "Highest Quality", "Radio Ready"],
  },
  {
    name: "Exclusive",
    price: "Inquire",
    isContact: true,
    features: ["Full Ownership", "Removed From Store", "Contract Signed", "Buyout"],
  },
]

interface LicenseModalProps {
  isOpen: boolean
  onClose: () => void
  beatTitle: string
  beatBpm: number
  beatImage: string
  // Added the prices prop to receive IDs from your Notion database
  prices: {
    basic: { id: string; amount: number }
    pro: { id: string; amount: number }
    proXl: { id: string; amount: number }
    premium: { id: string; amount: number }
  }
}

export function LicenseModal({ isOpen, onClose, beatTitle, beatBpm, beatImage, prices }: LicenseModalProps) {
  const router = useRouter()

  const handlePurchase = (license: License) => {
    // 1. Map the clicked license name to the key in our prices object
    let licenseKey: "basic" | "pro" | "proXl" | "premium" = "basic"
    
    if (license.name === "Pro") licenseKey = "pro"
    if (license.name === "Pro XL") licenseKey = "proXl"
    if (license.name === "Premium") licenseKey = "premium"

    // 2. Get the specific Stripe Price ID from Notion data
    const stripePriceId = prices ? prices[licenseKey]?.id : ""

    const params = new URLSearchParams({
      title: beatTitle,
      bpm: beatBpm.toString(),
      image: beatImage,
      license: license.name,
      priceId: stripePriceId, // Passing the ID here fixes the "Price ID missing" error
    })

    if (license.isContact) {
      router.push(`/contact?${params.toString()}&type=exclusive`)
    } else {
      router.push(`/checkout?${params.toString()}`)
    }
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] lg:max-w-[1200px] bg-[#0a0a0a] border-white/10 p-0 overflow-hidden border-none shadow-2xl">
        
        {/* Header Section */}
        <div className="p-6 border-b border-white/5 bg-gradient-to-r from-black to-[#111]">
          <div className="flex items-center gap-4">
            <img 
              src={beatImage || "/placeholder.svg"} 
              alt={beatTitle} 
              className="w-16 h-16 rounded-md object-cover ring-1 ring-white/20 shadow-2xl" 
            />
            <div>
              <DialogTitle className="text-2xl font-black text-white uppercase tracking-tighter">
                Select License
              </DialogTitle>
              <p className="text-sm text-gray-400 font-medium">
                {beatTitle} <span className="text-primary/60 ml-2">// {beatBpm} BPM</span>
              </p>
            </div>
          </div>
        </div>

        {/* License Grid */}
        <div className="p-4 lg:p-8 overflow-x-auto custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 min-w-[1000px] lg:min-w-0 pb-4">
            {licenses.map((license) => (
              <div
                key={license.name}
                className={`relative group flex flex-col p-6 rounded-2xl transition-all duration-300 border ${
                  license.popular 
                    ? "bg-white/[0.03] border-primary/50 shadow-[0_0_40px_-15px_rgba(140,82,255,0.3)] scale-[1.02] z-10" 
                    : license.isContact 
                    ? "bg-primary/5 border-primary/20" 
                    : "bg-white/[0.01] border-white/5 hover:border-white/20"
                }`}
              >
                {license.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-[10px] font-black px-3 py-1 rounded-full uppercase text-white tracking-widest shadow-xl">
                    Best Value
                  </div>
                )}

                <div className="mb-8">
                  <h3 className={`text-[10px] font-black uppercase tracking-[0.2em] mb-2 ${license.popular ? "text-primary" : "text-gray-500"}`}>
                    {license.name}
                  </h3>
                  <p className="text-3xl font-black text-white tracking-tighter">
                    {license.price}
                  </p>
                </div>

                <ul className="space-y-4 mb-10 flex-1">
                  {license.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-[11px] text-gray-400 group-hover:text-gray-200 transition-colors">
                      <Check className="w-3 h-3 text-primary flex-shrink-0" />
                      <span className="leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handlePurchase(license)}
                  className={`w-full py-6 font-bold uppercase tracking-widest text-[10px] rounded-xl transition-all ${
                    license.popular 
                      ? "bg-primary hover:bg-primary/80 text-white shadow-lg shadow-primary/20" 
                      : license.isContact
                      ? "bg-white text-black hover:bg-gray-200"
                      : "bg-white/5 hover:bg-white/10 text-white border border-white/10"
                  }`}
                >
                  {license.isContact ? "Inquire" : "Select"}
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 text-center bg-black/50 border-t border-white/5">
          <p className="text-[10px] text-gray-600 uppercase tracking-widest font-medium">
            Secure checkout via Stripe // Instant high-quality delivery
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
