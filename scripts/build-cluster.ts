import Build from "./builder"

const OPTS : Bun.BuildConfig = {
  entrypoints: ["./src/server/cluster.ts"],
  compile: { outfile: "shorty-cluster" },
  outdir: "dist/"
}

await Build(OPTS)
