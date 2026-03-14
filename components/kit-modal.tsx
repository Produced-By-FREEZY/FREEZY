"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X, Check } from "lucide-react"
import { useRouter } from "next/navigation"

interface KitModalProps {
  isOpen: boolean
  onClose: () => void
  kitTitle: string
  kitImage: string
  kitCategory: string
}

export function KitModal({ isOpen, onClose, kitTitle, kitImage, kitCategory }: KitModalProps) {
  const router = useRouter()

  const handlePurchase = () => {
    // Navigate to checkout with kit data
    const checkoutData = {
      itemType: "kit",
      title: kitTitle,
      price: 40,
      image: kitImage,
      category: kitCategory,
    }
    router.push(`/checkout?data=${encodeURIComponent(JSON.stringify(checkoutData))}`)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] p-0 bg-[#0a0a0a] border-[#8c52ff]/20">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground z-50"
        >
          <X className="h-4 w-4 text-white" />
          <span className="sr-only">Close</span>
        </button>

        <div className="flex flex-col">
          <DialogHeader className="px-6 pt-6 pb-4">
            <DialogTitle className="text-2xl font-bold text-white">Purchase Kit</DialogTitle>
          </DialogHeader>

          <div className="px-6 pb-6 space-y-4">
            {/* Kit Info */}
            <div className="flex items-start gap-4 pb-4 border-b border-white/10">
              <img src={kitImage || "/placeholder.svg"} alt={kitTitle} className="w-20 h-20 rounded object-cover" />
              <div className="flex-1">
                <h3 className="font-bold text-white text-lg">{kitTitle}</h3>
                <p className="text-sm text-gray-400 mt-1">Produced by: FЯEEZY</p>
                <div className="mt-2">
                  <span className="inline-block bg-[#8c52ff]/20 text-[#8c52ff] px-2 py-1 text-xs font-bold rounded">
                    {kitCategory}
                  </span>
                </div>
              </div>
            </div>

            {/* Single License Option */}
            <div className="bg-gradient-to-br from-[#8c52ff]/10 to-transparent border border-[#8c52ff]/30 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">Full Kit License</h3>
                  <p className="text-sm text-gray-400 mt-1">Complete access to all files</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-white">$40</div>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Check className="w-4 h-4 text-[#8c52ff]" />
                  <span>Instant Download</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Check className="w-4 h-4 text-[#8c52ff]" />
                  <span>All Files Included (WAV, MIDI, Presets)</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Check className="w-4 h-4 text-[#8c52ff]" />
                  <span>Unlimited Use in Your Productions</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Check className="w-4 h-4 text-[#8c52ff]" />
                  <span>Commercial Use Allowed</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Check className="w-4 h-4 text-[#8c52ff]" />
                  <span>Lifetime Updates</span>
                </div>
              </div>

              <Button
                onClick={handlePurchase}
                className="w-full bg-[#8c52ff] hover:bg-[#7a3fee] text-white font-semibold py-3 text-base transition-all duration-200 shadow-lg shadow-[#8c52ff]/20 hover:shadow-[#8c52ff]/40"
              >
                Purchase for $40
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
