import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const location = useLocation();
  const isDynamicRoute = location.pathname !== "/";
  const navigate = useNavigate();

  useEffect(() => {
    if (isDynamicRoute) {
      setActiveSection("");
      return;
    }
    const ids = [
      "home",
      "about",
      "portfolio",
      "services",
      "plans",
      "store",
      "testimonials",
      "contact",
    ];
    const getActiveId = () => {
      const scrollY = window.scrollY;
      const viewportMarker = scrollY + window.innerHeight * 0.35;
      let bestId = ids[0];
      let minDist = Infinity;

      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        const top = rect.top + scrollY;
        const bottom = top + el.offsetHeight;

        if (viewportMarker >= top && viewportMarker < bottom) {
          return id;
        }

        const dist = Math.abs(top - (scrollY + 64));
        if (dist < minDist) {
          minDist = dist;
          bestId = id;
        }
      }
      return bestId;
    };

    const onScroll = () => {
      const id = getActiveId();
      setActiveSection((prev) => (prev !== id ? id : prev));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isDynamicRoute]);

  const desktopItems: Array<{ name: string; href: string; type: "section" | "route" }> = [
    { name: "Home", href: "#home", type: "section" },
    { name: "Soluções", href: "#services", type: "section" },
    { name: "Portfólio", href: "#portfolio", type: "section" },
    { name: "Clientes", href: "#testimonials", type: "section" },
    { name: "Contato", href: "#contact", type: "section" },
  ];

  const mobileItems: Array<{ name: string; href: string; type: "section" | "route" }> = [
    { name: "Home", href: "#home", type: "section" },
    { name: "Soluções", href: "#services", type: "section" },
    { name: "Portfólio", href: "#portfolio", type: "section" },
    { name: "Clientes", href: "#testimonials", type: "section" },
    { name: "Contato", href: "#contact", type: "section" },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    type: "section" | "route"
  ) => {
    e.preventDefault();
    if (type === "route") {
      navigate(href);
    } else {
      if (isDynamicRoute) {
        navigate({ pathname: "/", hash: href });
        setIsMobileMenuOpen(false);
        return;
      }
      const section = document.querySelector(href);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
        setActiveSection(href.replace("#", ""));
      }
    }
    setIsMobileMenuOpen(false);
  };

  const linkClassName =
    "text-sm text-white/70 px-3 py-1.5 rounded-full transition-all duration-200 hover:text-white hover:bg-white/10";

  const logoSizePx = 30;
  const logoMaskStyle: React.CSSProperties = {
    WebkitMaskImage: "url(/img/branding/GLV.svg)",
    maskImage: "url(/img/branding/GLV.svg)",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    maskPosition: "center",
    WebkitMaskSize: "contain",
    maskSize: "contain",
    width: logoSizePx,
    height: logoSizePx,
  };

  return (
    <>
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
        <motion.nav
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          style={{ scale: 1.1 }}
          className="
flex items-center gap-2
px-4 py-2
rounded-full
bg-white/5
backdrop-blur-xl
border border-white/10
shadow-[0_8px_30px_rgba(0,0,0,0.45)]
"
        >
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home", "section")}
            className="px-2 py-1.5 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Ir para Home"
          >
            <span className="sr-only">GLV</span>
            <span
              aria-hidden="true"
              className="block bg-blue-500"
              style={logoMaskStyle}
            />
          </a>

          <div className="hidden md:flex items-center">
            {desktopItems.map((item) => {
              const isActive = !isDynamicRoute && item.type === "section" && item.href === `#${activeSection}`;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href, item.type)}
                  className={`${linkClassName} ${isActive ? "text-white bg-white/10" : ""}`.trim()}
                >
                  {item.name}
                </a>
              );
            })}

            <a
              href="https://wa.me/5511919167653"
              target="_blank"
              rel="noopener noreferrer"
              className="
ml-2
text-sm font-semibold
px-4 py-1.5
rounded-full
text-white
bg-gradient-to-br from-blue-500 to-blue-600
shadow-[0_4px_14px_rgba(59,130,246,0.45)]
transition-all duration-200
hover:-translate-y-0.5
hover:shadow-[0_6px_20px_rgba(59,130,246,0.6)]
"
            >
              Solicitar proposta
            </a>
          </div>

          <div className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full transition-colors">
            <label className="flex flex-col gap-2 w-8 cursor-pointer" aria-label="Abrir menu">
              <input
                className="peer hidden"
                type="checkbox"
                title="Menu"
                checked={isMobileMenuOpen}
                onChange={(e) => setIsMobileMenuOpen(e.target.checked)}
              />
              <div className="rounded-2xl h-[3px] w-1/2 bg-white duration-500 origin-right peer-checked:rotate-[225deg] peer-checked:-translate-x-[12px] peer-checked:-translate-y-[1px]" />
              <div className="rounded-2xl h-[3px] w-full bg-white duration-500 peer-checked:-rotate-45" />
              <div className="rounded-2xl h-[3px] w-1/2 bg-white duration-500 place-self-end origin-left peer-checked:rotate-[225deg] peer-checked:translate-x-[12px] peer-checked:translate-y-[1px]" />
            </label>
          </div>
        </motion.nav>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="md:hidden fixed top-[4.75rem] left-1/2 -translate-x-1/2 z-50 w-[calc(100vw-2rem)] max-w-md">
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              style={{ scale: 1.06 }}
              className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.45)] p-2"
            >
              <div className="flex flex-col gap-1">
                {mobileItems.map((item) => {
                  const isActive = !isDynamicRoute && item.type === "section" && item.href === `#${activeSection}`;
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href, item.type)}
                      className={`${linkClassName} ${isActive ? "text-white bg-white/10" : ""}`.trim()}
                    >
                      {item.name}
                    </a>
                  );
                })}

                <a
                  href="https://wa.me/5511919167653"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
mt-1
text-sm font-semibold
px-4 py-2
rounded-full
text-white
bg-gradient-to-br from-blue-500 to-blue-600
shadow-[0_4px_14px_rgba(59,130,246,0.45)]
transition-all duration-200
hover:-translate-y-0.5
hover:shadow-[0_6px_20px_rgba(59,130,246,0.6)]
text-center
"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Solicitar proposta
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
