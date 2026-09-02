import { ImageResponse } from "next/og";

export const alt = "Pope Cruz, computer science student at NYU.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "84px 112px",
        background: "#f6f3ec",
        color: "#1e211e",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ display: "flex", fontSize: 76, fontWeight: 650, letterSpacing: "-3px" }}>
        Pope Cruz
      </div>
      <div style={{ display: "flex", marginTop: 22, color: "#59615b", fontSize: 34 }}>
        Computer science student at NYU.
      </div>
      <div style={{ display: "flex", width: 92, height: 6, marginTop: 64, background: "#42685c" }} />
    </div>,
    size,
  );
}
