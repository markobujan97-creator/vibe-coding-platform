"use client";

import React, { useMemo, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const logoData = "data:image/webp;base64,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

const assets = {
  night: "https://rohner-transport.ch/wp-content/uploads/2024/11/Nachtschicht.jpg",
  whiteCrane: "https://rohner-transport.ch/wp-content/uploads/2024/11/IMG_1164-scaled.jpg",
  tipper: "https://rohner-transport.ch/wp-content/uploads/2024/11/IMG_8241-scaled.jpg",
  excavation: "https://rohner-transport.ch/wp-content/uploads/2024/11/IMG_7120-scaled.jpg",
  alpine: "https://rohner-transport.ch/wp-content/uploads/2024/11/IMG_3031-scaled.jpg",
};

const Icon = ({ name, className = "h-5 w-5" }: { name: string; className?: string }) => {
  const p: Record<string, React.ReactNode> = {
    arrow: <path d="M5 12h14M13 5l7 7-7 7" />,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    x: <path d="M6 6l12 12M18 6 6 18" />,
    phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.4 2.1L8 9.7a16 16 0 0 0 6.3 6.3l1.3-1.3a2 2 0 0 1 2.1-.4c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2z" />,
    mail: <><path d="M4 4h16v16H4z" /><path d="m22 6-10 7L2 6" /></>,
    pin: <><path d="M21 10c0 7-9 12-9 12S3 17 3 10a9 9 0 1 1 18 0z" /><circle cx="12" cy="10" r="3" /></>,
    truck: <><path d="M3 7h11v10H3zM14 10h4l3 3v4h-7z" /><circle cx="7" cy="18" r="2" /><circle cx="18" cy="18" r="2" /></>,
    crane: <><path d="M4 21V8l8-5 8 5M4 8h16M8 21V8M14 21V8" /></>,
    route: <><circle cx="6" cy="18" r="2" /><circle cx="18" cy="6" r="2" /><path d="M8 18c7 0 2-12 8-12" /></>,
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" /></>,
    moon: <path d="M21 12.8A8 8 0 1 1 11.2 3 6.5 6.5 0 0 0 21 12.8z" />,
  };
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{p[name] ?? p.truck}</svg>;
};

const Button = ({ children, className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => <button {...props} className={`inline-flex items-center justify-center transition ${className}`}>{children}</button>;

const gallery = [
  { title: "Spezialtransporte", image: assets.alpine, tag: "Schweizweit" },
  { title: "Kranarbeiten", image: assets.whiteCrane, tag: "Präzision" },
  { title: "Kippertransporte", image: assets.tipper, tag: "Power" },
  { title: "Baustellenlogistik", image: assets.excavation, tag: "Timing" },
];

function Logo() {
  return <img src={logoData} alt="Rohner AG Transporte Logo" className="h-[58px] w-auto object-contain" />;
}

function TruckBrightnessControl({ value, onChange }: { value: number; onChange: (value: number) => void }) {
  const pos = `${value}%`;
  return (
    <section id="design-drive" className="px-5 py-24">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[3.5rem] bg-white shadow-[0_35px_110px_rgba(11,54,36,0.16)] ring-1 ring-[#0b3624]/10">
        <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="p-8 md:p-14">
            <p className="font-black uppercase tracking-[0.35em] text-[#d9a900]">Einzigartig</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-[#0b3624] md:text-6xl">Fahr die Website heller.</h2>
            <p className="mt-5 text-lg font-semibold leading-8 text-[#0b3624]/65">Kein Standard-Regler: Der Rohner-LKW fährt über die Strecke und verändert live den Look der ganzen Website — links kernig/dunkler, rechts klar/hell.</p>
            <div className="mt-8 grid grid-cols-2 gap-3">
              <div className="rounded-3xl bg-[#0b3624] p-5 text-white"><Icon name="moon" className="mb-4 h-8 w-8 text-[#f4c430]" /><div className="text-2xl font-black">Dunkler</div><div className="text-sm text-white/60">mehr Kontrast</div></div>
              <div className="rounded-3xl bg-[#f4c430] p-5 text-[#0b3624]"><Icon name="sun" className="mb-4 h-8 w-8" /><div className="text-2xl font-black">Heller</div><div className="text-sm font-bold opacity-70">mehr Weissraum</div></div>
            </div>
          </div>
          <div className="relative min-h-[520px] overflow-hidden bg-[#eaf1ec]">
            <img src={assets.alpine} alt="Bergstrasse" className="absolute inset-0 h-full w-full object-cover" style={{ filter: `brightness(${0.45 + value / 85}) saturate(${0.75 + value / 160})` }} />
            <div className="absolute inset-0" style={{ background: `linear-gradient(90deg, rgba(5,20,16,${0.72 - value / 180}) 0%, rgba(255,255,255,${value / 130}) 100%)` }} />
            <div className="absolute bottom-24 left-10 right-10 h-4 rounded-full bg-white/80 shadow-inner ring-1 ring-black/10">
              <div className="absolute left-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#0b3624] to-[#f4c430]" style={{ width: pos }} />
              <motion.div className="absolute top-1/2 w-44 -translate-x-1/2 -translate-y-[62%] cursor-grab active:cursor-grabbing" animate={{ left: pos }} transition={{ type: "spring", stiffness: 120, damping: 18 }}>
                <img src={assets.tipper} alt="Rohner Lastwagen als Regler" className="h-24 w-44 rounded-2xl object-cover object-center shadow-2xl ring-4 ring-white" />
                <div className="mx-auto -mt-2 h-5 w-5 rounded-full bg-[#f4c430] shadow-lg ring-4 ring-white" />
              </motion.div>
              <input aria-label="Website Helligkeit" type="range" min="0" max="100" value={value} onChange={(e) => onChange(Number(e.target.value))} className="absolute inset-0 h-28 w-full -translate-y-12 cursor-ew-resize opacity-0" />
            </div>
            <div className="absolute left-10 top-10 rounded-3xl bg-[#0b3624]/90 p-5 text-white backdrop-blur"><div className="text-sm font-black uppercase tracking-[0.25em] text-[#f4c430]">Dunkel</div><div className="mt-2 text-2xl font-black">Baustellen-Power</div></div>
            <div className="absolute right-10 top-10 rounded-3xl bg-white/90 p-5 text-[#0b3624] shadow-xl backdrop-blur"><div className="text-sm font-black uppercase tracking-[0.25em] text-[#d9a900]">Hell</div><div className="mt-2 text-2xl font-black">Premium-Auftritt</div></div>
            <div className="absolute bottom-8 left-0 right-0 text-center text-sm font-black text-white drop-shadow">← Rohner-LKW ziehen und Website-Look verändern →</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MissionComposer() {
  const [active, setActive] = useState(0);
  const missions = [
    { title: "Transporte", icon: "truck", copy: "Material, Maschinen und Spezialgüter zuverlässig ans Ziel." },
    { title: "Kranarbeiten", icon: "crane", copy: "Heben, platzieren, sichern — präzise bis zum letzten Zentimeter." },
    { title: "Baustellenlogistik", icon: "route", copy: "Abläufe planen, Zeitfenster treffen, Einsatz sauber abschliessen." },
    { title: "Spezialfälle", icon: "arrow", copy: "Wenn Standard nicht reicht, wird intelligent geplant." },
  ];
  return (
    <section id="leistungen" className="px-5 py-24">
      <div className="mx-auto max-w-7xl">
        <p className="font-black uppercase tracking-[0.35em] text-[#d9a900]">Leistungen</p>
        <h2 className="mt-3 max-w-4xl text-4xl font-black tracking-tight text-[#0b3624] md:text-6xl">Nicht scrollen und lesen. Einsatz auswählen und erleben.</h2>
        <div className="mt-12 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="grid gap-4 sm:grid-cols-2">
            {missions.map((m, i) => <button key={m.title} onClick={() => setActive(i)} className={`rounded-[2rem] border p-6 text-left transition ${active === i ? "border-[#f4c430] bg-[#f4c430] text-[#0b3624] shadow-2xl" : "border-[#0b3624]/10 bg-white text-[#0b3624] shadow-lg hover:-translate-y-1"}`}><Icon name={m.icon} className="h-8 w-8" /><div className="mt-8 text-3xl font-black">{m.title}</div><p className="mt-2 text-sm font-semibold opacity-70">{m.copy}</p></button>)}
          </div>
          <motion.div key={active} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="relative min-h-[520px] overflow-hidden rounded-[3rem] bg-white shadow-2xl ring-1 ring-[#0b3624]/10">
            <img src={gallery[active].image} alt={missions[active].title} className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/5 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 rounded-[2rem] bg-white/90 p-6 text-[#0b3624] backdrop-blur-xl"><div className="mb-3 inline-flex rounded-full bg-[#f4c430] px-3 py-1 text-xs font-black uppercase tracking-[0.2em]">Mission {active + 1}</div><h3 className="text-4xl font-black">{missions[active].title}</h3><p className="mt-3 text-lg font-semibold text-[#0b3624]/70">{missions[active].copy}</p></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function RohnerTransportModern() {
  const [open, setOpen] = useState(false);
  const [brightness, setBrightness] = useState(78);
  const { scrollYProgress } = useScroll();
  const line = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const nav = useMemo(() => ["Leistungen", "Design-Drive", "Fuhrpark", "Kontakt"], []);
  const dark = 1 - brightness / 100;

  return (
    <main className="min-h-screen overflow-hidden text-[#0b3624] transition-colors duration-500" style={{ background: `linear-gradient(180deg, rgb(${255 - dark*35},${255 - dark*45},${250 - dark*50}), rgb(${251 - dark*45},${250 - dark*45},${245 - dark*55}))` }}>
      <motion.div className="fixed left-0 top-0 z-[60] h-1 bg-[#f4c430]" style={{ width: line }} />
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-[#0b3624]/10 bg-white/85 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
          <Logo />
          <nav className="hidden items-center gap-8 md:flex">
            {nav.map((item) => <a key={item} href={`#${item === "Design-Drive" ? "design-drive" : item.toLowerCase()}`} className="text-sm font-black text-[#0b3624]/65 transition hover:text-[#d9a900]">{item}</a>)}
          </nav>
          <Button className="hidden rounded-full bg-[#0b3624] px-5 py-3 font-black text-white hover:bg-[#145f3f] md:flex">Anfrage</Button>
          <button onClick={() => setOpen(!open)} className="rounded-full border border-[#0b3624]/10 p-2 md:hidden">{open ? <Icon name="x" /> : <Icon name="menu" />}</button>
        </div>
      </header>

      <section className="relative px-5 pb-16 pt-32 lg:pt-36">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="font-black uppercase tracking-[0.35em] text-[#d9a900]">Wir bewegen</p>
            <h1 className="mt-4 text-6xl font-black leading-[0.88] tracking-tight text-[#0b3624] md:text-8xl">Was andere nicht können.</h1>
            <p className="mt-7 max-w-2xl text-lg font-semibold leading-8 text-[#0b3624]/65 md:text-xl">Moderner, heller und trotzdem kraftvoll: Spezialtransporte, Kranarbeiten und Baustellenlogistik als digitale Erlebniswelt.</p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row"><Button className="group rounded-full bg-[#0b3624] px-7 py-6 text-base font-black text-white shadow-xl hover:bg-[#145f3f]">Unsere Leistungen <Icon name="arrow" className="ml-2 h-5 w-5 transition group-hover:translate-x-1" /></Button><Button className="rounded-full border border-[#0b3624]/15 bg-white px-7 py-6 text-base font-black text-[#0b3624] shadow-lg hover:bg-[#f4f1e8]">Video ansehen</Button></div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} className="relative min-h-[610px] overflow-hidden rounded-[3.5rem] bg-white shadow-[0_40px_120px_rgba(10,48,33,0.18)] ring-1 ring-[#0b3624]/10">
            <img src={assets.whiteCrane} alt="Rohner Lastwagen mit Kran" className="absolute inset-0 h-full w-full object-cover" style={{ filter: `brightness(${0.82 + brightness/420})` }} />
            <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/15 to-transparent" />
            <div className="absolute bottom-8 left-8 rounded-full border-2 border-[#f4c430] bg-white/90 px-8 py-7 text-center shadow-xl backdrop-blur"><div className="text-xs font-black uppercase tracking-[0.25em]">Seit</div><div className="text-4xl font-black">1980</div><div className="text-xs font-black uppercase">für Sie unterwegs</div></div>
          </motion.div>
        </div>
      </section>

      <MissionComposer />
      <TruckBrightnessControl value={brightness} onChange={setBrightness} />

      <section id="fuhrpark" className="px-5 py-24">
        <div className="mx-auto max-w-7xl">
          <p className="font-black uppercase tracking-[0.35em] text-[#d9a900]">Fuhrpark</p>
          <h2 className="mt-3 max-w-4xl text-4xl font-black tracking-tight md:text-6xl">Showroom für Maschinen, nicht nur Bildergalerie.</h2>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">{gallery.map((item, i) => <motion.article key={item.title} whileHover={{ y: -10, rotate: i % 2 ? 1 : -1 }} className="group relative h-[460px] overflow-hidden rounded-[2.2rem] bg-white shadow-xl ring-1 ring-[#0b3624]/10"><img src={item.image} alt={item.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" /><div className="absolute inset-0 bg-gradient-to-t from-white via-white/5 to-transparent" /><div className="absolute bottom-0 left-0 right-0 p-6"><div className="mb-3 inline-flex rounded-full bg-[#f4c430] px-3 py-1 text-xs font-black text-[#0b3624]">{item.tag}</div><h3 className="text-3xl font-black text-[#0b3624]">{item.title}</h3></div></motion.article>)}</div>
        </div>
      </section>

      <section id="kontakt" className="px-5 pb-20 pt-10">
        <div className="mx-auto max-w-7xl rounded-[3.5rem] bg-[#f4c430] p-8 text-[#0b3624] shadow-2xl shadow-[#f4c430]/25 md:p-14">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center"><div><h2 className="text-4xl font-black tracking-tight md:text-6xl">Bereit für den nächsten Einsatz?</h2><p className="mt-5 max-w-2xl text-lg font-bold text-[#0b3624]/70">Direkt, klar, stark — Kontakt ohne Reibung.</p></div><div className="rounded-[2rem] bg-white p-6 text-[#0b3624] shadow-xl"><div className="space-y-4"><div className="flex items-center gap-3 font-black"><Icon name="phone" className="text-[#d9a900]" /> 056 250 54 54</div><div className="flex items-center gap-3 font-black"><Icon name="mail" className="text-[#d9a900]" /> info@rohner-transport.ch</div><div className="flex items-center gap-3 font-black"><Icon name="pin" className="text-[#d9a900]" /> Siglistorf, Aargau</div></div><Button className="mt-7 w-full rounded-full bg-[#0b3624] py-6 font-black text-white hover:bg-[#145f3f]">Jetzt Kontakt aufnehmen</Button></div></div>
        </div>
      </section>

      <footer className="border-t border-[#0b3624]/10 bg-white px-5 py-8"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 text-[#0b3624]/60 md:flex-row md:items-center"><Logo /><div className="text-sm font-semibold">© Rohner AG Transporte — modernes Redesign-Konzept</div></div></footer>
    </main>
  );
}
