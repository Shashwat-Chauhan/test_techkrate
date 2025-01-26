import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import MovalLogo from "../assets/image/MovalLogo.png";
import CARSLogo from "../assets/image/CARSLogo.jpg";
import MovalBG from "../assets/image/MovalBG.webp";
import CarsBG from "../assets/image/CarsBG.webp";

const ProductCard = ({ name, logo, description, background, to }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;

    const enterAnimation = gsap.to(card, {
      scale: 1.02,
      duration: 0.3,
      ease: "power2.out",
      paused: true
    });

    card.addEventListener("mouseenter", () => enterAnimation.play());
    card.addEventListener("mouseleave", () => enterAnimation.reverse());

    return () => {
      card.removeEventListener("mouseenter", () => enterAnimation.play());
      card.removeEventListener("mouseleave", () => enterAnimation.reverse());
    };
  }, []);

  return (
    <Link 
      to={to}
      ref={cardRef}
      className="relative group overflow-hidden rounded-2xl aspect-[4/5] transition-all duration-300"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
        style={{ 
          backgroundImage: `url(${background})`,
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70" />

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-between p-8 text-white">
        {/* Top Section */}
        <h3 className="text-2xl md:text-5xl font-bold tracking-tight font-Helix">
          {name}
        </h3>

        {/* Center Logo */}
        <div className="w-full h-full rounded-2xl p-4 flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110">
          <img 
            src={logo} 
            alt={`${name} logo`} 
            className="w-3/4 h-full object-contain"
          />
        </div>

        {/* Bottom Description */}
        <p className="text-sm md:text-xl text-center max-w-xs font-medium font-Helix">
          {description}
        </p>
      </div>
    </Link>
  );
};

const Products = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      containerRef.current.children,
      { 
        y: 100,
        opacity: 0 
      },
      { 
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      }
    );
  }, []);

  return (
    <div className="min-h-screen w-full bg-black flex flex-col items-center py-16 px-4">
      <h1 className="text-5xl md:text-7xl text-white font-Helix text-center mb-16">
        Products
      </h1>
      <div 
        ref={containerRef}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl"
      >
        <ProductCard 
          name="Cars" 
          logo={CARSLogo}
          background={CarsBG}
          to="/products/cars"
          description="A Hybrid platform for chartered engineers enabling consignment assessment, report generation & admin tasks on the move."
        />
        <ProductCard 
          name="Moval" 
          logo={MovalLogo}
          background={MovalBG}
          to="/products/moval"
          description="An AI-powered cloud platform revolutionizing motor surveys through seamless automation & intelligent data analysis."
        />
      </div>
    </div>
  );
};

export default Products;

