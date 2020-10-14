## Restful Endpoints
` - POST /login `

` - GET /products `
` - POST /products `
` - DELETE /products/:id `
` - PUT /products/:id `

## POST /login
- Request header:
{
    "Content-type": "application/json"
}

- Request body
    {
        "email": "admin@mail.com",
        "password": "1234"
    }

- Response(200)
    {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTYwMjYyNTQzNX0.CqsFNEn60Xn8ivYRslhxdbjEBeRUyU2KLccTS9Mh8h0"
    }

- Response (400 - Bad Request)
{
  "message": "Invalid request"
}


## GET /products
- Request header:
{
    "access_token": "<your access token>"
}

- Request body:
not needed

- Response(200)
[
    {
        "id": 1,
        "name": "Vintage Table Lamp Set, Kakanuo Traditional Bedside Lamp",
        "image_url": "https://images-na.ssl-images-amazon.com/images/I/71T7QixaIjL._AC_SL1500_.jpg",
        "price": 2300000,
        "stock": 5,
        "createdAt": "2020-03-20T07:15:12.149Z",
        "updatedAt": "2020-03-20T07:15:12.149Z"
    },
    {
        "id": 2,
        "name": "Traditional Table Lamps Set of 2 Classic Design Nightstand Table Lamps Set",
        "image_url": "https://images-na.ssl-images-amazon.com/images/I/71T7QixaIjL._AC_SL1500_.jpg",
        "price": 3300000,
        "stock": 7,
        "createdAt": "2020-03-20T07:15:12.149Z",
        "updatedAt": "2020-03-20T07:15:12.149Z"
    }
]
- Response (400 - Bad Request)
{
  "message": "Invalid request"
}
- Response (500 - Internal Server Error)
{
  "message": "Something wrong with the server"
}

## POST /products
- Request header:
{
    "access_token": "<your access token>"
}

- Request body
    {
        "name": "Traditional Table Lamps Set of 2 Classic Design Nightstand Table Lamps Set",
        "image_url": "https://images-na.ssl-images-amazon.com/images/I/71T7QixaIjL._AC_SL1500_.jpg",
        "price": 3700000,
        "stock": 9
    }

- Response(200)
    {
        "message": "A new product has been successfully added.",
        "id": 2,
        "name": "Traditional Table Lamps Set of 2 Classic Design Nightstand Table Lamps Set",
        "image_url": "https://images-na.ssl-images-amazon.com/images/I/71T7QixaIjL._AC_SL1500_.jpg",
        "price": 3700000,
        "stock": 9
    }
- Response (400 - Bad Request)
{
  "message": "Invalid request"
}
- Response (500 - Internal Server Error)
{
  "message": "Something wrong with the server"
}


## DELETE /products/:id
- Request header:
{
    "access_token": "<your access token>"
}

- Request body:
id = +req.params.id

- Response(200)
{ 
    "message": "Delete success"
}

- Response (404 - Not Found)
{
  "message": "Data Not Found"
}

- Response (500 - Internal Server Error)
{
  "message": "Something wrong with the server"
}


## PUT /products/:id
- Request header:
{
    "access_token": "<your access token>"
}

- Request body
    {
        "name": "Traditional Table Lamps Set of 2 Classic Design Nightstand Table Lamps Set",
        "image_url": "https://images-na.ssl-images-amazon.com/images/I/71T7QixaIjL._AC_SL1500_.jpg",
        "price": 3700000,
        "stock": 9
    }

- Response(200)
    {
        "message": "Product has been successfully updated."
    }
- Response (400 - Bad Request)
{
  "message": "Invalid request"
}

- Response (404 - Not Found)
{
  "message": "Data Not Found"
}

- Response (500 - Internal Server Error)
{
  "message": "Something wrong with the server"
}
