"use client";

import React, { useMemo, useState } from "react";

const logoData = "data:image/png;base64,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";

const images = {
  hero: "https://rohner-transport.ch/wp-content/uploads/2024/11/IMG_1164-scaled.jpg",
  night: "https://rohner-transport.ch/wp-content/uploads/2024/11/Nachtschicht.jpg",
  tipper: "https://rohner-transport.ch/wp-content/uploads/2024/11/IMG_8241-scaled.jpg",
  excavation: "https://rohner-transport.ch/wp-content/uploads/2024/11/IMG_7120-scaled.jpg",
  alpine: "https://rohner-transport.ch/wp-content/uploads/2024/11/IMG_3031-scaled.jpg",
};

type IconName = "arrow" | "menu" | "x" | "phone" | "mail" | "pin" | "truck" | "crane" | "route" | "sun" | "moon" | "play" | "check" | "spark" | "send";

function Icon({ name, className = "h-5 w-5" }: { name: IconName; className?: string }) {
  const icons: Record<IconName, React.ReactNode> = {
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
    play: <path d="M8 5v14l11-7z" />,
    check: <path d="M20 6 9 17l-5-5" />,
    spark: <path d="M13 2 3 14h8l-1 8 11-14h-8z" />,
    send: <path d="m22 2-7 20-4-9-9-4 20-7z" />,
  };
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{icons[name]}</svg>;
}

