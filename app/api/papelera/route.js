import fs from "node:fs/promises";
import path from "node:path";

/*
  Papelera de artículos (solo desarrollo, mismo contexto que Keystatic local).
  - Eliminar: mueve content/posts/<slug>(.yaml) a content/papelera/<slug>/
  - Restaurar: lo devuelve a content/posts/
  Las imágenes en /public no se tocan, así que al restaurar siguen funcionando.
*/

const RAIZ = process.cwd();
const POSTS = path.join(RAIZ, "content", "posts");
const PAPELERA = path.join(RAIZ, "content", "papelera");

const json = (data, status = 200) =>
  Response.json(data, { status, headers: { "Cache-Control": "no-store" } });

const slugValido = (s) =>
  typeof s === "string" &&
  s.length > 0 &&
  !s.includes("/") &&
  !s.includes("\\") &&
  !s.includes("..") &&
  s !== ".";

const existe = (p) =>
  fs.access(p).then(
    () => true,
    () => false
  );

const leerTitulo = async (archivoYaml, respaldo) => {
  try {
    const txt = await fs.readFile(archivoYaml, "utf8");
    const m = txt.match(/^title:\s*(.*)$/m);
    if (!m) return respaldo;
    let v = m[1].trim();
    if (
      (v.startsWith('"') && v.endsWith('"')) ||
      (v.startsWith("'") && v.endsWith("'"))
    ) {
      v = v.slice(1, -1);
    }
    return v || respaldo;
  } catch {
    return respaldo;
  }
};

const listarPosts = async () => {
  if (!(await existe(POSTS))) return [];
  const nombres = await fs.readdir(POSTS);
  const slugs = new Set(nombres.map((n) => n.replace(/\.yaml$/, "")));
  const out = [];
  for (const slug of slugs) {
    out.push({
      slug,
      title: await leerTitulo(path.join(POSTS, `${slug}.yaml`), slug),
    });
  }
  return out;
};

const listarPapelera = async () => {
  if (!(await existe(PAPELERA))) return [];
  const carpetas = await fs.readdir(PAPELERA, { withFileTypes: true });
  const out = [];
  for (const c of carpetas) {
    if (!c.isDirectory()) continue;
    const base = path.join(PAPELERA, c.name);
    let deletedAt = null;
    try {
      deletedAt = JSON.parse(
        await fs.readFile(path.join(base, "meta.json"), "utf8")
      ).deletedAt;
    } catch {}
    out.push({
      slug: c.name,
      title: await leerTitulo(path.join(base, "entry.yaml"), c.name),
      deletedAt,
    });
  }
  return out.sort((a, b) => (b.deletedAt || "").localeCompare(a.deletedAt || ""));
};

const soloDev = () =>
  process.env.NODE_ENV === "production"
    ? json({ error: "No disponible en producción" }, 404)
    : null;

export async function GET() {
  const bloqueo = soloDev();
  if (bloqueo) return bloqueo;
  return json({ posts: await listarPosts(), papelera: await listarPapelera() });
}

export async function POST(request) {
  const bloqueo = soloDev();
  if (bloqueo) return bloqueo;

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Solicitud inválida" }, 400);
  }
  const { action, slug, confirmTitle } = body || {};
  if (!slugValido(slug)) return json({ error: "Slug inválido" }, 400);

  const yamlOrigen = path.join(POSTS, `${slug}.yaml`);
  const dirOrigen = path.join(POSTS, slug);
  const destino = path.join(PAPELERA, slug);

  if (action === "trash") {
    const tieneYaml = await existe(yamlOrigen);
    const tieneDir = await existe(dirOrigen);
    if (!tieneYaml && !tieneDir) {
      return json({ error: "El artículo no existe" }, 404);
    }

    // La confirmación se valida también en el servidor: título exacto
    const titulo = await leerTitulo(yamlOrigen, slug);
    if (confirmTitle !== titulo) {
      return json({ error: "El título no coincide" }, 400);
    }

    if (await existe(destino)) {
      // Ya había uno con ese slug en la papelera: se conserva con otro nombre
      await fs.rename(destino, `${destino}-${Date.now()}`);
    }
    await fs.mkdir(destino, { recursive: true });
    if (tieneYaml) await fs.rename(yamlOrigen, path.join(destino, "entry.yaml"));
    if (tieneDir) await fs.rename(dirOrigen, path.join(destino, "dir"));
    await fs.writeFile(
      path.join(destino, "meta.json"),
      JSON.stringify({ deletedAt: new Date().toISOString() })
    );
    return json({ ok: true });
  }

  if (action === "restore") {
    if (!(await existe(destino))) {
      return json({ error: "No está en la papelera" }, 404);
    }
    if ((await existe(yamlOrigen)) || (await existe(dirOrigen))) {
      return json(
        { error: "Ya existe un artículo con ese slug. Renombrá o eliminá el actual primero." },
        409
      );
    }
    await fs.mkdir(POSTS, { recursive: true });
    const yamlPapelera = path.join(destino, "entry.yaml");
    const dirPapelera = path.join(destino, "dir");
    if (await existe(yamlPapelera)) await fs.rename(yamlPapelera, yamlOrigen);
    if (await existe(dirPapelera)) await fs.rename(dirPapelera, dirOrigen);
    await fs.rm(destino, { recursive: true, force: true });
    return json({ ok: true });
  }

  return json({ error: "Acción desconocida" }, 400);
}
