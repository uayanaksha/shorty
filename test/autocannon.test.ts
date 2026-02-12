import {Options} from "autocannon";
import runTest from "./test-runner";

try {
  const OPTS: Options = {
    title: "Autocannon GET/POST test",
    url: "http://localhost:3300",
    amount: 10,
    pipelining: 1,
    connections: 10,
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
  }
  runTest(OPTS);
} catch (err) {
  console.error((err instanceof String) ? err : "Something went wrong!");
  console.timeEnd("test");
}
