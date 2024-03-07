import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import compress from "astro-compress";

import metaTags from "astro-meta-tags";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), sitemap(), compress(), metaTags()]
});