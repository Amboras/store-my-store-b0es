'use client'

import Link from 'next/link'
import { clearConsent } from '@/lib/cookie-consent'
import { usePolicies } from '@/hooks/use-policies'
import { Instagram, Facebook, Youtube } from 'lucide-react'

const footerLinks = {
  watches: [
    { label: 'All Watches', href: '/products' },
    { label: 'New Arrivals', href: '/products?sort=newest' },
    { label: 'Collections', href: '/collections' },
  ],
  help: [
    { label: 'FAQ', href: '/faq' },
    { label: 'Shipping & Returns', href: '/shipping' },
    { label: 'Contact Us', href: '/contact' },
  ],
}

export default function Footer() {
  const { policies } = usePolicies()

  const companyLinks = [
    { label: 'Our Story', href: '/about' },
  ]

  if (policies?.privacy_policy) companyLinks.push({ label: 'Privacy Policy', href: '/privacy' })
  if (policies?.terms_of_service) companyLinks.push({ label: 'Terms of Service', href: '/terms' })
  if (policies?.refund_policy) companyLinks.push({ label: 'Refund Policy', href: '/refund-policy' })
  if (policies?.cookie_policy) companyLinks.push({ label: 'Cookie Policy', href: '/cookie-policy' })

  return (
    <footer className="border-t bg-foreground text-primary-foreground">
      <div className="container-custom py-16">
        {/* Gold divider top */}
        <div className="w-12 h-px mb-12" style={{ backgroundColor: 'hsl(42 65% 48%)' }} />

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/">
              <span className="font-heading text-2xl font-semibold tracking-[0.14em] uppercase text-primary-foreground">
                Amboras
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed max-w-xs" style={{ color: 'hsl(30 8% 68%)' }}>
              Exceptional timepieces for those who appreciate
              the art of precision. Every watch tells a story.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-4 mt-6">
              <a href="#" aria-label="Instagram" className="hover:opacity-60 transition-opacity" style={{ color: 'hsl(30 8% 68%)' }}>
                <Instagram className="h-4 w-4" strokeWidth={1.5} />
              </a>
              <a href="#" aria-label="Facebook" className="hover:opacity-60 transition-opacity" style={{ color: 'hsl(30 8% 68%)' }}>
                <Facebook className="h-4 w-4" strokeWidth={1.5} />
              </a>
              <a href="#" aria-label="YouTube" className="hover:opacity-60 transition-opacity" style={{ color: 'hsl(30 8% 68%)' }}>
                <Youtube className="h-4 w-4" strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Watches */}
          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-5" style={{ color: 'hsl(42 65% 48%)' }}>Shop</h3>
            <ul className="space-y-3.5">
              {footerLinks.watches.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm transition-opacity hover:opacity-60" style={{ color: 'hsl(30 8% 68%)' }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-5" style={{ color: 'hsl(42 65% 48%)' }}>Support</h3>
            <ul className="space-y-3.5">
              {footerLinks.help.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm transition-opacity hover:opacity-60" style={{ color: 'hsl(30 8% 68%)' }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-5" style={{ color: 'hsl(42 65% 48%)' }}>Company</h3>
            <ul className="space-y-3.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm transition-opacity hover:opacity-60" style={{ color: 'hsl(30 8% 68%)' }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderColor: 'hsl(220 12% 16%)' }}>
          <p className="text-xs" style={{ color: 'hsl(30 8% 45%)' }}>
            &copy; {new Date().getFullYear()} Amboras. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => {
                clearConsent()
                window.dispatchEvent(new Event('manage-cookies'))
              }}
              className="text-xs transition-opacity hover:opacity-60"
              style={{ color: 'hsl(30 8% 45%)' }}
            >
              Manage Cookies
            </button>
            <span className="text-xs" style={{ color: 'hsl(30 8% 35%)' }}>Powered by Amboras</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
