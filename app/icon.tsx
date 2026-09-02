import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 7,
        background: "#1e211e",
        color: "#f6f3ec",
        fontFamily: "Arial, sans-serif",
        fontSize: 18,
        fontWeight: 650,
      }}
    >
      P
    </div>,
    size,
  );
}
