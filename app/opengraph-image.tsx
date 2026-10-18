import { ImageResponse } from "next/og";

export const alt = "Pope Cruz, CS student @ NYU working across AI products, growth, operations, and community building.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const highlights = [
  "Events @ Tech@NYU",
  "1st, Berkeley US AI Policy Hackathon",
  "1st, Tufts AI Policy Hackathon",
  "Runner-up, MIT Policy Hackathon",
];

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "80px 96px",
        background: "#f6f3ec",
        color: "#1e211e",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", color: "#42685c", fontSize: 26, letterSpacing: "1px" }}>
          pope.dev
        </div>
        <div style={{ display: "flex", marginTop: 28, fontSize: 92, fontWeight: 650, letterSpacing: "-3px" }}>
          Pope Cruz
        </div>
        <div style={{ display: "flex", marginTop: 14, fontSize: 40 }}>
          CS student @ NYU
        </div>
        <div style={{ display: "flex", marginTop: 12, color: "#59615b", fontSize: 30 }}>
          AI products · Growth · Operations · Community building
        </div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
        {highlights.map((item) => (
          <div
            key={item}
            style={{
              display: "flex",
              padding: "12px 22px",
              border: "2px solid #c9cdbf",
              borderRadius: 999,
              color: "#1e211e",
              fontSize: 24,
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>,
    size,
  );
}
