import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

const rand = () =>
  "#" +
  Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, "0")
    .toUpperCase();

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "Palette — Random Color Generator" }] }),
  component: Palette,
});

function Palette() {
  const [colors, setColors] = useState(() => Array.from({ length: 5 }, rand));
  const [copied, setCopied] = useState("");

  return (
    <div className="flex h-screen flex-col bg-background">
      <div className="flex flex-1">
        {colors.map((hex) => (
          <button
            key={hex}
            onClick={() => {
              navigator.clipboard?.writeText(hex);
              setCopied(hex);
              setTimeout(() => setCopied(""), 1000);
            }}
            className="flex flex-1 items-center justify-center font-mono text-sm font-bold transition-transform hover:scale-105"
            style={{ backgroundColor: hex }}
          >
            {copied === hex ? "Copied!" : hex}
          </button>
        ))}
      </div>
      <button
        onClick={() => setColors(Array.from({ length: 5 }, rand))}
        className="bg-primary py-4 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
      >
        Generate palette
      </button>
    </div>
  );
}
