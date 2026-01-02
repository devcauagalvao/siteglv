import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, Send } from "lucide-react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const location = useLocation();
  const isDynamicRoute = location.pathname !== "/";
  const navigate = useNavigate();

  // Observe scroll progress (mantém)
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;

      setIsScrolled(scrollTop > 50);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const navItems: Array<{ name: string; href: string; type: "section" | "route" }> = [
    { name: "Home", href: "#home", type: "section" },
    { name: "Serviços", href: "#services", type: "section" },
    { name: "Portfólio", href: "#portfolio", type: "section" },
    { name: "Softwares", href: "#store", type: "section" },
    { name: "Clientes", href: "#testimonials", type: "section" },
    { name: "Contato", href: "#contact", type: "section" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <nav
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${isScrolled
          ? "backdrop-blur-md bg-black/30 border-b border-white/10 shadow-md"
          : "bg-transparent"
          }`}
      >
        <div className="flex justify-between items-center h-16 px-4 sm:px-6 lg:px-8">
          <motion.div
            className="relative cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={isScrolled ? scrollToTop : undefined}
          >
            {isScrolled ? (
              <div className="relative w-10 h-10">
                <svg
                  className="absolute top-0 left-0 w-full h-full"
                  viewBox="0 0 40 40"
                >
                  <circle
                    cx="20"
                    cy="20"
                    r="18"
                    stroke="#3B82F6"
                    strokeWidth="3"
                    fill="transparent"
                    strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 18}
                    strokeDashoffset={
                      (1 - scrollProgress) * 2 * Math.PI * 18
                    }
                    style={{
                      transition:
                        "stroke-dashoffset 0.2s ease, stroke 0.2s ease",
                    }}
                  />
                </svg>
                <ArrowUp className="text-blue-500 absolute inset-0 m-auto w-5 h-5" />
              </div>
            ) : (
              <img
                src="/img/branding/glvsemfundo.png"
                alt="Logo"
                className="h-14 w-auto object-contain transition-all duration-300"
              />
            )}
          </motion.div>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isSectionActive = item.type === "section" && !isDynamicRoute && item.href === `#${activeSection}`;
              const isRouteActive = item.type === "route" && location.pathname === item.href;
              const isActive = isSectionActive || isRouteActive;
              return (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href, item.type)}
                  className={`px-1 relative group focus:outline-none transition-colors ${isActive ? "text-white" : "text-white/80 hover:text-blue-400"
                    }`}
                  whileHover={{ y: -2 }}
                >
                  {item.name}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-blue-500 transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                  />
                </motion.a>
              );
            })}
            <motion.a
              href="https://wa.me/5511919167653"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-2 rounded-full shadow-lg hover:shadow-xl hover:shadow-blue-500/50 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-opacity-50"
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.95 }}
              animate={{ opacity: [1, 0.8, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              Peça Seu Orçamento Já
              <Send className="w-5 h-5" />
            </motion.a>
          </div>

          {/* Menu Mobile - Ícone Novo */}
          <StyledWrapper className="md:hidden z-50 relative">
            <label className="hamburger">
              <input
                type="checkbox"
                title="Menu"
                onChange={(e) => setIsMobileMenuOpen(e.target.checked)}
                checked={isMobileMenuOpen}
              />
              <svg viewBox="0 0 32 32">
                <path
                  className="line line-top-bottom"
                  d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
                />
                <path className="line" d="M7 16 27 16" />
              </svg>
            </label>
          </StyledWrapper>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-white/10 backdrop-blur-md"
              style={{
                backgroundOrigin: "border-box",
                backgroundClip: "padding-box, border-box",
              }}
            >
              <div className="px-4 py-6 space-y-4">
                {navItems.map((item) => {
                  const isSectionActive = item.type === "section" && !isDynamicRoute && item.href === `#${activeSection}`;
                  const isRouteActive = item.type === "route" && location.pathname === item.href;
                  const isActive = isSectionActive || isRouteActive;
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href, item.type)}
                      className={`block transition-colors duration-200 focus:outline-none ${isActive
                        ? "text-white border-l-2 border-blue-500 pl-2"
                        : "text-white/90 hover:text-blue-400"
                        }`}
                    >
                      {item.name}
                    </a>
                  );
                })}
                <a
                  href="https://wa.me/5511919167653"
                  className="flex justify-center items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white py-2 rounded-full hover:brightness-110 transition duration-300 focus:outline-none"
                >
                  Peça Seu Orçamento Já
                  <Send className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.div>
  );
};

const StyledWrapper = styled.div`
  .hamburger {
    cursor: pointer;
  }

  .hamburger input {
    display: none;
  }

  .hamburger svg {
    height: 3em;
    transition: transform 600ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .line {
    fill: none;
    stroke: white;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 3;
    transition: stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1),
      stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .line-top-bottom {
    stroke-dasharray: 12 63;
  }

  .hamburger input:checked + svg {
    transform: rotate(-45deg);
  }

  .hamburger input:checked + svg .line-top-bottom {
    stroke-dasharray: 20 300;
    stroke-dashoffset: -32.42;
  }
`;

export default Navbar;
