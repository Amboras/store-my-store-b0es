'use client'

import { useState, useCallback } from 'react'
import { useCart } from '@/hooks/use-cart'
import { Loader2, Check, Package, Gem, ChevronDown, ChevronUp } from 'lucide-react'
import { toast } from 'sonner'
import { formatPrice } from '@/lib/utils/format-price'

interface BundleOfferProps {
  variantId: string
  singlePrice: number
  currency: string
  productTitle: string
}

const BUNDLE_OPTIONS = [
  {
    id: 'single',
    label: 'Single Timepiece',
    quantity: 1,
    multiplier: 1,
    badge: null,
    desc: 'The classic choice',
    icon: null,
  },
  {
    id: 'duo',
    label: 'Collector\'s Pair',
    quantity: 2,
    multiplier: 2,
    discountPct: 10,
    badge: 'Save 10%',
    desc: 'A gift + keep one for yourself',
    icon: Package,
  },
  {
    id: 'connoisseur',
    label: 'Connoisseur\'s Set',
    quantity: 3,
    multiplier: 3,
    discountPct: 18,
    badge: 'Best Value',
    desc: 'Three watches — one for every occasion',
    icon: Gem,
  },
]

export default function ProductBundleOffer({
  variantId,
  singlePrice,
  currency,
}: BundleOfferProps) {
  const [selected, setSelected] = useState('single')
  const [justAdded, setJustAdded] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const { addItem, isAddingItem } = useCart()

  const selectedOption = BUNDLE_OPTIONS.find((o) => o.id === selected)!

  const getBundlePrice = useCallback(
    (option: typeof BUNDLE_OPTIONS[0]) => {
      const base = singlePrice * option.multiplier
      const discount = 'discountPct' in option && option.discountPct ? option.discountPct : 0
      return Math.round(base * (1 - discount / 100))
    },
    [singlePrice]
  )

  const handleAddBundle = () => {
    if (!variantId) return
    const qty = selectedOption.quantity
    addItem(
      { variantId, quantity: qty },
      {
        onSuccess: () => {
          setJustAdded(true)
          toast.success(
            qty === 1
              ? 'Added to bag'
              : `${qty} timepieces added to bag`
          )
          setTimeout(() => setJustAdded(false), 2500)
        },
        onError: () => {
          toast.error('Could not add to bag. Please try again.')
        },
      }
    )
  }

  return (
    <div className="border border-border/60 rounded-sm overflow-hidden">
      {/* Header toggle */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-5 py-4 bg-muted/40 hover:bg-muted/60 transition-colors"
      >
        <div className="flex items-center gap-3">
          <Package className="h-4 w-4 shrink-0" style={{ color: 'hsl(42 65% 48%)' }} strokeWidth={1.5} />
          <div className="text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.14em]">Bundle & Save</p>
            <p className="text-xs text-muted-foreground mt-0.5">Add multiple pieces — up to 18% off</p>
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
        )}
      </button>

      {/* Bundle options */}
      {isExpanded && (
        <div className="p-4 space-y-3">
          {BUNDLE_OPTIONS.map((option) => {
            const price = getBundlePrice(option)
            const originalPrice = singlePrice * option.multiplier
            const isSelected = selected === option.id
            const Icon = option.icon

            return (
              <button
                key={option.id}
                onClick={() => setSelected(option.id)}
                className={`w-full flex items-center gap-4 p-4 border text-left transition-all ${
                  isSelected
                    ? 'border-foreground bg-foreground/[0.03]'
                    : 'border-border hover:border-foreground/40'
                }`}
              >
                {/* Radio indicator */}
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                    isSelected ? 'border-foreground' : 'border-muted-foreground/40'
                  }`}
                >
                  {isSelected && (
                    <div className="w-1.5 h-1.5 rounded-full bg-foreground" />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold">{option.label}</span>
                    {option.badge && (
                      <span
                        className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5"
                        style={{ backgroundColor: 'hsl(42 65% 48%)', color: '#1a1a2e' }}
                      >
                        {option.badge}
                      </span>
                    )}
                    {Icon && (
                      <Icon className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.5} />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{option.desc}</p>
                </div>

                {/* Price */}
                <div className="text-right shrink-0">
                  <p className="text-sm font-semibold">{formatPrice(price, currency)}</p>
                  {price !== originalPrice && (
                    <p className="text-xs text-muted-foreground line-through">
                      {formatPrice(originalPrice, currency)}
                    </p>
                  )}
                </div>
              </button>
            )
          })}

          {/* Add bundle CTA */}
          <button
            onClick={handleAddBundle}
            disabled={isAddingItem}
            className={`w-full flex items-center justify-center gap-2 py-3.5 text-sm font-semibold uppercase tracking-wide transition-all mt-2 ${
              justAdded
                ? 'bg-green-700 text-white'
                : 'border border-foreground hover:bg-foreground hover:text-background'
            }`}
          >
            {isAddingItem ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : justAdded ? (
              <>
                <Check className="h-4 w-4" />
                Added to Bag
              </>
            ) : (
              <>
                Add {selectedOption.quantity > 1 ? `${selectedOption.quantity} Pieces` : 'to Bag'}
                {selectedOption.quantity > 1 && (
                  <span
                    className="text-[10px] font-bold tracking-wider ml-1 px-1.5 py-0.5"
                    style={{ backgroundColor: 'hsl(42 65% 48%)', color: '#1a1a2e' }}
                  >
                    {('discountPct' in selectedOption) && selectedOption.discountPct
                      ? `${selectedOption.discountPct}% OFF`
                      : null}
                  </span>
                )}
              </>
            )}
          </button>
        </div>
      )}
    </div>
  )
}
