import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni()],
  // resolve: {
  //   alias: {
  //     "@": path.join(process.cwd(), "./src"),
  //     "@img": path.join(process.cwd(), "./src/static/images"),
  //   },
  // },
  // server: {
  //   port: 6000,
  //   fs: {
  //     // Allow serving files from one level up to the project root
  //     allow: [".."],
  //   },
  // },
});
