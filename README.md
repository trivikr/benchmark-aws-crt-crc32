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
@aws-crypto/crc32@5.2.0 x 5,699 ops/sec ±0.44% (92 runs sampled)
aws-crt@1.22.0 x 389,210 ops/sec ±1.02% (89 runs sampled)
node@20.17.0 x 567,192 ops/sec ±6.27% (81 runs sampled)
Fastest is node@20.17.0

Benchmark for buffer of size 64 KB:
@aws-crypto/crc32@5.2.0 x 780 ops/sec ±5.67% (91 runs sampled)
aws-crt@1.22.0 x 112,347 ops/sec ±1.81% (90 runs sampled)
node@20.17.0 x 282,874 ops/sec ±3.52% (80 runs sampled)
Fastest is node@20.17.0

Benchmark for buffer of size 256 KB:
@aws-crypto/crc32@5.2.0 x 267 ops/sec ±1.13% (86 runs sampled)
aws-crt@1.22.0 x 30,813 ops/sec ±1.07% (91 runs sampled)
node@20.17.0 x 91,469 ops/sec ±1.14% (94 runs sampled)
Fastest is node@20.17.0

Benchmark for buffer of size 1024 KB:
@aws-crypto/crc32@5.2.0 x 63.13 ops/sec ±0.69% (67 runs sampled)
aws-crt@1.22.0 x 7,908 ops/sec ±0.46% (97 runs sampled)
node@20.17.0 x 23,446 ops/sec ±2.88% (96 runs sampled)
Fastest is node@20.17.0
```
