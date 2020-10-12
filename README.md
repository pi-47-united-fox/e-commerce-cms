# e-commerce-cms
Membuat dashboard untuk admin dalam me-manage content e-commerce. This app has:

* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints
`- GET /products`
`- POST /products`
`- PUT /products/:id`
`- DELETE /products/:id`
`- POST /users/login`

### GET /product

> Get all assets

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Response (200)_
```json
[
  {
    "id": 1,
    "name": "string",
    "image_url": "string",
    "price": "integer",
    "stock" : "integer",
    "UserId": 1
  },
  {
    "id": 2,
    "name": "string",
    "image_url": "string",
    "price": "integer",
    "stock" : "integer",
    "UserId": 1
  }
]
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Server error"
}
```

### POST /product

> Create new asset

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
    "name": "string",
    "image_url": "string",
    "price": "integer",
    "stock" : "integer",
    "UserId": 1
}
```

_Response (201 - Created)_
```json
[
    {
    "id": 1,
    "name": "string",
    "image_url": "string",
    "price": "integer",
    "stock" : "integer",
    "UserId": 1,
    "createdAt": "new Date()",
    "updatedAt": "new Date()"
    }
]
```

_Response (400 - Bad Request)_
```json
{
  "message": "Invalid Input"
}
```

### PUT /product/:id

> Patch asset by Id

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
    "id": 1,
    "name": "string",
    "image_url": "string",
    "price": "integer",
    "stock" : "integer",
    "UserId": 1
}
```

_Response (200 - OK)_
```json
{
    "id": 1,
    "name": "string",
    "image_url": "string",
    "price": "integer",
    "stock" : "integer",
    "UserId": 1,
    "createdAt": "new Date()",
    "updatedAt": "new Date()",
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Invalid Request"
}
```
_Response (404 - Not Found)_
```json
{
  "message": "Data Not Found"
}
```
_Response (500 - Internal Server Error)_
```json
{
  "message": "Server error"
}
```

### DELETE /product/:id

> Delete asset by Id

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Params_
```json
{
  "id": 1
}
```

_Response (200 - OK)_
```json
{
  "message": "Product Deleted"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "Data Not Found"
}
```
_Response (500 - Internal Server Error)_
```json
{
  "message": "Server error"
}
```

### POST /users/login

> Create new asset


_Request Body_
```json
{
  "email": "admin@mail.com",
  "password": "1234",
  "role": "admin"
}
```

_Response (200 - AccessToken)_
```json
{
  "access_token": "<your token from jwt>"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Invalid Input"
}
```