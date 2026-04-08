/* =============================================================
   DESIGN: Dark Speakeasy / Art Deco Revival
   Colors: charcoal bg #1a1410, amber gold #c9922a, champagne #e8d5a3
   Fonts: Playfair Display (display/headings), DM Sans (body), Cormorant Garamond (labels)
   Layout: Asymmetric editorial, diagonal dividers, frosted glass cards
   ============================================================= */

import { useEffect, useRef, useState } from "react";
import { MapPin, Mail, Linkedin, ChevronDown, Star } from "lucide-react";

// ── CDN photo URLs ──────────────────────────────────────────────────────────
const PHOTOS = {
  raspberryShoda: "https://d2xsxph8kpxj0f.cloudfront.net/310519663164379997/gb3kDvRHMNESvyNJMSRSjR/20240920_164514_d053d295.webp",
  raspberryShodaRow: "https://d2xsxph8kpxj0f.cloudfront.net/310519663164379997/gb3kDvRHMNESvyNJMSRSjR/20241019_214305_d39d7ea5.webp",
  raulAtWork: "https://d2xsxph8kpxj0f.cloudfront.net/310519663164379997/gb3kDvRHMNESvyNJMSRSjR/IMG-20240921-WA0020_3e36b1ad.webp",
  cocktailMenu: "https://d2xsxph8kpxj0f.cloudfront.net/310519663164379997/gb3kDvRHMNESvyNJMSRSjR/20250812_164637_f3747ef5.webp",
  blackForestSpecial: "https://d2xsxph8kpxj0f.cloudfront.net/310519663164379997/gb3kDvRHMNESvyNJMSRSjR/20250905_150214_8cebdf41.webp",
  arkleMenu: "https://d2xsxph8kpxj0f.cloudfront.net/310519663164379997/gb3kDvRHMNESvyNJMSRSjR/20260404_152519_0331478b.webp",
  cocktailsMenu: "https://d2xsxph8kpxj0f.cloudfront.net/310519663164379997/gb3kDvRHMNESvyNJMSRSjR/20250812_164637_f3747ef5.webp",
  negroniMenu: "https://d2xsxph8kpxj0f.cloudfront.net/310519663164379997/gb3kDvRHMNESvyNJMSRSjR/20260404_152709_5e000987.webp",
  afterDinnerMenu: "https://d2xsxph8kpxj0f.cloudfront.net/310519663164379997/gb3kDvRHMNESvyNJMSRSjR/20260404_152606_dda4d80f.webp",
  irishForwardMenu: "https://d2xsxph8kpxj0f.cloudfront.net/310519663164379997/gb3kDvRHMNESvyNJMSRSjR/20260404_152727_861f7710.webp",
  martinisMenu: "https://d2xsxph8kpxj0f.cloudfront.net/310519663164379997/gb3kDvRHMNESvyNJMSRSjR/20260404_152655_10fe44d7.webp",
  soursMenu: "https://d2xsxph8kpxj0f.cloudfront.net/310519663164379997/gb3kDvRHMNESvyNJMSRSjR/20260404_152722_40c5b597.webp",
  longMenu: "https://d2xsxph8kpxj0f.cloudfront.net/310519663164379997/gb3kDvRHMNESvyNJMSRSjR/20260404_152549_071408b8.webp",
  smokedMenu: "https://d2xsxph8kpxj0f.cloudfront.net/310519663164379997/gb3kDvRHMNESvyNJMSRSjR/20260404_152750_f2899e38.webp",
};

// ── Intersection Observer hook for scroll animations ────────────────────────
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add("visible"); },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

// ── Gold Rule divider ────────────────────────────────────────────────────────
function GoldRule({ className = "" }: { className?: string }) {
  return <hr className={`gold-rule my-8 ${className}`} />;
}

// ── Section label (Cormorant Garamond, tracked) ──────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-xs tracking-[0.3em] uppercase mb-4"
      style={{ fontFamily: "'Cormorant Garamond', serif", color: "#c9922a" }}
    >
      {children}
    </p>
  );
}

// ── Cocktail menu card ───────────────────────────────────────────────────────
function MenuCard({ title, img, delay = 0 }: { title: string; img: string; delay?: number }) {
  const ref = useScrollReveal();
  return (
    <div
      ref={ref}
      className="fade-in-up glass-card overflow-hidden group cursor-pointer"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="overflow-hidden aspect-[3/4]">
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <p
          className="text-sm tracking-widest uppercase"
          style={{ fontFamily: "'Cormorant Garamond', serif", color: "#c9922a" }}
        >
          {title}
        </p>
      </div>
    </div>
  );
}

