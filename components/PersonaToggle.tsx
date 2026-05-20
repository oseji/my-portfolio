"use client";

// components/PersonaToggle.tsx
import type { Persona } from "@/lib/portfolio";

type Props = {
  value: Persona;
  onChange: (p: Persona) => void;
  accent: string;
};

export function PersonaToggle({ value, onChange, accent }: Props) {
  return (
    <div className="relative inline-flex flex-none rounded-full bg-[rgba(20,17,13,0.06)] p-1" data-hover>
      <div
        className="ed-toggle-bg"
        style={{
          left: value === "frontend" ? "4px" : "calc(50% + 0px)",
          background: accent,
        }}
      />
      <button
        className={`relative z-10 min-w-[88px] cursor-none rounded-full px-[18px] py-2 text-center font-mono text-[11px] font-medium uppercase tracking-[.04em] transition-colors whitespace-nowrap ${
          value === "frontend" ? "text-white" : "text-muted"
        }`}
        onClick={() => onChange("frontend")}
      >
        Frontend
      </button>
      <button
        className={`relative z-10 min-w-[88px] cursor-none rounded-full px-[18px] py-2 text-center font-mono text-[11px] font-medium uppercase tracking-[.04em] transition-colors whitespace-nowrap ${
          value === "qa" ? "text-white" : "text-muted"
        }`}
        onClick={() => onChange("qa")}
      >
        QA
      </button>
    </div>
  );
}
