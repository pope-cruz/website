import { ImageResponse } from "next/og";

export const alt = "Pope Cruz - notes, projects, and writing";
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
        justifyContent: "space-between",
        padding: 76,
        background: "#f7f7f4",
        color: "#20201e",
        fontFamily: "Georgia, serif",
      }}
    >
      <div style={{ display: "flex", fontFamily: "monospace", fontSize: 30 }}>pope cruz</div>
      <div style={{ display: "flex", maxWidth: 900, fontSize: 72, lineHeight: 1.05, letterSpacing: -2 }}>
        Notes, projects, and writing.
      </div>
      <div style={{ display: "flex", width: "100%", paddingTop: 24, borderTop: "2px solid #aaaaa2", fontFamily: "monospace", fontSize: 22, color: "#666660" }}>
        a public notebook
      </div>
    </div>,
    size,
  );
}
