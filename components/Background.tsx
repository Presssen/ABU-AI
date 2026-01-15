import React, { useEffect, useState } from 'react';

const Background = () => {
  // Generate random particles for the floating effect
  const [particles, setParticles] = useState<Array<{ id: number; left: string; delay: string; duration: string }>>([]);

  useEffect(() => {
    const particleCount = 20; // Number of floating particles
    const newParticles = Array.from({ length: particleCount }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${10 + Math.random() * 20}s`, // Slow movement between 10s and 30s
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden -z-10 bg-[#0f172a]">
      {/* 1. Noise Overlay for Texture (Premium Feel) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-50 mix-blend-overlay" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>

      {/* 2. Gradient Blobs - Adjusted for Mobile Activity */}
      <div className="absolute top-0 left-0 w-full h-full">
        {/* Top Left - Blue/Indigo */}
        <div className="absolute -top-[10%] -left-[10%] w-[90vw] h-[90vw] md:w-[50vw] md:h-[50vw] bg-blue-600/30 rounded-full blur-[80px] md:blur-[120px] animate-blob mix-blend-screen"></div>
        
        {/* Bottom Right - Purple */}
        <div className="absolute top-[20%] -right-[10%] w-[80vw] h-[80vw] md:w-[45vw] md:h-[45vw] bg-purple-600/30 rounded-full blur-[80px] md:blur-[120px] animate-blob animation-delay-2000 mix-blend-screen"></div>
        
        {/* Bottom Left - Cyan/Teal Accent */}
        <div className="absolute -bottom-[10%] -left-[10%] w-[80vw] h-[80vw] md:w-[50vw] md:h-[50vw] bg-cyan-600/20 rounded-full blur-[80px] md:blur-[120px] animate-blob animation-delay-4000 mix-blend-screen"></div>

        {/* Center/Mobile Focus - A specific blob that moves through the center on mobile */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-indigo-500/20 rounded-full blur-[60px] animate-pulse-slow md:hidden"></div>
      </div>

      {/* 3. Floating Particles */}
      <div className="absolute inset-0">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute bottom-[-20px] w-1 h-1 md:w-1.5 md:h-1.5 bg-white rounded-full animate-float"
            style={{
              left: p.left,
              animationDelay: p.delay,
              animationDuration: p.duration,
              opacity: 0.2 + Math.random() * 0.3, // Random opacity between 0.2 and 0.5
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes float {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: var(--opacity, 0.5); }
          90% { opacity: var(--opacity, 0.5); }
          100% { transform: translateY(-110vh) translateX(20px); opacity: 0; }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.4; transform: translate(-50%, -50%) scale(1.2); }
        }
        .animate-blob {
          animation: blob 20s infinite alternate cubic-bezier(0.4, 0, 0.2, 1);
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-float {
          animation-name: float;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s infinite cubic-bezier(0.4, 0, 0.6, 1);
        }
      `}</style>
    </div>
  );
};

export default Background;