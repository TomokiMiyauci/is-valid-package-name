import dts from "rollup-plugin-dts";

const config = {
  input: "mod.d.ts",
  output: [{ file: "dist/index.d.ts" }],
  external: ["fonction"],
  plugins: [dts()],
};

export default config;
