import esbuild from "esbuild";
import { cache } from "esbuild-plugin-cache";
import { dtsPlugin } from "esbuild-plugin-d.ts";
import { main, module } from "./package.json";

esbuild
  .build({
    entryPoints: ["mod.ts"],
    bundle: true,
    sourcemap: true,
    minify: true,
    format: "esm",
    outfile: module,
    plugins: [cache({}), dtsPlugin()],
  })
  .catch(() => process.exit(1));

esbuild
  .build({
    entryPoints: ["mod.ts"],
    bundle: true,
    sourcemap: true,
    minify: true,
    format: "cjs",
    outfile: main,
    plugins: [cache({})],
  })
  .catch(() => process.exit(1));
