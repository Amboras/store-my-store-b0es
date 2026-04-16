import { Shield, RefreshCw, Truck, Award, Lock, Gem } from 'lucide-react'

const TRUST_ITEMS = [
  {
    icon: Shield,
    title: '2-Year Warranty',
    body: 'Full movement warranty on every timepiece',
  },
  {
    icon: RefreshCw,
    title: '30-Day Returns',
    body: 'Hassle-free returns, no questions asked',
  },
  {
    icon: Truck,
    title: 'Free Worldwide Shipping',
    body: 'Complimentary delivery on every order',
  },
  {
    icon: Lock,
    title: 'Secure Checkout',
    body: 'SSL encrypted, fully PCI-compliant',
  },
  {
    icon: Gem,
    title: 'Authentic Guarantee',
    body: 'Every watch is certified authentic',
  },
  {
    icon: Award,
    title: 'Expert Support',
    body: 'Dedicated horological advisors on call',
  },
]

export default function ProductTrustSignals() {
  return (
    <div className="space-y-4">
      {/* Heading */}
      <div className="flex items-center gap-3">
        <div className="h-px flex-1" style={{ backgroundColor: 'hsl(42 65% 48% / 0.4)' }} />
        <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground font-medium">
          The Amboras Promise
        </p>
        <div className="h-px flex-1" style={{ backgroundColor: 'hsl(42 65% 48% / 0.4)' }} />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {TRUST_ITEMS.map(({ icon: Icon, title, body }) => (
          <div
            key={title}
            className="flex flex-col items-start gap-2 p-3.5 border border-border/60 hover:border-border transition-colors"
          >
            <Icon
              className="h-4 w-4 shrink-0"
              strokeWidth={1.5}
              style={{ color: 'hsl(42 65% 48%)' }}
            />
            <div>
              <p className="text-xs font-semibold leading-tight">{title}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">{body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
