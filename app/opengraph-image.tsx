import { ImageResponse } from "next/og";
import { portfolio } from "@/lib/portfolio";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Ose Oziegbe — QA Engineer and Frontend Developer";

export default function OgImage() {
    return new ImageResponse(
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                background: "#f4efe6",
                color: "#14110d",
                padding: "72px 80px",
                fontFamily: "Georgia, serif",
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    fontSize: 28,
                    letterSpacing: 1,
                }}
            >
                <div
                    style={{
                        width: 18,
                        height: 18,
                        borderRadius: 9999,
                        background: "#ee5b1a",
                    }}
                />
                {portfolio.name}
            </div>

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    fontSize: 96,
                    lineHeight: 1.05,
                    letterSpacing: -2,
                }}
            >
                <span>QA Engineer &</span>
                <span>
                    Frontend{" "}
                    <span style={{ color: "#ee5b1a", fontStyle: "italic" }}>
                        Developer
                    </span>
                    .
                </span>
            </div>

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 26,
                    color: "rgba(20,17,13,0.6)",
                }}
            >
                <span>Test automation · Web interfaces · Fintech</span>
                <span>Lagos · Remote</span>
            </div>
        </div>,
        size,
    );
}
