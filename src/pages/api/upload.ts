import type { APIRoute } from "astro";
import { v2 as cloudinary } from "cloudinary";

export const prerender = false;

cloudinary.config({
  cloud_name: typeof import.meta !== 'undefined' ? (import.meta.env?.PUBLIC_CLOUDINARY_CLOUD_NAME ?? process.env.PUBLIC_CLOUDINARY_CLOUD_NAME) : process.env.PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: typeof import.meta !== 'undefined' ? (import.meta.env?.PUBLIC_CLOUDINARY_API_KEY ?? process.env.PUBLIC_CLOUDINARY_API_KEY ?? process.env.CLOUDINARY_API_KEY) : (process.env.PUBLIC_CLOUDINARY_API_KEY ?? process.env.CLOUDINARY_API_KEY),
  api_secret: typeof import.meta !== 'undefined' ? (import.meta.env?.CLOUDINARY_API_SECRET ?? process.env.CLOUDINARY_API_SECRET) : process.env.CLOUDINARY_API_SECRET,
});

function uploadBuffer(buffer: Buffer, options: any) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(options, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
    stream.end(buffer);
  });
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const form = await request.formData();
    const file = form.get('file') as File | null;
    if (!file) {
      return new Response(JSON.stringify({ error: 'No file provided' }), { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result: any = await uploadBuffer(buffer, { folder: 'cartas-astro' });

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    console.error('Upload error', err);
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 });
  }
};
