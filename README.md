<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## API documentation

## End-point: Sign in

### Method: **POST**

> ```
> http://localhost:5000/api/user
> ```

### Body (**raw**)

```json
{
  "username": "user",
  "email": "user@domain.com",
  "password": "123"
}
```

### Response

```json
{
  "username": "user",
  "email": "user0@domain.com",
  "id": 3
}
```

---

## End-point: Login

### Method: POST

> ```
> http://localhost:5000/api/user/login
> ```

### Body (**raw**)

```json
{
  "email": "user@domain.com",
  "password": "123"
}
```

### Response

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAZG9tYWluLmNvbSIsInN1YiI6MiwiaWF0IjoxNjMxNDgyNzQzfQ.YSu-v_ksq_bhWhOLcunXBdrz3Y_vsxD_OfLiysN873o",
  "user": {
    "username": "user",
    "email": "user@domain.com",
    "id": 2
  }
}
```

---

## End-point: get users

### Method: GET

> ```
> http://localhost:5000/api/users
> ```

### 🔑 Authentication bearer

| Param | value                                                                                                                                        | Type   |
| ----- | -------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| token | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIiLCJzdWIiOjIsImlhdCI6MTYzMTQ4MDQwOX0.pBqLdEOg8_45fSdSRtOYWRsAeiDd1kOzWxmN7O9i9L8 | string |

### Response

```json
[
  {
    "id": 1,
    "email": "user1@domain.com",
    "username": "arseniy"
  },
  {
    "id": 2,
    "email": "user@domain.com",
    "username": "user"
  }
]
```

---

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Database

```bash
# create migration
$ yarn db:create <name>

# implement migrations
$ yarn db:migrate

# drop database
$ yarn db:drop

# migrations rollback
$ yarn db:rollback

# generate seed data
$ yarn db:seed
```
