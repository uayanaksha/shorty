import ac, {Options} from "autocannon";
const runTest = (OPTS: Options) => {
    console.time("test");
    console.timeLog("test");
    ac(OPTS, async (err, result) => {
        if(await err) throw new Error((typeof err === "string") ? err : "Benchmarking Failed");
        console.log(`latency`, (result.latency))
        console.log(`latency`, Object.entries(result.latency)[0])
        console.log(`throughput`, Object.entries(result.throughput)[0])
        console.log(`requests`, Object.entries(result.requests)[0])
        console.timeEnd("test");
    })
}

export default runTest;
