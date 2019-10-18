const { validateElectionInput, validateVoteInput } = require("./validator");

describe("validateElectionInput", () => {
  it("does not throw for valid input", () => {
    const input = {
      owner: "uuid",
      config: { name: "Name of election", budget: 99 },
      candidates: [
        {
          title: "Candidate 1"
        },
        {
          title: "Candidate 2"
        }
      ]
    };
    validateElectionInput(input);
  });

  it("throws correctly", () => {
    const input = {};
    expect(() => validateElectionInput(input)).toThrow();
  });
});

describe("validateVoteInput", () => {
  it("does not throw for valid input", () => {
    const input = {
      user: "uuid-user",
      election: "uuid-election",
      votes: [
        {
          candidate: 0,
          vote: 2
        },
        {
          candidate: 1,
          vote: 0
        }
      ]
    };
    validateVoteInput(input);
  });

  it("throws correctly", () => {
    const input = {};
    expect(() => validateVoteInput(input)).toThrow();
  });
});
