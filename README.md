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
awsCrc32 x 5,878 ops/sec ±0.47% (98 runs sampled)
awsCrtCrc32 x 396,066 ops/sec ±1.08% (93 runs sampled)
nodeJsCrc32 x 562,327 ops/sec ±14.53% (83 runs sampled)
Fastest is nodeJsCrc32

Benchmark for buffer of size 64 KB:
awsCrc32 x 855 ops/sec ±1.76% (65 runs sampled)
awsCrtCrc32 x 112,400 ops/sec ±1.94% (83 runs sampled)
nodeJsCrc32 x 294,393 ops/sec ±7.50% (89 runs sampled)
Fastest is nodeJsCrc32

Benchmark for buffer of size 256 KB:
awsCrc32 x 278 ops/sec ±3.37% (76 runs sampled)
awsCrtCrc32 x 25,769 ops/sec ±6.58% (80 runs sampled)
nodeJsCrc32 x 92,877 ops/sec ±1.91% (92 runs sampled)
Fastest is nodeJsCrc32

Benchmark for buffer of size 1024 KB:
awsCrc32 x 58.60 ops/sec ±6.01% (62 runs sampled)
awsCrtCrc32 x 7,273 ops/sec ±6.00% (89 runs sampled)
nodeJsCrc32 x 22,771 ops/sec ±4.53% (92 runs sampled)
Fastest is nodeJsCrc32
```
