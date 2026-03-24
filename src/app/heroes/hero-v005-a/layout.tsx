export const metadata = {
  title: "Vom Pixel zur Website — PixIntCreators",
  description:
    "Scroll-driven Pixel-Transformation. Erlebe wie aus einem einzelnen Pixel eine Website entsteht.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Fontshare — Clash Display (headings), Instrument Serif (accents), General Sans (body) */}
      <link
        href="https://api.fontshare.com/v2/css?f[]=clash-display@200,300,400,500,600,700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://api.fontshare.com/v2/css?f[]=instrument-serif@400,400i&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://api.fontshare.com/v2/css?f[]=general-sans@200,300,400,500&display=swap"
        rel="stylesheet"
      />
      {children}
    </>
  );
}
