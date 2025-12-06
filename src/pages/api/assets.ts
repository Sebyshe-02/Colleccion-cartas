import type { APIRoute } from "astro";
import { v2 as cloudinary } from "cloudinary";

export const prerender = false;

cloudinary.config({
  cloud_name: typeof import.meta !== 'undefined' ? (import.meta.env?.PUBLIC_CLOUDINARY_CLOUD_NAME ?? process.env.PUBLIC_CLOUDINARY_CLOUD_NAME) : process.env.PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: typeof import.meta !== 'undefined' ? (import.meta.env?.PUBLIC_CLOUDINARY_API_KEY ?? process.env.PUBLIC_CLOUDINARY_API_KEY ?? process.env.CLOUDINARY_API_KEY) : (process.env.PUBLIC_CLOUDINARY_API_KEY ?? process.env.CLOUDINARY_API_KEY),
  api_secret: typeof import.meta !== 'undefined' ? (import.meta.env?.CLOUDINARY_API_SECRET ?? process.env.CLOUDINARY_API_SECRET) : process.env.CLOUDINARY_API_SECRET,
});

export const GET: APIRoute = async () => {
  try {
    // List resources in the 'cartas-astro' folder (uploaded by the app)
    const resp: any = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'cartas-astro',
      max_results: 100,
    });

    const resources = resp.resources || [];
    return new Response(JSON.stringify(resources), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    console.error('Error listing Cloudinary assets', err);
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 });
  }
};
