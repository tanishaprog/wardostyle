import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { InteractiveButton } from "../InteractiveButton";
import { FloatingNote } from "../FloatingNote";
import { Heart, X, Bookmark, Sparkles } from "lucide-react";

const styleQuestions = [
  {
    id: 1,
    image: "🧥",
    title: "Oversized blazer",
    style: "Structured & Powerful",
    colors: ["bg-stone-600", "bg-amber-100"],
  },
  {
    id: 2,
    image: "👗",
    title: "Flowy midi dress",
    style: "Romantic & Feminine",
    colors: ["bg-rose-200", "bg-amber-50"],
  },
  {
    id: 3,
    image: "🧶",
    title: "Chunky knit sweater",
    style: "Cozy & Relaxed",
    colors: ["bg-emerald-700", "bg-amber-100"],
  },
  {
    id: 4,
    image: "👖",
    title: "Wide-leg trousers",
    style: "Minimal & Modern",
    colors: ["bg-stone-800", "bg-stone-200"],
  },
  {
    id: 5,
    image: "🎽",
    title: "Graphic tee",
    style: "Casual & Expressive",
    colors: ["bg-gray-900", "bg-yellow-400"],
  },
];

const savedReferences = [
  { id: 1, emoji: "🌿", label: "Earth tones" },
  { id: 2, emoji: "✨", label: "Quiet luxury" },
  { id: 3, emoji: "🎨", label: "Bold prints" },
];

export const StyleDNA = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [likes, setLikes] = useState<number[]>([]);
  const [dislikes, setDislikes] = useState<number[]>([]);
  const [saved, setSaved] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const currentItem = styleQuestions[currentQuestion];

  const handleLike = () => {
    setLikes([...likes, currentItem.id]);
    nextQuestion();
  };

  const handleDislike = () => {
    setDislikes([...dislikes, currentItem.id]);
    nextQuestion();
  };

  const handleSave = () => {
    setSaved([...saved, currentItem.id]);
    nextQuestion();
  };

  const nextQuestion = () => {
    if (currentQuestion < styleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setLikes([]);
    setDislikes([]);
    setSaved([]);
    setShowResults(false);
  };

  return (
    <section className="py-24 px-6 lg:px-12 relative overflow-hidden bg-gradient-to-b from-background via-yellow/5 to-background">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-handwritten text-2xl text-yellow-foreground">Discover yourself</span>
          <h2 className="font-display text-4xl md:text-6xl font-bold mt-2">
            What's your Style DNA?
          </h2>
          <p className="text-xl text-muted-foreground mt-4 max-w-2xl mx-auto">
            Swipe through styles. We'll learn what makes you, you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Card swiper */}
          <motion.div
            className="relative h-[500px] flex items-center justify-center"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              {!showResults ? (
                <motion.div
                  key={currentQuestion}
                  initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: 100 }}
                  transition={{ duration: 0.4 }}
                  className="w-full max-w-sm"
                >
                  <div className="bg-card rounded-2xl shadow-lifted overflow-hidden">
                    {/* Card content */}
                    <div className="aspect-square bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                      <motion.span
                        className="text-[120px]"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {currentItem.image}
                      </motion.span>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="font-display text-2xl font-semibold">{currentItem.title}</h3>
                      <p className="text-muted-foreground mt-1">{currentItem.style}</p>
                      <div className="flex gap-2 mt-3">
                        {currentItem.colors.map((color, i) => (
                          <div key={i} className={`w-6 h-6 rounded-full ${color}`} />
                        ))}
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex justify-center gap-4 p-6 pt-0">
                      <motion.button
                        onClick={handleDislike}
                        className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <X className="w-8 h-8" />
                      </motion.button>
                      <motion.button
                        onClick={handleSave}
                        className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Bookmark className="w-8 h-8" />
                      </motion.button>
                      <motion.button
                        onClick={handleLike}
                        className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Heart className="w-8 h-8" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="mt-6 flex justify-center gap-2">
                    {styleQuestions.map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          i <= currentQuestion ? "bg-primary" : "bg-muted"
                        }`}
                      />
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  <div className="w-24 h-24 mx-auto rounded-full bg-primary flex items-center justify-center mb-6">
                    <Sparkles className="w-12 h-12 text-primary-foreground" />
                  </div>
                  <h3 className="font-display text-3xl font-bold">Style DNA Complete!</h3>
                  <p className="text-muted-foreground mt-2 text-lg">
                    You liked {likes.length} items • Saved {saved.length} for later
                  </p>
                  <InteractiveButton
                    variant="outline"
                    onClick={resetQuiz}
                    className="mt-6"
                  >
                    Try again
                  </InteractiveButton>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Floating hint */}
            <FloatingNote
              rotation={8}
              color="pink"
              className="absolute -top-4 right-0 text-base px-3 py-2"
            >
              Swipe or tap!
            </FloatingNote>
          </motion.div>

          {/* Right: Saved references */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Chat-like interface */}
            <div className="bg-card rounded-2xl p-6 shadow-soft">
              <div className="space-y-4">
                <motion.div
                  className="flex gap-3"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-handwritten text-lg">
                    W
                  </div>
                  <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3 max-w-xs">
                    <p className="text-sm">Based on your picks, you seem to love earthy tones and relaxed silhouettes! ✨</p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex gap-3 justify-end"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-sm px-4 py-3 max-w-xs">
                    <p className="text-sm">That's so accurate! I love comfort.</p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex gap-3"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1 }}
                >
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-handwritten text-lg">
                    W
                  </div>
                  <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3 max-w-xs">
                    <p className="text-sm">Want to save some Pinterest boards for reference? I can learn from those too!</p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Saved references */}
            <div>
              <h4 className="font-display text-lg font-semibold mb-4">Your style references</h4>
              <div className="flex flex-wrap gap-3">
                {savedReferences.map((ref, i) => (
                  <motion.div
                    key={ref.id}
                    className="flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-border shadow-soft cursor-pointer hover:shadow-lifted transition-shadow"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="text-lg">{ref.emoji}</span>
                    <span className="text-sm font-medium">{ref.label}</span>
                  </motion.div>
                ))}
                <motion.button
                  className="px-4 py-2 border-2 border-dashed border-border rounded-full text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  + Add reference
                </motion.button>
              </div>
            </div>

            {/* Upload Pinterest board */}
            <div className="bg-gradient-to-br from-pink/10 to-accent/10 rounded-xl p-6 border border-pink/20">
              <h4 className="font-display font-semibold mb-2">Import your inspiration</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Paste a Pinterest board link and we'll analyze your aesthetic preferences.
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="pinterest.com/yourboard..."
                  className="flex-1 px-4 py-2 bg-card rounded-lg border border-border focus:border-primary focus:outline-none text-sm"
                />
                <InteractiveButton variant="secondary" size="sm">
                  Import
                </InteractiveButton>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
