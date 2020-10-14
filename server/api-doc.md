# E-COMMERCE-CMS 
​
List of available endpoints:
​
- `POST /login`
- `POST /products`
- `GET /products`
- `PUT /products/:id`
- `DELETE /products/:id`
---
## POST /login
​
- Request Header
```
    Not required.
```
​
- Request Body
```json
    {
        "email": "admin@mail.com",
        "password": "1234"
    }
```

### Success Response :

- _Response (200 - Ok)_
```json
    {
        "token": "<token>"
    }
```
​
### Failed Response :
- _Response (400 - Bad Request)_
```json
    {
        "msg": "Wrong Email or Password"
    }
```
​
- Response (500 - Internal server error)
```json
    {
        "type": "Internal Server Error"
    }
```
--- 
## POST /products
​
- Request Header
```json
    {
        "access_token":"<access_token>"
    }
```
- Request Body
```json
    {
        "name": "Honor Magic Watch",
        "image_url": "https://images-na.ssl-images-amazon.com/images/I/81wWxtlyb6L._SL1500_.jpg",
        "price": 1000000,
        "stock": 100,
    }
```

### Success Response :
- Response (200 - OK)
```json
    {
        "id": 1,
        "name": "Honor Magic Watch",
        "image_url": "https://images-na.ssl-images-amazon.com/images/I/81wWxtlyb6L._SL1500_.jpg",
        "price": 1000000,
        "stock": 100,
        "createdAt": "2020-10-14T02:43:20.068Z",
        "updatedAt": "2020-10-14T02:43:20.068Z"
    }
```

### Failed Response :
- Response 400: Bad Request
```json
    {
        "msg": "Product's name cannot be empty"
    }
```

- Response 403: Not Authorized
```json
    {
        "msg": "You are not Authorized"
    }
```

- Response 500: Internal server error
```json
    {
        "type": "Internal Server Error"
    }
```
---
### GET /products

- Request Header
```json
    {
        "access_token":"<access_token>"
    }
```
- Request Body

```
    not needed
```

### Success Response :
- Response 200: OK
```json
[
    {
        "id": 1,
        "name": "Honor Magic Watch",
        "image_url": "https://images-na.ssl-images-amazon.com/images/I/81wWxtlyb6L._SL1500_.jpg",
        "price": 1000000,
        "stock": 100,
        "createdAt": "2020-10-14T02:43:20.068Z",
        "updatedAt": "2020-10-14T02:43:20.068Z"
    }
]
```

### Failed Response :
- Response 500: Internal server error
```json
    {
        "type": "Internal Server Error"
    }
```
---
### PUT /products/:id
​
- Request Header
```json
    {
        "access_token":"<access_token>"
    }
```
- Request Body
```json
    {
        "name": "Honor Magic Watch ",
        "image_url": "https://images-na.ssl-images-amazon.com/images/I/81wWxtlyb6L._SL1500_.jpg",
        "price": 1000000,
        "stock": 100
    }
```
​
### Success Response :
- Response 200: OK
```json
    {
        "msg": "Updated Successfully"
    }
```

### Failed Response :
- Response 400: Bad Request
```json
    {
        "msg": "Product's name cannot be empty"
    }
```

- Response 403: Not Authorized
```json
    {
        "msg": "You are not Authorized"
    }
```

- Response 500: Internal server error
```json
    {
        "type": "Internal Server Error"
    }
```
---
### DELETE /products/:id

- Request Header
```json
    {
        "access_token":"<access_token>"
    }
```
- Request Body
```
    not needed
```
​
### Success Response :
- Response 200: OK
```json
    {
        "msg": "Deleted Successfully"
    }
```

### Failed Response :
- Response 403: Not Authorized
```json
    {
        "msg": "You are not Authorized"
    }
```

- Response 500: Internal server error
```json
    {
        "type": "Internal Server Error"
    }
```
---