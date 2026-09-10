async function authorized(request, env) {
  const c = request.headers.get("Cookie") || "";
  const m = c.match(/(?:^|;\s*)cda_admin=([^;]+)/);

  if (!m) return false;

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(env.SESSION_SECRET || env.ADMIN_PASSWORD),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"]
  );

  const bytes = new Uint8Array(
    (m[1].match(/.{2}/g) || []).map(x => parseInt(x, 16))
  );

  return crypto.subtle.verify(
    "HMAC",
    key,
    bytes,
    new TextEncoder().encode("casa-doce-amor-admin")
  );
}

function ok(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json"
    }
  });
}

export async function onRequestPut({ request, env, params }) {
  if (!(await authorized(request, env))) {
    return ok({ error: "unauthorized" }, 401);
  }

  const x = await request.json();
  const id = Number(params.id);

  if (!Number.isInteger(id)) {
    return ok({ error: "id" }, 400);
  }

  await env.DB.prepare(`
    UPDATE products
    SET name=?, description=?, price=?, stock=?, emoji=?, image_url=?
    WHERE id=?
  `).bind(
    x.name || "Produto",
    x.description || "",
    Math.max(0, Number(x.price) || 0),
    Math.max(0, Number(x.stock) || 0),
    x.emoji || "🎂",
    x.image_url || "",
    id
  ).run();

  return ok({ ok: true });
}

export async function onRequestDelete({ request, env, params }) {
  if (!(await authorized(request, env))) {
    return ok({ error: "unauthorized" }, 401);
  }

  const id = Number(params.id);

  if (!Number.isInteger(id)) {
    return ok({ error: "id" }, 400);
  }

  await env.DB
    .prepare("DELETE FROM products WHERE id=?")
    .bind(id)
    .run();

  return ok({ ok: true });
}
