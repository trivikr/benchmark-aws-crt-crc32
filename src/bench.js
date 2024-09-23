import { AwsCrc32 } from "@aws-crypto/crc32";
import { AwsCrtCrc32 } from "./AwsCrtCrc32.js";
import { equal } from "assert";

const generateBuffer = (size) => {
  const buf = Buffer.alloc(size);
  for (let i = 0; i < size; i++) buf[i] = parseInt(Math.random() * 256);
  return buf;
};

const awsCrc32 = new AwsCrc32();
const awsCrtCrc32 = new AwsCrtCrc32();

for (const bufferSizeInKB of [16, 64, 256, 1024]) {
  const testBuffer = generateBuffer(bufferSizeInKB * 1024);

  awsCrc32.update(testBuffer);
  awsCrtCrc32.update(testBuffer);

  equal(
    (await awsCrc32.digest()).toString(16),
    (await awsCrtCrc32.digest()).toString(16)
  );

  awsCrc32.reset();
  awsCrtCrc32.reset();
}
