import type { Config } from "@react-router/dev/config";

export default {
  ssr: true,
  future: {
    unstable_viteEnvironmentApi: true,
  },
  prerender: ["/contact", "/about", "/projects"],
} satisfies Config;
