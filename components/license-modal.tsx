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
      priceId: stripePriceId,
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
      <DialogContent className="max-w-[95vw] lg:max-w-[1200px] bg-[#050505] border-white/10 p-0 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,1)] border-none">
        
        {/* Modern Header Section */}
        <div className="p-8 border-b border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent">
          <div className="flex items-center gap-6">
            <div className="relative">
              <img 
                src={beatImage || "/placeholder.svg"} 
                alt={beatTitle} 
                className="w-20 h-20 rounded-xl object-cover ring-1 ring-white/20 shadow-2xl" 
              />
              <div className="absolute inset-0 rounded-xl bg-primary/20 blur-xl -z-10 animate-pulse" />
            </div>
            <div>
              <DialogTitle className="text-3xl font-black text-white uppercase tracking-tighter">
                Select License
              </DialogTitle>
              <p className="text-gray-400 font-medium tracking-wide">
                {beatTitle} <span className="text-primary mx-2">|</span> {beatBpm} BPM
              </p>
            </div>
          </div>
        </div>

        {/* License Grid */}
        <div className="p-6 lg:p-10 overflow-x-auto custom-scrollbar bg-black">
          <div className="flex lg:grid lg:grid-cols-5 gap-5 min-w-max lg:min-w-0 pb-4">
            {licenses.map((license) => (
              <div
                key={license.name}
                className={`relative group flex flex-col p-7 rounded-2xl transition-all duration-500 border ${
                  license.popular 
                    ? "bg-[#0a0a0a] border-primary shadow-[0_0_30px_-10px_rgba(140,82,255,0.4)] scale-105 z-10" 
                    : "bg-[#080808] border-white/5 hover:border-white/20"
                }`}
              >
                {license.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-[10px] font-black px-4 py-1.5 rounded-full uppercase text-white tracking-[0.2em] shadow-lg">
                    Best Value
                  </div>
                )}

                <div className="mb-8">
                  <h3 className={`text-[11px] font-bold uppercase tracking-[0.3em] mb-3 ${license.popular ? "text-primary" : "text-gray-500"}`}>
                    {license.name}
                  </h3>
                  <p className="text-4xl font-black text-white tracking-tighter">
                    {license.price}
                  </p>
                </div>

                <ul className="space-y-4 mb-10 flex-1">
                  {license.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-[12px] text-gray-400 leading-tight">
                      <Check className={`w-4 h-4 shrink-0 ${license.popular ? "text-primary" : "text-gray-600"}`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handlePurchase(license)}
                  className={`w-full py-7 font-black uppercase tracking-[0.15em] text-[11px] rounded-xl transition-all duration-300 ${
                    license.popular 
                      ? "bg-primary hover:bg-primary/80 text-white shadow-[0_10px_20px_-5px_rgba(140,82,255,0.5)]" 
                      : "bg-white/5 hover:bg-white/10 text-white border border-white/10"
                  }`}
                >
                  {license.isContact ? "Contact Me" : "Select License"}
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="p-5 text-center bg-[#050505] border-t border-white/5">
          <p className="text-[10px] text-gray-600 uppercase tracking-[0.3em] font-bold">
            Secure checkout via Stripe // Instant high-quality delivery
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
