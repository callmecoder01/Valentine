"use client";

import { useState, useRef, useEffect, useCallback } from "react";

// Floating Heart Component
function FloatingHeart({ delay, left, size }: { delay: number; left: number; size: number }) {
  return (
    <div
      className="absolute text-pink-400 opacity-60 animate-float-up pointer-events-none"
      style={{
        left: `${left}%`,
        animationDelay: `${delay}s`,
        fontSize: `${size}rem`,
        bottom: "-10%",
      }}
    >
      ❤️
    </div>
  );
}

// Confetti Component
function Confetti() {
  const colors = ["#ec4899", "#f43f5e", "#fb7185", "#fda4af", "#fecdd3", "#ff6b6b", "#ee5a5a"];
  const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 3,
    duration: 3 + Math.random() * 2,
    color: colors[Math.floor(Math.random() * colors.length)],
    size: 8 + Math.random() * 12,
    type: Math.random() > 0.5 ? "❤️" : Math.random() > 0.5 ? "💕" : "✨",
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {confettiPieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute"
          style={{
            left: `${piece.left}%`,
            top: "-20px",
            fontSize: `${piece.size}px`,
            animation: `confetti ${piece.duration}s ease-in-out ${piece.delay}s infinite`,
          }}
        >
          {piece.type}
        </div>
      ))}
    </div>
  );
}

// Sparkle Effect
function Sparkles() {
  const sparkles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 2,
    size: 10 + Math.random() * 20,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute text-yellow-300"
          style={{
            left: `${sparkle.left}%`,
            top: `${sparkle.top}%`,
            fontSize: `${sparkle.size}px`,
            animation: `sparkle 2s ease-in-out ${sparkle.delay}s infinite`,
          }}
        >
          ✨
        </div>
      ))}
    </div>
  );
}

