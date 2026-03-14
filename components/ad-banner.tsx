import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface AdBannerProps {
  title: string
  subtitle?: string
  cta?: string
  variant?: "default" | "gradient"
}

export function AdBanner({ title, subtitle, cta = "Learn More", variant = "default" }: AdBannerProps) {
  return (
    <Card
      className={`p-8 text-center ${variant === "gradient" ? "bg-gradient-to-r from-primary/20 to-accent/20" : "bg-card"} border-border`}
    >
      <h3 className="text-xl font-bold mb-2 text-foreground">{title}</h3>
      {subtitle && <p className="text-sm text-muted-foreground mb-4">{subtitle}</p>}
      <Button variant="outline" size="sm">
        {cta}
      </Button>
    </Card>
  )
}
