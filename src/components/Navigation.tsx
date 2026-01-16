import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import wardoLogo from "@/assets/wardo-logo.png";

const navLinks = [
  { label: "How it works", href: "#styling" },
  { label: "Your closet", href: "#closet" },
  { label: "Virtual try-on", href: "#avatar" },
  { label: "Style DNA", href: "#style-dna" },
  { label: "Our story", href: "#why" },
];

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/90 backdrop-blur-md shadow-soft py-3"
            : "bg-transparent py-6"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            className="flex items-center"
            whileHover={{ scale: 1.02 }}
          >
            <img src={wardoLogo} alt="Wardo" className="h-8 w-auto" />
          </motion.a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors relative group"
                whileHover={{ y: -2 }}
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </motion.a>
            ))}
          </div>

          {/* CTA button */}
          <div className="hidden lg:block">
            <motion.a
              href="#waitlist"
              className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium shadow-playful hover:shadow-lifted transition-all"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Join waitlist
            </motion.a>
          </div>

          {/* Mobile menu button */}
          <motion.button
            className="lg:hidden w-10 h-10 flex items-center justify-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <motion.div
        className={`fixed inset-0 z-40 lg:hidden ${
          isMobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        initial={false}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-charcoal/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: isMobileMenuOpen ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu panel */}
        <motion.div
          className="absolute top-0 right-0 w-3/4 max-w-sm h-full bg-background shadow-lifted p-8 pt-24"
          initial={{ x: "100%" }}
          animate={{ x: isMobileMenuOpen ? 0 : "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
        >
          <div className="space-y-6">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="block text-xl font-display text-foreground hover:text-primary transition-colors"
                initial={{ opacity: 0, x: 20 }}
                animate={{
                  opacity: isMobileMenuOpen ? 1 : 0,
                  x: isMobileMenuOpen ? 0 : 20,
                }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#waitlist"
              className="block w-full text-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: isMobileMenuOpen ? 1 : 0,
                y: isMobileMenuOpen ? 0 : 20,
              }}
              transition={{ delay: 0.5 }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Join waitlist
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};
