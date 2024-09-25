import benchmark from "benchmark";
import { AwsCrc32 } from "@aws-crypto/crc32";
import { AwsCrtCrc32 } from "./AwsCrtCrc32.js";
import { NodeJsCrc32 } from "./NodeJsCrc32.js";
import { equal } from "assert";
import { readFileSync } from "fs";

const generateBuffer = (size) => {
  const buf = Buffer.alloc(size);
  for (let i = 0; i < size; i++) buf[i] = parseInt(Math.random() * 256);
  return buf;
};

const awsCryptoCrc32 = new AwsCrc32();
const awsCrtCrc32 = new AwsCrtCrc32();
const nodeJsCrc32 = new NodeJsCrc32();

const getDependencyVersion = async (dependencyName) => {
  const pkgJson = `${dependencyName}/package.json`;
  const pkgJsonFilePath = await import.meta.resolve(pkgJson);
  const pkgJsonPath = new URL(pkgJsonFilePath).pathname;
  return JSON.parse(readFileSync(pkgJsonPath, "utf8")).version;
};

for (const bufferSizeInKB of [16, 64, 256, 1024]) {
  const suite = new benchmark.Suite();
  const testBuffer = generateBuffer(bufferSizeInKB * 1024);

  awsCryptoCrc32.update(testBuffer);
  awsCrtCrc32.update(testBuffer);
  nodeJsCrc32.update(testBuffer);

  equal(
    (await awsCryptoCrc32.digest()).toString(16),
    (await awsCrtCrc32.digest()).toString(16)
  );
  equal(
    (await awsCryptoCrc32.digest()).toString(16),
    (await nodeJsCrc32.digest()).toString(16)
  );

  const awsCryptoVersion = await getDependencyVersion("@aws-crypto/crc32");
  const awsCrtVersion = await getDependencyVersion("aws-crt");
  const nodeVersion = process.versions.node;

  console.log(`\nBenchmark for buffer of size ${bufferSizeInKB} KB:`);
  suite
    .add(`@aws-crypto/crc32@${awsCryptoVersion}`, async () => {
      awsCryptoCrc32.reset();
      awsCryptoCrc32.update(testBuffer);
      await awsCryptoCrc32.digest();
    })
    .add(`aws-crt@${awsCrtVersion}`, async () => {
      awsCrtCrc32.reset();
      awsCrtCrc32.update(testBuffer);
      await awsCrtCrc32.digest();
    })
    .add(`node@${nodeVersion}`, async () => {
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
