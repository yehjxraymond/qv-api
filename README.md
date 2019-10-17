# Quadratic Voting API

## Functions

### Create new vote

Input:

```json
{
  "owner": "uuid-user",
  "voterConfig": {
    "budget": 99
  },
  "config": {
    "name": "Name of vote"
  },
  "decisions": [
    {
      "title": "Decision 1",
      "description": "Long description 1"
    },
    {
      "title": "Decision 2",
      "description": "Long description 2"
    }
  ]
}
```

### Get status of a vote

Output:

```json
{
  "id": "uuid-vote",
  "decisions": [
    {
      "id": 1,
      "title": "Decision 1",
      "description": "Long description 1"
    },
    {
      "id": 2,
      "title": "Decision 2",
      "description": "Long description 2"
    }
  ],
  "votes": [
    {
      "voterId": "uuid-user",
      "votes": [
        {
          "decisionId": 1,
          "vote": 2
        },
        {
          "decisionId": 2,
          "vote": 2
        }
      ]
    }
  ]
}
```

### Submit votes

Input:

```json
{
  "id": "uuid-user",
  "votes": [
    {
      "decisionId": 1,
      "vote": 2
    },
    {
      "decisionId": 2,
      "vote": 2
    }
  ]
}
```
