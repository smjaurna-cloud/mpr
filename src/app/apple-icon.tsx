import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 80,
          background: "linear-gradient(135deg, #78350f 0%, #b45309 40%, #d97706 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#ffffff",
          borderRadius: "40px",
          border: "4px solid #fef3c7",
          fontWeight: 800,
          fontFamily: "sans-serif",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
        }}
      >
        วส
      </div>
    ),
    {
      ...size,
    }
  );
}
