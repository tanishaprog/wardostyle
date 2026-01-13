import { motion } from "framer-motion";
import { FloatingNote } from "../FloatingNote";
import { ScribbleArrow } from "../ScribbleArrow";

const painPoints = [
  {
    crossed: true,
    text: "Buying clothes that don't fit",
    note: "38% of online orders are returned",
    color: "destructive" as const,
  },
  {
    crossed: true,
    text: "Wearing the same 5 outfits",
    note: "We forget 80% of our wardrobe",
    color: "destructive" as const,
  },
  {
    crossed: true,
    text: "I have nothing to wear!",
    note: "Said everyone, ever",
    color: "destructive" as const,
  },
  {
    crossed: false,
    text: "Actually using what you own",
    note: "That's the Wardo way ✨",
    color: "primary" as const,
  },
];

export const WhyWardo = () => {
  return (
    <section className="py-24 px-6 lg:px-12 relative overflow-hidden">
      {/* Paper texture background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-muted/30" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Handwritten header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-handwritten text-3xl text-muted-foreground block mb-4">
            A note from the founders
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-bold">
            Why we built Wardo
          </h2>
        </motion.div>

        {/* Pain points list */}
        <div className="space-y-8 mb-16 max-w-2xl mx-auto">
          {painPoints.map((point, index) => (
            <motion.div
              key={point.text}
              className="relative"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
            >
              <div className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  point.crossed ? "bg-muted" : "bg-primary"
                }`}>
                  {point.crossed ? (
                    <span className="text-muted-foreground">✕</span>
                  ) : (
                    <span className="text-primary-foreground">✓</span>
                  )}
                </div>
                <div className="relative">
                  <span className={`font-display text-2xl md:text-3xl ${
                    point.crossed ? "text-muted-foreground" : "text-foreground font-semibold"
                  }`}>
                    {point.text}
                  </span>
                  {point.crossed && (
                    <motion.div
                      className="absolute top-1/2 left-0 right-0 h-0.5 bg-destructive"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 + 0.3, duration: 0.3 }}
                      style={{ transformOrigin: "left" }}
                    />
                  )}
                </div>
              </div>
              <motion.div
                className="ml-12 mt-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 + 0.4 }}
              >
                <span className="font-handwritten text-lg text-muted-foreground">
                  {point.note}
                </span>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Founder's story */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-card p-8 md:p-12 rounded-xl shadow-lifted relative">
            {/* Decorative tape */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-yellow/80 rotate-1" />
            
            <div className="space-y-6 font-handwritten text-xl md:text-2xl leading-relaxed text-foreground">
              <p>
                We started Wardo because we were tired of the same story:
              </p>
              <p className="text-muted-foreground">
                <span className="text-primary">"Full closet, nothing to wear."</span>
                <br />
                Endless scrolling. Clothes that looked nothing like the photos. 
                Returns piling up like regrets.
              </p>
              <p>
                Fashion should feel good — both wearing it and buying it.
              </p>
              <p>
                So we built a second brain that remembers your wardrobe, 
                understands your body, and actually helps you style what you already own.
              </p>
              <p className="text-primary">
                No more closet blindness. No more sizing surprises.
                <br />
                Just you, looking great, with less effort.
              </p>
            </div>

            {/* Signature */}
            <div className="mt-8 pt-6 border-t border-border">
              <p className="font-handwritten text-2xl text-primary">— The Wardo Team</p>
            </div>

            {/* Decorative notes */}
            <FloatingNote
              rotation={12}
              color="secondary"
              className="absolute -right-4 top-20 text-base px-3 py-2 hidden lg:block"
            >
              This was our aha moment ↓
            </FloatingNote>
          </div>

          {/* Arrow pointing to CTA */}
          <div className="flex justify-center mt-12">
            <ScribbleArrow direction="down" delay={0.8} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
