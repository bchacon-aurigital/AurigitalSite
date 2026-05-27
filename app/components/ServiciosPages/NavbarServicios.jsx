'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/app/context/LanguageContext'
import { useContactModal } from '@/app/context/ContactModalContext'
import { X } from 'lucide-react'
import TextCarousel from './ui/TextCarousel'
import CotizacionButton from '../ui/CotizacionButton'
import './NavbarServicios.css'

export default function NavbarServicios({ dark = false }) {
  const { translations } = useLanguage()
  const { openModal } = useContactModal()
  const nav = translations.navbarServicios
  const proyectos = translations.proyectosCarrusel.projects

  const th = dark ? {
    topBar: 'bg-[#1a1a1a]',
    topBarGrad: 'from-[#1a1a1a]',
    topBarDot: 'bg-[#555]',
    topBarLabel: 'text-[#a0a0a0]',
    carouselTitle: 'text-[#b0b0b0]',
    carouselDot: 'bg-[#555]',
    carouselSub: 'text-[#707070]',
    navBar: 'bg-[#101010]',
    navBarBorder: '1px solid rgba(255,255,255,0.08)',
    navText: 'text-[#e9e9e9]',
    chevron: 'text-[#e9e9e9]',
    hamburger: 'bg-[#e9e9e9]',
    dropdownBg: 'bg-[#101010]',
    mobileBg: 'bg-[#101010]',
    mobileBorder: 'border-white/10',
    mobileText: 'text-[#e9e9e9]',
    mobileSubText: 'text-[#e9e9e9]/60',
    logo: '/assets/logo-white.svg',
    comingSoonBg: 'bg-[#e9e9e9]',
    comingSoonText: 'text-[#252525]',
    comingSoonBadgeBorder: 'border-white/20',
    comingSoonBadgeText: 'text-[#e9e9e9]/50',
  } : {
    topBar: 'bg-[#ddd]',
    topBarGrad: 'from-[#ddd]',
    topBarDot: 'bg-[#999999]',
    topBarLabel: 'text-[#1C1C1C]',
    carouselTitle: 'text-[#464646]',
    carouselDot: 'bg-[#464646]',
    carouselSub: 'text-[#707070]',
    navBar: 'bg-[#e9e9e9]',
    navBarBorder: '1px solid rgba(0,0,0,0.08)',
    navText: 'text-[#252525]',
    chevron: 'text-[#252525]',
    hamburger: 'bg-[#252525]',
    dropdownBg: 'bg-[#e9e9e9]',
    mobileBg: 'bg-[#e9e9e9]',
    mobileBorder: 'border-black/8',
    mobileText: 'text-[#252525]',
    mobileSubText: 'text-white/60',
    logo: '/assets/NewLogoNavbar.svg',
    comingSoonBg: 'bg-[#252525]',
    comingSoonText: 'text-white',
    comingSoonBadgeBorder: 'border-[#252525]/20',
    comingSoonBadgeText: 'text-[#252525]/50',
  }

  const navLinks = [
    {
      label: nav?.links?.servicios || 'Servicios',
      href: '/servicios',
      dropdown: [
        { label: nav?.dropdown?.diseno?.label || 'Diseño web', href: '/diseno-web', description: nav?.dropdown?.diseno?.description || '' },
        { label: nav?.dropdown?.desarrollo?.label || 'Desarrollo web', href: '/desarrollo-web', description: nav?.dropdown?.desarrollo?.description || '' },
        { label: nav?.dropdown?.pazMental?.label || 'Paz mental', href: '/plan-paz-mental', description: nav?.dropdown?.pazMental?.description || '' },
      ],
    },
    { label: nav?.links?.proyectos || 'Proyectos', href: '/proyectos' },
    { label: nav?.links?.nosotros || 'Nosotros', href: '/sobrenosotros' },
    { label: nav?.links?.blog || 'Blog', href: '/blog', comingSoon: true },
  ]

  const [isVisible, setIsVisible] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const closeTimeout = useRef(null)
  const navRef = useRef(null)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      if (!mobileOpen) {
        if (currentY > lastScrollY.current && currentY > 100) {
          setIsVisible(false)
          setDropdownOpen(false)
        } else if (currentY < lastScrollY.current) {
          setIsVisible(true)
        }
      }
      lastScrollY.current = currentY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [mobileOpen])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    if (mobileOpen) setIsVisible(true)
    if (!mobileOpen) setMobileDropdownOpen(false)
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const handleMouseEnter = useCallback(() => {
    clearTimeout(closeTimeout.current)
    setDropdownOpen(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    closeTimeout.current = setTimeout(() => setDropdownOpen(false), 100)
  }, [])

  const serviciosDropdown = navLinks.find((l) => l.dropdown)?.dropdown || []

  return (
    <>
      <nav
        ref={navRef}
        data-dropdown-open={dropdownOpen ? 'true' : 'false'}
        className={`nav-svc sticky top-0 left-0 z-50 w-full transition-transform duration-300 ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >

        {/* Proyectos carousel on top */}
        <div className={`relative z-[2] ${th.topBar} px-6 md:px-10 lg:px-14 py-3`}>
          <div className="flex flex-row items-center gap-4">
            <div className="flex flex-row items-center justify-center gap-2 flex-shrink-0">
              <div className={`${th.topBarDot} rounded-full w-[7px] h-[7px]`} />
              <p className={`font-space-grotesk font-medium ${th.topBarLabel} text-xs md:text-base tracking-[-0.36px] uppercase whitespace-nowrap leading-none`}>
                {nav?.nowCreating || translations.proyectosCarrusel.nowCreating}
              </p>
            </div>
            <div className="flex-1 overflow-hidden relative flex items-center">
              <div className={`absolute left-0 top-0 w-20 h-full bg-gradient-to-r ${th.topBarGrad} to-transparent z-10 pointer-events-none`} />
              <div className={`absolute right-0 top-0 w-20 h-full bg-gradient-to-l ${th.topBarGrad} to-transparent z-10 pointer-events-none`} />
              <TextCarousel
                items={proyectos}
                speed={90}
                className="items-center"
                separator={<span className="w-10 flex-shrink-0" />}
                renderItem={(proyecto) => (
                  <div className="flex flex-row items-center gap-3 whitespace-nowrap flex-shrink-0">
                    <p className={`font-red-hat font-bold ${th.carouselTitle} text-sm md:text-base tracking-[-0.32px] leading-none`}>
                      {proyecto.title}
                    </p>
                    <span className={`${th.carouselDot} rounded-full w-[3px] h-[3px] flex-shrink-0`} />
                    <p className={`font-red-hat font-medium ${th.carouselSub} text-sm md:text-base tracking-[-0.32px] leading-none`}>
                      {proyecto.description}
                    </p>
                  </div>
                )}
              />
            </div>
          </div>
        </div>

        {/* Navbar row */}
        <div className={`nav-svc__bar relative z-[2] ${th.navBar}`} style={{ borderBottom: th.navBarBorder }}>
          <div className="flex items-center justify-between px-6 md:px-10 lg:px-14 py-3 lg:py-4">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src={th.logo}
                alt="Aurigital"
                width={103}
                height={35}
                className="w-[80px] md:w-[103px] h-auto"
                unoptimized={true}
              />
            </Link>

            {/* Center links — desktop */}
            <div className="hidden lg:flex items-center">
              {navLinks.map((link) =>
                link.dropdown ? (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      className={`nav-svc__toggle font-red-hat font-medium ${th.navText} text-base px-5 py-3 rounded-[0.25em] flex items-center gap-[0.375em] cursor-pointer ${
                        dropdownOpen ? 'is--active' : ''
                      }`}
                    >
                      <span className="nav-svc__toggle-label">{link.label}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="8" viewBox="0 0 17 10" fill="none" className={`nav-svc__chevron ${th.chevron} ${dropdownOpen ? 'is--open' : ''}`}>
                        <path d="M1.5 1.5L8.5 8.5L15.5 1.5" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                ) : link.comingSoon ? (
                  <div
                    key={link.label}
                    className="relative group"
                    onMouseEnter={() => setDropdownOpen(false)}
                  >
                    <span className={`nav-svc__link font-red-hat font-medium ${th.navText} opacity-40 text-base px-5 py-3 rounded-[0.25em] cursor-default select-none`}>
                      {link.label}
                    </span>
                    <span className={`absolute -bottom-8 left-1/2 -translate-x-1/2 ${th.comingSoonBg} ${th.comingSoonText} text-xs font-space-grotesk px-2 py-1 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none`}>
                      Próximamente
                    </span>
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`nav-svc__link font-red-hat font-medium ${th.navText} text-base px-5 py-3 rounded-[0.25em]`}
                    onMouseEnter={() => setDropdownOpen(false)}
                  >
                    <span className="nav-svc__link-label">{link.label}</span>
                  </Link>
                )
              )}
            </div>

            {/* Right CTAs — desktop */}
            <div className="hidden lg:flex items-center gap-2">
              <CotizacionButton onClick={openModal}>{nav?.ctaSolid || 'Solicitar cotización'}</CotizacionButton>
            </div>

            {/* Hamburger — mobile */}
            <button
              className="lg:hidden relative w-8 h-8 flex items-center justify-center cursor-pointer"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? (nav?.menuClose || 'Cerrar menú') : (nav?.menuOpen || 'Abrir menú')}
              aria-expanded={mobileOpen}
            >
              <span className={`absolute w-6 h-[2px] ${th.hamburger} transition-all duration-300 ${mobileOpen ? 'rotate-45 top-[15px]' : 'top-[10px]'}`} />
              <span className={`absolute w-6 h-[2px] ${th.hamburger} transition-all duration-300 ${mobileOpen ? 'opacity-0' : 'top-[15px]'}`} />
              <span className={`absolute w-6 h-[2px] ${th.hamburger} transition-all duration-300 ${mobileOpen ? '-rotate-45 top-[15px]' : 'top-[20px]'}`} />
            </button>
          </div>
        </div>

        {/* Full-width dropdown — slides down */}
        <div
          className="nav-svc__dropdown hidden lg:block"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className="nav-svc__dropdown-slide"
            style={{ gridTemplateRows: dropdownOpen ? '1fr' : '0fr' }}
          >
            <div className="overflow-hidden">
              <div className={`${th.dropdownBg} rounded-b-xl px-6 md:px-10 lg:px-14 pt-6 pb-8`}>
                <ul className="flex gap-5 list-none m-0 p-0">
                  {serviciosDropdown.map((item, idx) => (
                    <li
                      key={item.label}
                      className={`nav-svc__dropdown-li flex-1 ${dropdownOpen ? 'is--visible' : ''}`}
                      style={{ transitionDelay: dropdownOpen ? `${0.18 + idx * 0.06}s` : '0s' }}
                    >
                      <Link
                        href={item.href}
                        className="block bg-[#252525] rounded-2xl px-5 py-6 h-full no-underline overflow-hidden hover:bg-[#333] transition-colors duration-200"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <div className="flex flex-col justify-between gap-10 min-h-[180px]">
                          <div className="flex items-start justify-between gap-4">
                            <p className="max-w-xs font-space-grotesk font-medium text-[#e9e9e9] text-xl md:text-2xl lg:text-[32px] uppercase leading-[0.89]">
                              {item.label}
                            </p>
                            <div className="bg-[#e9e9e9] rounded-[12px] w-[44px] h-[44px] md:w-[51px] md:h-[51px] flex items-center justify-center flex-shrink-0">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M9.33398 12.6666L14.0007 7.99992L9.33398 3.33325" stroke="#252525" strokeMiterlimit="10" />
                                <path d="M14.0007 8H1.33398" stroke="#252525" strokeMiterlimit="10" />
                              </svg>
                            </div>
                          </div>
                          <p className="font-red-hat font-medium text-white/80 text-base md:text-xl tracking-[-0.4px] leading-[26px]">
                            {item.description}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* page-bg overlay */}
        <div
          className={`nav-svc__page-bg ${dropdownOpen ? 'is--visible' : ''}`}
          onClick={() => setDropdownOpen(false)}
        />

      </nav>

      {/* Mobile menu — outside nav to avoid transform containing block issue */}
      <div
        className={`nav-svc__mobile lg:hidden fixed inset-0 ${th.mobileBg} z-[60] flex flex-col ${
          mobileOpen ? 'is--open' : ''
        }`}
      >
        {/* Mobile header */}
        <div className={`flex items-center justify-between px-6 md:px-10 py-4 border-b ${th.mobileBorder}`}>
          <Link href="/" onClick={() => setMobileOpen(false)}>
            <Image
              src={th.logo}
              alt="Aurigital"
              width={103}
              height={35}
              className="w-[80px] h-auto"
              unoptimized={true}
            />
          </Link>
          <button
            className="w-8 h-8 flex items-center justify-center cursor-pointer"
            onClick={() => setMobileOpen(false)}
            aria-label={nav?.menuClose || 'Cerrar menú'}
          >
            <X size={24} className="text-[#252525]" />
          </button>
        </div>

        {/* Mobile nav links */}
        <div className="flex-1 flex flex-col px-6 md:px-10 pt-6 pb-6 overflow-y-auto">
          <nav className="flex flex-col gap-0">
            {navLinks.map((link, i) =>
              link.dropdown ? (
                <div key={link.label} className="border-b border-black/8">
                  <button
                    className={`nav-svc__mobile-link flex items-center justify-between w-full py-5 cursor-pointer ${mobileOpen ? 'is--visible' : ''}`}
                    style={{ transitionDelay: mobileOpen ? `${0.1 + i * 0.05}s` : '0s' }}
                    onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                  >
                    <span className={`font-space-grotesk font-medium ${th.mobileText} text-2xl md:text-3xl`}>
                      {link.label}
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="12" viewBox="0 0 17 10" fill="none" className={`transition-transform duration-300 ${th.mobileText} ${mobileDropdownOpen ? 'rotate-180' : ''}`}>
                      <path d="M1.5 1.5L8.5 8.5L15.5 1.5" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <div
                    className="grid transition-[grid-template-rows] duration-[450ms]"
                    style={{
                      gridTemplateRows: mobileDropdownOpen ? '1fr' : '0fr',
                      transitionTimingFunction: 'cubic-bezier(0.525, 0, 0, 1)',
                    }}
                  >
                    <div className="overflow-hidden">
                      <div className="flex flex-col gap-3 pb-4">
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className="block bg-[#252525] rounded-2xl px-5 py-5 no-underline overflow-hidden"
                          >
                            <div className="flex items-center justify-between gap-3">
                              <div className="flex flex-col gap-1">
                                <span className="font-space-grotesk font-medium text-[#e9e9e9] text-lg uppercase leading-tight">
                                  {item.label}
                                </span>
                                <span className={`font-red-hat font-medium ${th.mobileSubText} text-sm leading-snug`}>
                                  {item.description}
                                </span>
                              </div>
                              <div className="bg-[#e9e9e9] rounded-[10px] w-[38px] h-[38px] flex items-center justify-center flex-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 16 16" fill="none">
                                  <path d="M9.33398 12.6666L14.0007 7.99992L9.33398 3.33325" stroke="#252525" strokeMiterlimit="10" />
                                  <path d="M14.0007 8H1.33398" stroke="#252525" strokeMiterlimit="10" />
                                </svg>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : link.comingSoon ? (
                <div
                  key={link.label}
                  className={`nav-svc__mobile-link flex items-center justify-between py-5 border-b ${th.mobileBorder} ${mobileOpen ? 'is--visible' : ''}`}
                  style={{ transitionDelay: mobileOpen ? `${0.1 + i * 0.05}s` : '0s' }}
                >
                  <span className={`font-space-grotesk font-medium ${th.mobileText} opacity-40 text-2xl md:text-3xl`}>
                    {link.label}
                  </span>
                  <span className={`font-space-grotesk text-xs font-medium ${th.comingSoonBadgeText} border ${th.comingSoonBadgeBorder} px-2 py-1 rounded-full`}>
                    Próximamente
                  </span>
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`nav-svc__mobile-link font-space-grotesk font-medium ${th.mobileText} text-2xl md:text-3xl py-5 border-b ${th.mobileBorder} block ${mobileOpen ? 'is--visible' : ''}`}
                  style={{ transitionDelay: mobileOpen ? `${0.1 + i * 0.05}s` : '0s' }}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* Mobile CTAs */}
          <div className={`nav-svc__mobile-ctas flex flex-col gap-3 mt-auto pt-8 ${mobileOpen ? 'is--visible' : ''}`}>
            <CotizacionButton onClick={() => { setMobileOpen(false); openModal(); }}>{nav?.ctaSolid || 'Solicitar cotización'}</CotizacionButton>
          </div>
        </div>
      </div>

    </>
  )
}
