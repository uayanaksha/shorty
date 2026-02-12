(async () => {
  let target: Bun.Build.CompileTarget;
  if (process.arch === 'x64') {
    switch (process.platform) {
      case 'win32': target = 'bun-windows-x64-modern';
      case 'darwin': target = 'bun-darwin-x64-modern';
      default: target = 'bun-linux-x64-modern';
    }
  } else {
    switch (process.platform) {
      case 'win32': target = 'bun-windows-arm64';
      case 'darwin': target = 'bun-darwin-arm64-modern';
      default: target = 'bun-linux-arm64-modern';
    }
  }

  const CONFIG: Partial<Bun.BuildConfig> = {
    compile: { target },
    outdir: "dist"
  };

  [{
    entrypoints: ["./src/server/main.ts"],
    compile: { outfile: "shorty" },
  }, {
    entrypoints: ["./src/server/cluster.ts"],
    compile: { outfile: "shorty-cluster" },
  }].forEach(async (BuildConfig) => await Bun.build({
    ...CONFIG,
    ...BuildConfig
  }))

})()
