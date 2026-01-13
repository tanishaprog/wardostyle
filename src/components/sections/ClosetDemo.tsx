import { motion } from "framer-motion";
import { useState } from "react";
import { PolaroidCard } from "../PolaroidCard";
import { FloatingNote } from "../FloatingNote";
import { Upload, Tag, Palette, Shirt, Check } from "lucide-react";

const mockClothingItems = [
  { id: 1, name: "White Cotton Tee", category: "Tops", color: "#FFFFFF", image: "👕" },
  { id: 2, name: "Navy Blazer", category: "Outerwear", color: "#1E3A5F", image: "🧥" },
  { id: 3, name: "Black Jeans", category: "Bottoms", color: "#1A1A1A", image: "👖" },
  { id: 4, name: "Floral Dress", category: "Dresses", color: "#F9A8D4", image: "👗" },
  { id: 5, name: "Sneakers", category: "Footwear", color: "#E5E5E5", image: "👟" },
  { id: 6, name: "Leather Bag", category: "Accessories", color: "#8B4513", image: "👜" },
];

const categories = ["All", "Tops", "Bottoms", "Outerwear", "Dresses", "Footwear", "Accessories"];

export const ClosetDemo = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [uploadedItems, setUploadedItems] = useState(mockClothingItems);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showUploadHint, setShowUploadHint] = useState(true);

  const filteredItems = selectedCategory === "All" 
    ? uploadedItems 
    : uploadedItems.filter(item => item.category === selectedCategory);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setShowUploadHint(false);
    
    // Simulate processing
    setTimeout(() => {
      setUploadedItems(prev => [
        ...prev,
        {
          id: prev.length + 1,
          name: "New Item",
          category: "Tops",
          color: "#7C9885",
          image: "🧶",
        },
      ]);
      setIsProcessing(false);
    }, 1500);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <section className="py-24 px-6 lg:px-12 bg-gradient-to-b from-background via-secondary/10 to-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-handwritten text-2xl text-secondary-foreground">Your digital wardrobe</span>
          <h2 className="font-display text-4xl md:text-6xl font-bold mt-2">
            Every piece, organized
          </h2>
          <p className="text-xl text-muted-foreground mt-4 max-w-2xl mx-auto">
            Drag & drop photos of your clothes. Wardo automatically categorizes them.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Upload area */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className={`h-72 border-3 border-dashed rounded-xl flex flex-col items-center justify-center transition-all cursor-pointer ${
                isProcessing
                  ? "border-primary bg-primary/10"
                  : "border-border bg-card hover:border-primary hover:bg-primary/5"
              }`}
            >
              {isProcessing ? (
                <motion.div
                  className="text-center"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Shirt className="w-12 h-12 text-primary mx-auto" />
                  </motion.div>
                  <p className="font-handwritten text-xl text-primary mt-4">Processing...</p>
                </motion.div>
              ) : (
                <>
                  <Upload className="w-12 h-12 text-muted-foreground mb-4" />
                  <p className="font-medium text-foreground">Drop clothing photos here</p>
                  <p className="text-sm text-muted-foreground mt-1">or click to upload</p>
                </>
              )}
            </div>

            {showUploadHint && (
              <motion.div
                className="mt-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                <FloatingNote rotation={-2} color="yellow" className="text-base">
                  Try dragging an image! (simulated)
                </FloatingNote>
              </motion.div>
            )}

            {/* Auto-categorization info */}
            <motion.div
              className="mt-8 space-y-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  <Tag className="w-5 h-5 text-secondary-foreground" />
                </div>
                <div>
                  <p className="font-medium text-sm">Auto-tagging</p>
                  <p className="text-xs text-muted-foreground">Categories detected automatically</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                  <Palette className="w-5 h-5 text-accent-foreground" />
                </div>
                <div>
                  <p className="font-medium text-sm">Color extraction</p>
                  <p className="text-xs text-muted-foreground">Dominant colors saved for matching</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Closet grid */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Category filters */}
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>

            {/* Clothing grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {filteredItems.map((item, index) => (
                <PolaroidCard
                  key={item.id}
                  rotation={(index % 3 - 1) * 3}
                  delay={index * 0.1}
                  className="relative group"
                >
                  <div className="aspect-square bg-muted rounded-lg flex items-center justify-center text-6xl relative overflow-hidden">
                    {item.image}
                    <div
                      className="absolute bottom-2 right-2 w-6 h-6 rounded-full border-2 border-card"
                      style={{ backgroundColor: item.color }}
                    />
                  </div>
                  <div className="mt-3 space-y-1">
                    <p className="font-medium text-sm truncate">{item.name}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-0.5 bg-muted rounded-full text-muted-foreground">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  {/* Hover overlay */}
                  <motion.div
                    className="absolute inset-0 bg-charcoal/80 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                    initial={false}
                  >
                    <div className="text-center text-primary-foreground">
                      <Check className="w-8 h-8 mx-auto mb-2" />
                      <p className="font-handwritten text-lg">Edit tags</p>
                    </div>
                  </motion.div>
                </PolaroidCard>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
