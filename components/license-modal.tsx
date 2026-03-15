"use client"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"

interface License {
  name: string
  price: string
  features: string[]
  isContact?: boolean
}

const licenses: License[] = [
  {
    name: "Basic",
    price: "$29.99",
    features: ["MP3 Download", "Non-Profit Use", "2,000 Streams", "1 Music Video", "Tagged Version"],
  },
  {
    name: "Pro",
    price: "$49.99",
    features: [
      "WAV Download",
      "For-Profit Use",
      "10,000 Streams",
      "3 Music Videos",
      "Untagged Version",
      "Trackout Stems",
    ],
  },
  {
    name: "Pro XL",
    price: "$99.97",
    features: [
      "WAV Download",
      "Trackout Stems",
      "Unlimited Streams",
      "Unlimited Music Videos",
      "Untagged Version",
      "Distribution Copies: 5,000",
    ],
  },
  {
    name: "Premium",
    price: "$199.97",
    features: [
      "WAV Download",
      "Trackout Stems",
      "Unlimited Streams",
      "Unlimited Music Videos",
      "Untagged Version",
      "All Files Included",
    ],
  },
  {
    name: "Exclusive",
    price: "Request Pricing",
    isContact: true,
    features: [
      "Full Ownership Rights",
      "WAV + Trackout Stems",
      "Unlimited Everything",
      "Beat Removed from Store",
      "Producer Credit Optional",
    ],
  },
]

interface LicenseModalProps {
  isOpen: boolean
  onClose: () => void
  beatTitle: string
  beatBpm: number
  beatImage: string
}

export function LicenseModal({ isOpen, onClose, beatTitle, beatBpm, beatImage }: LicenseModalProps) {
  const router = useRouter()

  const handlePurchase = (license: License) => {
    const params = new URLSearchParams({
      title: beatTitle,
      bpm: beatBpm.toString(),
      image: beatImage,
      license: license.name,
    })

    if (license.isContact) {
      // Redirect to contact page for Exclusive requests
      router.push(`/contact?${params.toString()}&type=exclusive`)
    } else {
      // Standard Stripe Checkout flow
      router.push(`/checkout?${params.toString()}`)
    }
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl bg-card border-border max-h-[95vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="text-2xl font-bold text-white">Choose Your License</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-1 custom-scrollbar">
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg mb-4 border border-border/50">
            <img src={beatImage || "/placeholder.svg"} alt={beatTitle} className="w-16 h-16 rounded object-cover shadow-lg" />
            <div>
              <h3 className="font-bold text-white text-lg">{beatTitle}</h3>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">{beatBpm} BPM | Produced by FЯEEZY</p>
            </div>
          </div>

          {/* Grid updated to 3 columns on desktop to accommodate 5 tiers */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {licenses.map((license) => (
              <div
                key={license.name}
                className={`border-2 rounded-xl p-5 transition-all duration-200 flex flex-col hover:shadow-2xl ${
                  license.name === "Pro"
                    ? "border-primary bg-primary/5 ring-1 ring-primary/20 scale-[1.02]"
                    : "border-border bg-muted/20 hover:border-white/30"
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white">{license.name}</h3>
                    {license.name === "Pro" && (
                      <Badge className="bg-primary text-primary-foreground text-[10px] uppercase font-black">Most Popular</Badge>
                    )}
                  </div>
                  <p className="text-2xl font-black text-primary tracking-tighter">{license.price}</p>
                </div>

                <ul className="space-y-2 flex-1 mt-4 mb-6">
                  {license.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-[13px] text-gray-300">
                      <span className="text-primary font-bold">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full font-bold uppercase tracking-widest text-xs py-5 ${
                    license.isContact 
                    ? "bg-white text-black hover:bg-gray-200" 
                    : "bg-primary hover:bg-primary/90 text-white"
                  }`}
                  onClick={() => handlePurchase(license)}
                >
                  {license.isContact ? "Contact for Pricing" : `Select ${license.name}`}
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-muted/30 rounded-lg border border-border/30">
            <p className="text-[11px] text-muted-foreground text-center leading-relaxed">
              All digital purchases include high-quality files and a legally binding license agreement. 
              Exclusive licenses grant full ownership and the beat will be immediately removed from the store.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
