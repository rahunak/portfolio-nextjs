import { ImageResponse } from "next/og";

export const alt = "Eugene Zaiko — Senior Full-Stack Engineer | Node.js, React, PostgreSQL";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)",
          padding: "80px",
        }}
      >
        <div
          style={{
            width: 96,
            height: 6,
            background: "#00e5a0",
            marginBottom: 40,
            display: "flex",
          }}
        />
        <div
          style={{
            color: "#fff",
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.1,
            display: "flex",
          }}
        >
          Eugene Zaiko
        </div>
        <div
          style={{
            color: "#00e5a0",
            fontSize: 34,
            fontWeight: 600,
            marginTop: 20,
            display: "flex",
          }}
        >
          Senior Full-Stack Engineer
        </div>
        <div
          style={{
            color: "#9ca3af",
            fontSize: 26,
            lineHeight: 1.4,
            maxWidth: 940,
            marginTop: 28,
            display: "flex",
          }}
        >
          Node.js · NestJS · React · Next.js · PostgreSQL (109M+ rows) ·
          Event-driven systems · Production AI
        </div>
        <div
          style={{
            color: "#6b7280",
            fontSize: 22,
            marginTop: 36,
            display: "flex",
          }}
        >
          safesync.dev
        </div>
      </div>
    ),
    { ...size }
  );
}
