import { motion } from "framer-motion";
import { useState } from "react";
import { InteractiveButton } from "../InteractiveButton";
import { FloatingNote } from "../FloatingNote";
import { Camera, User, Ruler, Heart, Shield } from "lucide-react";

export const AvatarDemo = () => {
  const [step, setStep] = useState(0);
  const [measurements, setMeasurements] = useState({
    height: 170,
    chest: 90,
    waist: 75,
    hips: 95,
  });

  const steps = [
    { title: "Upload a photo", icon: Camera, description: "Take a full-body photo in fitted clothing" },
    { title: "We create your avatar", icon: User, description: "Your personal, body-positive representation" },
    { title: "Fine-tune if needed", icon: Ruler, description: "Adjust measurements for perfect fit predictions" },
  ];

  return (
    <section className="py-24 px-6 lg:px-12 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-background to-pink/10" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-handwritten text-2xl text-accent">The magic part</span>
          <h2 className="font-display text-4xl md:text-6xl font-bold mt-2">
            Your virtual fitting room
          </h2>
          <p className="text-xl text-muted-foreground mt-4 max-w-2xl mx-auto">
            See how clothes will look on you before you buy. No more sizing surprises.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Process steps */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {steps.map((stepItem, index) => (
              <motion.div
                key={stepItem.title}
                className={`flex items-start gap-4 p-6 rounded-xl transition-all cursor-pointer ${
                  step === index
                    ? "bg-card shadow-lifted border-2 border-primary"
                    : "bg-transparent border-2 border-transparent hover:bg-card/50"
                }`}
                onClick={() => setStep(index)}
                whileHover={{ x: 5 }}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  step === index ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}>
                  <stepItem.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-handwritten text-lg text-muted-foreground">Step {index + 1}</span>
                  </div>
                  <h3 className="font-display text-xl font-semibold mt-1">{stepItem.title}</h3>
                  <p className="text-muted-foreground mt-1">{stepItem.description}</p>
                </div>
              </motion.div>
            ))}

            {/* Body-positive note */}
            <motion.div
              className="flex items-start gap-3 p-4 bg-pink/10 rounded-xl border border-pink/30"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            >
              <Heart className="w-6 h-6 text-pink flex-shrink-0 mt-1" />
              <div>
                <p className="font-medium text-foreground">Every body is beautiful</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Wardo celebrates all body types. Our avatars are designed to be respectful, 
                  approachable, and never hyper-realistic.
                </p>
              </div>
            </motion.div>

            {/* Privacy note */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="w-4 h-4" />
              <span>Your photos are processed on-device. We never store your images.</span>
            </div>
          </motion.div>

          {/* Right: Avatar preview */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="relative bg-card rounded-2xl p-8 shadow-lifted">
              {/* Avatar illustration area */}
              <div className="aspect-[3/4] bg-gradient-to-b from-muted to-muted/50 rounded-xl flex items-center justify-center relative overflow-hidden">
                <motion.div
                  className="text-center"
                  key={step}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  {step === 0 && (
                    <div className="space-y-4">
                      <div className="w-24 h-24 mx-auto rounded-full bg-border flex items-center justify-center">
                        <Camera className="w-12 h-12 text-muted-foreground" />
                      </div>
                      <p className="font-handwritten text-xl text-muted-foreground">Upload placeholder</p>
                      <InteractiveButton variant="secondary" size="sm">
                        Choose photo
                      </InteractiveButton>
                    </div>
                  )}
                  {step === 1 && (
                    <div className="space-y-4">
                      <motion.div
                        className="w-40 h-56 mx-auto bg-gradient-to-b from-secondary to-secondary/50 rounded-full relative"
                        animate={{ scale: [0.98, 1.02, 0.98] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <div className="absolute inset-4 rounded-full border-2 border-dashed border-secondary-foreground/30" />
                        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-card" />
                      </motion.div>
                      <p className="font-handwritten text-xl text-secondary-foreground">Your avatar preview</p>
                    </div>
                  )}
                  {step === 2 && (
                    <div className="space-y-6 w-full px-8">
                      <p className="font-handwritten text-xl text-muted-foreground">Fine-tune your fit</p>
                      {Object.entries(measurements).map(([key, value]) => (
                        <div key={key} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="capitalize text-muted-foreground">{key}</span>
                            <span className="font-medium">{value} cm</span>
                          </div>
                          <input
                            type="range"
                            min={key === "height" ? 140 : 60}
                            max={key === "height" ? 200 : 150}
                            value={value}
                            onChange={(e) => setMeasurements(prev => ({ ...prev, [key]: parseInt(e.target.value) }))}
                            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </div>

              {/* Floating annotations */}
              <FloatingNote
                rotation={-5}
                color="accent"
                className="absolute -top-4 -right-4 text-base px-3 py-2"
              >
                Try it! →
              </FloatingNote>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
