"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

// ─── SVG ICONS ───────────────────────────────────────────────────────────────
const TruckIcon = ({ size = 24, color = "currentColor" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13" rx="1"/>
    <path d="M16 8h4l3 5v4h-7V8z"/>
    <circle cx="5.5" cy="18.5" r="2.5"/>
    <circle cx="18.5" cy="18.5" r="2.5"/>
  </svg>
);

const CraneIcon = ({ size = 24, color = "currentColor" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="21" x2="4" y2="3"/>
    <line x1="4" y1="3" x2="20" y2="3"/>
    <line x1="20" y1="3" x2="20" y2="8"/>
    <line x1="4" y1="10" x2="20" y2="10"/>
    <path d="M4 3l8 7"/>
    <line x1="20" y1="8" x2="20" y2="21"/>
  </svg>
);

const KipperIcon = ({ size = 24, color = "currentColor" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="10" width="12" height="9" rx="1"/>
    <path d="M13 13l5-5h4v6h-9"/>
    <path d="M7 10V7l4-4h5l2 4"/>
    <circle cx="5" cy="20" r="1.5"/>
    <circle cx="18" cy="20" r="1.5"/>
  </svg>
);

const StarIcon = ({ size = 24, color = "currentColor" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

const PhoneIcon = ({ size = 24, color = "currentColor" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.63 19.79 19.79 0 01.08 2.08 2 2 0 012.08 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
  </svg>
);

const MailIcon = ({ size = 24, color = "currentColor" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const MapPinIcon = ({ size = 24, color = "currentColor" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const CloseIcon = ({ size = 24, color = "currentColor" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const CheckIcon = ({ size = 24, color = "currentColor" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const ArrowRightIcon = ({ size = 24, color = "currentColor" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

const MenuIcon = ({ size = 24, color = "currentColor" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);

const ShieldIcon = ({ size = 24, color = "currentColor" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const ClockIcon = ({ size = 24, color = "currentColor" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

const SwissIcon = ({ size = 24, color = "currentColor" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none">
    <rect width="24" height="24" rx="3" fill="#D52B1E"/>
    <rect x="10" y="5" width="4" height="14" fill="white"/>
    <rect x="5" y="10" width="14" height="4" fill="white"/>
  </svg>
);

// ─── TYPES ────────────────────────────────────────────────────────────────────
type MissionType = "transport" | "kran" | "kipper" | "spezial";

interface Mission {
  id: MissionType;
  label: string;
  subtitle: string;
  icon: React.ReactNode;
  image: string;
  description: string;
  details: string[];
  color: string;
}

interface FleetItem {
  id: number;
  title: string;
  category: string;
  image: string;
  specs: string;
}

interface TimelineStep {
  id: number;
  label: string;
  desc: string;
  icon: React.ReactNode;
}

// ─── DATA ─────────────────────────────────────────────────────────────────────
const IMAGES = {
  nacht: "https://rohner-transport.ch/wp-content/uploads/2024/11/Nachtschicht.jpg",
  img1: "https://rohner-transport.ch/wp-content/uploads/2024/11/IMG_1164-scaled.jpg",
  img2: "https://rohner-transport.ch/wp-content/uploads/2024/11/IMG_8241-scaled.jpg",
  img3: "https://rohner-transport.ch/wp-content/uploads/2024/11/IMG_7120-scaled.jpg",
  img4: "https://rohner-transport.ch/wp-content/uploads/2024/11/IMG_3031-scaled.jpg",
};

const MISSIONS: Mission[] = [
  {
    id: "transport",
    label: "Transporte",
    subtitle: "Zuverlässig. Pünktlich. Schweizweit.",
    icon: <TruckIcon size={22} />,
    image: IMAGES.img1,
    description: "Von regionalen Lieferungen bis zu schweizweiten Transporten – Rohner liefert präzise, sicher und termingerecht.",
    details: ["Schweizweite Abdeckung", "24/7 Disposition", "GPS-Tracking", "Zertifizierte Fahrer"],
    color: "#0b3624",
  },
  {
    id: "kran",
    label: "Kranarbeiten",
    subtitle: "Kraft trifft Präzision.",
    icon: <CraneIcon size={22} />,
    image: IMAGES.nacht,
    description: "Unsere modernen Krane meistern auch die anspruchsvollsten Hebe- und Montageeinsätze auf Baustellen jeder Grösse.",
    details: ["Bis 80 Tonnen Hebelast", "Nacht- & Wochenendeinsätze", "Erfahrene Kranführer", "Sicherheit zertifiziert"],
    color: "#0b3624",
  },
  {
    id: "kipper",
    label: "Kippertransporte",
    subtitle: "Schüttgut. Erde. Aushub.",
    icon: <KipperIcon size={22} />,
    image: IMAGES.img2,
    description: "Aushub, Kies, Sand, Recycling – unsere Kipper-Flotte bewältigt jede Menge Schüttgut effizient und sauber.",
    details: ["Verschiedene Kippertypen", "Baustellengerecht", "Schnelle Rotation", "Entsorgungslogistik"],
    color: "#0b3624",
  },
  {
    id: "spezial",
    label: "Spezialtransporte",
    subtitle: "Wenn normal nicht reicht.",
    icon: <StarIcon size={22} />,
    image: IMAGES.img3,
    description: "Übermasse, Schwertransporte, Maschinen – was andere ablehnen, ist für Rohner eine lösbare Herausforderung.",
    details: ["Schwertransportgenehmigungen", "Routenplanung", "Begleitfahrzeuge", "Sondermasse bis 120t"],
    color: "#0b3624",
  },
];

const FLEET: FleetItem[] = [
  { id: 1, title: "Nachtschicht-Kran", category: "Kranarbeit", image: IMAGES.nacht, specs: "80t Hebelast" },
  { id: 2, title: "Schwertransport", category: "Spezialtransport", image: IMAGES.img1, specs: "Überbreite +" },
  { id: 3, title: "Kipper-Einsatz", category: "Kippertransport", image: IMAGES.img2, specs: "Schüttgut 30m³" },
  { id: 4, title: "Baustellenlogistik", category: "Transport", image: IMAGES.img3, specs: "Just-in-time" },
  { id: 5, title: "Materialtransport", category: "Transport", image: IMAGES.img4, specs: "Schweizweit" },
];

const TIMELINE_STEPS: TimelineStep[] = [
  { id: 1, label: "Anfrage", desc: "Kontakt aufnehmen", icon: <MailIcon size={18} /> },
  { id: 2, label: "Planung", desc: "Route & Ressourcen", icon: <MapPinIcon size={18} /> },
  { id: 3, label: "Fahrzeug", desc: "Disposition & Zuteilung", icon: <TruckIcon size={18} /> },
  { id: 4, label: "Einsatz", desc: "Ausführung vor Ort", icon: <CraneIcon size={18} /> },
  { id: 5, label: "Abschluss", desc: "Lieferung & Bestätigung", icon: <CheckIcon size={18} /> },
];

// ─── PROGRESS BAR ─────────────────────────────────────────────────────────────
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 origin-left z-[100]"
      style={{
        scaleX: scrollYProgress,
        background: "linear-gradient(90deg, #0b3624, #f4c430)",
      }}
    />
  );
}

// ─── LOGO ─────────────────────────────────────────────────────────────────────
function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      {/* Logo-Platzhalter – einfach durch <Image src="/logo.png" …/> ersetzen */}
      <div className="relative w-9 h-9 flex-shrink-0">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: dark ? "#f4c430" : "#0b3624" }}>
          <TruckIcon size={20} color={dark ? "#0b3624" : "#f4c430"} />
        </div>
      </div>
      <div className="flex flex-col leading-tight">
        <span className={`text-sm font-black tracking-widest uppercase ${dark ? "text-stone-900" : "text-[#0b3624]"}`} style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.12em" }}>
          Rohner AG
        </span>
        <span className={`text-[10px] font-semibold tracking-[0.2em] uppercase ${dark ? "text-stone-600" : "text-stone-500"}`}>
          Transporte
        </span>
      </div>
    </div>
  );
}

// ─── NAV ──────────────────────────────────────────────────────────────────────
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const navLinks = [
    { label: "Leistungen", id: "mission" },
    { label: "Fuhrpark", id: "fuhrpark" },
    { label: "Ablauf", id: "timeline" },
    { label: "Kontakt", id: "kontakt" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-lg shadow-stone-200/60" : "bg-transparent"}`}
      >
        <div className="max-w-7xl mx-auto px-5 flex items-center justify-between h-16">
          <button onClick={() => scrollTo("hero")} className="hover:opacity-80 transition-opacity">
            <Logo />
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-sm font-semibold tracking-wide text-stone-700 hover:text-[#0b3624] transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-[#f4c430] group-hover:w-full transition-all duration-300" />
              </button>
            ))}
            <button
              onClick={() => scrollTo("kontakt")}
              className="ml-2 px-5 py-2.5 rounded-full text-sm font-bold text-white transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
              style={{ background: "#0b3624" }}
            >
              Jetzt anfragen
            </button>
          </div>

          {/* Mobile burger */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-stone-100 transition-colors"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Menü öffnen"
          >
            {menuOpen ? <CloseIcon size={22} color="#0b3624" /> : <MenuIcon size={22} color="#0b3624" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-white flex flex-col pt-24 px-6 pb-10"
          >
            {/* decorative */}
            <div className="absolute top-0 right-0 w-48 h-48 rounded-bl-full opacity-5" style={{ background: "#0b3624" }} />
            <div className="flex flex-col gap-1 flex-1">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => scrollTo(link.id)}
                  className="flex items-center justify-between w-full px-4 py-4 rounded-xl text-left text-xl font-bold text-stone-800 hover:bg-stone-50 transition-colors group"
                >
                  {link.label}
                  <ArrowRightIcon size={18} color="#0b3624" />
                </motion.button>
              ))}
            </div>
            <div className="flex flex-col gap-3 mt-6">
              <a href="tel:0562505454" className="flex items-center gap-3 px-4 py-4 rounded-xl font-semibold text-white transition-all active:scale-95" style={{ background: "#0b3624" }}>
                <PhoneIcon size={18} color="#f4c430" /> 056 250 54 54
              </a>
              <a href="mailto:info@rohner-transport.ch" className="flex items-center gap-3 px-4 py-4 rounded-xl font-semibold text-stone-800 border-2 border-stone-200 transition-all active:scale-95">
                <MailIcon size={18} color="#0b3624" /> E-Mail schreiben
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero({ brightness }: { brightness: number }) {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.3]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-stone-50">
      {/* Parallax image */}
      <motion.div className="absolute inset-0" style={{ y: heroY }}>
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-150"
          style={{
            backgroundImage: `url(${IMAGES.nacht})`,
            filter: `brightness(${brightness * 0.4 + 0.15})`,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, rgba(11,54,36,${0.82 - brightness * 0.25}) 0%, rgba(11,54,36,${0.5 - brightness * 0.2}) 40%, rgba(244,196,48,${0.05 + brightness * 0.08}) 100%)`,
          }}
        />
      </motion.div>

      {/* Animated gold light lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[20, 50, 75].map((top, i) => (
          <motion.div
            key={i}
            className="absolute h-px"
            style={{ top: `${top}%`, background: `linear-gradient(90deg, transparent, #f4c430, transparent)`, width: "60%", left: "-10%" }}
            animate={{ x: ["0%", "120%"] }}
            transition={{ duration: 4 + i * 1.5, repeat: Infinity, ease: "linear", delay: i * 1.2 }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-5 w-full pt-24 pb-16"
        style={{ opacity: heroOpacity }}
      >
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase"
            style={{ background: "rgba(244,196,48,0.15)", border: "1px solid rgba(244,196,48,0.4)", color: "#f4c430" }}
          >
            <SwissIcon size={14} color="#f4c430" /> Schweizweit · Aargau · seit 2010
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-white leading-[0.92] mb-6"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(3rem, 8vw, 6rem)", fontWeight: 900, letterSpacing: "-0.02em" }}
          >
            JEDE LAST.<br />
            <span style={{ color: "#f4c430" }}>JEDE MISSION.</span><br />
            ROHNER.
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-white/80 text-lg mb-10 max-w-xl font-medium"
          >
            Transporte, Kranarbeiten & Spezialtransporte — präzise, kraftvoll, zuverlässig. Rohner AG aus Siglistorf, Aargau.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
            className="flex flex-wrap gap-4"
          >
            <motion.button
              onClick={() => scrollTo("mission")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="px-7 py-4 rounded-full font-black text-base tracking-wide flex items-center gap-2 shadow-2xl"
              style={{ background: "#f4c430", color: "#0b3624" }}
            >
              <TruckIcon size={18} color="#0b3624" />
              Mission starten
            </motion.button>
            <motion.button
              onClick={() => scrollTo("kontakt")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="px-7 py-4 rounded-full font-black text-base tracking-wide border-2 text-white flex items-center gap-2"
              style={{ borderColor: "rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.08)", backdropFilter: "blur(8px)" }}
            >
              <PhoneIcon size={18} color="white" />
              Kontakt
            </motion.button>
          </motion.div>
        </div>

        {/* Floating stat cards */}
        <div className="hidden md:flex absolute right-5 top-1/2 -translate-y-1/2 flex-col gap-4 z-20">
          {[
            { val: "24/7", label: "Disposition" },
            { val: "80t", label: "Max. Last" },
            { val: "CH", label: "Schweizweit" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 + i * 0.15 }}
              className="w-28 h-20 rounded-2xl flex flex-col items-center justify-center gap-1 backdrop-blur-md border"
              style={{ background: "rgba(255,255,255,0.12)", borderColor: "rgba(244,196,48,0.3)" }}
            >
              <span className="text-2xl font-black text-white" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{stat.val}</span>
              <span className="text-[10px] font-semibold tracking-widest uppercase text-white/60">{stat.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40 text-xs font-medium tracking-widest uppercase"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span>Scroll</span>
          <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
            <rect x="1" y="1" width="14" height="18" rx="7" stroke="currentColor" strokeWidth="1.5"/>
            <motion.rect x="6.5" y="5" width="3" height="5" rx="1.5" fill="currentColor"
              animate={{ y: [0, 4, 0] }} transition={{ duration: 2, repeat: Infinity }} />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── CONTRAST SLIDER ─────────────────────────────────────────────────────────
function ContrastSlider({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <section className="py-10 px-5 bg-stone-100 border-y border-stone-200">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold tracking-widest uppercase text-stone-500">Design-Atmosphäre</span>
          <span className="text-xs font-semibold text-stone-400">{Math.round(value * 100)}%</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center gap-1 min-w-[60px]">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#0b3624" }}>
              <TruckIcon size={14} color="#f4c430" />
            </div>
            <span className="text-[9px] font-bold tracking-wider uppercase text-stone-500 text-center">Baustellen-<br />Power</span>
          </div>

          <div className="flex-1 relative">
            <div className="relative h-3 rounded-full overflow-hidden"
              style={{ background: `linear-gradient(90deg, #0b3624 0%, #1a5c3a ${value * 60}%, #f4c430 100%)` }}>
            </div>
            <input
              type="range" min={0} max={1} step={0.01} value={value}
              onChange={(e) => onChange(Number(e.target.value))}
              className="absolute inset-0 w-full opacity-0 cursor-pointer h-3 top-0"
              style={{ WebkitAppearance: "none" }}
            />
            {/* Custom thumb */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full shadow-lg flex items-center justify-center pointer-events-none"
              style={{ left: `calc(${value * 100}% - 16px)`, background: "#f4c430", border: "3px solid white" }}
              whileHover={{ scale: 1.1 }}
            >
              <TruckIcon size={12} color="#0b3624" />
            </motion.div>
          </div>

          <div className="flex flex-col items-center gap-1 min-w-[60px]">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#f4c430" }}>
              <TruckIcon size={14} color="#0b3624" />
            </div>
            <span className="text-[9px] font-bold tracking-wider uppercase text-stone-500 text-center">Premium-<br />Klarheit</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── STATS BAR ────────────────────────────────────────────────────────────────
function StatsBar() {
  const stats = [
    { icon: <TruckIcon size={20} color="#f4c430" />, val: "50+", label: "Fahrzeuge" },
    { icon: <ClockIcon size={20} color="#f4c430" />, val: "24/7", label: "Erreichbar" },
    { icon: <SwissIcon size={20} color="#f4c430" />, val: "CH", label: "Schweizweit" },
    { icon: <ShieldIcon size={20} color="#f4c430" />, val: "ISO", label: "Zertifiziert" },
    { icon: <CheckIcon size={20} color="#f4c430" />, val: "100%", label: "Zuverlässigkeit" },
  ];
  return (
    <section className="py-8 bg-[#0b3624]">
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex flex-col items-center gap-1.5 py-3"
            >
              {s.icon}
              <span className="text-2xl font-black text-white" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{s.val}</span>
              <span className="text-[10px] font-semibold tracking-widest uppercase text-white/50">{s.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── MISSION CONTROL ──────────────────────────────────────────────────────────
function MissionControl({ onOpenModal }: { onOpenModal: (m: Mission) => void }) {
  const [active, setActive] = useState<MissionType>("transport");
  const currentMission = MISSIONS.find((m) => m.id === active)!;

  return (
    <section id="mission" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase" style={{ background: "rgba(11,54,36,0.06)", color: "#0b3624" }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#f4c430" }} />
            Mission Control
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-stone-900 leading-[0.95]" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            WAS KÖNNEN<br /><span style={{ color: "#0b3624" }}>WIR FÜR SIE TUN?</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Left: Selector */}
          <div className="flex flex-col gap-3">
            {MISSIONS.map((m, i) => (
              <motion.button
                key={m.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setActive(m.id)}
                className={`flex items-center gap-4 px-6 py-5 rounded-2xl border-2 text-left transition-all duration-200 group ${
                  active === m.id
                    ? "border-[#0b3624] shadow-lg"
                    : "border-stone-100 bg-stone-50 hover:border-stone-200"
                }`}
                style={active === m.id ? { background: "#f8faf9" } : {}}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200"
                  style={{ background: active === m.id ? "#0b3624" : "#f0f0f0" }}
                >
                  <span style={{ color: active === m.id ? "#f4c430" : "#888" }}>{m.icon}</span>
                </div>
                <div className="flex-1">
                  <div className="font-bold text-stone-900">{m.label}</div>
                  <div className="text-sm text-stone-500">{m.subtitle}</div>
                </div>
                {active === m.id && (
                  <motion.div layoutId="mission-check" className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "#f4c430" }}>
                    <CheckIcon size={12} color="#0b3624" />
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>

          {/* Right: Detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="rounded-3xl overflow-hidden shadow-2xl border border-stone-100"
            >
              {/* Image */}
              <div className="relative h-56 md:h-72 overflow-hidden">
                <img
                  src={currentMission.image}
                  alt={currentMission.label}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(11,54,36,0.7), transparent)" }} />
                {/* Status chip */}
                <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold tracking-wide" style={{ background: "rgba(11,54,36,0.85)", color: "#f4c430", backdropFilter: "blur(8px)" }}>
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-green-400" />
                  AKTIV
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-black text-white" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{currentMission.label}</h3>
                  <p className="text-white/80 text-sm">{currentMission.subtitle}</p>
                </div>
              </div>

              {/* Details */}
              <div className="p-6 bg-white">
                <p className="text-stone-600 mb-5 leading-relaxed">{currentMission.description}</p>
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {currentMission.details.map((d) => (
                    <div key={d} className="flex items-center gap-2 text-sm text-stone-700 font-medium">
                      <div className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0" style={{ background: "#f4c430" }}>
                        <CheckIcon size={10} color="#0b3624" />
                      </div>
                      {d}
                    </div>
                  ))}
                </div>
                <motion.button
                  onClick={() => onOpenModal(currentMission)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg"
                  style={{ background: "#0b3624" }}
                >
                  Anfrage vorbereiten <ArrowRightIcon size={16} color="#f4c430" />
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

// ─── MODAL ────────────────────────────────────────────────────────────────────
function MissionModal({ mission, onClose }: { mission: Mission | null; onClose: () => void }) {
  useEffect(() => {
    if (!mission) return;
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, [mission, onClose]);

  return (
    <AnimatePresence>
      {mission && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-x-4 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-md top-1/2 -translate-y-1/2 z-[70] rounded-3xl overflow-hidden shadow-2xl"
          >
            {/* Header image */}
            <div className="relative h-44 overflow-hidden">
              <img src={mission.image} alt={mission.label} className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(11,54,36,0.85), rgba(11,54,36,0.3))" }} />
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
              >
                <CloseIcon size={18} color="white" />
              </button>
              <div className="absolute bottom-4 left-5">
                <div className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: "#f4c430" }}>Ausgewählte Mission</div>
                <h3 className="text-2xl font-black text-white" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{mission.label}</h3>
              </div>
            </div>

            {/* Body */}
            <div className="bg-white p-6">
              <p className="text-stone-600 mb-5 text-sm leading-relaxed">{mission.description}</p>

              <div className="rounded-2xl p-4 mb-6" style={{ background: "#f8faf9", border: "1px solid #e0ece4" }}>
                <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#0b3624" }}>Zusammenfassung</div>
                <div className="grid grid-cols-2 gap-2">
                  {mission.details.map((d) => (
                    <div key={d} className="flex items-center gap-1.5 text-xs text-stone-700">
                      <CheckIcon size={12} color="#0b3624" /> {d}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <a
                  href={`mailto:info@rohner-transport.ch?subject=Anfrage: ${mission.label}`}
                  className="flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl font-bold text-white transition-all active:scale-95 shadow-lg"
                  style={{ background: "#0b3624" }}
                >
                  <MailIcon size={17} color="#f4c430" /> E-Mail schreiben
                </a>
                <a
                  href="tel:0562505454"
                  className="flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl font-bold transition-all active:scale-95"
                  style={{ background: "#f4c430", color: "#0b3624" }}
                >
                  <PhoneIcon size={17} color="#0b3624" /> 056 250 54 54
                </a>
                <button
                  onClick={onClose}
                  className="py-3 text-sm font-semibold text-stone-500 hover:text-stone-700 transition-colors"
                >
                  Schliessen
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── FLEET SHOWROOM ───────────────────────────────────────────────────────────
function FleetShowroom() {
  const [activeFleet, setActiveFleet] = useState<number | null>(null);

  return (
    <section id="fuhrpark" className="py-24" style={{ background: "#f7f5f0" }}>
      <div className="max-w-7xl mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase" style={{ background: "rgba(11,54,36,0.06)", color: "#0b3624" }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#f4c430" }} />
            Fuhrpark Showroom
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-stone-900 leading-[0.95]" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            UNSERE<br /><span style={{ color: "#0b3624" }}>FLOTTE.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FLEET.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative rounded-2xl overflow-hidden cursor-pointer group shadow-lg"
              style={{ aspectRatio: "4/3" }}
              onClick={() => setActiveFleet(activeFleet === item.id ? null : item.id)}
            >
              <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />

              {/* Scanner line on hover */}
              <motion.div
                className="absolute left-0 right-0 h-0.5 pointer-events-none"
                style={{ background: "linear-gradient(90deg, transparent, #f4c430, transparent)", top: "0%" }}
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />

              {/* Overlay */}
              <div className="absolute inset-0 transition-opacity duration-300" style={{ background: `linear-gradient(to top, rgba(11,54,36,0.85), rgba(11,54,36,${activeFleet === item.id ? "0.4" : "0.2"}))` }} />

              {/* Labels */}
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase" style={{ background: "rgba(244,196,48,0.9)", color: "#0b3624" }}>
                  {item.category}
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-lg font-black text-white mb-1" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{item.title}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/70">{item.specs}</span>
                  <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "#f4c430" }}>
                    <ArrowRightIcon size={12} color="#0b3624" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 3D CSS TRUCK CARD ────────────────────────────────────────────────────────
function TruckCard3D() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    const x = (e.clientY - r.top - r.height / 2) / (r.height / 2);
    const y = -(e.clientX - r.left - r.width / 2) / (r.width / 2);
    setTilt({ x: x * 12, y: y * 12 });
  }, []);

  return (
    <section className="py-24 bg-[#0b3624] overflow-hidden relative">
      {/* bg decoration */}
      <div className="absolute inset-0 opacity-5">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="absolute w-px" style={{ left: `${(i + 1) * 12.5}%`, top: 0, bottom: 0, background: "#f4c430" }} />
        ))}
      </div>
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase" style={{ background: "rgba(244,196,48,0.15)", color: "#f4c430" }}>
              Premium Qualität
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-white leading-[0.95] mb-6" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              INDUSTRIE-<br />GRADE<br /><span style={{ color: "#f4c430" }}>AUSRÜSTUNG.</span>
            </h2>
            <p className="text-white/70 mb-8 text-lg leading-relaxed">
              Modernste Fahrzeuge, professionell gewartet, für jeden Einsatz bereit. Rohner AG investiert in Qualität — für Ihre Sicherheit und Zuverlässigkeit.
            </p>
            <div className="flex flex-col gap-3">
              {["Regelmässige TÜV-Kontrollen", "Modernste GPS-Technologie", "Zertifizierte Fahrer & Kranführer"].map((f) => (
                <div key={f} className="flex items-center gap-3 text-white/80">
                  <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0" style={{ background: "#f4c430" }}>
                    <CheckIcon size={11} color="#0b3624" />
                  </div>
                  <span className="text-sm font-medium">{f}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 3D Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex justify-center"
            style={{ perspective: "800px" }}
          >
            <div
              ref={cardRef}
              onMouseMove={handleMove}
              onMouseLeave={() => setTilt({ x: 0, y: 0 })}
              style={{
                width: 320,
                height: 400,
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: "transform 0.1s ease-out",
                transformStyle: "preserve-3d",
              }}
              className="relative rounded-3xl overflow-hidden cursor-pointer shadow-2xl"
            >
              <img src={IMAGES.img3} alt="Rohner Truck" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(11,54,36,0.3), rgba(11,54,36,0.7))" }} />

              {/* Shine effect */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `linear-gradient(${135 + tilt.y * 2}deg, rgba(255,255,255,0.15) 0%, transparent 50%)`,
                }}
              />

              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: "#f4c430" }}>ROHNER AG TRANSPORTE</div>
                <div className="text-2xl font-black text-white" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Siglistorf, Aargau</div>
                <div className="flex items-center gap-1.5 mt-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <div key={s} className="w-3.5 h-3.5" style={{ color: "#f4c430" }}>★</div>
                  ))}
                  <span className="text-xs text-white/60 ml-1">Schweizer Qualität</span>
                </div>
              </div>

              {/* Animated wheels */}
              <div className="absolute bottom-4 right-4 flex gap-2">
                {[0, 1].map((w) => (
                  <motion.div
                    key={w}
                    className="w-6 h-6 rounded-full border-2 flex items-center justify-center"
                    style={{ borderColor: "#f4c430" }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: w * 0.3 }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#f4c430" }} />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── TIMELINE ─────────────────────────────────────────────────────────────────
function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);
  const truckY = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "88%"]);

  return (
    <section id="timeline" className="py-24 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase" style={{ background: "rgba(11,54,36,0.06)", color: "#0b3624" }}>
            Unser Ablauf
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-stone-900 leading-[0.95]" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            VON DER ANFRAGE<br /><span style={{ color: "#0b3624" }}>ZUR LIEFERUNG.</span>
          </h2>
        </motion.div>

        {/* Desktop: horizontal */}
        <div className="hidden md:block relative">
          {/* Track */}
          <div className="absolute top-12 left-12 right-12 h-0.5 bg-stone-100" />
          <motion.div
            className="absolute top-12 left-12 h-0.5 origin-left"
            style={{ background: "linear-gradient(90deg, #0b3624, #f4c430)", width: lineHeight }}
          />

          <div className="grid grid-cols-5 gap-4 relative">
            {TIMELINE_STEPS.map((step, i) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="flex flex-col items-center text-center"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mb-4 relative z-10 shadow-lg"
                  style={{ background: "#0b3624", border: "3px solid white" }}
                >
                  <span style={{ color: "#f4c430" }}>{step.icon}</span>
                </div>
                <div className="text-sm font-black text-stone-900 mb-1">{step.label}</div>
                <div className="text-xs text-stone-500">{step.desc}</div>
              </motion.div>
            ))}
          </div>

          {/* Truck moving along */}
          <motion.div className="absolute" style={{ top: 2, left: lineHeight }}>
            <TruckIcon size={18} color="#f4c430" />
          </motion.div>
        </div>

        {/* Mobile: vertical */}
        <div className="md:hidden relative pl-10">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-stone-100" />
          <motion.div
            className="absolute left-4 top-0 w-0.5 origin-top"
            style={{ background: "linear-gradient(180deg, #0b3624, #f4c430)", height: lineHeight }}
          />

          {/* Truck */}
          <motion.div
            className="absolute left-1"
            style={{ top: truckY }}
          >
            <div className="rotate-90">
              <TruckIcon size={16} color="#f4c430" />
            </div>
          </motion.div>

          {TIMELINE_STEPS.map((step, i) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative flex gap-5 mb-8"
            >
              <div
                className="absolute -left-10 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-md"
                style={{ background: "#0b3624", border: "2px solid white" }}
              >
                <span style={{ color: "#f4c430" }}>{step.icon}</span>
              </div>
              <div>
                <div className="font-bold text-stone-900 mb-1">{step.label}</div>
                <div className="text-sm text-stone-500">{step.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT ─────────────────────────────────────────────────────────────────
function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section id="kontakt" className="py-24" style={{ background: "#f7f5f0" }}>
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase" style={{ background: "rgba(11,54,36,0.06)", color: "#0b3624" }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#f4c430" }} />
              Kontakt
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-stone-900 leading-[0.95] mb-6" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              BEREIT FÜR<br /><span style={{ color: "#0b3624" }}>IHRE MISSION?</span>
            </h2>
            <p className="text-stone-600 mb-8 text-lg leading-relaxed">
              Kontaktieren Sie uns direkt — wir antworten schnell und unkompliziert. Für dringende Anfragen sind wir 24/7 erreichbar.
            </p>

            <div className="flex flex-col gap-4">
              <a
                href="tel:0562505454"
                className="flex items-center gap-4 px-6 py-4 rounded-2xl transition-all hover:scale-[1.02] active:scale-98 shadow-lg group"
                style={{ background: "#0b3624" }}
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#f4c430" }}>
                  <PhoneIcon size={20} color="#0b3624" />
                </div>
                <div>
                  <div className="text-xs font-bold tracking-widest uppercase text-white/50 mb-0.5">Telefon</div>
                  <div className="text-lg font-black text-white">056 250 54 54</div>
                </div>
                <ArrowRightIcon size={18} color="rgba(255,255,255,0.3)" />
              </a>

              <a
                href="mailto:info@rohner-transport.ch"
                className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-white transition-all hover:scale-[1.02] active:scale-98 shadow-md group border border-stone-100"
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(11,54,36,0.08)" }}>
                  <MailIcon size={20} color="#0b3624" />
                </div>
                <div>
                  <div className="text-xs font-bold tracking-widest uppercase text-stone-400 mb-0.5">E-Mail</div>
                  <div className="text-base font-bold text-stone-800">info@rohner-transport.ch</div>
                </div>
                <ArrowRightIcon size={18} color="#ccc" />
              </a>

              <div className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-white shadow-md border border-stone-100">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(11,54,36,0.08)" }}>
                  <MapPinIcon size={20} color="#0b3624" />
                </div>
                <div>
                  <div className="text-xs font-bold tracking-widest uppercase text-stone-400 mb-0.5">Standort</div>
                  <div className="text-base font-bold text-stone-800">Siglistorf, Aargau</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Anfragepanel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="px-8 py-6" style={{ background: "#0b3624" }}>
              <h3 className="text-2xl font-black text-white mb-1" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>SCHNELLANFRAGE</h3>
              <p className="text-white/60 text-sm">Wählen Sie Ihre Einsatzart</p>
            </div>
            <div className="bg-white p-8">
              <div className="grid grid-cols-2 gap-3 mb-6">
                {MISSIONS.map((m) => (
                  <a
                    key={m.id}
                    href={`mailto:info@rohner-transport.ch?subject=Anfrage: ${m.label}`}
                    className="flex flex-col items-center gap-2 p-4 rounded-2xl border-2 border-stone-100 hover:border-[#0b3624] transition-all duration-200 group text-center"
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform" style={{ background: "rgba(11,54,36,0.08)" }}>
                      <span style={{ color: "#0b3624" }}>{m.icon}</span>
                    </div>
                    <span className="text-xs font-bold text-stone-700">{m.label}</span>
                  </a>
                ))}
              </div>

              <div className="border-t border-stone-100 pt-6">
                <p className="text-sm text-stone-500 mb-4 text-center">Oder direkt Kontakt aufnehmen:</p>
                <div className="flex gap-3">
                  <a
                    href="tel:0562505454"
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-white transition-all active:scale-95"
                    style={{ background: "#0b3624" }}
                  >
                    <PhoneIcon size={16} color="#f4c430" /> Anrufen
                  </a>
                  <a
                    href="mailto:info@rohner-transport.ch"
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold transition-all active:scale-95"
                    style={{ background: "#f4c430", color: "#0b3624" }}
                  >
                    <MailIcon size={16} color="#0b3624" /> E-Mail
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <footer style={{ background: "#06231a" }}>
      <div className="max-w-7xl mx-auto px-5 py-16">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="mb-4"><Logo dark /></div>
            <p className="text-stone-400 text-sm leading-relaxed max-w-xs">
              Rohner AG Transporte — Zuverlässige Transportlösungen aus Siglistorf, Aargau. Schweizweit verfügbar.
            </p>
          </div>

          {/* Links */}
          <div>
            <div className="text-xs font-bold tracking-widest uppercase text-stone-500 mb-4">Navigation</div>
            <div className="flex flex-col gap-2">
              {[
                { label: "Mission Control", id: "mission" },
                { label: "Fuhrpark", id: "fuhrpark" },
                { label: "Ablauf", id: "timeline" },
                { label: "Kontakt", id: "kontakt" },
              ].map((l) => (
                <button key={l.id} onClick={() => scrollTo(l.id)} className="text-sm text-stone-400 hover:text-white transition-colors text-left w-fit">
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <div className="text-xs font-bold tracking-widest uppercase text-stone-500 mb-4">Kontakt</div>
            <div className="flex flex-col gap-3">
              <a href="tel:0562505454" className="flex items-center gap-2 text-sm text-stone-400 hover:text-white transition-colors">
                <PhoneIcon size={14} color="#f4c430" /> 056 250 54 54
              </a>
              <a href="mailto:info@rohner-transport.ch" className="flex items-center gap-2 text-sm text-stone-400 hover:text-white transition-colors">
                <MailIcon size={14} color="#f4c430" /> info@rohner-transport.ch
              </a>
              <div className="flex items-center gap-2 text-sm text-stone-400">
                <MapPinIcon size={14} color="#f4c430" /> Siglistorf, Aargau
              </div>
            </div>
          </div>
        </div>

        <div className="border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-3" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <p className="text-stone-600 text-xs">© {new Date().getFullYear()} Rohner AG Transporte. Alle Rechte vorbehalten.</p>
          <div className="flex items-center gap-2 text-xs text-stone-600">
            <SwissIcon size={14} color="#f4c430" /> Made in Switzerland
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── FONT LOADER ──────────────────────────────────────────────────────────────
function FontLoader() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;900&display=swap";
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);
  return null;
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function RohnerPage() {
  const [brightness, setBrightness] = useState(0.5);
  const [modalMission, setModalMission] = useState<Mission | null>(null);

  return (
    <>
      <FontLoader />
      <ScrollProgress />
      <Navbar />

      <main>
        <Hero brightness={brightness} />
        <ContrastSlider value={brightness} onChange={setBrightness} />
        <StatsBar />
        <MissionControl onOpenModal={setModalMission} />
        <FleetShowroom />
        <TruckCard3D />
        <Timeline />
        <Contact />
      </main>

      <Footer />
      <MissionModal mission={modalMission} onClose={() => setModalMission(null)} />
    </>
  );
}
