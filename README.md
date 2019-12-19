# Quadratic Voting API

## Functions

### Create new election

#### Public Election

```json
{
  "owner": "uuid-user",
  "config": {
    "name": "Name of vote",
    "budget": 99,
    "private": false
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

#### Private Election with Notify Invite

```json
{
  "owner": "uuid-user",
  "config": {
    "name": "Name of vote",
    "budget": 99,
    "private": true,
    "notifyInvites": true,
    "invite": [
      {
        "name": "Person A",
        "email": "persona@gmail.com"
      },
      {
        "name": "Person B",
        "email": "personb@gmail.com"
      }
    ]
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

#### Private Vote with Encrypted Votes

```json
{
  "owner": "uuid-user",
  "config": {
    "name": "Name of vote",
    "budget": 99,
    "private": true,
    "notifyInvites": true,
    "encryptionKey": "044f355bdcb7cc0af728ef3cceb9615d90684bb5b2ca5f859ab0f0b704075871aa385b6b1b8ead809ca67454d9683fcf2ba03456d6fe2c4abe2b07f0fbdbb2f1c1",
    "invite": [
      {
        "name": "Person A",
        "email": "persona@gmail.com"
      },
      {
        "name": "Person B",
        "email": "personb@gmail.com"
      }
    ]
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

#### Cleartext Votes Status

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

#### Encrypted Votes Status

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
      "encryptedVote": {
        "iv": "dce31988c0a1d22d42f356bac699c9bf",
        "ciphertext": "72a22c7b52ad4511bdb70125ced9396afe8278525be423d6d2bbe1da018c49a2a20167fe5a015bb6283516548b4a46d1298690dc73ea8bc7332a5a02b58cc6d9",
        "mac": "47737e21e1b9aa1b972c54cbfb9da5b59ee0cf2a58802182db616f6394363581",
        "ephemPublicKey": "0487e5dbda84ef30cf0b8b72a38e9b8a419d9a64ccb3adc42731126954b59104069ce952b71f947bedbf961a09f45f4cc83e93a38884d45f730d7f6fe8f2e93171"
      }
    }
  ]
}
```

### Cast votes

#### Cleartext Vote

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

#### Encrypted Vote

```json
{
  "voter": "uuid-user",
  "election": "uuid-election",
  "encryptedVote": {
    "iv": "dce31988c0a1d22d42f356bac699c9bf",
    "ciphertext": "72a22c7b52ad4511bdb70125ced9396afe8278525be423d6d2bbe1da018c49a2a20167fe5a015bb6283516548b4a46d1298690dc73ea8bc7332a5a02b58cc6d9",
    "mac": "47737e21e1b9aa1b972c54cbfb9da5b59ee0cf2a58802182db616f6394363581",
    "ephemPublicKey": "0487e5dbda84ef30cf0b8b72a38e9b8a419d9a64ccb3adc42731126954b59104069ce952b71f947bedbf961a09f45f4cc83e93a38884d45f730d7f6fe8f2e93171"
  }
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
