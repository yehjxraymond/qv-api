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

describe("decryptStringWithPrivateKey", () => {
  it("should decrypt vote result", async () => {
    const sampleVote = {
      iv: "4e9327dcc3e4ffd6ced17a90629f7fe2",
      ciphertext:
        "100b332bd4917d1c4bd41fb4e5ad3aaa2c733d2c6a2d049c2cfcc16409916cbe74d160665cd90b0273f92f0c1e76530a72362ff8ba8a42e18cf424f4251ae148",
      mac: "c604303a28678b3f0dfed2d4324ea30d81bde8dfce65562e6047f7b8f7bb1ad1",
      ephemPublicKey:
        "041bb4dd587edc551e3ba33d37dcef07b83b4be8bd969884ec0c6c6a4e341687e26c3e077132d144eaa9184b319f0345b2769b52f663c3976b65e9493118313efb"
    };
    const votesStr = await decryptStringWithPrivateKey(
      sampleVote,
      samplePrivateKey
    );
    const votes = JSON.parse(votesStr);
    expect(votes).toEqual([
      { candidate: 0, vote: 2 },
      { candidate: 1, vote: -2 }
    ]);
  });
});
