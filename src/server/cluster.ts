import cluster from "cluster";
import os from "os";

try {
    const processor_count = os.cpus().length;
    if (cluster.isPrimary) {
        console.log(`Primary ${process.pid} started`);
        for (let i = 0; i < Math.min(processor_count, 3); ++i) {
            cluster.fork();
        }
        cluster.on('exit', (worker, _code, _sig) => {
            console.error(`Worker ${worker.id} died`);
            cluster.fork()
        })
    } else {
        /* Setup secure server over Http2
        const controller = new AbortController();
        const opts = {
            key: readFileSync('secrets/server-key.pem'),
            cert: readFileSync('secrets/server-cert.pem')
        } 
        http2.createSecureServer(opts, app).listen(env.PORT, () => controller.abort())
        */
       import('./main').then(() => console.log(`Worker ${process.pid} has strated`))
    }
} catch (err) {
    console.error((err instanceof String) ? err : "Clustering failed");
    process.exit(1);
} finally {
    console.log("Cluster closed");
}