// components/ProjectMock.tsx
// Abstract SVG visual placeholders per project. Swap with real screenshots later.

import type { Project } from "@/lib/portfolio";

type Props = { project: Project };

export function ProjectMock({ project }: Props) {
  switch (project.id) {
    case "pennywise":
      return (
        <svg viewBox="0 0 400 280" className="block h-full w-full">
          <rect width="400" height="280" fill="#fff" />
          <rect x="20" y="20" width="80" height="240" fill="#f4f4f5" />
          <circle cx="60" cy="40" r="8" fill={project.accent} />
          <rect x="32" y="58" width="56" height="6" rx="2" fill="#d4d4d8" />
          <rect x="32" y="72" width="40" height="6" rx="2" fill="#e4e4e7" />
          <rect x="120" y="30" width="260" height="80" rx="6" fill="#fafafa" />
          <text x="135" y="58" fontSize="11" fill="#71717a" fontFamily="monospace">Balance</text>
          <text x="135" y="92" fontSize="22" fill="#18181b" fontWeight="600" fontFamily="system-ui">$14,129.50</text>
          <rect x="120" y="125" width="120" height="135" rx="6" fill="#fafafa" />
          <rect x="250" y="125" width="130" height="135" rx="6" fill="#fafafa" />
          <circle cx="180" cy="190" r="38" fill="none" stroke={project.accent} strokeWidth="14" strokeDasharray="180 60" />
          <circle cx="315" cy="190" r="38" fill="none" stroke="#a855f7" strokeWidth="14" strokeDasharray="120 120" />
        </svg>
      );
    case "binge":
      return (
        <svg viewBox="0 0 400 280" className="block h-full w-full">
          <rect width="400" height="280" fill="#0a0a0a" />
          <text x="200" y="50" fontSize="26" fontWeight="700" fill="#fff" textAnchor="middle" fontFamily="system-ui">
            Welcome to Binge
          </text>
          {Array.from({ length: 12 }).map((_, i) => {
            const x = 20 + (i % 4) * 95;
            const y = 80 + Math.floor(i / 4) * 65;
            return (
              <rect key={i} x={x} y={y} width="80" height="55" rx="4" fill={`hsl(${i * 30}, 60%, 40%)`} opacity="0.8" />
            );
          })}
          <rect x="140" y="118" width="120" height="40" rx="6" fill={project.accent} />
          <text x="200" y="142" fontSize="11" fontWeight="600" fill="#fff" textAnchor="middle" fontFamily="system-ui">
            Sign Up
          </text>
        </svg>
      );
    case "hrsphere":
      return (
        <svg viewBox="0 0 400 280" className="block h-full w-full">
          <rect width="400" height="280" fill="#0f172a" />
          <rect x="0" y="0" width="80" height="280" fill="#0a0f1f" />
          <circle cx="40" cy="40" r="6" fill={project.accent} />
          {Array.from({ length: 6 }).map((_, i) => (
            <rect key={i} x="16" y={60 + i * 22} width="48" height="4" rx="2" fill="#475569" />
          ))}
          <rect x="100" y="20" width="280" height="80" rx="6" fill="#1e293b" />
          <text x="120" y="50" fontSize="11" fill="#94a3b8" fontFamily="monospace">Employees</text>
          <text x="120" y="80" fontSize="28" fill="#fff" fontWeight="700" fontFamily="system-ui">400</text>
          <circle cx="320" cy="60" r="28" fill="none" stroke={project.accent} strokeWidth="6" strokeDasharray="140 30" />
          <text x="320" y="65" fontSize="13" fontWeight="600" fill="#fff" textAnchor="middle" fontFamily="system-ui">80%</text>
          <rect x="100" y="115" width="280" height="145" rx="6" fill="#1e293b" />
          <polyline points="120,230 160,200 200,215 240,170 280,180 320,140 360,160" fill="none" stroke={project.accent} strokeWidth="2.5" />
          <polyline points="120,210 160,225 200,190 240,210 280,155 320,180 360,135" fill="none" stroke="#a855f7" strokeWidth="2.5" />
        </svg>
      );
    case "iptracker":
      return (
        <svg viewBox="0 0 400 280" className="block h-full w-full">
          <rect width="400" height="280" fill="#3730a3" />
          <rect x="60" y="30" width="280" height="36" rx="18" fill="#fff" />
          <text x="80" y="53" fontSize="11" fill="#64748b" fontFamily="monospace">Search any IP address</text>
          <rect x="40" y="90" width="320" height="50" rx="4" fill="#fff" />
          <text x="60" y="108" fontSize="9" fill="#64748b" fontFamily="monospace">IP ADDRESS</text>
          <text x="60" y="128" fontSize="13" fill="#0f172a" fontWeight="600" fontFamily="system-ui">105.112.96.12</text>
          <text x="180" y="108" fontSize="9" fill="#64748b" fontFamily="monospace">LOCATION</text>
          <text x="180" y="128" fontSize="13" fill="#0f172a" fontWeight="600" fontFamily="system-ui">Oroke, NG</text>
          <text x="270" y="108" fontSize="9" fill="#64748b" fontFamily="monospace">ISP</text>
          <text x="270" y="128" fontSize="13" fill="#0f172a" fontWeight="600" fontFamily="system-ui">Airtel</text>
          <rect x="40" y="160" width="320" height="100" rx="4" fill="#e0e7ff" />
          <path d="M40 200 Q100 180 160 200 T280 200 T400 200" stroke="#a5b4fc" strokeWidth="1.5" fill="none" />
          <path d="M40 230 Q120 210 200 230 T360 230" stroke="#a5b4fc" strokeWidth="1.5" fill="none" />
          <circle cx="200" cy="210" r="8" fill={project.accent} />
          <circle cx="200" cy="210" r="14" fill={project.accent} opacity="0.3" />
        </svg>
      );
    case "swag":
      return (
        <svg viewBox="0 0 400 280" className="block h-full w-full">
          <rect width="400" height="280" fill="#fff" />
          <rect x="0" y="0" width="400" height="36" fill="#132646" />
          <text x="20" y="23" fontSize="12" fill="#fff" fontFamily="system-ui" fontWeight="600">Swag Labs</text>
          <text x="20" y="60" fontSize="11" fill="#525252" fontFamily="monospace">Products</text>
          {Array.from({ length: 4 }).map((_, i) => {
            const x = 20 + (i % 2) * 190;
            const y = 75 + Math.floor(i / 2) * 95;
            return (
              <g key={i}>
                <rect x={x} y={y} width="170" height="80" rx="4" fill="#fafafa" />
                <rect x={x + 8} y={y + 8} width="40" height="64" rx="3" fill="#e5e5e5" />
                <text x={x + 56} y={y + 24} fontSize="9" fill="#171717" fontFamily="system-ui" fontWeight="600">Sauce Labs Item</text>
                <text x={x + 56} y={y + 40} fontSize="14" fill="#171717" fontFamily="system-ui" fontWeight="700">$29.99</text>
                <rect x={x + 100} y={y + 50} width="62" height="22" rx="3" fill="none" stroke={project.accent} strokeWidth="1.2" />
                <text x={x + 131} y={y + 65} fontSize="9" fill={project.accent} fontFamily="system-ui" textAnchor="middle">Add to cart</text>
              </g>
            );
          })}
        </svg>
      );
    default:
      return null;
  }
}
