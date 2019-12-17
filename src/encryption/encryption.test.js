const {
  randomPrivateKey,
  publicKeyFromPrivateKey,
  encryptStringWithPublicKey,
  decryptStringWithPrivateKey
} = require("./index");

const samplePrivateKey =
  "1111111111111111111111111111111111111111111111111111111111111111";
const samplePublicKey =
  "044f355bdcb7cc0af728ef3cceb9615d90684bb5b2ca5f859ab0f0b704075871aa385b6b1b8ead809ca67454d9683fcf2ba03456d6fe2c4abe2b07f0fbdbb2f1c1";

describe("e2e", () => {
  it("should encrypt and decrypt a text", async () => {
    const input = "hello";
    const encrypted = await encryptStringWithPublicKey(input, samplePublicKey);
    const cleartext = await decryptStringWithPrivateKey(
      encrypted,
      samplePrivateKey
    );
    expect(cleartext).toBe(input);
  });

  it("should encrypt and decrypt unicode", async () => {
    const input = "🦄|encryption|加密|एन्क्रिप्शन";
    const encrypted = await encryptStringWithPublicKey(input, samplePublicKey);
    const cleartext = await decryptStringWithPrivateKey(
      encrypted,
      samplePrivateKey
    );
    expect(cleartext).toBe(input);
  });
});

describe("randomPrivateKey", () => {
  it("should return a 32 bytes (64 char) private key in a string", () => {
    expect(randomPrivateKey()).toHaveLength(64);
  });
  it("should return a hexadecimal key", () => {
    const re = /([0-9a-f][0-9a-f])+/;
    expect(re.test(randomPrivateKey())).toBe(true);
  });
});

describe("publicKeyFromPrivateKey", () => {
  it("should return corresponding public key", () => {
    expect(publicKeyFromPrivateKey(samplePrivateKey)).toBe(samplePublicKey);
  });
});
