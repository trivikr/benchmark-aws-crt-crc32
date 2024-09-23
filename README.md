# benchmark-aws-crt-crc32

Benchmark AWS Crypto JS checksum implementation vs ones provided by AWS CRT vs Node.js built-in.

## Pre-requisites

- Install [Node.js](https://nodejs.org/)
- Run `corepack enable`.
- Run `yarn` to install dependencies.

## Results

```console
$ yarn bench

Benchmark for buffer of size 16 KB:
awsCrc32 x 5,807 ops/sec ±1.30% (96 runs sampled)
awsCrtCrc32 x 398,353 ops/sec ±1.37% (92 runs sampled)
Fastest is awsCrtCrc32

Benchmark for buffer of size 64 KB:
awsCrc32 x 1,149 ops/sec ±1.16% (78 runs sampled)
awsCrtCrc32 x 120,999 ops/sec ±0.84% (98 runs sampled)
Fastest is awsCrtCrc32

Benchmark for buffer of size 256 KB:
awsCrc32 x 337 ops/sec ±0.90% (87 runs sampled)
awsCrtCrc32 x 31,508 ops/sec ±0.82% (96 runs sampled)
Fastest is awsCrtCrc32

Benchmark for buffer of size 1024 KB:
awsCrc32 x 84.05 ops/sec ±0.53% (73 runs sampled)
awsCrtCrc32 x 8,095 ops/sec ±0.22% (101 runs sampled)
Fastest is awsCrtCrc32
```
