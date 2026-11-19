"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/*
  Se monta junto a Keystatic y le agrega, sobre la lista de artículos:
   - un botón de basurero en cada fila (pide escribir el título exacto)
   - un botón "Papelera" para ver y restaurar artículos eliminados
  Keystatic no permite extender su lista, así que los botones se inyectan en el DOM.
*/

const LIME = "#B2FF00";
const RUTA_LISTA = /\/collection\/posts\/?$/;
const RUTA_ITEM = /\/collection\/posts\/item\/([^/]+)\/?$/;

const estilos = {
  velo: {
    position: "fixed",
    inset: 0,
    zIndex: 100000,
    background: "rgba(0,0,0,0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  caja: {
    width: "100%",
    maxWidth: 520,
    maxHeight: "85vh",
    overflowY: "auto",
    background: "#161616",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 10,
    padding: 24,
    color: "#e5e5e5",
    fontFamily: "Mansfield, sans-serif",
  },
  titulo: {
    margin: "0 0 12px",
    fontFamily: "Qurova, Mansfield, sans-serif",
    textTransform: "uppercase",
    fontSize: 20,
    color: "#fff",
  },
  input: {
    width: "100%",
    margin: "12px 0",
    padding: "10px 12px",
    background: "#101010",
    border: "1px solid #484848",
    borderRadius: 6,
    color: "#fff",
    fontSize: 15,
    fontFamily: "inherit",
    boxSizing: "border-box",
  },
  fila: { display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 8 },
  btn: {
    padding: "9px 16px",
    borderRadius: 6,
    border: "1px solid #484848",
    background: "transparent",
    color: "#e5e5e5",
    cursor: "pointer",
    fontFamily: "inherit",
    fontSize: 14,
  },
  btnPrimario: {
    background: LIME,
    borderColor: LIME,
    color: "#000",
    fontWeight: 700,
  },
  btnPeligro: {
    background: "#e5484d",
    borderColor: "#e5484d",
    color: "#fff",
    fontWeight: 700,
  },
  error: { color: "#ff6369", fontSize: 14, margin: "4px 0 0" },
};

const ICONO_BASURERO =
  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>';

