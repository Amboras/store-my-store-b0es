'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { ArrowRight, Clock, Shield, Award, Gem, RefreshCw, Truck } from 'lucide-react'
import CollectionSection from '@/components/marketing/collection-section'
import { useCollections } from '@/hooks/use-collections'
import { trackMetaEvent } from '@/lib/meta-pixel'

const HERO_IMAGE = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1600&q=80'
const LIFESTYLE_IMAGE = 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=1600&q=80'
const DETAIL_IMAGE = 'https://images.unsplash.com/photo-1548169874-53e85f753f1e?w=1200&q=80'
const FEATURE_IMAGE = 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=1200&q=80'

const CRAFTSMANSHIP_POINTS = [
  {
    icon: Clock,
    title: 'Swiss Movement',
    body: 'Every timepiece is powered by certified Swiss or Japanese mechanical movements, ensuring decades of precision.',
  },
  {
    icon: Gem,
    title: 'Sapphire Crystal',
    body: 'Anti-reflective sapphire crystal glass — the hardest material used in watch-making — protects every dial.',
  },
  {
    icon: Award,
    title: '2-Year Warranty',
    body: 'We stand behind our craftsmanship. All watches include a full two-year movement warranty.',
  },
]

export default function HomePage() {
  const { data: collections, isLoading } = useCollections()
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false)

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newsletterEmail.trim()) return
    trackMetaEvent('Lead', { content_name: 'newsletter_signup', status: 'submitted' })
    setNewsletterSubmitted(true)
  }

  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[hsl(220,15%,7%)]">
        {/* Background image with dark overlay */}
        <div className="absolute inset-0">
          <Image
            src={HERO_IMAGE}
            alt="Amboras luxury watch hero"
            fill
            className="object-cover opacity-30"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(220,15%,6%)] via-[hsl(220,15%,6%)]/80 to-transparent" />
        </div>

        <div className="relative container-custom grid lg:grid-cols-2 gap-8 items-center py-28 lg:py-40">
          {/* Text Content */}
          <div className="space-y-7 animate-fade-in-up">
            <div className="flex items-center gap-3">
              <div className="h-px w-8" style={{ backgroundColor: 'hsl(42 65% 48%)' }} />
              <p className="text-[10px] uppercase tracking-[0.28em] font-medium" style={{ color: 'hsl(42 65% 48%)' }}>
                New Collection 2025
              </p>
            </div>
            <h1 className="font-heading font-semibold text-white leading-[1.08]"
              style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)', letterSpacing: '-0.02em' }}>
              Time, Elevated<br />to an Art Form
            </h1>
            <p className="text-base max-w-md leading-relaxed" style={{ color: 'hsl(30 8% 68%)' }}>
              Meticulously crafted timepieces that transcend the ordinary.
              Each watch is a statement of elegance, precision, and enduring character.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/products"
                className="inline-flex items-center gap-2.5 px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.16em] transition-all"
                style={{ backgroundColor: 'hsl(42 65% 48%)', color: '#1a1a2e' }}
                prefetch={true}
              >
                Explore Collection
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.16em] border transition-all"
                style={{ borderColor: 'hsl(30 8% 35%)', color: 'hsl(30 8% 75%)' }}
                prefetch={true}
              >
                Our Story
              </Link>
            </div>
          </div>

          {/* Floating watch card — decorative */}
          <div className="hidden lg:flex justify-center items-center">
            <div className="relative w-72 h-80 animate-fade-in">
              <div className="absolute inset-0 rounded-sm overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&q=80"
                  alt="Featured timepiece"
                  fill
                  className="object-cover"
                  sizes="300px"
                />
              </div>
              {/* Gold badge */}
              <div className="absolute -bottom-5 -right-5 w-28 h-28 rounded-full flex flex-col items-center justify-center text-center"
                style={{ backgroundColor: 'hsl(42 65% 48%)', color: '#1a1a2e' }}>
                <span className="text-[10px] uppercase tracking-widest font-semibold block leading-tight">Swiss</span>
                <span className="text-[10px] uppercase tracking-widest font-semibold block leading-tight">Movement</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      </section>

      {/* ─── TRUST BAR ────────────────────────────────────────────────── */}
      <section className="border-b">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border">
            {[
              { icon: Truck, title: 'Complimentary Shipping', sub: 'Free worldwide delivery on every order' },
              { icon: RefreshCw, title: '30-Day Returns', sub: 'Hassle-free returns, no questions asked' },
              { icon: Shield, title: '2-Year Warranty', sub: 'Full movement warranty on all timepieces' },
            ].map(({ icon: Icon, title, sub }) => (
              <div key={title} className="flex items-center gap-4 py-5 px-6">
                <Icon className="h-5 w-5 flex-shrink-0 text-gold" strokeWidth={1.5} style={{ color: 'hsl(42 65% 48%)' }} />
                <div>
                  <p className="text-sm font-semibold">{title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COLLECTIONS ─────────────────────────────────────────────── */}
      {isLoading ? (
        <section className="py-section">
          <div className="container-custom">
            <div className="animate-pulse space-y-4 text-center">
              <div className="h-3 w-20 bg-muted rounded mx-auto" />
              <div className="h-8 w-64 bg-muted rounded mx-auto" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-[3/4] bg-muted rounded animate-pulse" />
              ))}
            </div>
          </div>
        </section>
      ) : collections && collections.length > 0 ? (
        <>
          {collections.map((collection: { id: string; handle: string; title: string; metadata?: Record<string, unknown> }, index: number) => (
            <CollectionSection
              key={collection.id}
              collection={collection}
              alternate={index % 2 === 1}
            />
          ))}
        </>
      ) : null}

      {/* ─── CRAFTSMANSHIP ───────────────────────────────────────────── */}
      <section className="py-section bg-muted/30">
        <div className="container-custom">
          <div className="text-center max-w-xl mx-auto mb-16">
            <div className="divider-gold mx-auto mb-5" />
            <p className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground mb-3">The Amboras Standard</p>
            <h2 className="font-heading font-semibold" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
              Crafted Without Compromise
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 stagger">
            {CRAFTSMANSHIP_POINTS.map(({ icon: Icon, title, body }) => (
              <div key={title} className="animate-fade-in-up text-center px-4">
                <div className="inline-flex items-center justify-center w-12 h-12 border mb-5" style={{ borderColor: 'hsl(42 65% 48%)' }}>
                  <Icon className="h-5 w-5" strokeWidth={1.5} style={{ color: 'hsl(42 65% 48%)' }} />
                </div>
                <h3 className="font-heading text-xl font-semibold mb-3">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── EDITORIAL / BRAND STORY ─────────────────────────────────── */}
      <section className="py-section">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Images stacked */}
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden relative">
                <Image
                  src={LIFESTYLE_IMAGE}
                  alt="The art of fine watchmaking"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              {/* Inset secondary image */}
              <div className="absolute -bottom-6 -right-6 w-40 h-52 overflow-hidden border-4 border-background shadow-xl hidden md:block">
                <Image
                  src={DETAIL_IMAGE}
                  alt="Watch detail"
                  fill
                  sizes="160px"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="space-y-6 lg:max-w-md">
              <div className="divider-gold" />
              <p className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">Our Philosophy</p>
              <h2 className="font-heading font-semibold" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', lineHeight: '1.15' }}>
                Where Time Meets<br />True Artistry
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Amboras was born from a single conviction — that a watch is more than a device.
                It is an heirloom. We source only the finest movements, cases, and materials,
                partnering with master craftsmen who share our obsession with perfection.
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Every detail, from the weight of the crown to the lume on the indices,
                is considered. Because the person wearing it deserves nothing less.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] relative link-underline-gold pb-0.5"
                prefetch={true}
              >
                Read Our Story
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURE BAND ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0">
          <Image
            src={FEATURE_IMAGE}
            alt="Luxury watch detail"
            fill
            className="object-cover opacity-20"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-foreground/90" />
        </div>
        <div className="relative container-custom text-center">
          <p className="text-[10px] uppercase tracking-[0.28em] mb-4" style={{ color: 'hsl(42 65% 48%)' }}>
            Explore the Collection
          </p>
          <h2 className="font-heading font-semibold text-white mb-8"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: '1.1' }}>
            Find Your Signature Timepiece
          </h2>
          <Link
            href="/products"
            className="inline-flex items-center gap-2.5 px-10 py-4 text-[11px] font-semibold uppercase tracking-[0.16em] transition-all"
            style={{ backgroundColor: 'hsl(42 65% 48%)', color: '#1a1a2e' }}
            prefetch={true}
          >
            Shop All Watches
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      {/* ─── NEWSLETTER ───────────────────────────────────────────────── */}
      <section className="py-section">
        <div className="container-custom max-w-lg text-center">
          <div className="divider-gold mx-auto mb-6" />
          <h2 className="font-heading font-semibold mb-3" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)' }}>
            An Exclusive Circle
          </h2>
          <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
            Join our inner circle for early access to new releases, private events, and
            curated horological insights — reserved for Amboras collectors.
          </p>
          {newsletterSubmitted ? (
            <p className="text-sm font-medium" style={{ color: 'hsl(42 65% 48%)' }}>
              Thank you — you are now part of the Amboras circle.
            </p>
          ) : (
            <form className="flex gap-0" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 border border-r-0 border-border bg-transparent px-4 py-3.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-foreground/60 transition-colors"
              />
              <button
                type="submit"
                className="px-7 py-3.5 text-[10px] font-semibold uppercase tracking-[0.16em] transition-all whitespace-nowrap"
                style={{ backgroundColor: 'hsl(42 65% 48%)', color: '#1a1a2e' }}
              >
                Join
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  )
}
