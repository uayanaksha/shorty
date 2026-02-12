import {Options} from "autocannon";
import runTest from "./test-runner";

try {
  const OPTS: Options = {
    title: "Autocannon GET/POST test (cluster mode)",
    url: "http://localhost:6600",
    amount: 1000,
    pipelining: 20,
    connections: 20,
    requests: [
      {
        method: "POST",
        path: "/",
        body: JSON.stringify({ url: "https://google.com" })
      },
      {
        method: "GET",
        path: "/",
      }
    ]
  };
  runTest(OPTS);
} catch (err) {
  console.error((err instanceof String) ? err : "Something went wrong!");
  console.timeEnd("test");
}
