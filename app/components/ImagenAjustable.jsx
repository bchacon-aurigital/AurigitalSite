
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
      className="imagen-ajustable"
      style={{
        width: "100%",
        maxWidth: tamanos[size] || tamanos.medium,
        margin: "32px auto",
      }}
    >
      <img
        src={image}
        alt={alt}
        loading="lazy"
        style={{
          display: "block",
          width: "100%",
          maxWidth: "100%",
          height: "auto",
          borderRadius: "12px",
          margin: 0,
        }}
      />
    </figure>
  );
}
