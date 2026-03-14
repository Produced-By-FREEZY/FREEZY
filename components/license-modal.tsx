"use client"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"

interface License {
  name: string
  price: string
  features: string[]
}

const licenses: License[] = [
  {
    name: "Basic",
    price: "$30",
    features: ["MP3 Download", "Non-Profit Use", "2,000 Streams", "1 Music Video", "Tagged Version"],
  },
  {
    name: "Pro",
    price: "$75",
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
    price: "$100",
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
    name: "Exclusive",
    price: "Request Pricing",
    features: [
      "WAV Download",
      "Trackout Stems",
      "Full Ownership Rights",
      "Unlimited Streams",
      "Unlimited Music Videos",
      "All Files Included",
      "Producer Credit Optional",
      "Beat Removed from Store",
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

  const handlePurchase = (licenseName: string) => {
    const params = new URLSearchParams({
      title: beatTitle,
      bpm: beatBpm.toString(),
      image: beatImage,
      license: licenseName,
    })
    router.push(`/checkout?${params.toString()}`)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl bg-card border-border max-h-[95vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="text-2xl font-bold text-foreground">Choose Your License</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-1">
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg mb-3">
            <img src={beatImage || "/placeholder.svg"} alt={beatTitle} className="w-14 h-14 rounded object-cover" />
            <div>
              <h3 className="font-semibold text-foreground text-sm">{beatTitle}</h3>
              <p className="text-xs text-muted-foreground">({beatBpm} BPM)</p>
              <p className="text-xs text-muted-foreground">Produced by: FЯEEZY</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {licenses.map((license) => (
              <div
                key={license.name}
                className={`border-2 rounded-lg p-4 transition-colors flex flex-col ${
                  license.name === "Pro"
                    ? "border-[#8c52ff] hover:border-[#a855f7]"
                    : "border-border hover:border-white/50"
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-foreground">{license.name}</h3>
                    {license.name === "Pro" && (
                      <Badge className="bg-primary text-primary-foreground text-xs">Most Popular</Badge>
                    )}
                  </div>
                  <p className="text-xl font-bold text-primary">{license.price}</p>
                </div>

                <ul className="space-y-1.5 flex-1 mt-3">
                  {license.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <span className="text-primary mt-0.5">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-sm py-2 mt-3"
                  onClick={() => handlePurchase(license.name)}
                >
                  {license.price === "Request Pricing" ? "Contact for Pricing" : `Buy ${license.name}`}
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-3 p-3 bg-muted/30 rounded-lg">
            <p className="text-xs text-muted-foreground text-center">
              All purchases include instant download and a license agreement. Need help choosing? Contact us for
              assistance.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
