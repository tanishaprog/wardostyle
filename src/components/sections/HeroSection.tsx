import { motion } from "framer-motion";
import { FloatingNote } from "../FloatingNote";
import { ScribbleArrow } from "../ScribbleArrow";
import { InteractiveButton } from "../InteractiveButton";
import { Sparkles, Shirt, Brain } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="min-h-screen relative overflow-hidden px-6 lg:px-12 py-20 flex items-center">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 rounded-full bg-pink/20"
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-40 right-20 w-48 h-48 rounded-full bg-secondary/30"
          animate={{ scale: [1, 1.15, 1], rotate: [0, -5, 0] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-accent/20"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 6, repeat: Infinity, delay: 2 }}
        />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Main content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="font-handwritten text-2xl text-primary">
                ✨ Fashion meets intelligence
              </span>
            </motion.div>

            <motion.h1
              className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight text-charcoal"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Your{" "}
              <span className="scribble-underline">second brain</span>
              <br />
              for fashion
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-foreground/70 max-w-lg leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              From styling what you own to shopping smarter.
              <br />
              <span className="text-foreground">Wardo remembers everything so you don't have to.</span>
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 pt-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <InteractiveButton variant="primary" size="lg">
                Explore how Wardo works
              </InteractiveButton>
              <InteractiveButton variant="outline" size="lg">
                Join the waitlist
              </InteractiveButton>
            </motion.div>
          </div>

          {/* Right: Floating notes and visual elements */}
          <div className="relative h-[500px] hidden lg:block">
            {/* Floating notes */}
            <FloatingNote
              rotation={-4}
              delay={0.5}
              color="yellow"
              className="absolute top-10 right-20"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Style better ✓
              </div>
            </FloatingNote>

            <FloatingNote
              rotation={3}
              delay={0.7}
              color="pink"
              className="absolute top-32 left-10"
            >
              <div className="flex items-center gap-2">
                <Shirt className="w-5 h-5" />
                Remember your wardrobe
              </div>
            </FloatingNote>

            <FloatingNote
              rotation={-2}
              delay={0.9}
              color="accent"
              className="absolute bottom-40 right-10"
            >
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                Try before you buy
              </div>
            </FloatingNote>

            <FloatingNote
              rotation={5}
              delay={1.1}
              color="secondary"
              className="absolute bottom-20 left-20"
            >
              No more "I have nothing to wear"
            </FloatingNote>

            {/* Scribble arrows connecting notes */}
            <ScribbleArrow
              direction="right"
              delay={1.3}
              className="absolute top-24 right-52"
            />
            <ScribbleArrow
              direction="down"
              delay={1.5}
              className="absolute top-56 left-32"
            />

            {/* Central illustration placeholder */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="w-64 h-64 rounded-full bg-gradient-to-br from-primary/20 to-secondary/30 flex items-center justify-center">
                <motion.div
                  className="font-handwritten text-6xl text-primary"
                  animate={{ rotate: [0, 5, 0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  W
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 2 }}
      >
        <div className="font-handwritten text-lg text-muted-foreground">
          scroll to explore ↓
        </div>
      </motion.div>
    </section>
  );
};
