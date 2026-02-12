import ac, {Options} from "autocannon";
import {writeFileSync} from "node:fs";
const runTest = (OPTS: Options) => {
    console.time("test");
    console.timeLog("test");
    ac(OPTS, async (err, result) => {
        if(await err) throw new Error((typeof err === "string") ? err : "Benchmarking Failed");
        writeFileSync(`test-${Date.now()}.log`, JSON.stringify(result))
        console.log(`latency`, Object.entries(result.latency)[0])
        console.log(`throughput`, Object.entries(result.throughput)[0])
        console.log(`requests`, Object.entries(result.requests)[0])
        console.timeEnd("test");
    })
}

export default runTest;
