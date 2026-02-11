(async() => {
  let target : Bun.Build.CompileTarget;
  if(process.arch === 'x64'){
    switch ( process.platform ) {
      case 'win32': target = 'bun-windows-x64-modern';
      case 'darwin': target = 'bun-darwin-x64-modern';
      default: target = 'bun-linux-x64-modern';
    }
  } else {
    switch ( process.platform ) {
      case 'win32': target = 'bun-windows-arm64';
      case 'darwin': target = 'bun-darwin-arm64-modern';
      default: target = 'bun-linux-arm64-modern';
    }
  }
  await Bun.build({
    entrypoints: ["./src/server/main.ts"],
    compile: { target, outfile: "./dist/shorty" }
  })

})()
