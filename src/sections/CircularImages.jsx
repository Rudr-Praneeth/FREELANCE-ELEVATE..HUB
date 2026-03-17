import CircularGallery from "../components/CircularGallery";
import React from "react";

const items = [
  { image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1600&auto=format&fit=crop", text: "Creative Direction" },
  { image: "https://images.unsplash.com/photo-1529336953121-ad3c9d09d5e1?q=80&w=1600&auto=format&fit=crop", text: "Digital Experience" },
  { image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=1600&auto=format&fit=crop", text: "Brand Identity" },
  { image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1600&auto=format&fit=crop", text: "UI Systems" },
  { image: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1600&auto=format&fit=crop", text: "Engineering" },
  { image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1600&auto=format&fit=crop", text: "Innovation" },
  { image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?q=80&w=1600&auto=format&fit=crop", text: "Strategy" },
  { image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop", text: "Vision" }
];

const CircularImages = () => {
  return (
    <div className="relative h-[500px]">
      <CircularGallery
        items={items}
        bend={2}
        textColor="#ffffff"
        borderRadius={0.1}
        scrollEase={0.035}
        scrollSpeed={1.6}
      />
    </div>
  );
};

export default CircularImages;