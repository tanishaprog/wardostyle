import { motion } from "framer-motion";
import { useState } from "react";
import { InteractiveButton } from "../InteractiveButton";
import { FloatingNote } from "../FloatingNote";
import { ParallaxShape, ParallaxText } from "../ParallaxLayer";
import { Cloud, Sun, Umbrella, MapPin, Calendar, Sparkles } from "lucide-react";

const weatherOptions = [
  { icon: Sun, label: "Sunny", value: "sunny" },
  { icon: Cloud, label: "Cloudy", value: "cloudy" },
  { icon: Umbrella, label: "Rainy", value: "rainy" },
];

const eventOptions = [
  { label: "Casual day", value: "casual" },
  { label: "Date night", value: "date" },
  { label: "Work meeting", value: "work" },
  { label: "Weekend brunch", value: "brunch" },
];

const outfitSuggestions = [
  {
    name: "Effortless Chic",
    items: ["Cream linen blazer", "Black fitted tee", "High-waisted jeans", "White sneakers"],
    reason: "The linen blazer you bought last spring pairs perfectly with your favorite jeans",
    colors: ["bg-amber-100", "bg-gray-900", "bg-blue-800", "bg-gray-100"],
  },
  {
    name: "Smart Casual",
    items: ["Navy knit sweater", "Tailored chinos", "Brown loafers", "Leather watch"],
    reason: "This sweater hasn't been worn in 3 weeks - time to bring it back!",
    colors: ["bg-blue-900", "bg-stone-400", "bg-amber-700", "bg-gray-800"],
  },
  {
    name: "Bold Statement",
    items: ["Rust oversized shirt", "Wide leg pants", "Gold hoops", "Platform sandals"],
    reason: "The rust color complements your skin tone beautifully",
    colors: ["bg-orange-700", "bg-stone-200", "bg-yellow-500", "bg-amber-900"],
  },
];

export const StylingDemo = () => {
  const [selectedWeather, setSelectedWeather] = useState("sunny");
  const [selectedEvent, setSelectedEvent] = useState("casual");
  const [showOutfits, setShowOutfits] = useState(false);
  const [prompt, setPrompt] = useState("");

  const handleGenerate = () => {
    setShowOutfits(true);
  };

  return (
    <section className="py-24 px-6 lg:px-12 relative overflow-hidden">
      {/* Background with parallax */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-pink/5 to-background" />
      
      {/* Parallax shapes */}
      <ParallaxShape 
        shape="circle" 
        size={250} 
        color="hsl(var(--pink) / 0.1)" 
        speed={0.3}
        className="top-10 -right-20"
      />
      <ParallaxShape 
        shape="blob" 
        size={200} 
        color="hsl(var(--secondary) / 0.15)" 
        speed={-0.4}
        className="bottom-20 -left-20"
      />
      <ParallaxShape 
        shape="square" 
        size={80} 
        color="hsl(var(--accent) / 0.1)" 
        speed={0.5}
        className="top-1/3 left-10"
      />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header with parallax text */}
        <ParallaxText direction="up" className="text-center mb-16">
          <span className="font-handwritten text-2xl text-primary">How it works</span>
          <h2 className="font-display text-4xl md:text-6xl font-bold mt-2">
            Style me, Wardo
          </h2>
          <p className="text-xl text-muted-foreground mt-4 max-w-2xl mx-auto">
            Tell us the occasion, and we'll suggest outfits from your actual wardrobe.
          </p>
        </ParallaxText>

        {/* Interactive demo area */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Input controls */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Prompt input */}
            <div className="space-y-3">
              <label className="font-handwritten text-xl text-muted-foreground flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                What's the vibe?
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., Something cozy but put-together..."
                  className="w-full px-6 py-4 text-lg bg-card border-2 border-border rounded-lg focus:border-primary focus:outline-none transition-colors font-sans"
                />
                <motion.div
                  className="absolute -top-2 -right-2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1, type: "spring" }}
                >
                  <FloatingNote rotation={8} color="yellow" className="text-base px-2 py-1">
                    optional!
                  </FloatingNote>
                </motion.div>
              </div>
            </div>

            {/* Weather selector */}
            <div className="space-y-3">
              <label className="font-handwritten text-xl text-muted-foreground flex items-center gap-2">
                <Cloud className="w-5 h-5 text-accent" />
                Weather today
              </label>
              <div className="flex flex-wrap gap-3">
                {weatherOptions.map((option) => (
                  <motion.button
                    key={option.value}
                    onClick={() => setSelectedWeather(option.value)}
                    className={`flex items-center gap-2 px-5 py-3 rounded-lg border-2 transition-all ${
                      selectedWeather === option.value
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-card hover:border-muted-foreground"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <option.icon className="w-5 h-5" />
                    <span className="font-medium">{option.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Event selector */}
            <div className="space-y-3">
              <label className="font-handwritten text-xl text-muted-foreground flex items-center gap-2">
                <Calendar className="w-5 h-5 text-secondary-foreground" />
                What's the occasion?
              </label>
              <div className="flex flex-wrap gap-3">
                {eventOptions.map((option) => (
                  <motion.button
                    key={option.value}
                    onClick={() => setSelectedEvent(option.value)}
                    className={`px-5 py-3 rounded-lg border-2 transition-all ${
                      selectedEvent === option.value
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-card hover:border-muted-foreground"
                    }`}
                    whileHover={{ scale: 1.02, rotate: 1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="font-medium">{option.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Location (display only) */}
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-5 h-5" />
              <span className="font-handwritten text-lg">Mumbai, India • 28°C</span>
            </div>

            {/* Generate button */}
            <InteractiveButton
              variant="primary"
              size="lg"
              onClick={handleGenerate}
              className="w-full"
            >
              ✨ Style me!
            </InteractiveButton>
          </motion.div>

          {/* Right: Outfit suggestions */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {!showOutfits ? (
              <div className="h-96 flex items-center justify-center border-2 border-dashed border-border rounded-xl bg-muted/30">
                <div className="text-center text-muted-foreground">
                  <div className="font-handwritten text-3xl mb-2">Your outfits will appear here</div>
                  <p className="text-sm">Click "Style me!" to see the magic ✨</p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {outfitSuggestions.map((outfit, index) => (
                  <motion.div
                    key={outfit.name}
                    initial={{ opacity: 0, y: 30, rotate: -2 }}
                    animate={{ opacity: 1, y: 0, rotate: index % 2 === 0 ? -1 : 1 }}
                    transition={{ delay: index * 0.15, duration: 0.5 }}
                    className="bg-card p-6 rounded-xl shadow-lifted border border-border hover:shadow-playful transition-shadow cursor-pointer group"
                    whileHover={{ scale: 1.02, rotate: 0 }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="font-display text-xl font-semibold">{outfit.name}</h3>
                      <div className="flex gap-1">
                        {outfit.colors.map((color, i) => (
                          <div key={i} className={`w-4 h-4 rounded-full ${color}`} />
                        ))}
                      </div>
                    </div>
                    
                    <ul className="space-y-2 mb-4">
                      {outfit.items.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-muted-foreground">
                          <span className="w-2 h-2 rounded-full bg-primary" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    
                    <div className="pt-4 border-t border-border">
                      <p className="font-handwritten text-lg text-primary flex items-start gap-2">
                        <span className="text-2xl">💡</span>
                        {outfit.reason}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
