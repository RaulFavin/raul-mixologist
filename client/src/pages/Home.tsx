/* =============================================================
   DESIGN: Dark Speakeasy / Art Deco Revival
   Colors: charcoal bg #1a1410, amber gold #c9922a, champagne #e8d5a3
   Fonts: Playfair Display (display/headings), DM Sans (body), Cormorant Garamond (labels)
   Layout: Asymmetric editorial, diagonal dividers, frosted glass cards
   ============================================================= */

import { useEffect, useRef, useState } from "react";
import { MapPin, Mail, Linkedin, ChevronDown, Star, Download, Phone, ChevronUp, X } from "lucide-react";

// ── CV CDN URL ───────────────────────────────────────────────────────────────
const CV_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663164379997/gb3kDvRHMNESvyNJMSRSjR/RAULFAVINSANTOSCV_a95fdfa1.docx";

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
      style={{ fontFamily: "'Cormorant Garamond', serif", color: "#c9922a", fontSize: '14px', letterSpacing: '0.3em' }}
    >
      {children}
    </p>
  );
}

// ── Expandable cocktail menu card ───────────────────────────────────────────
// Each card renders a compact thumbnail. When clicked it signals its index to
// the parent via onOpen(). The parent renders the full expanded panel below the
// row that contains the active card, spanning the full grid width.
function ExpandableMenuCard({
  title,
  menuImg,
  cocktailImg,
  cocktailLabel,
  description,
  story,
  ingredients,
  isOpen,
  onOpen,
  onClose,
  delay = 0,
}: {
  title: string;
  menuImg: string;
  cocktailImg: string;
  cocktailLabel: string;
  description: string;
  story: string;
  ingredients: string[];
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  delay?: number;
}) {
  const ref = useScrollReveal();
  return (
    <div
      ref={ref}
      className="fade-in-up glass-card overflow-hidden group"
      style={{
        transitionDelay: `${delay}ms`,
        outline: isOpen ? "2px solid rgba(201,146,42,0.7)" : "none",
        outlineOffset: "2px",
      }}
    >
      {/* Thumbnail — always visible */}
      <div
        className="overflow-hidden aspect-[3/4] cursor-pointer relative"
        onClick={() => (isOpen ? onClose() : onOpen())}
      >
        <img
          src={menuImg}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div
          className="absolute inset-0 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)" }}
        >
          <span
            className="flex items-center gap-1 text-xs tracking-widest uppercase px-3 py-1"
            style={{ color: "#c9922a", fontFamily: "'Cormorant Garamond', serif" }}
          >
            {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            {isOpen ? "Fold" : "View"}
          </span>
        </div>
      </div>
      <div className="p-4 flex items-center justify-between">
        <p
          className="text-sm tracking-widest uppercase"
          style={{ fontFamily: "'Cormorant Garamond', serif", color: "#c9922a" }}
        >
          {title}
        </p>
        {isOpen && (
          <button
            onClick={onClose}
            className="flex items-center gap-1 text-xs tracking-widest uppercase transition-opacity hover:opacity-70"
            style={{ color: "#c9922a", fontFamily: "'Cormorant Garamond', serif" }}
          >
            <ChevronUp size={12} /> Fold
          </button>
        )}
      </div>
    </div>
  );
}

