export default function Marquee({
  words = ["PREMIUM", "EXPERIENCE", "MODERN", "DIGITAL", "ADVERTISEMENTS"],
  speed = "medium",
}) {
  const speedMap = {
    slow: "40s",
    medium: "25s",
    fast: "15s",
  };

  const duration = speedMap[speed] || "25s";

  const items = [...words, ...words];

  return (
    <div className="overflow-hidden border-y border-white text-white">
      <div
        className="marquee flex w-max whitespace-nowrap"
        style={{ animationDuration: duration }}
      >
        {items.map((word, i) => (
          <span key={i} className="mx-8 text-4xl font-bold">
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}
