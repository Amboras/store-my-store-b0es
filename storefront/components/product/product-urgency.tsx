'use client'

import { useEffect, useState, useRef } from 'react'
import { Clock, Users, CheckCircle } from 'lucide-react'

interface ProductUrgencyProps {
  productId: string
}

// Deterministic seeded random based on productId
function seededInt(seed: string, min: number, max: number): number {
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0
  }
  return min + (hash % (max - min + 1))
}

const SALE_HOURS = 23
const SALE_MINUTES = 47

export default function ProductUrgency({ productId }: ProductUrgencyProps) {
  const viewers = seededInt(productId, 18, 47)
  const stockLeft = seededInt(productId + 'stock', 4, 9)

  // Countdown timer: hours / minutes / seconds
  const [timeLeft, setTimeLeft] = useState({
    h: SALE_HOURS,
    m: SALE_MINUTES,
    s: seededInt(productId + 'sec', 10, 59),
  })

  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    tickRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        let { h, m, s } = prev
        if (s > 0) return { h, m, s: s - 1 }
        if (m > 0) return { h, m: m - 1, s: 59 }
        if (h > 0) return { h: h - 1, m: 59, s: 59 }
        return { h: 0, m: 0, s: 0 }
      })
    }, 1000)
    return () => {
      if (tickRef.current) clearInterval(tickRef.current)
    }
  }, [])

  const pad = (n: number) => String(n).padStart(2, '0')

  return (
    <div className="space-y-3">
      {/* Live viewers */}
      <div className="flex items-center gap-2.5">
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <Users className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.5} />
        </div>
        <p className="text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">{viewers} people</span> are viewing this right now
        </p>
      </div>

      {/* Stock warning */}
      <div className="flex items-center gap-2.5">
        <CheckCircle className="h-3.5 w-3.5 shrink-0" style={{ color: 'hsl(42 65% 48%)' }} strokeWidth={1.5} />
        <p className="text-xs">
          <span className="font-semibold" style={{ color: 'hsl(42 65% 48%)' }}>
            Only {stockLeft} remaining
          </span>
          <span className="text-muted-foreground"> — secured by individual reservation</span>
        </p>
      </div>

      {/* Sale countdown */}
      <div className="flex items-center gap-3 px-4 py-3 bg-foreground text-background">
        <Clock className="h-4 w-4 shrink-0 opacity-80" strokeWidth={1.5} />
        <div className="flex-1">
          <p className="text-[10px] uppercase tracking-[0.16em] opacity-70 mb-1">
            Free Shipping Offer Ends In
          </p>
          <div className="flex items-center gap-1.5 font-heading font-semibold text-lg tracking-widest tabular-nums">
            <span>{pad(timeLeft.h)}</span>
            <span className="opacity-50 text-sm">h</span>
            <span>{pad(timeLeft.m)}</span>
            <span className="opacity-50 text-sm">m</span>
            <span>{pad(timeLeft.s)}</span>
            <span className="opacity-50 text-sm">s</span>
          </div>
        </div>
      </div>
    </div>
  )
}
