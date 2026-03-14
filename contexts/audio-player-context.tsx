"use client"

import { createContext, useContext, useState, useRef, useEffect, type ReactNode } from "react"

interface Beat {
  id: string
  title: string
  artist: string
  audioUrl: string
  image: string
  price: string
  bpm: number
  type?: "beat" | "kit"
  kitCategory?: string
}

interface AudioPlayerContextType {
  currentBeat: Beat | null
  isPlaying: boolean
  progress: number
  volume: number
  duration: number
  playBeat: (beat: Beat) => void
  togglePlay: () => void
  setProgress: (progress: number) => void
  setVolume: (volume: number) => void
  closePlayer: () => void
}

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(undefined)

export function AudioPlayerProvider({ children }: { children: ReactNode }) {
  const [currentBeat, setCurrentBeat] = useState<Beat | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgressState] = useState(0)
  const [volume, setVolumeState] = useState(1.0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    audioRef.current = new Audio()
    audioRef.current.volume = volume

    const audio = audioRef.current

    const handleTimeUpdate = () => {
      if (audio.duration) {
        setProgressState((audio.currentTime / audio.duration) * 100)
      }
    }

    const handleLoadedMetadata = () => {
      setDuration(audio.duration)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      setProgressState(0)
    }

    audio.addEventListener("timeupdate", handleTimeUpdate)
    audio.addEventListener("loadedmetadata", handleLoadedMetadata)
    audio.addEventListener("ended", handleEnded)

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate)
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata)
      audio.removeEventListener("ended", handleEnded)
      audio.pause()
    }
  }, [])

  const playBeat = (beat: Beat) => {
    if (!audioRef.current) return

    if (currentBeat?.id === beat.id) {
      togglePlay()
    } else {
      setCurrentBeat(beat)
      audioRef.current.src = beat.audioUrl
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  const togglePlay = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const setProgress = (newProgress: number) => {
    if (!audioRef.current || !duration) return
    const newTime = (newProgress / 100) * duration
    audioRef.current.currentTime = newTime
    setProgressState(newProgress)
  }

  const setVolume = (newVolume: number) => {
    if (!audioRef.current) return
    audioRef.current.volume = newVolume
    setVolumeState(newVolume)
  }

  const closePlayer = () => {
    if (!audioRef.current) return
    audioRef.current.pause()
    audioRef.current.currentTime = 0
    setIsPlaying(false)
    setProgressState(0)
    setCurrentBeat(null)
  }

  return (
    <AudioPlayerContext.Provider
      value={{
        currentBeat,
        isPlaying,
        progress,
        volume,
        duration,
        playBeat,
        togglePlay,
        setProgress,
        setVolume,
        closePlayer,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  )
}

export function useAudioPlayer() {
  const context = useContext(AudioPlayerContext)
  if (context === undefined) {
    throw new Error("useAudioPlayer must be used within an AudioPlayerProvider")
  }
  return context
}
