export default function LogoMarquee({ speed = 30 }) {
  const logos = [
    "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/0/05/Meta_Platforms_Inc._logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg",
    "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_Bélo.svg",
  ];

  const items = [...logos, ...logos, ...logos];
  return (
    <div className="relative overflow-hidden border-y border-subtle">
      <div className="pointer-events-none absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-bg-primary to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-bg-primary to-transparent z-10" />
      <div
        className="marquee-track flex w-max"
        style={{
          animationDuration: `${speed}s`,
        }}
      >
        {items.map((logo, i) => (
          <div
            key={i}
            className="flex items-center justify-center py-6 flex-shrink-0 mr-12"
          >
            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-bg-surface border border-subtle hover:border-accent transition-all duration-300 hover:accent-glow hover:scale-110">
              <img
                src={logo}
                alt=""
                className="h-8 w-auto opacity-70 hover:opacity-100 transition-all duration-300"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