// ── Seasonal cocktail item ───────────────────────────────────────────────────
function SeasonalItem({ season, description }: { season: string; description: string }) {
  return (
    <div className="flex gap-4 py-4 border-b" style={{ borderColor: "rgba(201,146,42,0.2)" }}>
      <div
        className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
        style={{ background: "#c9922a" }}
      />
      <div>
        <p
          className="text-base font-semibold mb-1"
          style={{ fontFamily: "'Playfair Display', serif", color: "#e8d5a3" }}
        >
          {season}
        </p>
        <p className="text-sm leading-relaxed" style={{ color: "oklch(0.60 0.015 65)" }}>
          {description}
        </p>
      </div>
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────
export default function Home() {
  const [navScrolled, setNavScrolled] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useScrollReveal();
  const signatureRef = useScrollReveal();
  const seasonalRef = useScrollReveal();
  const menuRef = useScrollReveal();
  const contactRef = useScrollReveal();

  useEffect(() => {
    const handleScroll = () => setNavScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(0.12 0.015 50)", color: "oklch(0.94 0.01 65)" }}
    >
      {/* ── NAVIGATION ─────────────────────────────────────────────────────── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: navScrolled ? "rgba(13,11,9,0.95)" : "transparent",
          backdropFilter: navScrolled ? "blur(12px)" : "none",
          borderBottom: navScrolled ? "1px solid rgba(201,146,42,0.15)" : "none",
        }}
      >
        <div className="container flex items-center justify-between py-5">
          <span
            className="text-lg font-semibold tracking-widest uppercase"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: "#c9922a" }}
          >
            Raul
          </span>
          <div className="hidden md:flex items-center gap-8">
            {["about", "signature", "seasonal", "menus", "contact"].map((s) => (
              <button
                key={s}
                onClick={() => scrollToSection(s)}
                className="text-xs tracking-[0.2em] uppercase transition-colors duration-200 hover:text-amber-400"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: "oklch(0.65 0.015 65)",
                  background: "none",
                  border: "none",
                }}
              >
                {s}
              </button>
            ))}
          </div>
          <a
            href="https://www.linkedin.com/in/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-xs tracking-widest uppercase transition-all duration-200 hover:opacity-80"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              background: "#c9922a",
              color: "#0d0b09",
              fontWeight: 600,
            }}
          >
            <Linkedin size={12} />
            Connect
          </a>
        </div>
      </nav>

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-end grain-overlay overflow-hidden"
        style={{ background: "oklch(0.09 0.015 50)" }}
      >
        {/* Background image */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${PHOTOS.raspberryShodaRow})`,
            backgroundSize: "cover",
            backgroundPosition: "center 30%",
            filter: "brightness(0.25)",
          }}
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(13,11,9,0.98) 45%, rgba(13,11,9,0.4) 100%), linear-gradient(to top, rgba(13,11,9,0.95) 0%, transparent 60%)",
          }}
        />

        {/* Hero content */}
        <div className="container relative z-10 pb-20 pt-32">
          <div className="max-w-2xl">
            <SectionLabel>Head Mixologist · Glenroyal Hotel, Maynooth</SectionLabel>
            <h1
              className="text-6xl md:text-8xl leading-none mb-6"
              style={{ fontFamily: "'Playfair Display', serif", color: "#f5efe6" }}
            >
              Raul
              <br />
              <em className="text-5xl md:text-7xl" style={{ color: "#c9922a" }}>
                Mixologist
              </em>
            </h1>
            <p
              className="text-base md:text-lg leading-relaxed mb-8 max-w-lg"
              style={{ color: "oklch(0.70 0.015 65)", fontFamily: "'DM Sans', sans-serif" }}
            >
              Over two years crafting award-worthy cocktails at the Arkle Bar &amp; Restaurant,
              Glenroyal Hotel. Creator of the{" "}
              <span style={{ color: "#e8d5a3", fontStyle: "italic" }}>Raspberry Shoda</span> —
              the hotel's top-selling cocktail. Now bringing that craft to{" "}
              <span style={{ color: "#c9922a" }}>Málaga, Spain</span>.
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <button
                onClick={() => scrollToSection("contact")}
                className="px-8 py-3 text-sm tracking-widest uppercase font-medium transition-all duration-200 hover:opacity-85"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  background: "#c9922a",
                  color: "#0d0b09",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                }}
              >
                Open to Work in Málaga
              </button>
              <button
                onClick={() => scrollToSection("signature")}
                className="px-8 py-3 text-sm tracking-widest uppercase font-medium transition-all duration-200 hover:opacity-85"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  border: "1px solid rgba(201,146,42,0.5)",
                  color: "#e8d5a3",
                  background: "transparent",
                  letterSpacing: "0.15em",
                }}
              >
                View My Work
              </button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 right-8 z-10 flex flex-col items-center gap-2 opacity-50">
          <span
            className="text-xs tracking-widest uppercase"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: "#c9922a" }}
          >
            Scroll
          </span>
          <ChevronDown size={16} style={{ color: "#c9922a" }} className="animate-bounce" />
        </div>

        {/* Floating cocktail photo */}
        <div
          className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block"
          style={{ zIndex: 2 }}
        >
          <div
            className="absolute right-16 top-1/2 -translate-y-1/2 w-72 xl:w-80"
            style={{
              boxShadow: "0 30px 80px rgba(0,0,0,0.7), 0 0 40px rgba(201,146,42,0.1)",
            }}
          >
            <img
              src={PHOTOS.raspberryShoda}
              alt="Raspberry Shoda cocktail"
              className="w-full h-auto"
              style={{ display: "block" }}
            />
            <div
              className="absolute -bottom-4 -left-4 px-4 py-2"
              style={{
                background: "rgba(13,11,9,0.9)",
                border: "1px solid rgba(201,146,42,0.4)",
              }}
            >
              <p
                className="text-xs tracking-widest uppercase"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: "#c9922a" }}
              >
                Raspberry Shoda
              </p>
              <p className="text-xs mt-0.5" style={{ color: "oklch(0.55 0.015 65)" }}>
                Signature Creation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ──────────────────────────────────────────────────────────── */}
      <section id="about" className="py-24">
        <div className="container">
          <div ref={aboutRef} className="fade-in-up grid md:grid-cols-2 gap-16 items-center">
            {/* Photo */}
            <div className="relative">
              <div
                className="absolute -top-4 -left-4 w-full h-full"
                style={{ border: "1px solid rgba(201,146,42,0.2)" }}
              />
              <img
                src={PHOTOS.raulAtWork}
                alt="Raul at work behind the bar"
                className="w-full object-cover relative z-10"
                style={{ maxHeight: "600px", objectPosition: "top" }}
              />
              <div
                className="absolute bottom-0 left-0 right-0 p-6 z-20"
                style={{
                  background: "linear-gradient(to top, rgba(13,11,9,0.95), transparent)",
                }}
              >
                <div className="flex items-center gap-2">
                  <MapPin size={14} style={{ color: "#c9922a" }} />
                  <span
                    className="text-xs tracking-widest uppercase"
                    style={{ fontFamily: "'Cormorant Garamond', serif", color: "#e8d5a3" }}
                  >
                    Maynooth, Ireland → Málaga, Spain
                  </span>
                </div>
              </div>
            </div>

            {/* Text */}
            <div>
              <SectionLabel>About Me</SectionLabel>
              <h2
                className="text-4xl md:text-5xl leading-tight mb-6"
                style={{ fontFamily: "'Playfair Display', serif", color: "#f5efe6" }}
              >
                Crafting Experiences,
                <br />
                <em style={{ color: "#c9922a" }}>Not Just Cocktails</em>
              </h2>
              <GoldRule />
              <p
                className="text-base leading-relaxed mb-5"
                style={{ color: "oklch(0.68 0.015 65)", fontFamily: "'DM Sans', sans-serif" }}
              >
                For over two years I served as Head Mixologist at the prestigious Arkle Bar &amp;
                Restaurant within the Glenroyal Hotel in Maynooth, Ireland — one of the country's
                finest 4-star hotel properties. In that role I was responsible for the full cocktail
                programme: from menu conception and ingredient sourcing to team training and
                guest experience.
              </p>
              <p
                className="text-base leading-relaxed mb-8"
                style={{ color: "oklch(0.68 0.015 65)", fontFamily: "'DM Sans', sans-serif" }}
              >
                My philosophy is simple: every glass tells a story. Whether it is a classic
                reimagined with an Irish twist or a seasonal creation built around a moment in
                the calendar, I believe a great cocktail should surprise, delight, and be
                remembered long after the last sip.
              </p>
              <div
                className="grid grid-cols-3 gap-4 p-6"
                style={{
                  background: "rgba(201,146,42,0.06)",
                  border: "1px solid rgba(201,146,42,0.15)",
                }}
              >
                {[
                  { number: "2+", label: "Years at Glenroyal" },
                  { number: "#1", label: "Best-Selling Cocktail" },
                  { number: "4★", label: "Hotel Standard" },
                ].map(({ number, label }) => (
                  <div key={label} className="text-center">
                    <p
                      className="text-3xl font-bold mb-1"
                      style={{ fontFamily: "'Playfair Display', serif", color: "#c9922a" }}
                    >
                      {number}
                    </p>
                    <p
                      className="text-xs tracking-wider uppercase"
                      style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.55 0.015 65)" }}
                    >
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SIGNATURE COCKTAIL ─────────────────────────────────────────────── */}
      <section
        id="signature"
        className="py-24 relative overflow-hidden"
        style={{ background: "oklch(0.10 0.015 50)" }}
      >
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url(${PHOTOS.raspberryShoda})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(40px)",
          }}
        />
        <div className="container relative z-10">
          <div ref={signatureRef} className="fade-in-up">
            <div className="text-center mb-16">
              <SectionLabel>Signature Creation</SectionLabel>
              <h2
                className="text-5xl md:text-7xl leading-tight"
                style={{ fontFamily: "'Playfair Display', serif", color: "#f5efe6" }}
              >
                Raspberry{" "}
                <em style={{ color: "#c9922a" }}>Shoda</em>
              </h2>
              <p
                className="text-sm tracking-[0.3em] uppercase mt-3"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.55 0.015 65)" }}
              >
                "Raspberry Silk" in Irish
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Photos */}
              <div className="grid grid-cols-2 gap-4">
                <div
                  className="col-span-2 overflow-hidden"
                  style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}
                >
                  <img
                    src={PHOTOS.raspberryShoda}
                    alt="Raspberry Shoda — single glass"
                    className="w-full object-cover"
                    style={{ height: "380px", objectPosition: "center top" }}
                  />
                </div>
                <div
                  className="overflow-hidden"
                  style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}
                >
                  <img
                    src={PHOTOS.raspberryShodaRow}
                    alt="Six Raspberry Shoda cocktails lined up"
                    className="w-full object-cover"
                    style={{ height: "200px", objectPosition: "center" }}
                  />
                </div>
                <div
                  className="overflow-hidden"
                  style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}
                >
                  <img
                    src={PHOTOS.cocktailMenu}
                    alt="Arkle cocktail menu featuring Raspberry Shoda"
                    className="w-full object-cover"
                    style={{ height: "200px", objectPosition: "center top" }}
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <p
                  className="text-base leading-relaxed mb-6"
                  style={{ color: "oklch(0.68 0.015 65)", fontFamily: "'DM Sans', sans-serif" }}
                >
                  The Raspberry Shoda became the top-selling cocktail at the Arkle Bar &amp;
                  Restaurant — and it was born from a desire to create something that felt both
                  familiar and completely unexpected. Its name, meaning{" "}
                  <em style={{ color: "#e8d5a3" }}>"Raspberry Silk"</em> in Irish, is a promise
                  the drink keeps with every sip.
                </p>
                <p
                  className="text-base leading-relaxed mb-8"
                  style={{ color: "oklch(0.68 0.015 65)", fontFamily: "'DM Sans', sans-serif" }}
                >
                  The signature raspberry foam crowning the glass is not merely decorative — it
                  delivers a burst of concentrated flavour before the cocktail even touches your
                  lips, creating a two-act tasting experience that guests consistently described
                  as surprising and unforgettable.
                </p>
                <GoldRule />
                {/* Recipe */}
                <div>
                  <p
                    className="text-xs tracking-[0.3em] uppercase mb-4"
                    style={{ fontFamily: "'Cormorant Garamond', serif", color: "#c9922a" }}
                  >
                    The Recipe
                  </p>
                  <div className="space-y-2">
                    {[
                      "Absolut Raspberry Vodka",
                      "Limoncello",
                      "Raspberry Purée",
                      "Lemon Juice",
                      "Simple Syrup",
                      "Raspberry Foam",
                    ].map((ingredient) => (
                      <div
                        key={ingredient}
                        className="flex items-center gap-3 py-2"
                        style={{ borderBottom: "1px solid rgba(201,146,42,0.1)" }}
                      >
                        <Star
                          size={8}
                          fill="#c9922a"
                          style={{ color: "#c9922a", flexShrink: 0 }}
                        />
                        <span
                          className="text-sm"
                          style={{ fontFamily: "'DM Sans', sans-serif", color: "#e8d5a3" }}
                        >
                          {ingredient}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SEASONAL COCKTAILS ─────────────────────────────────────────────── */}
      <section id="seasonal" className="py-24">
        <div className="container">
          <div ref={seasonalRef} className="fade-in-up">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Text */}
              <div>
                <SectionLabel>Seasonal &amp; Special Occasions</SectionLabel>
                <h2
                  className="text-4xl md:text-5xl leading-tight mb-6"
                  style={{ fontFamily: "'Playfair Display', serif", color: "#f5efe6" }}
                >
                  A Cocktail for
                  <br />
                  <em style={{ color: "#c9922a" }}>Every Moment</em>
                </h2>
                <GoldRule />
                <p
                  className="text-base leading-relaxed mb-8"
                  style={{ color: "oklch(0.68 0.015 65)", fontFamily: "'DM Sans', sans-serif" }}
                >
                  Beyond the permanent menu, I designed bespoke seasonal cocktail programmes
                  to mark the calendar's most celebrated occasions. Each limited-edition menu
                  was crafted to reflect the spirit of the season — in flavour, colour, and
                  presentation.
                </p>
                <div className="space-y-0">
                  <SeasonalItem
                    season="Mother's Day"
                    description="Elegant, floral creations designed to celebrate and delight — light, aromatic, and beautifully presented with edible flowers."
                  />
                  <SeasonalItem
                    season="St. Patrick's Day"
                    description="Irish-forward cocktails celebrating local spirits and heritage — Jameson, Dingle Gin, and homemade Irish bitters took centre stage."
                  />
                  <SeasonalItem
                    season="Halloween"
                    description="Dark, theatrical, and dramatic — smoky presentations, deep crimson colours, and unexpected flavour twists to match the season's spirit."
                  />
                </div>
              </div>

              {/* Photos */}
              <div className="space-y-4">
                <div
                  className="overflow-hidden"
                  style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}
                >
                  <img
                    src={PHOTOS.blackForestSpecial}
                    alt="Black Forest special cocktail chalkboard"
                    className="w-full object-cover"
                    style={{ height: "320px", objectPosition: "center" }}
                  />
                </div>
                <div
                  className="overflow-hidden"
                  style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}
                >
                  <img
                    src={PHOTOS.raulAtWork}
                    alt="Raul crafting cocktails at the Arkle bar"
                    className="w-full object-cover"
                    style={{ height: "280px", objectPosition: "center top" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── COCKTAIL MENUS ─────────────────────────────────────────────────── */}
      <section
        id="menus"
        className="py-24"
        style={{ background: "oklch(0.10 0.015 50)" }}
      >
        <div className="container">
          <div ref={menuRef} className="fade-in-up">
            <div className="text-center mb-16">
              <SectionLabel>Arkle Bar &amp; Restaurant</SectionLabel>
              <h2
                className="text-4xl md:text-5xl leading-tight"
                style={{ fontFamily: "'Playfair Display', serif", color: "#f5efe6" }}
              >
                The Full{" "}
                <em style={{ color: "#c9922a" }}>Cocktail Programme</em>
              </h2>
              <p
                className="mt-4 text-sm max-w-xl mx-auto leading-relaxed"
                style={{ color: "oklch(0.55 0.015 65)", fontFamily: "'DM Sans', sans-serif" }}
              >
                A curated selection of menus developed and maintained during my tenure as
                Head Mixologist — spanning classics, Irish-forward creations, sours,
                martinis, smoked cocktails, and more.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <MenuCard title="Cocktails Menu" img={PHOTOS.cocktailMenu} delay={0} />
              <MenuCard title="Negronis" img={PHOTOS.negroniMenu} delay={80} />
              <MenuCard title="After Dinner" img={PHOTOS.afterDinnerMenu} delay={160} />
              <MenuCard title="Irish Forward" img={PHOTOS.irishForwardMenu} delay={240} />
              <MenuCard title="Martinis" img={PHOTOS.martinisMenu} delay={0} />
              <MenuCard title="Sours" img={PHOTOS.soursMenu} delay={80} />
              <MenuCard title="Long Drinks" img={PHOTOS.longMenu} delay={160} />
              <MenuCard title="Smoked" img={PHOTOS.smokedMenu} delay={240} />
            </div>
          </div>
        </div>
      </section>

      {/* ── OPEN TO WORK / CONTACT ─────────────────────────────────────────── */}
      <section
        id="contact"
        className="py-24 relative overflow-hidden"
        style={{ background: "oklch(0.09 0.015 50)" }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url(${PHOTOS.raulAtWork})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(30px)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "rgba(13,11,9,0.85)" }}
        />
        <div className="container relative z-10">
          <div ref={contactRef} className="fade-in-up max-w-2xl mx-auto text-center">
            <SectionLabel>Open to Work</SectionLabel>
            <h2
              className="text-4xl md:text-6xl leading-tight mb-6"
              style={{ fontFamily: "'Playfair Display', serif", color: "#f5efe6" }}
            >
              Now Seeking
              <br />
              <em style={{ color: "#c9922a" }}>Málaga Opportunities</em>
            </h2>
            <GoldRule />
            <p
              className="text-base leading-relaxed mb-4"
              style={{ color: "oklch(0.68 0.015 65)", fontFamily: "'DM Sans', sans-serif" }}
            >
              After two remarkable years building the cocktail programme at Glenroyal Hotel,
              I am relocating to Málaga, Spain, and actively seeking my next challenge. I am
              open to roles as Head Mixologist, Bar Manager, or Senior Bartender at hotels,
              resorts, and cocktail bars in the Málaga area.
            </p>
            <p
              className="text-base leading-relaxed mb-10"
              style={{ color: "oklch(0.68 0.015 65)", fontFamily: "'DM Sans', sans-serif" }}
            >
              If you are looking for someone who brings creativity, precision, and a proven
              track record of creating cocktails that guests keep coming back for — let's talk.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.linkedin.com/in/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-8 py-4 text-sm tracking-widest uppercase font-semibold transition-all duration-200 hover:opacity-85"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  background: "#c9922a",
                  color: "#0d0b09",
                  letterSpacing: "0.15em",
                }}
              >
                <Linkedin size={16} />
                Connect on LinkedIn
              </a>
              <a
                href="mailto:raul@example.com"
                className="flex items-center justify-center gap-3 px-8 py-4 text-sm tracking-widest uppercase font-semibold transition-all duration-200 hover:opacity-85"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  border: "1px solid rgba(201,146,42,0.5)",
                  color: "#e8d5a3",
                  background: "transparent",
                  letterSpacing: "0.15em",
                }}
              >
                <Mail size={16} />
                Get in Touch
              </a>
            </div>

            {/* Location badge */}
            <div
              className="inline-flex items-center gap-2 mt-10 px-5 py-2"
              style={{
                border: "1px solid rgba(201,146,42,0.25)",
                background: "rgba(201,146,42,0.06)",
              }}
            >
              <MapPin size={12} style={{ color: "#c9922a" }} />
              <span
                className="text-xs tracking-widest uppercase"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.55 0.015 65)" }}
              >
                Available in Málaga, Spain · Immediate Start
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer
        className="py-10"
        style={{
          background: "oklch(0.09 0.015 50)",
          borderTop: "1px solid rgba(201,146,42,0.12)",
        }}
      >
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <span
            className="text-sm tracking-widest uppercase"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.40 0.015 65)" }}
          >
            Raul · Head Mixologist
          </span>
          <span
            className="text-xs"
            style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.35 0.015 65)" }}
          >
            Glenroyal Hotel · Arkle Bar &amp; Restaurant · Maynooth, Ireland
          </span>
          <div className="flex items-center gap-2">
            <MapPin size={12} style={{ color: "#c9922a" }} />
            <span
              className="text-xs tracking-wider"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.40 0.015 65)" }}
            >
              Relocating to Málaga, Spain
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
