const { sanitiseOutput } = require("./getElection");

const samplePrivateInput = {
  owner: "uuid-owner",
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
  id: "333b7608-1372-489c-b356-31e03bd9936e",
  config: {
    name: "Name of vote",
    private: true,
    invite: [
      {
        name: "abc",
        voterId: "cf3495b8-2f4e-402f-b0e5-a8089b065c1b",
        email: "abc@gmail.com"
      },
      {
        name: "123",
        voterId: "57664130-436b-4ed2-a047-a8474cdb6b33",
        email: "123@gmail.com"
      }
    ],
    budget: 99
  },
  ttl: 1573741196,
  votes: [
    {
      votes: [
        {
          vote: 2,
          candidate: 0
        },
        {
          vote: 0,
          candidate: 1
        }
      ],
      id: "3462239e-670c-4c4a-8075-67e5299a2b61",
      voter: "uuid-user6",
      election: "333b7608-1372-489c-b356-31e03bd9936e",
      ttl: 1573741251
    }
  ]
};

const samplePublicInput = {
  owner: "uuid-owner",
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
  id: "333b7608-1372-489c-b356-31e03bd9936e",
  config: {
    name: "Name of vote",
    budget: 99
  },
  ttl: 1573741196,
  votes: [
    {
      votes: [
        {
          vote: 2,
          candidate: 0
        },
        {
          vote: 0,
          candidate: 1
        }
      ],
      id: "3462239e-670c-4c4a-8075-67e5299a2b61",
      voter: "uuid-user6",
      election: "333b7608-1372-489c-b356-31e03bd9936e",
      ttl: 1573741251
    }
  ]
};

describe("sanitiseOutput", () => {
  it("returns everything, except owner, if the requestor is the owner", () => {
    const output = sanitiseOutput(samplePrivateInput, "uuid-owner");
    expect(output).toEqual({ ...samplePrivateInput, owner: undefined });
  });

  it("returns everything, except owner, if the election is public", () => {
    const output = sanitiseOutput(samplePublicInput, "anyone");
    expect(output).toEqual({ ...samplePublicInput, owner: undefined });
  });

  it("return sanitised data for invited voter of private election", () => {
    const output = sanitiseOutput(
      samplePrivateInput,
      "cf3495b8-2f4e-402f-b0e5-a8089b065c1b"
    );
    const expected = {
      id: "333b7608-1372-489c-b356-31e03bd9936e",
      ttl: 1573741196,
      candidates: [
        { title: "Decision 1", description: "Long description 1" },
        { title: "Decision 2", description: "Long description 2" }
      ],
      config: { name: "Name of vote", private: true, budget: 99 }
    };
    expect(output).toEqual(expected);
  });

  it("throws for non-invited voters of private election", () => {
    expect(() => sanitiseOutput(samplePrivateInput, "anyone")).toThrow(
      "You may not view this private election"
    );
  });
});
