"use client";

import React, { useMemo, useState } from "react";

const logoData = "data:image/webp;base64,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";

const assets = {
  hero: "https://rohner-transport.ch/wp-content/uploads/2024/11/IMG_1164-scaled.jpg",
  night: "https://rohner-transport.ch/wp-content/uploads/2024/11/Nachtschicht.jpg",
  truck: "https://rohner-transport.ch/wp-content/uploads/2024/11/IMG_8241-scaled.jpg",
  site: "https://rohner-transport.ch/wp-content/uploads/2024/11/IMG_7120-scaled.jpg",
  road: "https://rohner-transport.ch/wp-content/uploads/2024/11/IMG_3031-scaled.jpg",
};

type IconName = "menu" | "x" | "arrow" | "phone" | "mail" | "pin" | "truck" | "crane" | "route" | "sun" | "moon" | "scan" | "bolt" | "shield" | "play" | "cube";

function Icon({ name, className = "h-5 w-5" }: { name: IconName; className?: string }) {
  const paths: Record<IconName, React.ReactNode> = {
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    x: <path d="M6 6l12 12M18 6 6 18" />,
    arrow: <path d="M5 12h14M13 5l7 7-7 7" />,
    phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.4 2.1L8 9.7a16 16 0 0 0 6.3 6.3l1.3-1.3a2 2 0 0 1 2.1-.4c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2z" />,
    mail: <><path d="M4 4h16v16H4z" /><path d="m22 6-10 7L2 6" /></>,
    pin: <><path d="M21 10c0 7-9 12-9 12S3 17 3 10a9 9 0 1 1 18 0z" /><circle cx="12" cy="10" r="3" /></>,
    truck: <><path d="M3 7h11v10H3zM14 10h4l3 3v4h-7z" /><circle cx="7" cy="18" r="2" /><circle cx="18" cy="18" r="2" /></>,
    crane: <><path d="M4 21V8l8-5 8 5M4 8h16M8 21V8M14 21V8" /><path d="M20 8v5l-3 2" /></>,
    route: <><circle cx="6" cy="18" r="2" /><circle cx="18" cy="6" r="2" /><path d="M8 18c7 0 2-12 8-12" /></>,
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" /></>,
    moon: <path d="M21 12.8A8 8 0 1 1 11.2 3 6.5 6.5 0 0 0 21 12.8z" />,
    scan: <><path d="M4 7V4h3M17 4h3v3M20 17v3h-3M7 20H4v-3" /><path d="M7 12h10" /></>,
    bolt: <path d="M13 2 3 14h8l-1 8 11-14h-8z" />,
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM9 12l2 2 4-5" />,
    play: <path d="M8 5v14l11-7z" />,
    cube: <><path d="m21 16-9 5-9-5V8l9-5 9 5z" /><path d="m3.3 7.7 8.7 5 8.7-5M12 22V12" /></>,
  };
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

function Button({ children, className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} className={`inline-flex items-center justify-center transition active:scale-[0.98] ${className}`}>{children}</button>;
}

function Logo() {
  return (
    <div className="rounded-2xl bg-[#fff1c2] px-3 py-2 shadow-[0_10px_30px_rgba(10,48,33,0.12)] ring-1 ring-[#f4c430]/60">
      <img src={logoData} alt="Rohner AG Transporte Logo" className="h-12 w-auto object-contain sm:h-14" />
    </div>
  );
}

const fleet = [
  { title: "Spezialtransporte", tag: "Schweizweit", image: assets.road, icon: "truck" as IconName },
  { title: "Kranarbeiten", tag: "Präzision", image: assets.hero, icon: "crane" as IconName },
  { title: "Kippertransporte", tag: "Power", image: assets.truck, icon: "route" as IconName },
  { title: "Baustellenlogistik", tag: "Timing", image: assets.site, icon: "shield" as IconName },
];

function Hero({ brightness }: { brightness: number }) {
  return (
    <section className="relative overflow-hidden px-4 pb-12 pt-28 sm:px-5 lg:pt-36">
      <div className="absolute left-[-120px] top-20 h-72 w-72 rounded-full bg-[#f4c430]/35 blur-3xl" />
      <div className="absolute right-[-140px] top-28 h-80 w-80 rounded-full bg-[#0b3624]/15 blur-3xl" />
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
        <div className="relative z-10">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#0b3624] shadow-lg ring-1 ring-[#0b3624]/10">
            <span className="h-2 w-2 rounded-full bg-[#f4c430] shadow-[0_0_16px_rgba(244,196,48,1)]" /> Live Mission Website
          </div>
          <p className="font-black uppercase tracking-[0.35em] text-[#d9a900]">Rohner AG Transporte</p>
          <h1 className="mt-4 text-5xl font-black leading-[0.9] tracking-tight text-[#0b3624] sm:text-6xl md:text-8xl">Schweres bewegen. <span className="text-[#d9a900]">Digital erleben.</span></h1>
          <p className="mt-6 max-w-2xl text-base font-semibold leading-7 text-[#0b3624]/65 sm:text-xl sm:leading-8">Ein heller Premium-Auftritt mit Mission-Control, Truck-Regler, Fuhrpark-Scanner und echten Rohner-Bildern.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button className="group rounded-full bg-[#0b3624] px-7 py-5 text-sm font-black text-white shadow-xl hover:bg-[#145f3f] sm:text-base">Mission starten <Icon name="arrow" className="ml-2 h-5 w-5 transition group-hover:translate-x-1" /></Button>
            <Button className="rounded-full border border-[#0b3624]/15 bg-white px-7 py-5 text-sm font-black text-[#0b3624] shadow-lg hover:bg-[#fff4ce] sm:text-base"><Icon name="play" className="mr-2 h-5 w-5 text-[#d9a900]" /> Einsatz ansehen</Button>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-2 sm:max-w-xl sm:gap-3">
            {[["24/7", "bereit"], ["1980", "seit"], ["CH", "regional"]].map(([a, b]) => <div key={a} className="rounded-3xl bg-white p-4 shadow-lg ring-1 ring-[#0b3624]/10 sm:p-5"><div className="text-2xl font-black text-[#0b3624] sm:text-3xl">{a}</div><div className="text-xs font-black uppercase tracking-[0.18em] text-[#d9a900]">{b}</div></div>)}
          </div>
        </div>

        <div className="relative min-h-[430px] overflow-hidden rounded-[2.2rem] bg-white shadow-[0_40px_120px_rgba(10,48,33,0.16)] ring-1 ring-[#0b3624]/10 sm:min-h-[610px] sm:rounded-[3.5rem]">
          <img src={assets.hero} alt="Rohner Lastwagen mit Kran" className="absolute inset-0 h-full w-full object-cover" style={{ filter: `brightness(${0.86 + brightness / 450}) saturate(1.05)` }} />
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/25 to-transparent" />
          <div className="absolute right-6 top-20 hidden h-2 w-72 origin-right rounded-full bg-[#f4c430] shadow-[0_0_35px_rgba(244,196,48,.75)] sm:block animate-pulse" />
          <div className="absolute right-60 top-36 hidden rounded-3xl bg-[#0b3624] p-4 text-white shadow-2xl sm:block animate-bounce"><Icon name="crane" className="h-10 w-10 text-[#f4c430]" /></div>
          <div className="absolute bottom-5 left-5 right-5 grid gap-3 sm:bottom-8 sm:left-8 sm:right-auto sm:w-[430px]">
            <div className="rounded-[1.5rem] bg-white/90 p-5 shadow-xl backdrop-blur-xl ring-1 ring-[#0b3624]/10">
              <div className="flex items-center justify-between gap-3"><div><p className="text-xs font-black uppercase tracking-[0.25em] text-[#d9a900]">Live Mission</p><h3 className="mt-1 text-2xl font-black text-[#0b3624]">Kran-Einsatz bereit</h3></div><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f4c430]"><Icon name="scan" className="h-7 w-7" /></div></div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#e8eadf]"><div className="h-full w-4/5 rounded-full bg-[#0b3624] animate-pulse" /></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MissionControl() {
  const [active, setActive] = useState(1);
  const current = fleet[active] ?? fleet[0];
  return (
    <section id="leistungen" className="px-4 py-20 sm:px-5 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div><p className="font-black uppercase tracking-[0.35em] text-[#d9a900]">Mission Control</p><h2 className="mt-3 max-w-4xl text-4xl font-black tracking-tight text-[#0b3624] sm:text-6xl">Keine langweilige Leistungsliste. Ein Einsatz-Cockpit.</h2></div>
          <p className="max-w-md text-base font-semibold leading-7 text-[#0b3624]/60 sm:text-lg">Der Besucher stellt sich seinen Einsatz zusammen und sieht sofort, welche Stärke Rohner dafür mitbringt.</p>
        </div>
        <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="grid gap-3 sm:grid-cols-2">
            {fleet.map((item, i) => (
              <button key={item.title} onClick={() => setActive(i)} className={`group rounded-[2rem] border p-5 text-left transition sm:p-6 ${active === i ? "border-[#f4c430] bg-[#f4c430] text-[#0b3624] shadow-2xl" : "border-[#0b3624]/10 bg-white text-[#0b3624] shadow-lg hover:-translate-y-1 hover:border-[#f4c430]/70"}`}>
                <div className="flex items-start justify-between"><Icon name={item.icon} className="h-8 w-8" /><span className="rounded-full bg-white/60 px-3 py-1 text-xs font-black">0{i + 1}</span></div>
                <h3 className="mt-8 text-2xl font-black sm:text-3xl">{item.title}</h3>
                <p className="mt-2 text-sm font-semibold opacity-70">{item.tag} · Route, Zeitfenster und Fahrzeug planen.</p>
              </button>
            ))}
          </div>
          <div className="relative min-h-[480px] overflow-hidden rounded-[2.5rem] bg-white shadow-2xl ring-1 ring-[#0b3624]/10 sm:min-h-[580px] sm:rounded-[3.2rem]">
            <img src={current.image} alt={current.title} className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b3624]/80 via-[#0b3624]/5 to-white/20" />
            <div className="absolute left-6 top-6 rounded-3xl bg-white/90 p-4 text-[#0b3624] shadow-xl backdrop-blur-xl"><p className="text-xs font-black uppercase tracking-[0.25em] text-[#d9a900]">Aktiver Einsatz</p><h3 className="mt-1 text-3xl font-black">{current.title}</h3></div>
            <div className="absolute bottom-6 left-6 right-6 rounded-[2rem] bg-white/92 p-5 text-[#0b3624] backdrop-blur-xl sm:p-6">
              <div className="grid gap-3 sm:grid-cols-3">
                {["Fahrzeug", "Route", "Zeitfenster"].map((x, i) => <div key={x} className="rounded-2xl bg-[#f7f4ea] p-4"><div className="text-xs font-black uppercase tracking-[0.2em] text-[#d9a900]">Step {i + 1}</div><div className="mt-1 font-black">{x}</div></div>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DesignDrive({ value, onChange }: { value: number; onChange: (value: number) => void }) {
  const pos = `${value}%`;
  return (
    <section id="design-drive" className="px-4 py-20 sm:px-5 sm:py-28">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-white shadow-[0_35px_110px_rgba(11,54,36,0.16)] ring-1 ring-[#0b3624]/10 sm:rounded-[3.5rem]">
        <div className="grid gap-0 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="p-6 sm:p-10 md:p-14">
            <p className="font-black uppercase tracking-[0.35em] text-[#d9a900]">Design-Drive</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-[#0b3624] sm:text-6xl">Der Truck fährt den Look.</h2>
            <p className="mt-5 text-base font-semibold leading-7 text-[#0b3624]/65 sm:text-lg sm:leading-8">Der Rohner-LKW ist ein Interface. Zieh ihn nach links für Baustellen-Kontrast oder nach rechts für hellen Premium-Look.</p>
            <div className="mt-8 grid grid-cols-2 gap-3">
              <div className="rounded-3xl bg-[#0b3624] p-5 text-white"><Icon name="moon" className="mb-4 h-8 w-8 text-[#f4c430]" /><div className="text-xl font-black sm:text-2xl">Kraft</div><div className="text-sm text-white/60">dunkler</div></div>
              <div className="rounded-3xl bg-[#f4c430] p-5 text-[#0b3624]"><Icon name="sun" className="mb-4 h-8 w-8" /><div className="text-xl font-black sm:text-2xl">Klarheit</div><div className="text-sm font-bold opacity-70">heller</div></div>
            </div>
          </div>
          <div className="relative min-h-[520px] overflow-hidden bg-[#eaf1ec] sm:min-h-[600px]">
            <img src={assets.road} alt="Bergstrasse" className="absolute inset-0 h-full w-full object-cover" style={{ filter: `brightness(${0.45 + value / 85}) saturate(${0.75 + value / 160})` }} />
            <div className="absolute inset-0" style={{ background: `linear-gradient(90deg, rgba(5,20,16,${0.72 - value / 180}) 0%, rgba(255,255,255,${value / 130}) 100%)` }} />
            <div className="absolute left-5 right-5 top-5 flex justify-between gap-3 sm:left-10 sm:right-10 sm:top-10">
              <div className="rounded-2xl bg-[#0b3624]/90 p-4 text-white backdrop-blur"><div className="text-xs font-black uppercase tracking-[0.22em] text-[#f4c430]">Dunkel</div><div className="mt-1 text-lg font-black sm:text-2xl">Power</div></div>
              <div className="rounded-2xl bg-white/90 p-4 text-[#0b3624] shadow-xl backdrop-blur"><div className="text-xs font-black uppercase tracking-[0.22em] text-[#d9a900]">Hell</div><div className="mt-1 text-lg font-black sm:text-2xl">Premium</div></div>
            </div>
            <div className="absolute bottom-24 left-6 right-6 h-4 rounded-full bg-white/85 shadow-inner ring-1 ring-black/10 sm:left-12 sm:right-12">
              <div className="absolute left-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#0b3624] to-[#f4c430]" style={{ width: pos }} />
              <div className="absolute top-1/2 w-36 -translate-x-1/2 -translate-y-[62%] sm:w-52" style={{ left: pos }}>
                <img src={assets.truck} alt="Rohner Lastwagen als Regler" className="h-20 w-36 rounded-2xl object-cover object-center shadow-2xl ring-4 ring-white sm:h-28 sm:w-52" />
                <div className="mx-auto -mt-2 h-5 w-5 rounded-full bg-[#f4c430] shadow-lg ring-4 ring-white" />
              </div>
              <input aria-label="Website Helligkeit" type="range" min="0" max="100" value={value} onChange={(e) => onChange(Number(e.target.value))} className="absolute inset-0 h-32 w-full -translate-y-14 cursor-ew-resize opacity-0" />
            </div>
            <div className="absolute bottom-8 left-0 right-0 text-center text-xs font-black text-white drop-shadow sm:text-sm">← LKW ziehen und Website-Look verändern →</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FleetShowroom() {
  return (
    <section id="fuhrpark" className="px-4 py-20 sm:px-5 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <p className="font-black uppercase tracking-[0.35em] text-[#d9a900]">Fuhrpark Scanner</p>
        <h2 className="mt-3 max-w-4xl text-4xl font-black tracking-tight sm:text-6xl">Ein Showroom mit Bewegung, Tiefe und Fokus.</h2>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {fleet.map((item, i) => <article key={item.title} className="group relative h-[430px] overflow-hidden rounded-[2rem] bg-white shadow-xl ring-1 ring-[#0b3624]/10 transition hover:-translate-y-2 sm:h-[500px]"><img src={item.image} alt={item.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" /><div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent" /><div className="absolute left-0 right-0 top-20 h-[2px] bg-[#f4c430]/80 opacity-0 shadow-[0_0_25px_rgba(244,196,48,.9)] transition group-hover:opacity-100" /><div className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-2 text-xs font-black text-[#0b3624] shadow-lg">0{i + 1}</div><div className="absolute bottom-0 left-0 right-0 p-6"><div className="mb-3 inline-flex rounded-full bg-[#f4c430] px-3 py-1 text-xs font-black text-[#0b3624]">{item.tag}</div><h3 className="text-3xl font-black text-[#0b3624]">{item.title}</h3></div></article>)}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="kontakt" className="px-4 pb-20 pt-10 sm:px-5">
      <div className="mx-auto max-w-7xl rounded-[2.5rem] bg-[#f4c430] p-6 text-[#0b3624] shadow-2xl shadow-[#f4c430]/25 sm:rounded-[3.5rem] sm:p-14">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center"><div><p className="font-black uppercase tracking-[0.35em]">Sofort-Anfrage</p><h2 className="mt-3 text-4xl font-black tracking-tight sm:text-6xl">Bereit für den nächsten Einsatz?</h2><p className="mt-5 max-w-2xl text-base font-bold text-[#0b3624]/70 sm:text-lg">Direkt, klar, stark — Kontakt ohne Reibung und mit hochwertigem Markenauftritt.</p></div><div className="rounded-[2rem] bg-white p-5 text-[#0b3624] shadow-xl sm:p-6"><div className="space-y-4"><div className="flex items-center gap-3 font-black"><Icon name="phone" className="text-[#d9a900]" /> 056 250 54 54</div><div className="flex items-center gap-3 font-black"><Icon name="mail" className="text-[#d9a900]" /> info@rohner-transport.ch</div><div className="flex items-center gap-3 font-black"><Icon name="pin" className="text-[#d9a900]" /> Siglistorf, Aargau</div></div><Button className="mt-7 w-full rounded-full bg-[#0b3624] py-5 font-black text-white hover:bg-[#145f3f]">Jetzt Kontakt aufnehmen</Button></div></div>
      </div>
    </section>
  );
}

export default function Page() {
  const [open, setOpen] = useState(false);
  const [brightness, setBrightness] = useState(78);
  const nav = useMemo(() => ["Leistungen", "Design-Drive", "Fuhrpark", "Kontakt"], []);
  const dark = 1 - brightness / 100;

  return (
    <main className="min-h-screen overflow-hidden text-[#0b3624] transition-colors duration-500" style={{ background: `linear-gradient(180deg, rgb(${255 - dark * 35},${255 - dark * 45},${250 - dark * 50}), rgb(${251 - dark * 45},${250 - dark * 45},${245 - dark * 55}))` }}>
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-[#0b3624]/10 bg-white/90 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-5">
          <Logo />
          <nav className="hidden items-center gap-8 md:flex">
            {nav.map((item) => <a key={item} href={`#${item === "Design-Drive" ? "design-drive" : item.toLowerCase()}`} className="text-sm font-black text-[#0b3624]/65 transition hover:text-[#d9a900]">{item}</a>)}
          </nav>
          <div className="hidden items-center gap-3 md:flex"><a href="tel:0562505454" className="font-black text-[#0b3624]"><Icon name="phone" className="mr-2 inline h-4 w-4" />056 250 54 54</a><Button className="rounded-full bg-[#0b3624] px-5 py-3 font-black text-white hover:bg-[#145f3f]">Anfrage</Button></div>
          <button onClick={() => setOpen(!open)} className="rounded-full border border-[#0b3624]/10 bg-white p-3 shadow-sm md:hidden">{open ? <Icon name="x" /> : <Icon name="menu" />}</button>
        </div>
        {open && <div className="border-t border-[#0b3624]/10 bg-white/95 px-5 py-5 shadow-2xl backdrop-blur-xl md:hidden"><div className="grid gap-2">{nav.map((item) => <a key={item} href={`#${item === "Design-Drive" ? "design-drive" : item.toLowerCase()}`} onClick={() => setOpen(false)} className="rounded-2xl bg-[#f7f4ea] px-4 py-4 text-sm font-black text-[#0b3624]">{item}</a>)}</div></div>}
      </header>

      <Hero brightness={brightness} />
      <MissionControl />
      <DesignDrive value={brightness} onChange={setBrightness} />
      <FleetShowroom />
      <Contact />
      <footer className="border-t border-[#0b3624]/10 bg-white px-4 py-8 sm:px-5"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 text-[#0b3624]/60 md:flex-row md:items-center"><Logo /><div className="text-sm font-semibold">© Rohner AG Transporte — modernes Redesign-Konzept</div></div></footer>
    </main>
  );
}
