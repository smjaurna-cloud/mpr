import { ImageResponse } from "next/og";

export const size = {
  width: 192,
  height: 192,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 84,
          background: "linear-gradient(135deg, #92400e 0%, #d97706 50%, #f59e0b 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#ffffff",
          borderRadius: "42px",
          border: "5px solid #fde68a",
          fontWeight: 800,
          fontFamily: "sans-serif",
          boxShadow: "0 10px 25px rgba(180, 83, 9, 0.4)",
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
