import Build from "./builder"

const OPTS : Bun.BuildConfig = {
  entrypoints: ["./src/server/main.ts"],
  compile: { outfile: "shorty" },
  outdir: "dist/"
}

await Build(OPTS)