// ── Expanded detail panel (rendered full-width below the active row) ─────────
function MenuCardExpanded({
  title,
  cocktailImg,
  cocktailLabel,
  description,
  story,
  ingredients,
  onClose,
}: {
  title: string;
  cocktailImg: string;
  cocktailLabel: string;
  description: string;
  story: string;
  ingredients: string[];
  onClose: () => void;
}) {
  return (
    <div
      className="col-span-2 md:col-span-3 lg:col-span-4 overflow-hidden"
      style={{
        background: "oklch(0.11 0.018 50)",
        border: "1px solid rgba(201,146,42,0.22)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
      }}
    >

      {/* Header bar with fold button */}
      <div
        className="flex items-center justify-between px-8 py-4"
        style={{ borderBottom: "1px solid rgba(201,146,42,0.15)" }}
      >
        <p
          className="text-xs tracking-[0.3em] uppercase"
          style={{ fontFamily: "'Cormorant Garamond', serif", color: "#c9922a" }}
        >
          {title}
        </p>
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-xs tracking-widest uppercase px-4 py-2 transition-all hover:opacity-80"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: "#e8d5a3",
            background: "rgba(201,146,42,0.12)",
            border: "1px solid rgba(201,146,42,0.35)",
          }}
        >
          <ChevronUp size={14} /> Fold
        </button>
      </div>

        {/* Main content: photo + text side by side */}
      <div className="grid md:grid-cols-2 gap-0">
        {/* Photo */}
        <div className="overflow-hidden" style={{ maxHeight: "380px" }}>
          <img
            src={cocktailImg}
            alt={cocktailLabel}
            className="w-full h-full object-cover"
            style={{ minHeight: "280px", maxHeight: "380px" }}
          />
        </div>

        {/* Text content */}
        <div className="p-8 flex flex-col justify-between" style={{ overflowY: "auto", maxHeight: "380px" }}>
          <div>
            <h3
              className="text-3xl md:text-4xl leading-tight mb-5"
              style={{ fontFamily: "'Playfair Display', serif", color: "#f5efe6" }}
            >
              {cocktailLabel}
            </h3>
            <hr style={{ borderColor: "rgba(201,146,42,0.35)", marginBottom: "1.5rem" }} />
            <p
              className="text-base leading-relaxed mb-5"
              style={{ color: "oklch(0.74 0.015 65)", fontFamily: "'DM Sans', sans-serif" }}
            >
              {description}
            </p>
            <p
              className="text-sm leading-relaxed mb-8 italic"
              style={{
                color: "oklch(0.60 0.015 65)",
                fontFamily: "'DM Sans', sans-serif",
                borderLeft: "2px solid rgba(201,146,42,0.45)",
                paddingLeft: "1rem",
              }}
            >
              {story}
            </p>
            <div>
              <p
                className="text-xs tracking-widest uppercase mb-3"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: "#c9922a" }}
              >
                Key Ingredients
              </p>
              <div className="flex flex-wrap gap-2">
                {ingredients.map((ing) => (
                  <span
                    key={ing}
                    className="text-xs px-3 py-1"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      color: "#e8d5a3",
                      background: "rgba(201,146,42,0.1)",
                      border: "1px solid rgba(201,146,42,0.28)",
                    }}
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <p
            className="mt-8 text-xs tracking-wider"
            style={{ color: "oklch(0.40 0.012 65)", fontFamily: "'DM Sans', sans-serif" }}
          >
            Arkle Bar &amp; Restaurant · Glenroyal Hotel, Maynooth
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Menu grid with inline expansion ──────────────────────────────────
const MENU_CARDS = [
  {
    title: "Cocktails Menu",
    menuImg: PHOTOS.cocktailMenu,
    cocktailImg: PHOTOS.raspberryShoda,
    cocktailLabel: "Raspberry Shoda",
    description: "The Raspberry Shoda is a visually stunning sour-style cocktail built on Absolut Raspberry Vodka and Limoncello, brightened with fresh lemon juice and balanced with simple syrup. Its crowning glory is a thick, velvety raspberry foam that delivers an intense burst of flavour before the drink even touches your lips.",
    story: "I created the Raspberry Shoda to give guests something they had never experienced before — a cocktail that surprises at every stage. The name comes from the Irish word for silk, a promise of the texture waiting beneath the foam. It quickly became the best-selling cocktail on the Arkle menu and the drink guests would return specifically to order again.",
    ingredients: ["Absolut Raspberry Vodka", "Limoncello", "Raspberry Purée", "Lemon Juice", "Simple Syrup", "Raspberry Foam"],
  },
  {
    title: "Negronis",
    menuImg: PHOTOS.negroniMenu,
    cocktailImg: PHOTOS.raulAtWork,
    cocktailLabel: "Negroni Selection — Arkle Bar",
    description: "A curated trio of Negroni expressions, each exploring a different dimension of the classic bitter-sweet template. From the bold and traditional Classic Negroni to the citrus-forward Yuzu Negroni and the rich Coffee Bean Negroni, this section was designed to convert both Negroni devotees and curious newcomers.",
    story: "I wanted to show guests that the Negroni is not a single drink but a philosophy. By pairing Irish and international gins with unexpected infusions — yuzu, cold brew coffee — I gave the Arkle Negroni menu a personality entirely its own, rooted in Irish craft spirits like Drumshanbo Gunpowder and Glendalough.",
    ingredients: ["Drumshanbo Gunpowder Gin", "Campari", "Valentia Island Vermouth", "Yuzu", "Cold Brew Coffee", "Orange"],
  },
  {
    title: "After Dinner",
    menuImg: PHOTOS.afterDinnerMenu,
    cocktailImg: PHOTOS.raspberryShodaRow,
    cocktailLabel: "After Dinner Cocktails — Arkle Bar",
    description: "A selection of indulgent, spirit-forward cocktails designed to complement the end of a fine dining experience. The Irish Toffee wraps Jameson whiskey in butterscotch and cream, the Boulevardier adds dark chocolate depth, and the Arkle Espresso Martini delivers a rich, caffeinated finish.",
    story: "After-dinner cocktails are about comfort and conversation. I designed this menu to feel like a natural extension of the meal — warming, indulgent, and unhurried. Each drink was crafted to linger, giving guests a reason to stay at the table just a little longer.",
    ingredients: ["Jameson Whiskey", "Butterscotch Liqueur", "Bulleit Bourbon", "Campari", "Absolut Vodka", "Baileys", "Kahlua", "Espresso"],
  },
  {
    title: "Irish Forward",
    menuImg: PHOTOS.irishForwardMenu,
    cocktailImg: PHOTOS.raulAtWork,
    cocktailLabel: "Irish Forward — Celebrating Irish Spirits",
    description: "A proudly Irish cocktail section celebrating the extraordinary range of craft spirits produced on the island. From the floral Oileán with Drumshanbo Gunpowder Gin and elderflower, to the herbal Gairdin with Dingle Gin and blackcurrant, to the smooth and complex Uisce Beatha built on Jameson and homemade bitters.",
    story: "Working in Ireland gave me a deep appreciation for the renaissance of Irish craft distilling. This menu was my tribute to that movement — a way of telling guests that world-class cocktail ingredients were being made right here on their doorstep. Every drink in this section tells a story of Irish landscape and craft.",
    ingredients: ["Drumshanbo Gunpowder Gin", "Dingle Gin", "Jameson Whiskey", "Irish Mist", "Elderflower Syrup", "Beara Bitters", "Poachers Tonic"],
  },
  {
    title: "Martinis",
    menuImg: PHOTOS.martinisMenu,
    cocktailImg: PHOTOS.raspberryShoda,
    cocktailLabel: "Martini Selection — Arkle Bar",
    description: "Three distinct Martini expressions covering the full spectrum from bone-dry to sweet and fruity. The Classic Martini with Drumshanbo Gunpowder Gin is clean and precise; the Lavender Lemon Drop is refreshing and aromatic; and the French Martini brings a sweet, raspberry-kissed finish that pairs beautifully with the Arkle dining experience.",
    story: "The Martini is the most unforgiving cocktail — there is nowhere to hide. I wanted this menu to demonstrate technical precision while still offering something for every palate. The Lavender Lemon Drop became a particular favourite with guests who thought they did not like Martinis, which is exactly the kind of conversion I love to achieve.",
    ingredients: ["Drumshanbo Gunpowder Gin", "Absolut Citron Vodka", "Absolut Vodka", "Lavender Syrup", "Chambord", "Dry Vermouth", "Pineapple Juice"],
  },
  {
    title: "Sours",
    menuImg: PHOTOS.soursMenu,
    cocktailImg: PHOTOS.raspberryShodaRow,
    cocktailLabel: "Sours — Whiskey, Pisco & Amaretto",
    description: "A trio of expertly balanced sours showcasing three very different base spirits. The Whiskey Sour uses Jameson Black Barrel for a rich, oaky backbone; the Pisco Sour is velvety and tangy with Beara bitters; and the Amaretto Sour brings nutty sweetness softened by egg white and citrus.",
    story: "Sours are the cocktail that teaches you the most about balance. Getting the ratio of spirit, citrus, and sweetness exactly right — and then deciding whether to use egg white, how to dry-shake, how long to wet-shake — is a craft in itself. This menu was a masterclass in that balance, and it consistently drew compliments from guests who appreciated the precision.",
    ingredients: ["Jameson Black Barrel", "Pisco", "Disaronno Amaretto", "Lemon Juice", "Lime Juice", "Egg White", "Beara Bitters", "Simple Syrup"],
  },
  {
    title: "Long Drinks",
    menuImg: PHOTOS.longMenu,
    cocktailImg: PHOTOS.blackForestSpecial,
    cocktailLabel: "Long Drinks — Miso Colada, Highball 75 & more",
    description: "Three long, refreshing cocktails designed for leisurely enjoyment. The Miso Colada is a creamy, tropical twist with a savoury depth from miso paste. The Highball 75 is fresh and bubbly with Beefeater 24 gin and prosecco. The Paloma Blanca is zesty and light, built on Patron Silver tequila with grapefruit and sea salt.",
    story: "Long drinks are about atmosphere — they are the cocktails people order when they want to relax and let the evening unfold. The Miso Colada was the most talked-about drink on this menu; the idea of adding miso to a Piña Colada sounds unusual until you taste it, and then it makes complete sense. It became a signature conversation starter at the bar.",
    ingredients: ["Havana 3yr Rum", "Beefeater 24 Gin", "Patron Silver Tequila", "Coconut Cream", "Miso Paste", "Prosecco", "Grapefruit Juice", "Agave Nectar"],
  },
  {
    title: "Smoked",
    menuImg: PHOTOS.smokedMenu,
    cocktailImg: PHOTOS.raulAtWork,
    cocktailLabel: "Smoked Cocktails — Old Fashioned, Mezcal Negroni & more",
    description: "A premium smoked cocktail menu priced at €15, featuring three spirit-forward classics elevated with smoke and complexity. The Old Fashioned uses Maker's Mark bourbon with smoked and Beara bitters. The Mezcal Negroni brings earthy, aromatic depth from Casamigos mezcal. The Godfather pairs Glenfiddich 12yr scotch with amaretto for a nutty, peaty finish.",
    story: "Smoked cocktails are theatre as much as they are flavour. I introduced this menu to give guests an experience they could not get anywhere else in Maynooth — the ritual of the smoke, the aroma, the anticipation before the first sip. These are cocktails for people who want to be transported somewhere else entirely, and they consistently became the most photographed drinks on the menu.",
    ingredients: ["Maker's Mark Bourbon", "Casamigos Mezcal", "Glenfiddich 12yr Scotch", "Campari", "Amaretto", "Smoked Bitters", "Beara Bitters", "Cinnamon"],
  },
];

// Renders the 4-column grid. Clicking a card opens a fixed viewport modal overlay.
function MenuGrid() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const COLS = 4;

  const rows: number[][] = [];
  for (let i = 0; i < MENU_CARDS.length; i += COLS) {
    rows.push(MENU_CARDS.slice(i, i + COLS).map((_, j) => i + j));
  }

  const activeCard = activeIdx !== null ? MENU_CARDS[activeIdx] : null;

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setActiveIdx(null); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = activeIdx !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [activeIdx]);

  return (
    <>
      {/* Card grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {MENU_CARDS.map((card, cardIdx) => (
          <ExpandableMenuCard
            key={card.title}
            {...card}
            isOpen={activeIdx === cardIdx}
            onOpen={() => setActiveIdx(cardIdx)}
            onClose={() => setActiveIdx(null)}
            delay={(cardIdx % COLS) * 80}
          />
        ))}
      </div>

      {/* Fixed viewport modal overlay */}
      {activeCard && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5rem",
            background: "rgba(10,8,5,0.82)",
            backdropFilter: "blur(6px)",
            animation: "fadeInOverlay 0.25s ease",
          }}
          onClick={() => setActiveIdx(null)}
        >
          <style>{`
            @keyframes fadeInOverlay {
              from { opacity: 0; }
              to   { opacity: 1; }
            }
            @keyframes slideUpModal {
              from { opacity: 0; transform: translateY(24px) scale(0.97); }
              to   { opacity: 1; transform: translateY(0) scale(1); }
            }
          `}</style>
          {/* Modal panel — stop click propagation so clicking inside doesn't close */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "oklch(0.11 0.018 50)",
              border: "1px solid rgba(201,146,42,0.35)",
              boxShadow: "0 32px 80px rgba(0,0,0,0.75)",
              width: "100%",
              maxWidth: "900px",
              maxHeight: "85vh",
              overflowY: "auto",
              animation: "slideUpModal 0.3s cubic-bezier(0.34,1.56,0.64,1)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-8 py-4 sticky top-0"
              style={{
                borderBottom: "1px solid rgba(201,146,42,0.18)",
                background: "oklch(0.11 0.018 50)",
                zIndex: 1,
              }}
            >
              <p
                className="text-xs tracking-[0.3em] uppercase"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: "#c9922a" }}
              >
                {activeCard.title}
              </p>
              <button
                onClick={() => setActiveIdx(null)}
                className="flex items-center gap-2 text-xs tracking-widest uppercase px-4 py-2 transition-all hover:opacity-80"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  color: "#e8d5a3",
                  background: "rgba(201,146,42,0.12)",
                  border: "1px solid rgba(201,146,42,0.35)",
                }}
              >
                <X size={14} /> Close
              </button>
            </div>

            {/* Content: photo + text */}
            <div className="grid md:grid-cols-2 gap-0">
              <div className="overflow-hidden" style={{ maxHeight: "480px" }}>
                <img
                  src={activeCard.cocktailImg}
                  alt={activeCard.cocktailLabel}
                  className="w-full h-full object-cover"
                  style={{ minHeight: "320px", maxHeight: "480px" }}
                />
              </div>
              <div className="p-8 flex flex-col justify-between" style={{ overflowY: "auto", maxHeight: "480px" }}>
                <div>
                  <h3
                    className="text-3xl leading-tight mb-4"
                    style={{ fontFamily: "'Playfair Display', serif", color: "#f5efe6" }}
                  >
                    {activeCard.cocktailLabel}
                  </h3>
                  <hr style={{ borderColor: "rgba(201,146,42,0.3)", marginBottom: "1.25rem" }} />
                  <p
                    className="text-base leading-relaxed mb-4"
                    style={{ color: "oklch(0.74 0.015 65)", fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {activeCard.description}
                  </p>
                  <p
                    className="text-sm leading-relaxed mb-6 italic"
                    style={{
                      color: "oklch(0.60 0.015 65)",
                      fontFamily: "'DM Sans', sans-serif",
                      borderLeft: "2px solid rgba(201,146,42,0.45)",
                      paddingLeft: "1rem",
                    }}
                  >
                    {activeCard.story}
                  </p>
                  <div>
                    <p
                      className="text-xs tracking-widest uppercase mb-3"
                      style={{ fontFamily: "'Cormorant Garamond', serif", color: "#c9922a" }}
                    >
                      Key Ingredients
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {activeCard.ingredients.map((ing) => (
                        <span
                          key={ing}
                          className="text-xs px-3 py-1"
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            color: "#e8d5a3",
                            background: "rgba(201,146,42,0.1)",
                            border: "1px solid rgba(201,146,42,0.28)",
                          }}
                        >
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <p
                  className="mt-6 text-xs tracking-wider"
                  style={{ color: "oklch(0.40 0.012 65)", fontFamily: "'DM Sans', sans-serif" }}
                >
                  Arkle Bar &amp; Restaurant · Glenroyal Hotel, Maynooth
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
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
            href="https://www.linkedin.com/in/raul-favin"
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
              Raul Favin
              <br />
              <em className="text-5xl md:text-7xl" style={{ color: "#c9922a" }}>
                Mixologist
              </em>
            </h1>
            <p
              className="text-base md:text-lg leading-relaxed mb-8 max-w-lg"
              style={{ color: "oklch(0.70 0.015 65)", fontFamily: "'DM Sans', sans-serif" }}
            >
              Over five years of bar experience, including two years crafting award-worthy cocktails at the Arkle Bar &amp; Restaurant,
              Glenroyal Hotel. Creator of the{" "}
              <span style={{ color: "#e8d5a3", fontStyle: "italic" }}>Raspberry Shoda</span> —
              for a while the hotel's top-selling cocktail. Now bringing that craft to{" "}
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
                With over five years of bar and hotel experience, two of which I served as Head Mixologist at the prestigious Arkle Bar &amp;
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
                  { number: "5+", label: "Years Hotel Experience" },
                  { number: "#1", label: "Best-Selling Cocktail at Glenroyal Hotel" },
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
                    style={{ height: '500px', objectPosition: "center top" }}
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
                    style={{ height: '380px', objectPosition: "center top" }}
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
                  <SeasonalItem
                    season="Valentine's Day"
                    description="Romantic, indulgent, and visually striking — rose-infused spirits, deep berry tones, and delicate garnishes crafted to set the mood for a perfect evening."
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
<MenuGrid />
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
                href="https://www.linkedin.com/in/raul-favin"
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
                href="mailto:raulfavin@gmail.com"
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
              <a
                href="tel:+353834307793"
                className="flex items-center justify-center gap-3 px-8 py-4 text-sm tracking-widest uppercase font-semibold transition-all duration-200 hover:opacity-85"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  border: "1px solid rgba(201,146,42,0.5)",
                  color: "#e8d5a3",
                  background: "transparent",
                  letterSpacing: "0.15em",
                }}
              >
                <Phone size={16} />
                +353 83 430 7793
              </a>
              <a
                href="https://wa.me/353834307793"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-8 py-4 text-sm tracking-widest uppercase font-semibold transition-all duration-200 hover:opacity-85"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  border: "1px solid rgba(37,211,102,0.5)",
                  color: "#25d366",
                  background: "transparent",
                  letterSpacing: "0.15em",
                }}
              >
                {/* WhatsApp SVG icon */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>
              <a
                href={CV_URL}
                download="Raul_Favin_Santos_CV.docx"
                className="flex items-center justify-center gap-3 px-8 py-4 text-sm tracking-widest uppercase font-semibold transition-all duration-200 hover:opacity-85"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  border: "1px solid rgba(201,146,42,0.5)",
                  color: "#e8d5a3",
                  background: "transparent",
                  letterSpacing: "0.15em",
                }}
              >
                <Download size={16} />
                Download CV
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