function Button({ children, className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} className={`inline-flex items-center justify-center transition active:scale-[0.98] ${className}`}>{children}</button>;
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

const services = [
  { title: "Spezialtransport", icon: "truck" as IconName, image: images.alpine, text: "Schwere Güter, enge Zeitfenster, saubere Routenplanung.", steps: ["Ladegut", "Route", "Fahrzeug"] },
  { title: "Kranarbeiten", icon: "crane" as IconName, image: images.hero, text: "Reichweite, Hebepunkt und Timing als Einsatz-Simulation.", steps: ["Hebepunkt", "Radius", "Sicherheit"] },
  { title: "Baustellenlogistik", icon: "route" as IconName, image: images.excavation, text: "Materialfluss, Zufahrten und Entladung direkt koordinieren.", steps: ["Zeitfenster", "Zufahrt", "Entladung"] },
  { title: "Kipper & Mulden", icon: "spark" as IconName, image: images.tipper, text: "Schüttgut, Aushub und Muldenservice mit klarer Disposition.", steps: ["Material", "Menge", "Abholung"] },
];

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState(1);
  const [look, setLook] = useState(78);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [sent, setSent] = useState(false);

  const nav = useMemo(() => [
    ["leistungen", "Leistungen"],
    ["mission", "Mission"],
    ["drive", "Design-Drive"],
    ["fuhrpark", "Fuhrpark"],
    ["kontakt", "Kontakt"],
  ], []);

  const active = services[activeService];
  const dark = 1 - look / 100;

  return (
    <main
      className="min-h-screen overflow-hidden text-[#073724] transition-colors duration-500"
      style={{ background: `linear-gradient(180deg, rgb(${255 - dark * 34},${254 - dark * 42},${248 - dark * 52}), rgb(${247 - dark * 44},${246 - dark * 44},${237 - dark * 50}))` }}
    >
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-[#073724]/10 bg-white/90 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <button onClick={() => scrollToId("home")} className="rounded-2xl bg-[#fff2c5] p-1 shadow-lg ring-1 ring-[#f3bf14]/40">
            <img src={logoData} alt="Rohner AG Transporte Logo" className="h-12 w-auto object-contain sm:h-14" />
          </button>

          <nav className="hidden items-center gap-7 md:flex">
            {nav.map(([id, label]) => (
              <button key={id} onClick={() => scrollToId(id)} className="text-sm font-black text-[#073724]/70 hover:text-[#d9a900]">{label}</button>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <a href="tel:0562505454" className="inline-flex items-center gap-2 rounded-full bg-[#f7f3e4] px-4 py-3 text-sm font-black"><Icon name="phone" className="h-4 w-4 text-[#d9a900]" />056 250 54 54</a>
            <Button onClick={() => setQuoteOpen(true)} className="rounded-full bg-[#073724] px-5 py-3 font-black text-white hover:bg-[#0d5a3c]">Anfrage</Button>
          </div>

          <Button onClick={() => setMenuOpen((v) => !v)} className="rounded-full border border-[#073724]/10 bg-white p-3 shadow md:hidden">
            <Icon name={menuOpen ? "x" : "menu"} />
          </Button>
        </div>

        {menuOpen && (
          <div className="border-t border-[#073724]/10 bg-white px-4 py-4 shadow-2xl md:hidden">
            <div className="grid gap-2">
              {nav.map(([id, label]) => (
                <button key={id} onClick={() => { setMenuOpen(false); scrollToId(id); }} className="rounded-2xl bg-[#f7f3e4] px-4 py-4 text-left text-sm font-black text-[#073724]">{label}</button>
              ))}
              <Button onClick={() => { setMenuOpen(false); setQuoteOpen(true); }} className="rounded-2xl bg-[#f3bf14] px-4 py-4 font-black text-[#073724]">Anfrage öffnen</Button>
            </div>
          </div>
        )}
      </header>

      <section id="home" className="relative px-4 pb-16 pt-28 sm:px-5 lg:pt-36">
        <div className="absolute left-0 top-24 h-64 w-64 rounded-full bg-[#f3bf14]/30 blur-3xl" />
        <div className="absolute right-0 top-24 h-80 w-80 rounded-full bg-[#073724]/10 blur-3xl" />
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div className="relative z-10">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.22em] shadow-lg ring-1 ring-[#073724]/10"><span className="h-2 w-2 rounded-full bg-[#f3bf14]" /> Interaktive Website Demo</div>
            <p className="font-black uppercase tracking-[0.35em] text-[#d9a900]">Rohner AG Transporte</p>
            <h1 className="mt-4 text-5xl font-black leading-[0.9] tracking-tight sm:text-6xl md:text-8xl">Schweres bewegen. <span className="text-[#d9a900]">Digital erleben.</span></h1>
            <p className="mt-6 max-w-2xl text-base font-semibold leading-7 text-[#073724]/65 sm:text-xl sm:leading-8">Jetzt mit echtem Logo, klickbarem Mobile-Menü, Anfrage-Overlay, Video-Overlay, Mission-Control und Rohner-Truck als Design-Regler.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button onClick={() => setQuoteOpen(true)} className="group rounded-full bg-[#073724] px-7 py-5 text-sm font-black text-white shadow-xl hover:bg-[#0d5a3c] sm:text-base">Einsatz konfigurieren <Icon name="arrow" className="ml-2 h-5 w-5 transition group-hover:translate-x-1" /></Button>
              <Button onClick={() => setVideoOpen(true)} className="rounded-full border border-[#073724]/15 bg-white px-7 py-5 text-sm font-black shadow-lg hover:bg-[#fff2c5] sm:text-base"><Icon name="play" className="mr-2 h-5 w-5 text-[#d9a900]" /> Video ansehen</Button>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-2 sm:max-w-xl sm:gap-3">
              {[["24/7", "bereit"], ["1980", "seit"], ["CH", "regional"]].map(([a, b]) => <div key={a} className="rounded-3xl bg-white p-4 shadow-lg ring-1 ring-[#073724]/10 sm:p-5"><div className="text-2xl font-black sm:text-3xl">{a}</div><div className="text-xs font-black uppercase tracking-[0.18em] text-[#d9a900]">{b}</div></div>)}
            </div>
          </div>
          <div className="relative min-h-[430px] overflow-hidden rounded-[2.3rem] bg-white shadow-[0_40px_120px_rgba(10,48,33,0.16)] ring-1 ring-[#073724]/10 sm:min-h-[610px] sm:rounded-[3.5rem]">
            <img src={images.hero} alt="Rohner Lastwagen mit Kran" className="absolute inset-0 h-full w-full object-cover" style={{ filter: `brightness(${0.86 + look / 450}) saturate(1.06)` }} />
            <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/25 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 rounded-[1.5rem] bg-white/92 p-5 shadow-xl backdrop-blur-xl ring-1 ring-[#073724]/10 sm:bottom-8 sm:left-8 sm:right-auto sm:w-[430px]">
              <div className="flex items-center justify-between gap-3"><div><p className="text-xs font-black uppercase tracking-[0.25em] text-[#d9a900]">Live Mission</p><h3 className="mt-1 text-2xl font-black">Kran-Einsatz bereit</h3></div><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f3bf14]"><Icon name="crane" className="h-7 w-7" /></div></div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#e8eadf]"><div className="h-full w-[78%] rounded-full bg-[#073724]" /></div>
            </div>
          </div>
        </div>
      </section>

      <section id="leistungen" className="px-4 py-20 sm:px-5 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="font-black uppercase tracking-[0.35em] text-[#d9a900]">Mission Control</p><h2 className="mt-3 max-w-4xl text-4xl font-black tracking-tight sm:text-6xl">Keine langweilige Leistungsliste. Ein Einsatz-Cockpit.</h2></div><p className="max-w-md text-base font-semibold leading-7 text-[#073724]/60 sm:text-lg">Klick auf eine Karte und die grosse Einsatzfläche ändert sich sofort.</p></div>
          <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="grid gap-3 sm:grid-cols-2">
              {services.map((item, i) => <button key={item.title} onClick={() => setActiveService(i)} className={`group rounded-[2rem] border p-5 text-left transition sm:p-6 ${activeService === i ? "border-[#f3bf14] bg-[#f3bf14] text-[#073724] shadow-2xl" : "border-[#073724]/10 bg-white text-[#073724] shadow-lg hover:-translate-y-1 hover:border-[#f3bf14]/70"}`}><div className="flex items-start justify-between"><Icon name={item.icon} className="h-8 w-8" /><span className="rounded-full bg-white/60 px-3 py-1 text-xs font-black">0{i + 1}</span></div><h3 className="mt-8 text-2xl font-black sm:text-3xl">{item.title}</h3><p className="mt-2 text-sm font-semibold opacity-70">{item.text}</p></button>)}
            </div>
            <div className="relative min-h-[500px] overflow-hidden rounded-[2.5rem] bg-white shadow-2xl ring-1 ring-[#073724]/10 sm:min-h-[610px] sm:rounded-[3.2rem]">
              <img src={active.image} alt={active.title} className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#073724]/80 via-[#073724]/5 to-white/20" />
              <div className="absolute left-6 top-6 rounded-3xl bg-white/90 p-4 shadow-xl backdrop-blur-xl"><p className="text-xs font-black uppercase tracking-[0.25em] text-[#d9a900]">Aktiver Einsatz</p><h3 className="mt-1 text-3xl font-black">{active.title}</h3></div>
              <div className="absolute bottom-6 left-6 right-6 rounded-[2rem] bg-white/92 p-5 backdrop-blur-xl sm:p-6"><p className="text-lg font-bold text-[#073724]/70">{active.text}</p><div className="mt-5 grid gap-3 sm:grid-cols-3">{active.steps.map((step, i) => <div key={step} className="rounded-2xl bg-[#f7f3e4] p-4"><div className="text-xs font-black uppercase tracking-[0.2em] text-[#d9a900]">Step {i + 1}</div><div className="mt-1 font-black">{step}</div></div>)}</div></div>
            </div>
          </div>
        </div>
      </section>

      <section id="mission" className="px-4 py-20 sm:px-5 sm:py-28">
        <div className="mx-auto max-w-7xl rounded-[2.5rem] bg-[#073724] p-6 text-white shadow-2xl sm:rounded-[3.5rem] sm:p-12">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div><p className="font-black uppercase tracking-[0.35em] text-[#f3bf14]">Live Board</p><h2 className="mt-3 text-4xl font-black sm:text-6xl">Digitale Einsatzplanung.</h2><p className="mt-5 text-lg font-semibold leading-8 text-white/70">Dieses Modul könnte später echte Anfragen sammeln. Jetzt ist es schon klickbar und zeigt ein interaktives Konzept.</p><Button onClick={() => setQuoteOpen(true)} className="mt-8 rounded-full bg-[#f3bf14] px-7 py-5 font-black text-[#073724] hover:bg-[#ffd84d]">Mission konfigurieren</Button></div>
            <div className="grid gap-4 sm:grid-cols-3">{["Fahrzeug wählen", "Last erfassen", "Termin setzen"].map((x, i) => <div key={x} className="rounded-[2rem] bg-white/10 p-5 ring-1 ring-white/10"><div className="mb-10 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f3bf14] text-[#073724]"><Icon name={i === 0 ? "truck" : i === 1 ? "crane" : "route"} /></div><div className="text-2xl font-black">{x}</div><div className="mt-3 flex items-center gap-2 text-sm font-bold text-white/60"><Icon name="check" className="h-4 w-4 text-[#f3bf14]" /> bereit</div></div>)}</div>
          </div>
        </div>
      </section>

      <section id="drive" className="px-4 py-20 sm:px-5 sm:py-28">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-white shadow-[0_35px_110px_rgba(11,54,36,0.16)] ring-1 ring-[#073724]/10 sm:rounded-[3.5rem]">
          <div className="grid gap-0 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="p-6 sm:p-10 md:p-14"><p className="font-black uppercase tracking-[0.35em] text-[#d9a900]">Design-Drive</p><h2 className="mt-3 text-4xl font-black tracking-tight sm:text-6xl">Der Truck fährt den Look.</h2><p className="mt-5 text-base font-semibold leading-7 text-[#073724]/65 sm:text-lg sm:leading-8">Zieh den LKW: die Website wird links dunkler und rechts heller. Das ist bewusst ein Branding-Spiel, nicht nur ein normaler Slider.</p></div>
            <div className="relative min-h-[520px] overflow-hidden bg-[#eaf1ec] sm:min-h-[600px]">
              <img src={images.alpine} alt="Bergstrasse" className="absolute inset-0 h-full w-full object-cover" style={{ filter: `brightness(${0.45 + look / 85}) saturate(${0.75 + look / 160})` }} />
              <div className="absolute inset-0" style={{ background: `linear-gradient(90deg, rgba(5,20,16,${0.72 - look / 180}) 0%, rgba(255,255,255,${look / 130}) 100%)` }} />
              <div className="absolute bottom-24 left-6 right-6 h-4 rounded-full bg-white/85 shadow-inner ring-1 ring-black/10 sm:left-12 sm:right-12">
                <div className="absolute left-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#073724] to-[#f3bf14]" style={{ width: `${look}%` }} />
                <div className="absolute top-1/2 w-36 -translate-x-1/2 -translate-y-[62%] sm:w-52" style={{ left: `${look}%` }}><img src={images.tipper} alt="Rohner Lastwagen als Regler" className="h-20 w-36 rounded-2xl object-cover object-center shadow-2xl ring-4 ring-white sm:h-28 sm:w-52" /><div className="mx-auto -mt-2 h-5 w-5 rounded-full bg-[#f3bf14] shadow-lg ring-4 ring-white" /></div>
                <input aria-label="Website Helligkeit" type="range" min="0" max="100" value={look} onChange={(e) => setLook(Number(e.target.value))} className="absolute inset-0 h-32 w-full -translate-y-14 cursor-ew-resize opacity-0" />
              </div>
              <div className="absolute bottom-8 left-0 right-0 text-center text-xs font-black text-white drop-shadow sm:text-sm">← LKW ziehen und Website-Look verändern →</div>
            </div>
          </div>
        </div>
      </section>

      <section id="fuhrpark" className="px-4 py-20 sm:px-5 sm:py-28">
        <div className="mx-auto max-w-7xl"><p className="font-black uppercase tracking-[0.35em] text-[#d9a900]">Fuhrpark Scanner</p><h2 className="mt-3 max-w-4xl text-4xl font-black tracking-tight sm:text-6xl">Ein Showroom mit Fokus.</h2><div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{services.map((item, i) => <button key={item.title} onClick={() => { setActiveService(i); scrollToId("leistungen"); }} className="group relative h-[430px] overflow-hidden rounded-[2rem] bg-white text-left shadow-xl ring-1 ring-[#073724]/10 sm:h-[500px]"><img src={item.image} alt={item.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" /><div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent" /><div className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-2 text-xs font-black shadow-lg">0{i + 1}</div><div className="absolute bottom-0 left-0 right-0 p-6"><div className="mb-3 inline-flex rounded-full bg-[#f3bf14] px-3 py-1 text-xs font-black">Anklicken</div><h3 className="text-3xl font-black">{item.title}</h3></div></button>)}</div></div>
      </section>

      <section id="kontakt" className="px-4 pb-20 pt-10 sm:px-5">
        <div className="mx-auto max-w-7xl rounded-[2.5rem] bg-[#f3bf14] p-6 shadow-2xl shadow-[#f3bf14]/25 sm:rounded-[3.5rem] sm:p-14"><div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center"><div><p className="font-black uppercase tracking-[0.35em]">Kontakt</p><h2 className="mt-3 text-4xl font-black tracking-tight sm:text-6xl">Bereit für den nächsten Einsatz?</h2><p className="mt-5 max-w-2xl text-base font-bold text-[#073724]/70 sm:text-lg">Hier funktionieren die Buttons: Telefon, E-Mail und Anfrage-Overlay.</p></div><div className="rounded-[2rem] bg-white p-5 shadow-xl sm:p-6"><div className="space-y-4"><a href="tel:0562505454" className="flex items-center gap-3 font-black"><Icon name="phone" className="text-[#d9a900]" /> 056 250 54 54</a><a href="mailto:info@rohner-transport.ch" className="flex items-center gap-3 font-black"><Icon name="mail" className="text-[#d9a900]" /> info@rohner-transport.ch</a><div className="flex items-center gap-3 font-black"><Icon name="pin" className="text-[#d9a900]" /> Siglistorf, Aargau</div></div><Button onClick={() => setQuoteOpen(true)} className="mt-7 w-full rounded-full bg-[#073724] py-5 font-black text-white hover:bg-[#0d5a3c]">Anfrage öffnen</Button></div></div></div>
      </section>

      <footer className="border-t border-[#073724]/10 bg-white px-4 py-8 sm:px-5"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 text-[#073724]/60 md:flex-row md:items-center"><img src={logoData} alt="Rohner AG Transporte Logo" className="h-12 w-auto object-contain" /><div className="text-sm font-semibold">© Rohner AG Transporte — interaktives Redesign-Konzept</div></div></footer>

      {quoteOpen && <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[#073724]/60 p-4 backdrop-blur-sm"><div className="max-h-[90vh] w-full max-w-2xl overflow-auto rounded-[2rem] bg-white p-6 shadow-2xl sm:p-8"><div className="flex items-start justify-between gap-4"><div><p className="font-black uppercase tracking-[0.3em] text-[#d9a900]">Anfrage</p><h3 className="mt-2 text-3xl font-black">Einsatz konfigurieren</h3></div><button onClick={() => setQuoteOpen(false)} className="rounded-full bg-[#f7f3e4] p-3"><Icon name="x" /></button></div><div className="mt-6 grid gap-3 sm:grid-cols-2">{services.map((s, i) => <button key={s.title} onClick={() => setActiveService(i)} className={`rounded-2xl border p-4 text-left font-black ${activeService === i ? "border-[#f3bf14] bg-[#f3bf14]" : "border-[#073724]/10 bg-[#f7f3e4]"}`}><Icon name={s.icon} className="mb-4 h-7 w-7" /> {s.title}</button>)}</div><div className="mt-6 rounded-2xl bg-[#f7f3e4] p-5"><div className="text-sm font-black uppercase tracking-[0.25em] text-[#d9a900]">Ausgewählt</div><div className="mt-1 text-2xl font-black">{active.title}</div><p className="mt-2 font-semibold text-[#073724]/65">{active.text}</p></div><Button onClick={() => setSent(true)} className="mt-6 w-full rounded-full bg-[#073724] px-6 py-5 font-black text-white"><Icon name="send" className="mr-2 h-5 w-5" /> Anfrage simulieren</Button>{sent && <div className="mt-4 rounded-2xl bg-[#f3bf14] p-4 text-center font-black">Demo: Anfrage wurde vorbereitet.</div>}</div></div>}

      {videoOpen && <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[#073724]/60 p-4 backdrop-blur-sm"><div className="w-full max-w-4xl overflow-hidden rounded-[2rem] bg-white shadow-2xl"><div className="flex items-center justify-between p-5"><div className="font-black">Rohner Einsatz-Video Demo</div><button onClick={() => setVideoOpen(false)} className="rounded-full bg-[#f7f3e4] p-3"><Icon name="x" /></button></div><div className="relative aspect-video overflow-hidden"><img src={images.night} alt="Video Demo" className="h-full w-full object-cover" /><div className="absolute inset-0 flex items-center justify-center bg-black/20"><div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#f3bf14] text-[#073724] shadow-2xl"><Icon name="play" className="h-12 w-12" /></div></div></div></div></div>}
    </main>
  );
}
