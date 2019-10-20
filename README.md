# Quadratic Voting API

## Functions

### Create new election

Input:

```json
{
  "owner": "uuid-user",
  "config": {
    "name": "Name of vote",
    "budget": 99
  },
  "candidates": [
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

### Get status of a election

Output:

```json
{
  "id": "uuid-election",
  "owner": "uuid-user",
  "config": {
    "name": "Name of vote",
    "budget": 99
  },
  "candidates": [
    {
      "title": "Decision 1",
      "description": "Long description 1"
    },
    {
      "title": "Decision 2",
      "description": "Long description 2"
    }
  ],
  "votes": [
    {
      "voter": "uuid-user",
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

### Cast votes

Input:

```json
{
  "voter": "uuid-user",
  "election": "uuid-election",
  "votes": [
    {
      "candidate": 0,
      "vote": 2
    },
    {
      "candidate": 1,
      "vote": 0
    }
  ]
}
```

## Dynamodb

The development environment uses [serverless-dynamodb-local](https://www.npmjs.com/package/serverless-dynamodb-local) to emulate the dynamodb in AWS.

Install dynamodb locally

```
sls dynamodb install
```

Start dynamodb

```
sls dynamodb start
```
