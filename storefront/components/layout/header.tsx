'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { Search, ShoppingBag, User, Menu, X, LogIn } from 'lucide-react'
import { useCart } from '@/hooks/use-cart'
import { useAuth } from '@/hooks/use-auth'
import CartDrawer from '@/components/cart/cart-drawer'
import { useCollections } from '@/hooks/use-collections'

export default function Header() {
  const { itemCount } = useCart()
  const { isLoggedIn } = useAuth()
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { data: collections } = useCollections()

  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const mobileMenuCloseRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) mobileMenuCloseRef.current?.focus()
  }, [isMobileMenuOpen])

  useEffect(() => {
    if (!isMobileMenuOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isMobileMenuOpen])

  const handleMobileMenuKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== 'Tab' || !mobileMenuRef.current) return
    const focusable = mobileMenuRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    if (focusable.length === 0) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus()
    }
  }, [])

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-background/96 backdrop-blur-md border-b shadow-sm'
            : 'bg-background border-b'
        }`}
      >
        <div className="container-custom">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 -ml-2 lg:hidden hover:opacity-70 transition-opacity"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <span className="font-heading text-2xl font-semibold tracking-[0.06em] uppercase" style={{ letterSpacing: '0.14em' }}>
                Amboras
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-9">
              <Link href="/products" className="text-xs tracking-[0.14em] uppercase link-underline py-1 font-medium">
                All Watches
              </Link>
              {collections?.slice(0, 4).map((collection: any) => (
                <Link
                  key={collection.id}
                  href={`/collections/${collection.handle}`}
                  className="text-xs tracking-[0.14em] uppercase link-underline py-1 font-medium"
                  prefetch={true}
                >
                  {collection.title}
                </Link>
              ))}
              <Link href="/about" className="text-xs tracking-[0.14em] uppercase link-underline py-1 font-medium">
                Our Story
              </Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-0.5">
              <Link href="/search" className="p-2.5 hover:opacity-60 transition-opacity" aria-label="Search">
                <Search className="h-4 w-4" />
              </Link>
              <Link
                href={isLoggedIn ? '/account' : '/auth/login'}
                className="p-2.5 hover:opacity-60 transition-opacity hidden sm:block"
                aria-label={isLoggedIn ? 'Account' : 'Sign in'}
              >
                {isLoggedIn ? <User className="h-4 w-4" /> : <LogIn className="h-4 w-4" />}
              </Link>
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 hover:opacity-60 transition-opacity"
                aria-label="Shopping bag"
              >
                <ShoppingBag className="h-4 w-4" />
                {itemCount > 0 && (
                  <span className="absolute top-1 right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full text-[9px] font-bold text-white"
                    style={{ backgroundColor: 'hsl(42 65% 48%)' }}>
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />
          <div
            ref={mobileMenuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            onKeyDown={handleMobileMenuKeyDown}
            className="absolute inset-y-0 left-0 w-80 max-w-[85vw] bg-background"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b">
              <span className="font-heading text-xl font-semibold tracking-widest uppercase">Amboras</span>
              <button ref={mobileMenuCloseRef} onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:opacity-60" aria-label="Close menu">
                <X className="h-4 w-4" />
              </button>
            </div>
            <nav className="px-6 py-4 space-y-0">
              <Link href="/products" onClick={() => setIsMobileMenuOpen(false)} className="block py-4 text-sm tracking-[0.12em] uppercase border-b border-border/40 font-medium" prefetch={true}>
                All Watches
              </Link>
              {collections?.map((collection: any) => (
                <Link key={collection.id} href={`/collections/${collection.handle}`} onClick={() => setIsMobileMenuOpen(false)} className="block py-4 text-sm tracking-[0.12em] uppercase border-b border-border/40 font-medium" prefetch={true}>
                  {collection.title}
                </Link>
              ))}
              <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="block py-4 text-sm tracking-[0.12em] uppercase border-b border-border/40 font-medium">
                Our Story
              </Link>
              <div className="pt-6 space-y-3">
                <Link href={isLoggedIn ? '/account' : '/auth/login'} onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-sm text-muted-foreground">
                  {isLoggedIn ? 'My Account' : 'Sign In'}
                </Link>
                <Link href="/search" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-sm text-muted-foreground">
                  Search
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}
