import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
}

interface ParticleFieldProps {
  count?: number;
  colors?: string[];
  className?: string;
}

export const ParticleField = ({
  count = 30,
  colors = ["hsl(var(--primary))", "hsl(var(--accent))", "hsl(var(--secondary))"],
  className = "",
}: ParticleFieldProps) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 8 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        duration: Math.random() * 20 + 15,
        delay: Math.random() * 5,
      });
    }
    setParticles(newParticles);
  }, [count, colors]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full opacity-20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Sparkle effect for buttons and interactive elements
export const Sparkles = ({ className = "" }: { className?: string }) => {
  const sparkles = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    delay: i * 0.1,
    x: Math.random() * 100,
    y: Math.random() * 100,
  }));

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute w-1 h-1 bg-primary rounded-full"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1.5,
            delay: sparkle.delay,
            repeat: Infinity,
            repeatDelay: 2,
          }}
        />
      ))}
    </div>
  );
};

// Confetti burst effect
export const ConfettiBurst = ({ trigger }: { trigger: boolean }) => {
  const confettiPieces = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    color: ["hsl(var(--primary))", "hsl(var(--accent))", "hsl(var(--secondary))", "#FF6B6B", "#4ECDC4"][
      Math.floor(Math.random() * 5)
    ],
    angle: (360 / 20) * i,
    velocity: Math.random() * 100 + 50,
  }));

  if (!trigger) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {confettiPieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute left-1/2 top-1/2 w-2 h-2 rounded-sm"
          style={{ backgroundColor: piece.color }}
          initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
          animate={{
            x: Math.cos((piece.angle * Math.PI) / 180) * piece.velocity,
            y: Math.sin((piece.angle * Math.PI) / 180) * piece.velocity + 100,
            rotate: Math.random() * 720,
            opacity: 0,
          }}
          transition={{
            duration: 1.5,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
};
