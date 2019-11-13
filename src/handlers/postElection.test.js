const { formatNewElection } = require("./postElection");

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
  config: {
    name: "Name of vote",
    budget: 99
  }
};

const samplePrivateElection = {
  ...samplePublicElection,
  config: {
    name: "Name of vote",
    private: true,
    invite: [
      {
        name: "Person A",
        email: "persona@gmail.com"
      },
      {
        name: "Person B",
        email: "personb@gmail.com"
      }
    ],
    budget: 99
  }
};

describe("formatNewElection", () => {
  it("adds id for public election", () => {
    const results = formatNewElection(samplePublicElection);
    expect(results).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        ttl: expect.any(Number),
        ...samplePublicElection
      })
    );
  });

  it("adds id to election and invited user for private election", () => {
    const results = formatNewElection(samplePrivateElection);
    expect(results).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        ttl: expect.any(Number),
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
        config: {
          name: "Name of vote",
          private: true,
          invite: [
            {
              name: "Person A",
              email: "persona@gmail.com",
              voterId: expect.any(String)
            },
            {
              name: "Person B",
              email: "personb@gmail.com",
              voterId: expect.any(String)
            }
          ],
          budget: 99
        }
      })
    );
  });
});
