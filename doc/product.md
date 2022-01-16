# Product api

## End-point: Create product

Required auth and admin role

### Method: **POST**

> ```
> http://localhost:5000/api/product
> ```

### Body

```json
{
  "name": "Blazer",
  "brands": ["nike"],
  "colors": ["white", "yellow", "green"],
  "category": "sneaker",
  "description": "best shoes in galaxy"
}
```

### Response

```json
{
  "id": 1,
  "name": "Blazer",
  "brands": ["nike"],
  "colors": ["white", "yellow", "green"],
  "category": "sneaker",
  "description": "best shoes in galaxy",
  "createdAt": "2022-01-15T19:48:45.328Z",
  "updatedAt": "2022-01-15T19:48:45.328Z"
}
```

---

## End-point: Create product size

### Method: **POST**

> ```
> http://localhost:5000/api/product/:id/size
> ```

### Body

```json
{
  "size": "11",
  "price": 35000
}
```

### Response

```json
{
  "size": "11",
  "price": 35000,
  "product": 1,
  "id": 1
}
```

---

## End-point: Get all products

No auth required

### Method: **GET**

Get all products, may countains query:

### Query

```json
{
  "limit": 10,
  "category": "sneakers",
  "offset": 0
}
```

### Response

```json
{
  "products": [
    {
      "id": 2,
      "createdAt": "2021-11-30T20:12:06.477Z",
      "updatedAt": "2021-11-30T20:12:06.477Z",
      "name": "Air max",
      "brands": ["nike"],
      "colors": ["black"],
      "category": "sneaker",
      "description": "best shoes ever",
      "sizes": [
        {
          "id": 4,
          "size": "10",
          "price": 100
        },
        {
          "id": 5,
          "size": "10",
          "price": 100
        },
        {
          "id": 6,
          "size": "10",
          "price": 100
        },
        {
          "id": 7,
          "size": "10",
          "price": 100
        },
        {
          "id": 8,
          "size": "10",
          "price": 100
        }
      ]
    }
  ],
  "productsCount": 31,
  "colors": ["white", "yellow", "green", "black"],
  "brands": ["nike", "addidas"],
  "sizes": ["10"]
}
```

---

## End-point: Get product

No auth required

### Method: **GET**

> ```
> http://localhost:5000/api/product/:id
> ```

### Response

```json
{
  "id": 2,
  "createdAt": "2021-11-30T20:12:06.477Z",
  "updatedAt": "2021-11-30T20:12:06.477Z",
  "name": "Air max",
  "brands": ["nike"],
  "colors": ["black"],
  "category": "sneaker",
  "description": "best shoes ever",
  "sizes": [
    {
      "id": 4,
      "size": "10",
      "price": 100
    },
    {
      "id": 5,
      "size": "10",
      "price": 100
    },
    {
      "id": 6,
      "size": "10",
      "price": 100
    },
    {
      "id": 7,
      "size": "10",
      "price": 100
    },
    {
      "id": 8,
      "size": "10",
      "price": 100
    }
  ]
}
```

---

## End-point: Delete product size

Required auth and admin role

### Method: **DELETE**

> ```
> http://localhost:5000/api/product/:productId/size/:sizeId
> ```

### Response

> ```
> HTTP STATUS: 204
> ```

---

## End-point: Delete product

Required auth and admin role

### Method: **DELETE**

> ```
> http://localhost:5000/api/product/:id
> ```

### Response

> ```
> HTTP STATUS: 204
> ```

---
