import { walk } from "https://deno.land/std@0.97.0/fs/mod.ts";
import { resolve } from "https://deno.land/std@0.97.0/path/mod.ts";

for await (
  const entry of walk(resolve(new URL(".", import.meta.url).pathname, ".."), {
    exts: [".d.ts"],
    skip: [/^node_modules/, /^dist/],
  })
) {
  Deno.removeSync(entry.path);
}