const api = async (cuerpo) => {
  const res = await fetch("/api/papelera", {
    method: cuerpo ? "POST" : "GET",
    headers: cuerpo ? { "Content-Type": "application/json" } : undefined,
    body: cuerpo ? JSON.stringify(cuerpo) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Error inesperado");
  return data;
};

const fechaCorta = (iso) =>
  iso
    ? new Date(iso).toLocaleString("es-CR", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

export default function PapeleraUI() {
  const [enLista, setEnLista] = useState(false);
  const [datos, setDatos] = useState({ posts: [], papelera: [] });
  const [enItem, setEnItem] = useState(null);
  const [aEliminar, setAEliminar] = useState(null);
  const [verPapelera, setVerPapelera] = useState(false);
  const datosRef = useRef(datos);
  datosRef.current = datos;

  const cargar = useCallback(async () => {
    try {
      setDatos(await api());
    } catch {
      /* sin API (p. ej. producción): no se muestra nada */
    }
  }, []);

  // ¿Estamos en la lista de artículos?
  useEffect(() => {
    const revisar = () => {
      const ruta = window.location.pathname;
      setEnLista(RUTA_LISTA.test(ruta));
      const m = ruta.match(RUTA_ITEM);
      setEnItem(m ? decodeURIComponent(m[1]) : null);
    };
    revisar();
    const id = setInterval(revisar, 400);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (enLista || enItem) cargar();
  }, [enLista, enItem, cargar]);

  // Dentro de un artículo: Keystatic tiene su propio "Delete entry" que borra
  // directo. Se oculta su diálogo y se muestra el nuestro (título + papelera).
  useEffect(() => {
    if (!enItem) return;

    const interceptar = () => {
      document.querySelectorAll('[role="alertdialog"]').forEach((d) => {
        if (d.hasAttribute("data-papelera-oculto")) return;
        if (!/Delete entry/i.test(d.textContent || "")) return;
        d.setAttribute("data-papelera-oculto", "1");
        d.style.visibility = "hidden";
        d.style.pointerEvents = "none";

        // Cerrar de inmediato la alerta de Keystatic: su modal atrapa el foco
        // y bloquea los clics fuera de él, lo que congelaría nuestra ventana.
        const cancelar = [...d.querySelectorAll("button")].find((b) =>
          /cancel/i.test(b.textContent || "")
        );
        setTimeout(() => {
          cancelar?.click();
          setTimeout(() => {
            document.body.style.pointerEvents = "";
          }, 100);
        }, 0);

        const post = datosRef.current.posts.find((p) => p.slug === enItem);
        // Esperar a que el modal de Keystatic termine de cerrarse antes de abrir el nuestro
        setTimeout(
          () =>
            setAEliminar({
              slug: enItem,
              title: post?.title ?? enItem,
              desdeItem: true,
            }),
          250
        );
      });
    };

    interceptar();
    const obs = new MutationObserver(interceptar);
    obs.observe(document.body, { childList: true, subtree: true });
    return () => obs.disconnect();
  }, [enItem]);

  // Inyectar el basurero en cada fila de la tabla
  useEffect(() => {
    if (!enLista) return;

    const inyectar = () => {
      document.querySelectorAll('[role="row"]').forEach((fila) => {
        if (fila.querySelector("[data-papelera-btn]")) return;
        const cabecera = fila.querySelector('[role="rowheader"]');
        const nombre = cabecera?.textContent?.trim();
        if (!nombre) return;
        if (fila.closest("thead") || fila.querySelector('[role="columnheader"]')) return;

        const btn = document.createElement("button");
        btn.type = "button";
        btn.setAttribute("data-papelera-btn", nombre);
        btn.setAttribute("aria-label", `Eliminar ${nombre}`);
        btn.title = "Mover a la papelera";
        btn.innerHTML = ICONO_BASURERO;
        Object.assign(btn.style, {
          position: "absolute",
          right: "12px",
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          padding: "6px",
          border: "0",
          borderRadius: "6px",
          background: "transparent",
          color: "#8a8a8a",
          cursor: "pointer",
          zIndex: "2",
        });
        btn.onmouseenter = () => (btn.style.color = "#ff6369");
        btn.onmouseleave = () => (btn.style.color = "#8a8a8a");

        // Evita que Keystatic abra el artículo al hacer clic en el basurero
        ["pointerdown", "pointerup", "mousedown", "mouseup", "touchstart", "keydown"].forEach(
          (ev) => btn.addEventListener(ev, (e) => e.stopPropagation())
        );
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          e.preventDefault();
          const lista = datosRef.current.posts;
          const post =
            lista.find((p) => p.slug === nombre) ||
            lista.find((p) => p.title === nombre);
          if (post) setAEliminar(post);
        });

        if (getComputedStyle(fila).position === "static") {
          fila.style.position = "relative";
        }
        fila.appendChild(btn);
      });
    };

    inyectar();
    const obs = new MutationObserver(inyectar);
    obs.observe(document.body, { childList: true, subtree: true });
    return () => {
      obs.disconnect();
      document
        .querySelectorAll("[data-papelera-btn]")
        .forEach((b) => b.remove());
    };
  }, [enLista, datos.posts]);

  if (!enLista && !enItem) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => {
          cargar();
          setVerPapelera(true);
        }}
        style={{
          position: "fixed",
          right: 24,
          bottom: 24,
          zIndex: 99999,
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "10px 16px",
          borderRadius: 999,
          border: "1px solid rgba(255,255,255,0.2)",
          background: "#161616",
          color: "#e5e5e5",
          cursor: "pointer",
          fontFamily: "Mansfield, sans-serif",
          fontSize: 14,
        }}
      >
        <span dangerouslySetInnerHTML={{ __html: ICONO_BASURERO }} />
        Papelera ({datos.papelera.length})
      </button>

      {aEliminar && (
        <ModalEliminar
          post={aEliminar}
          onCerrar={() => setAEliminar(null)}
          onListo={() => {
            if (aEliminar.desdeItem) {
              // Venimos de dentro del artículo (ya no existe): volver a la lista
              window.location.assign(
                window.location.pathname.replace(/\/item\/[^/]+\/?$/, "")
              );
            } else {
              window.location.reload();
            }
          }}
        />
      )}

      {verPapelera && (
        <ModalPapelera
          items={datos.papelera}
          onCerrar={() => setVerPapelera(false)}
          onListo={() => window.location.reload()}
        />
      )}
    </>
  );
}

