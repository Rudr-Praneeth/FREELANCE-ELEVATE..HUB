import CircularGallery from "../components/CircularGallery";
import React, { useState, useEffect } from "react";

const items = [
  {
    image:
      "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1600&auto=format&fit=crop",
    text: "Creative Direction",
  },
  {
    image:
      "https://images.unsplash.com/photo-1529336953121-ad3c9d09d5e1?q=80&w=1600&auto=format&fit=crop",
    text: "Digital Experience",
  },
  {
    image:
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=1600&auto=format&fit=crop",
    text: "Brand Identity",
  },
  {
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1600&auto=format&fit=crop",
    text: "UI Systems",
  },
  {
    image:
      "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1600&auto=format&fit=crop",
    text: "Engineering",
  },
  {
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1600&auto=format&fit=crop",
    text: "Innovation",
  },
  {
    image:
      "https://images.unsplash.com/photo-1492724441997-5dc865305da7?q=80&w=1600&auto=format&fit=crop",
    text: "Strategy",
  },
  {
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop",
    text: "Vision",
  },
];

const CircularImages = () => {
  const [bend, setBend] = useState(2);

  useEffect(() => {
    const updateBend = () => {
      const width = window.innerWidth;
      if (width < 640) setBend(0.8);
      else if (width < 768) setBend(1);
      else if (width < 1024) setBend(1.3);
      else if (width < 1280) setBend(1.6);
      else setBend(2);
    };

    updateBend();
    window.addEventListener("resize", updateBend);
    return () => window.removeEventListener("resize", updateBend);
  }, []);

  return (
    <div className="relative w-full bg-bg-primary 
                    h-[350px] 
                    sm:h-[420px] 
                    md:h-[500px] 
                    lg:h-[500px] 
                    xl:h-[550px]
                    flex items-center justify-center overflow-hidden py-12">
      <CircularGallery
        items={items}
        bend={bend}
        textColor="black"
        borderRadius={0.1}
        scrollEase={0.035}
        scrollSpeed={1.6}
      />
    </div>
  );
};

export default CircularImages;