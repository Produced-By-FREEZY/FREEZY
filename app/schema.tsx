export default function Schema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    "name": "FЯEEZY",
    "url": "https://www.freezy.ca",
    "genre": ["Hip Hop", "Trap", "R&B"],
    "description": "Professional music producer specializing in premium beats and custom instrumentals.",
    "sameAs": [
      "https://www.instagram.com/your_username", // Replace with your links
      "https://www.youtube.com/@your_channel",
      "https://www.beatstars.com/your_store"
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
