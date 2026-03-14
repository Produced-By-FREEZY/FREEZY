import { Check, DollarSign, Music, Zap, Download, Shield } from "lucide-react"

const features = [
  {
    icon: Music,
    title: "Premium Quality",
    description:
      "Every beat is professionally mixed and mastered, ready for your vocals. High-quality WAV files and track stems available with premium leases.",
  },
  {
    icon: Download,
    title: "Instant Delivery",
    description:
      "Get your beats immediately after purchase. Download links are sent instantly to your email with all files included.",
  },
  {
    icon: DollarSign,
    title: "Flexible Licensing",
    description:
      "Choose from multiple lease options including MP3, WAV, Premium, and Exclusive rights. Find the perfect license for your project and budget.",
  },
  {
    icon: Zap,
    title: "Fresh Beats Weekly",
    description:
      "New instrumentals uploaded regularly. Subscribe to the newsletter to be the first to hear new releases and get exclusive discounts.",
  },
  {
    icon: Check,
    title: "Free Beats Available",
    description:
      "Download free beats for non-commercial use. Perfect for practicing, building your portfolio, or testing the sound before purchasing.",
  },
  {
    icon: Shield,
    title: "Secure & Professional",
    description:
      "All transactions are secure and you receive a professional license agreement with every purchase. Your rights are protected.",
  },
]

export function FeaturesSection() {
  return (
    <section className="bg-background py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4 text-foreground">WHY CHOOSE FЯEEZY</h2>
        <p className="text-center text-muted-foreground mb-12">Professional beats with flexible licensing options</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground">{feature.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
