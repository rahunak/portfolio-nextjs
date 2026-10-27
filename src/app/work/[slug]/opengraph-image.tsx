import { ImageResponse } from "next/og";
import { getCaseStudy } from "@/lib/casestudies";

export const alt = "";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ACCENT = "#c8ff4b";
const BG = "linear-gradient(135deg, #0d0d0e 0%, #1a1a2e 100%)";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCaseStudy(slug);

  if (!c) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: BG,
            color: "#f0ede8",
            fontSize: 48,
          }}
        >
          Eugene Zaiko — Case Study
        </div>
      ),
      { ...size }
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: BG,
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              width: 96,
              height: 6,
              background: ACCENT,
              marginBottom: 44,
              display: "flex",
            }}
          />
          <div
            style={{
              color: "#f0ede8",
              fontSize: 84,
              fontWeight: 700,
              lineHeight: 1.05,
              display: "flex",
            }}
          >
            {c.name}
          </div>
          <div
            style={{
              color: ACCENT,
              fontSize: 36,
              fontWeight: 600,
              marginTop: 24,
              display: "flex",
            }}
          >
            {c.tagline}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 10 }}>
            {c.stack.slice(0, 4).map((t) => (
              <div
                key={t}
                style={{
                  display: "flex",
                  color: "#9ca3af",
                  fontSize: 20,
                  border: "1px solid rgba(240,237,232,0.25)",
                  padding: "8px 18px",
                }}
              >
                {t}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", color: "#6b7280", fontSize: 24 }}>
            {c.year} · safesync.dev
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
