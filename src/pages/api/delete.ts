import type { APIRoute } from "astro";
import fs from "fs";
import path from "path";
export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const form = await request.formData();
  const file = form.get("file")?.toString();

  if (!file) {
    return new Response(null, {
      status: 400,
      headers: { Location: "/" },
    });
  }

  const filePath = path.join(process.cwd(), "public/cartas", file);

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }

  return new Response(null, {
    status: 302,
    headers: { Location: "/" },
  });
};
