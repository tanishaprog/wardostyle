import { motion } from "framer-motion";
import { useState } from "react";
import { MagneticButton } from "../MagneticButton";
import { FloatingNote } from "../FloatingNote";
import { ConfettiBurst, Sparkles as SparklesEffect } from "../ParticleField";
import { Mail, Heart, Sparkles, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const WaitlistCTA = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);
    
    const { error } = await supabase
      .from('waitlist')
      .insert({ email: email.trim().toLowerCase() });

    if (error) {
      if (error.code === '23505') {
        // Duplicate email
        toast({
          title: "Already on the list!",
          description: "This email is already on our waitlist.",
        });
      } else {
        toast({
          title: "Oops!",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
      setIsSubmitting(false);
      return;
    }

    setShowConfetti(true);
    setTimeout(() => setSubmitted(true), 500);
    setIsSubmitting(false);
  };

  return (
    <section className="py-24 px-6 lg:px-12 relative overflow-hidden">
      {/* Warm gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-pink/10" />
      
      {/* Decorative elements */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 rounded-full bg-yellow/20 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-secondary/30 blur-3xl"
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, delay: 1 }}
      />

      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Coming soon</span>
          </motion.div>

          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            Ready to meet your
            <br />
            <span className="gradient-text">fashion brain?</span>
          </h2>

          <p className="text-xl text-muted-foreground mt-6 max-w-xl mx-auto">
            Join the waitlist and be among the first to experience Wardo.
            <br />
            <span className="font-handwritten text-2xl text-primary">No spam, just good vibes.</span>
          </p>

          {/* Email form */}
          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            {!submitted ? (
              <>
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <div className="relative flex-1">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full pl-12 pr-4 py-4 text-lg bg-card border-2 border-border rounded-xl focus:border-primary focus:outline-none transition-colors"
                      required
                    />
                  </div>
                  <MagneticButton 
                    className="relative px-6 py-4 text-lg font-display font-semibold bg-primary text-primary-foreground rounded-xl shadow-playful whitespace-nowrap overflow-hidden"
                  >
                    <SparklesEffect />
                    Join waitlist
                  </MagneticButton>
                </form>
                <ConfettiBurst trigger={showConfetti} />
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-secondary/50 rounded-xl p-8 max-w-md mx-auto"
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-secondary flex items-center justify-center mb-4">
                  <Check className="w-8 h-8 text-secondary-foreground" />
                </div>
                <h3 className="font-display text-2xl font-semibold">You're in!</h3>
                <p className="text-muted-foreground mt-2">
                  We'll reach out when Wardo is ready for you.
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Social proof */}
          <motion.div
            className="mt-12 flex flex-wrap justify-center gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary border-2 border-background"
                  />
                ))}
              </div>
              <span className="text-sm">2,400+ on the waitlist</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              <Heart className="w-4 h-4 text-pink" />
              <span>Made with love in India</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Floating notes */}
        <FloatingNote
          rotation={-8}
          color="yellow"
          className="absolute -left-8 top-32 text-base px-3 py-2 hidden lg:block"
        >
          Early access perks! 🎁
        </FloatingNote>

        <FloatingNote
          rotation={6}
          color="accent"
          className="absolute -right-8 bottom-32 text-base px-3 py-2 hidden lg:block"
        >
          Free for early users
        </FloatingNote>
      </div>
    </section>
  );
};
