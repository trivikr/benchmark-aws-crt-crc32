import benchmark from "benchmark";
import { AwsCrc32 } from "@aws-crypto/crc32";
import { AwsCrtCrc32 } from "./AwsCrtCrc32.js";
import { NodeJsCrc32 } from "./NodeJsCrc32.js";
import { equal } from "assert";

const generateBuffer = (size) => {
  const buf = Buffer.alloc(size);
  for (let i = 0; i < size; i++) buf[i] = parseInt(Math.random() * 256);
  return buf;
};

const awsCrc32 = new AwsCrc32();
const awsCrtCrc32 = new AwsCrtCrc32();
const nodeJsCrc32 = new NodeJsCrc32();

for (const bufferSizeInKB of [16, 64, 256, 1024]) {
  const suite = new benchmark.Suite();
  const testBuffer = generateBuffer(bufferSizeInKB * 1024);

  awsCrc32.update(testBuffer);
  awsCrtCrc32.update(testBuffer);
  nodeJsCrc32.update(testBuffer);

  equal(
    (await awsCrc32.digest()).toString(16),
    (await awsCrtCrc32.digest()).toString(16)
  );
  equal(
    (await awsCrc32.digest()).toString(16),
    (await nodeJsCrc32.digest()).toString(16)
  );

  console.log(`\nBenchmark for buffer of size ${bufferSizeInKB} KB:`);
  suite
    .add("awsCrc32", async () => {
      awsCrc32.reset();
      awsCrc32.update(testBuffer);
      await awsCrc32.digest();
    })
    .add("awsCrtCrc32", async () => {
      awsCrtCrc32.reset();
      awsCrtCrc32.update(testBuffer);
      await awsCrtCrc32.digest();
    })
    .add("nodeJsCrc32", async () => {
      nodeJsCrc32.reset();
      nodeJsCrc32.update(testBuffer);
      await nodeJsCrc32.digest();
    })
    .on("cycle", (event) => {
      console.log(String(event.target));
    })
    .on("complete", () => {
      console.log("Fastest is " + suite.filter("fastest").map("name"));
    })
    .run();
}
