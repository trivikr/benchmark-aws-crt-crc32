import { checksums } from "aws-crt";

export class AwsCrtCrc32 {
  update(toHash) {
    this.previous = checksums.crc32(toHash, this.previous);
  }

  async digest() {
    // numToUint8 from @aws-crypto/util
    return new Uint8Array([
      (this.previous & 0xff000000) >> 24,
      (this.previous & 0x00ff0000) >> 16,
      (this.previous & 0x0000ff00) >> 8,
      this.previous & 0x000000ff,
    ]);
  }

  reset() {
    this.previous = undefined;
  }
}
