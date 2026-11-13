
const tamanos = {
  small: "300px",
  medium: "500px",
  large: "750px",
  full: "100%",
};

export default function ImagenAjustable({
  image,
  alt = "",
  size = "medium",
}) {
  if (!image) return null;

  return (
    <figure
      style={{
        width: "100%",
        maxWidth: tamanos[size] || "500px",
        margin: "32px auto",
      }}
    >
      <img
        src={image}
        alt={alt}
        style={{
          display: "block",
          width: "100%",
          height: "auto",
          borderRadius: "12px",
        }}
      />
    </figure>
  );
}
