const { validateElectionInput } = require("./validator");

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
