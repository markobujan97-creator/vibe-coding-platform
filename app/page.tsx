import React, { useMemo, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const logoData = "data:image/png;base64,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";

const assets = {
  night: "https://rohner-transport.ch/wp-content/uploads/2024/11/Nachtschicht.jpg",
  whiteCrane: "https://rohner-transport.ch/wp-content/uploads/2024/11/IMG_1164-scaled.jpg",
  tipper: "https://rohner-transport.ch/wp-content/uploads/2024/11/IMG_8241-scaled.jpg",
  excavation: "https://rohner-transport.ch/wp-content/uploads/2024/11/IMG_7120-scaled.jpg",
  alpine: "https://rohner-transport.ch/wp-content/uploads/2024/11/IMG_3031-scaled.jpg",
};

const Icon = ({ name, className = "h-5 w-5" }) => {
  const p = {
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
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{p[name]}</svg>;
};

const Button = ({ children, className = "", ...props }) => <button {...props} className={`inline-flex items-center justify-center transition ${className}`}>{children}</button>;

const gallery = [
  { title: "Spezialtransporte", image: assets.alpine, tag: "Schweizweit" },
  { title: "Kranarbeiten", image: assets.whiteCrane, tag: "Präzision" },
  { title: "Kippertransporte", image: assets.tipper, tag: "Power" },
  { title: "Baustellenlogistik", image: assets.excavation, tag: "Timing" },
];

function Logo() {
  return <img src={logoData} alt="Rohner AG Transporte Logo" className="h-[58px] w-auto object-contain" />;
}

function TruckBrightnessControl({ value, onChange }) {
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
