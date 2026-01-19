import { motion } from "framer-motion";
import { Heart, Instagram, Twitter } from "lucide-react";
import wardoLogo from "@/assets/wardo-logo.png";

export const Footer = () => {
  return (
    <footer className="py-12 px-6 lg:px-12 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <motion.a
            href="#"
            className="flex items-center"
            whileHover={{ scale: 1.02 }}
          >
            <img src={wardoLogo} alt="Wardo" className="h-10 w-auto" />
          </motion.a>

          {/* Links */}
          <div className="flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          </div>

          {/* Social */}
          <div className="flex items-center gap-4">
            <motion.a
              href="#"
              className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Instagram className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="#"
              className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Twitter className="w-5 h-5" />
            </motion.a>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-8 pt-8 border-t border-border border-dashed text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-1 font-handwritten text-xl">
            Made with <Heart className="w-4 h-4 text-pink fill-pink" /> in India
          </p>
          <p className="mt-2 text-xs text-muted-foreground">© 2025 Wardo. Your second brain for everything fashion.</p>
        </div>
      </div>
    </footer>
  );
};
