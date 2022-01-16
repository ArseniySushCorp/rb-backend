## End-point: Sign in

### Method: **POST**

> ```
> http://localhost:5000/api/user
> ```

### Body

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
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXI1QGRvbWFpbi5jb20iLCJzdWIiOjYsImlhdCI6MTYzMzQ2Njg0N30.K6oZD5sJs3IqbhUxB6hzKdSHSAgDxPuPJV-uW8m6jm0",
  "user": {
    "username": "user",
    "email": "user0@domain.com",
    "id": 3
  }
}
```

---

## End-point: Login

### Method: POST

> ```
> http://localhost:5000/api/user/login
> ```

### Body

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

## End-point: Delete user

### Method: DELETE

> ```
> http://localhost:5000/api/user/:id
> ```

### Response

HTTP STATUS: 204

---
