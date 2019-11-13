const { canCastVote, validateVote } = require("./postVote");

const samplePrivateElection = {
  owner: "uuid-user",
  candidates: [
    {
      title: "Decision 1",
      description: "Long description 1"
    },
    {
      title: "Decision 2",
      description: "Long description 2"
    }
  ],
  id: "c7d62dba-ce91-44e9-8bcd-f119af3a1e54",
  config: {
    name: "Name of vote",
    private: true,
    invite: [
      {
        name: "abc",
        voterId: "d7041605-3997-4488-aafe-3a503f506d24",
        email: "abc@gmail.com"
      },
      {
        name: "123",
        voterId: "f807bbc8-14c1-4486-b9a8-ddb22a743723",
        email: "123@gmail.com"
      }
    ],
    budget: 99
  },
  ttl: 1573742712
};

const samplePublicElection = {
  owner: "uuid-user",
  candidates: [
    {
      title: "Decision 1",
      description: "Long description 1"
    },
    {
      title: "Decision 2",
      description: "Long description 2"
    }
  ],
  id: "c7d62dba-ce91-44e9-8bcd-f119af3a1e54",
  config: {
    name: "Name of vote",
    budget: 99
  },
  ttl: 1573742712
};

describe("canCastVote", () => {
  it("returns true if election is public", () => {
    expect(canCastVote(samplePublicElection, "anyone")).toBe(true);
  });
  it("returns true if election is private and voter is listed", () => {
    expect(
      canCastVote(samplePrivateElection, "d7041605-3997-4488-aafe-3a503f506d24")
    ).toBe(true);
  });
  it("returns false if election is private and voter is not listed", () => {
    expect(canCastVote(samplePrivateElection, "anyone")).toBe(false);
  });
});

const sampleVote = [
  {
    candidate: 0,
    vote: 2
  },
  {
    candidate: 1,
    vote: 0
  },
  {
    candidate: 2,
    vote: -5
  }
];

describe("validateVote", () => {
  it("does not throw when spent is equal to budget", () => {
    expect(() =>
      validateVote(sampleVote, {
        config: { budget: 29 },
        candidates: { length: 3 }
      })
    ).not.toThrow();
  });

  it("does not throw when spent is less than budget", () => {
    expect(() =>
      validateVote(sampleVote, {
        config: { budget: 99 },
        candidates: { length: 3 }
      })
    ).not.toThrow();
  });

  it("throws when spent is greater than budget", () => {
    expect(() =>
      validateVote(sampleVote, {
        config: { budget: 28 },
        candidates: { length: 3 }
      })
    ).toThrow("User exceeds budget");
  });

  it("throws when under sybil attack", () => {
    expect(() =>
      validateVote(
        [
          { candidate: 0, vote: 1 },
          { candidate: 0, vote: 1 }
        ],
        { config: { budget: 28 }, candidates: { length: 3 } }
      )
    ).toThrow("User submitted duplicated vote for candidate");
  });

  it("throws when user voted for candidate outside of range", () => {
    expect(() =>
      validateVote(sampleVote, {
        config: { budget: 99 },
        candidates: { length: 2 }
      })
    ).toThrow("User voted for candidate outside of range");
    expect(() =>
      validateVote([{ candidate: -1, vote: 2 }], {
        config: { budget: 99 },
        candidates: { length: 2 }
      })
    ).toThrow("User voted for candidate outside of range");
  });
});