// Main Component
export default function ValentinePage() {
  const [accepted, setAccepted] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [showHearts, setShowHearts] = useState(true);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate floating hearts
  const floatingHearts = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    delay: i * 1,
    left: Math.random() * 100,
    size: 1.5 + Math.random() * 2,
  }));

  // Handle mouse movement for magnetic repulsion
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!noButtonRef.current || !containerRef.current || accepted) return;

    const button = noButtonRef.current;
    const container = containerRef.current;
    const buttonRect = button.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const buttonCenterX = buttonRect.left + buttonRect.width / 2;
    const buttonCenterY = buttonRect.top + buttonRect.height / 2;

    const distanceX = e.clientX - buttonCenterX;
    const distanceY = e.clientY - buttonCenterY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    const repulsionRadius = 150;

    if (distance < repulsionRadius) {
      const repulsionStrength = (repulsionRadius - distance) / repulsionRadius;
      const moveX = -(distanceX / distance) * repulsionStrength * 120;
      const moveY = -(distanceY / distance) * repulsionStrength * 120;

      // Calculate boundaries
      const maxX = (containerRect.width - buttonRect.width) / 2 - 20;
      const maxY = (containerRect.height - buttonRect.height) / 2 - 20;

      // Apply bounded position
      const newX = Math.max(-maxX, Math.min(maxX, noButtonPosition.x + moveX));
      const newY = Math.max(-maxY, Math.min(maxY, noButtonPosition.y + moveY));

      setNoButtonPosition({ x: newX, y: newY });
    }
  }, [noButtonPosition, accepted]);

  // Reset no button position periodically
  useEffect(() => {
    if (accepted) return;

    const interval = setInterval(() => {
      setNoButtonPosition(prev => ({
        x: prev.x * 0.95,
        y: prev.y * 0.95
      }));
    }, 100);

    return () => clearInterval(interval);
  }, [accepted]);

  const handleYesClick = () => {
    setAccepted(true);
    setShowHearts(true);
  };

  if (accepted) {
    return (
      <div className="min-h-screen celebration-gradient flex flex-col items-center justify-center relative overflow-hidden">
        {/* Confetti and Sparkles */}
        <Confetti />
        <Sparkles />

        {/* Background Hearts */}
        {floatingHearts.map((heart) => (
          <FloatingHeart key={heart.id} delay={heart.delay} left={heart.left} size={heart.size} />
        ))}

        {/* Main Content */}
        <div className="relative z-10 text-center px-4">
          {/* Big Heart */}
          <div className="text-9xl md:text-[12rem] animate-heartbeat mb-8">
            💖
          </div>

          {/* Celebration Message */}
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <span className="gradient-text">Yay! Best Decision</span>
          </h1>

          <h2
            className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8 animate-fade-in-up text-pink-600"
            style={{ animationDelay: "0.4s" }}
          >
            your My Life! 💕
          </h2>

          <p
            className="text-xl md:text-2xl text-pink-700 mb-8 animate-fade-in-up max-w-2xl mx-auto"
            style={{ animationDelay: "0.6s" }}
          >
            You just made me the happiest person in the world!
            <br />
            Can&apos;t wait to spend this Valentine&apos;s Day with you! 🌹
          </p>

          {/* Love Message Cards */}
          <div
            className="flex flex-wrap justify-center gap-4 mb-8 animate-fade-in-up"
            style={{ animationDelay: "0.8s" }}
          >
            {["Forever Yours", "My Heart", "My Love", "My Everything"].map((text, i) => (
              <div
                key={i}
                className="glass-effect px-6 py-3 rounded-full text-pink-700 font-semibold animate-bounce-slow"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                {text} 💗
              </div>
            ))}
          </div>

          {/* Big Heart Animation */}
          <div
            className="flex justify-center gap-2 text-4xl md:text-6xl animate-fade-in-up"
            style={{ animationDelay: "1s" }}
          >
            <span className="animate-pulse-heart" style={{ animationDelay: "0s" }}>❤️</span>
            <span className="animate-pulse-heart" style={{ animationDelay: "0.2s" }}>💕</span>
            <span className="animate-pulse-heart" style={{ animationDelay: "0.4s" }}>💖</span>
            <span className="animate-pulse-heart" style={{ animationDelay: "0.6s" }}>💕</span>
            <span className="animate-pulse-heart" style={{ animationDelay: "0.8s" }}>❤️</span>
          </div>

          {/* Romantic Quote */}
          <p
            className="mt-12 text-lg md:text-xl text-pink-600 italic animate-fade-in-up max-w-xl mx-auto"
            style={{ animationDelay: "1.2s" }}
          >
            &quot;In all the world, there is no heart for me like yours.
            In all the world, there is no love for you like mine.&quot;
          </p>
        </div>

        {/* Floating Hearts Border */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-around text-3xl md:text-5xl">
          {["🌹", "💐", "🌷", "💝", "🌹", "💐", "🌷", "💝"].map((flower, i) => (
            <span
              key={i}
              className="animate-bounce-slow"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              {flower}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen romantic-gradient flex flex-col items-center justify-center relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Floating Hearts Background */}
      {showHearts && floatingHearts.map((heart) => (
        <FloatingHeart key={heart.id} delay={heart.delay} left={heart.left} size={heart.size} />
      ))}

      {/* Sparkles */}
      <Sparkles />

      {/* Main Card */}
      <div className="relative z-10 text-center px-4">
        {/* Heart Icon */}
        <div className="text-7xl md:text-8xl animate-heartbeat mb-6">
          💝
        </div>

        {/* Question */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
          <span className="gradient-text">Will You Be</span>
        </h1>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-12">
          <span className="gradient-text">My Valentine?</span>
        </h1>

        {/* Decorative Hearts */}
        <div className="flex justify-center gap-3 mb-12 text-2xl md:text-3xl">
          <span className="animate-pulse-heart">💕</span>
          <span className="animate-pulse-heart" style={{ animationDelay: "0.3s" }}>💖</span>
          <span className="animate-pulse-heart" style={{ animationDelay: "0.6s" }}>💕</span>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative min-h-[120px]">
          {/* Yes Button */}
          <button
            onClick={handleYesClick}
            className="px-12 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xl md:text-2xl font-bold rounded-full shadow-lg transform transition-all duration-300 hover:scale-110 hover:shadow-2xl animate-glow"
          >
            Yes! 💖
          </button>

          {/* No Button - Runs Away */}
          <button
            ref={noButtonRef}
            className="px-12 py-4 bg-gray-300 text-gray-600 text-xl md:text-2xl font-bold rounded-full shadow-lg transition-all duration-100 hover:bg-gray-400"
            style={{
              transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`,
              position: "relative",
            }}
            onClick={() => {
              // Even if they somehow click it, just move it away
              setNoButtonPosition({
                x: (Math.random() - 0.5) * 300,
                y: (Math.random() - 0.5) * 200,
              });
            }}
          >
            No 😢
          </button>
        </div>

        {/* Hint Text */}
        <p className="mt-8 text-pink-600 text-lg animate-bounce-slow">
          Go ahead, try clicking No... 😏
        </p>
      </div>

      {/* Bottom Decoration */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 text-2xl">
        <span className="animate-float" style={{ animationDelay: "0s" }}>🌹</span>
        <span className="animate-float" style={{ animationDelay: "0.5s" }}>💐</span>
        <span className="animate-float" style={{ animationDelay: "1s" }}>🌷</span>
      </div>
    </div>
  );
}
