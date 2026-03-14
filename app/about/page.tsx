import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { NewsletterSection } from "@/components/newsletter-section"
import { Music, Award, Users, Zap } from "lucide-react"
import Image from "next/image"
import { Breadcrumb } from "@/components/breadcrumb"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-16">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About" }]} />

        <div className="max-w-4xl mx-auto space-y-16">
          {/* Hero Section */}
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
              ABOUT FЯEEZY
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              A versatile music producer from British Columbia, crafting sounds across multiple genres with passion and
              precision.
            </p>
          </div>

          {/* Image Section */}
          <div className="relative h-[400px] rounded-lg overflow-hidden border border-border">
            <Image src="/purple-haze-music-production.jpg" alt="FЯEEZY in the studio" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          </div>

          {/* Story Section */}
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p className="text-lg">
              Meet <strong className="text-foreground">FЯEEZY</strong>, a versatile music producer living in beautiful
              British Columbia. From pop to rock, electronic to hip-hop, FЯEEZY can work on multiple genres of music and
              has a keen sense of what will work for each project.
            </p>
            <p>
              FЯEEZY's passion for music began at a young age when they learned to play multiple instruments including
              the guitar, piano, and drums. As they grew older, they realized that their true calling was not just to
              perform, but to create music that would inspire and touch people's lives.
            </p>
            <p>
              With years of experience in the music industry, FЯEEZY has honed their skills as a producer, composer, and
              arranger. They know how to bring out the best in each artist they work with, crafting sounds that are
              unique and impactful. From writing lyrics to mixing and mastering, FЯEEZY has an ear for perfection and
              knows how to take a song from its raw form to a finished masterpiece.
            </p>
            <p>
              Aside from their musical talents, FЯEEZY is also a guru at marketing. They understand the importance of
              branding and how to create a buzz around an artist and their music. FЯEEZY's ability to understand their
              client's needs and market their music in a way that resonates with their target audience is unparalleled.
            </p>
            <p>
              Living in Langley, FЯEEZY enjoys being surrounded by the beauty of nature and finds inspiration in the
              peace and quiet of the countryside. When they're not in the studio, you can find FЯEEZY playing music with
              their friends or exploring the local music scene.
            </p>
          </div>

          {/* Stats/Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-lg bg-muted/30 border border-border">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Music className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Multi-Genre</h3>
              <p className="text-sm text-muted-foreground">Pop, rock, electronic, hip-hop, and more</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-lg bg-muted/30 border border-border">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Multi-Instrumentalist</h3>
              <p className="text-sm text-muted-foreground">Guitar, piano, drums, and more</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-lg bg-muted/30 border border-border">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Artist Development</h3>
              <p className="text-sm text-muted-foreground">Helping artists reach their full potential</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-lg bg-muted/30 border border-border">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Marketing Guru</h3>
              <p className="text-sm text-muted-foreground">Expert branding and music promotion</p>
            </div>
          </div>

          {/* Philosophy Section */}
          <div className="bg-gradient-to-br from-primary/10 to-purple-500/10 p-8 rounded-lg border border-primary/20">
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
              Production Philosophy
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                FЯEEZY is a gifted music producer with a passion for creating music that connects with people. Every
                project is approached with dedication and a commitment to excellence, ensuring that each artist's unique
                vision comes to life.
              </p>
              <p>
                From the initial concept to the final master, FЯEEZY brings technical expertise and creative innovation
                to every stage of production. Whether it's composing, arranging, mixing, or mastering, the goal is
                always to create music that resonates and inspires.
              </p>
              <p>
                Based in Langley, BC, FЯEEZY draws inspiration from the natural beauty of British Columbia while staying
                connected to the global music scene. This unique perspective allows for fresh, innovative sounds that
                stand out in today's competitive music landscape.
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center space-y-4 py-8">
            <h2 className="text-2xl font-bold">Ready to Create?</h2>
            <p className="text-muted-foreground">
              Browse the beat catalog and find your next hit. Custom production also available.
            </p>
          </div>
        </div>
      </div>

      <NewsletterSection />
      <Footer />
    </div>
  )
}