function ModalEliminar({ post, onCerrar, onListo }) {
  const [texto, setTexto] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);
  const coincide = texto === post.title;

  const eliminar = async () => {
    setCargando(true);
    setError("");
    try {
      await api({ action: "trash", slug: post.slug, confirmTitle: texto });
      onListo();
    } catch (e) {
      setError(e.message);
      setCargando(false);
    }
  };

  return (
    <div style={estilos.velo} onClick={onCerrar}>
      <div style={estilos.caja} onClick={(e) => e.stopPropagation()}>
        <h2 style={estilos.titulo}>Mover a la papelera</h2>
        <p style={{ margin: 0, color: "#a3a3a3", lineHeight: 1.6 }}>
          El artículo dejará de verse en el blog, pero podrás recuperarlo desde la
          papelera. Para confirmar, escribí el título exactamente como aparece:
        </p>
        <p
          style={{
            margin: "12px 0 0",
            padding: "8px 12px",
            background: "#101010",
            borderRadius: 6,
            color: LIME,
            fontWeight: 700,
            wordBreak: "break-word",
          }}
        >
          {post.title}
        </p>
        <input
          autoFocus
          style={estilos.input}
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && coincide && !cargando && eliminar()}
          placeholder="Escribí el título aquí"
        />
        {error && <p style={estilos.error}>{error}</p>}
        <div style={estilos.fila}>
          <button style={estilos.btn} onClick={onCerrar} disabled={cargando}>
            Cancelar
          </button>
          <button
            style={{
              ...estilos.btn,
              ...estilos.btnPeligro,
              opacity: coincide && !cargando ? 1 : 0.4,
              cursor: coincide && !cargando ? "pointer" : "not-allowed",
            }}
            disabled={!coincide || cargando}
            onClick={eliminar}
          >
            {cargando ? "Moviendo..." : "Mover a la papelera"}
          </button>
        </div>
      </div>
    </div>
  );
}

function ModalPapelera({ items, onCerrar, onListo }) {
  const [error, setError] = useState("");
  const [trabajando, setTrabajando] = useState(null);

  const restaurar = async (slug) => {
    setTrabajando(slug);
    setError("");
    try {
      await api({ action: "restore", slug });
      onListo();
    } catch (e) {
      setError(e.message);
      setTrabajando(null);
    }
  };

  return (
    <div style={estilos.velo} onClick={onCerrar}>
      <div style={estilos.caja} onClick={(e) => e.stopPropagation()}>
        <h2 style={estilos.titulo}>Papelera</h2>
        {items.length === 0 ? (
          <p style={{ color: "#a3a3a3" }}>La papelera está vacía.</p>
        ) : (
          items.map((it) => (
            <div
              key={it.slug}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 0",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ color: "#fff", fontWeight: 600, wordBreak: "break-word" }}>
                  {it.title}
                </div>
                {it.deletedAt && (
                  <div style={{ color: "#8a8a8a", fontSize: 13 }}>
                    Eliminado el {fechaCorta(it.deletedAt)}
                  </div>
                )}
              </div>
              <button
                style={{ ...estilos.btn, ...estilos.btnPrimario }}
                disabled={trabajando === it.slug}
                onClick={() => restaurar(it.slug)}
              >
                {trabajando === it.slug ? "Restaurando..." : "Restaurar"}
              </button>
            </div>
          ))
        )}
        {error && <p style={estilos.error}>{error}</p>}
        <div style={estilos.fila}>
          <button style={estilos.btn} onClick={onCerrar}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
