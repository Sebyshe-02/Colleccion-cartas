import { defineCollection } from "astro:content";
import { cldAssetsLoader } from "astro-cloudinary/loaders";

export const collections = {
  assets: defineCollection({
    loader: cldAssetsLoader({
      folder: 'cartas-astro-v2/criaturas'
    })
  }),

  eventos: defineCollection({
    loader: cldAssetsLoader({
      folder: 'cartas-astro-v2/eventos'
    })
  })
}

