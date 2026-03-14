"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { KitPreviewModal } from "./kit-preview-modal"

interface ProductCardProps {
  title: string
  price: string
  image: string
  category?: string
  tags?: string[]
  previewUrls?: string[]
  description?: string
  lemonSqueezyVariantId?: string
  fileSize?: string
  itemCount?: number
  fileTypes?: string
}

const generateKitSounds = (kitTitle: string) => {
  const soundTypes = ["Melody", "Loop", "One Shot", "FX", "Vocal", "Pad", "Lead", "Bass"]
  const keys = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
  const scales = ["Min", "Maj"]

  return Array.from({ length: 8 }, (_, i) => ({
    id: `${kitTitle}-sound-${i}`,
    name: `${soundTypes[i % soundTypes.length]} ${i + 1}`,
    bpm: Math.floor(Math.random() * 60) + 80,
    key: `${keys[Math.floor(Math.random() * keys.length)]} ${scales[Math.floor(Math.random() * scales.length)]}`,
    audioUrl: "/placeholder-audio.mp3",
  }))
}

export function ProductCard({
  title,
  price,
  image,
  category,
  tags = [],
  previewUrls,
  description,
  lemonSqueezyVariantId,
  fileSize,
  itemCount,
  fileTypes,
}: ProductCardProps) {
  const [showPreviewModal, setShowPreviewModal] = useState(false)

  const actualPreviewUrls =
    previewUrls && previewUrls.length > 0 ? previewUrls : generateKitSounds(title).map((sound) => sound.audioUrl)

  const kitDescription =
    description ||
    `Premium ${category?.toLowerCase() || "kit"} featuring high-quality sounds inspired by vintage style processing and the deep warm sound of the golden age of Hip-Hop.`

  console.log("[v0] ProductCard preview URLs:", actualPreviewUrls)

  return (
    <>
      <Card
        className="group overflow-hidden bg-card border-border hover:border-primary/50 transition-all cursor-pointer"
        onClick={() => setShowPreviewModal(true)}
      >
        <div className="aspect-square relative bg-muted overflow-hidden">
          <img
            src={image || "/placeholder.svg"}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {category && (
            <div className="absolute top-2 left-2 bg-primary/90 text-primary-foreground px-2 py-1 text-xs font-bold rounded">
              {category}
            </div>
          )}
        </div>
        <div className="p-4 space-y-3">
          <h3 className="font-semibold text-sm line-clamp-2 text-foreground min-h-[2.5rem]">{title}</h3>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs bg-muted text-muted-foreground">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-foreground">{price}</span>
            <Button
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                setShowPreviewModal(true)
              }}
              className="bg-[#8c52ff] hover:bg-[#8c52ff]/90 text-white shadow-lg shadow-[#8c52ff]/20"
            >
              PREVIEW
            </Button>
          </div>
        </div>
      </Card>

      <KitPreviewModal
        isOpen={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
        kitTitle={title}
        kitImage={image}
        kitCategory={category || "KIT"}
        kitDescription={kitDescription}
        previewUrls={actualPreviewUrls}
        kitPrice={price}
        lemonSqueezyVariantId={lemonSqueezyVariantId}
        fileSize={fileSize}
        itemCount={itemCount}
        fileTypes={fileTypes}
      />
    </>
  )
}
