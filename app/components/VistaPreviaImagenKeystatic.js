
"use client";

import { useEffect, useState } from "react";

const tamanos = {
  small: "300px",
  medium: "500px",
  large: "750px",
  full: "100%",
};

export default function VistaPreviaImagenKeystatic({
  image,
  alt = "",
  size = "medium",
}) {
  const [src, setSrc] = useState(null);

  useEffect(() => {
    if (!image) {
      setSrc(null);
      return;
    }

    if (typeof image === "string") {
      setSrc(image);
      return;
    }

    if (!image.data) {
      setSrc(null);
      return;
    }

    const blob = new Blob([image.data], {
      type: image.filename?.match(/\.png$/i)
        ? "image/png"
        : image.filename?.match(/\.webp$/i)
          ? "image/webp"
          : image.filename?.match(/\.gif$/i)
            ? "image/gif"
            : "image/jpeg",
    });

    const url = URL.createObjectURL(blob);
    setSrc(url);

    return () => URL.revokeObjectURL(url);
  }, [image]);

  if (!src) {
    return (
      <p style={{ color: "#a3a3a3", fontFamily: "Mansfield, sans-serif" }}>
        Seleccioná una imagen para ver la vista previa.
      </p>
    );
  }

  return (
    <div style={{ padding: "16px", textAlign: "center" }}>
      <img
        src={src}
        alt={alt}
        style={{
          display: "block",
          width: "100%",
          maxWidth: tamanos[size] || tamanos.medium,
          height: "auto",
          margin: "0 auto",
          borderRadius: "12px",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      />
      <small style={{ color: "#a3a3a3", fontFamily: "Mansfield, sans-serif" }}>
        Tamaño seleccionado: {size}
      </small>
    </div>
  );
}
