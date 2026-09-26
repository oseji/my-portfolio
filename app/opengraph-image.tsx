import { ImageResponse } from "next/og";
import { portfolio } from "@/lib/portfolio";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Ose Oziegbe — QA Engineer and Frontend Developer";

const PAPER = "#eef2f4";
const INK = "#0f2340";
const INK_2 = "#475a74";
const YELLOW = "#ffdc3a";

// Archivo, wide and heavy, to match the site's display face. Falls back to
// the renderer's default font if Google Fonts can't be reached at build time.
async function loadArchivo(): Promise<ArrayBuffer | null> {
    try {
        const css = await (
            await fetch("https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@118,800&display=swap")
        ).text();
        const url = css.match(/src: url\((.+?)\) format\('(?:truetype|opentype)'\)/)?.[1];
        if (!url) return null;
        return await (await fetch(url)).arrayBuffer();
    } catch {
        return null;
    }
}

export default async function OgImage() {
    const archivo = await loadArchivo();
    const cell = {
        display: "flex",
        flexDirection: "column" as const,
        gap: 6,
        padding: "16px 22px",
        borderRight: `1px solid rgba(15,35,64,0.38)`,
        flex: 1,
    };
    const key = { fontSize: 16, letterSpacing: 2, color: INK_2 };
    const val = { fontSize: 26, fontWeight: 700 };

    return new ImageResponse(
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                background: PAPER,
                color: INK,
                padding: "64px 72px",
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "space-between",
                    height: 22,
                    borderBottom: `1px solid ${INK}`,
                }}
            >
                {Array.from({ length: 53 }, (_, i) => (
                    <div
                        key={i}
                        style={{
                            width: 1,
                            height: i % 10 === 0 ? 20 : i % 5 === 0 ? 12 : 6,
                            background: INK_2,
                        }}
                    />
                ))}
            </div>

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    fontFamily: archivo ? "Archivo" : undefined,
                    fontSize: 88,
                    fontWeight: 800,
                    lineHeight: 1,
                    letterSpacing: -3,
                }}
            >
                <span>QA Engineer &</span>
                <span>Frontend Developer.</span>
            </div>

            <div style={{ display: "flex", border: `2px solid ${INK}` }}>
                <div style={cell}>
                    <span style={key}>DRAWN BY</span>
                    <span style={val}>{portfolio.name}</span>
                </div>
                <div style={{ ...cell, background: YELLOW }}>
                    <span style={{ ...key, color: INK }}>CHECKED BY</span>
                    <span style={val}>{portfolio.name}</span>
                </div>
                <div style={{ ...cell, borderRight: "none" }}>
                    <span style={key}>BASED</span>
                    <span style={val}>Lagos · Remote</span>
                </div>
            </div>
        </div>,
        {
            ...size,
            fonts: archivo
                ? [{ name: "Archivo", data: archivo, weight: 800, style: "normal" }]
                : undefined,
        },
    );
}
