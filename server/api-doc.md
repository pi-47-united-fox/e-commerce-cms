# E-commerce CMS
E-commerce CMS is a web app designed to handle CRUD operation for an admin of any e-commerce site.
This app has the following features:
* RESTful endpoint for todo's CRUD operation.
* JSON-formatted response.

&nbsp;

## RESTful Endpoints
- POST /login
- GET /stocks
- POST /stocks
- GET /stocks/:id
- PUT /stocks/:id
- PATCH /stocks/:id
- DELETE /stocks/:id

### POST /login 

_Request Header_
```
Not Needed
```
_Request Body_
```json
  {
      "email": "admin@mail.com",
      "password": 123456, 
  }
```
_Response (200)_
```json
  {
    "access_token"
  }
```
_Response (400 - Bad Request)_
```json
  {
  "message": "Invalid request."
  }
```
Response (500 - Internal Server Error)
```json
  {
  "message": "Internal Server Error."
  }
```

### GET /stocks
> Get all stocks

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```
_Request Body_
```
not needed
```

_Response (200)_
```json
[
    {
        "id": 1,
        "name": "Adidas Yeezy",
        "image_url": "https://static.shop.adidas.co.id/media/wysiwyg/sold_out/DESKTOP_YEEZY_QNTM_SOLD_OUT_1.jpg",
        "price": 3000000,
        "stock": "5"
    },
    {
        "id": 2,
        "name": "Jordan Mars 270 Low",
        "image_url": "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/i1-f78445c4-c3fe-47ae-b17b-78a2d717e46e/jordan-mars-270-low-shoe-T7zDhW.jpg",
        "price": 3000000,
        "stock": "5"
    }
]
```
_Response (400 - Bad Request)_
```json
{
  "message": "Invalid request."
}
```
_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal Server Error."
}
```

### POST /stocks
> Create a new todo

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```
_Request Body_
```json
{
    "name": "Air Jordan 5 Retro",
    "image_url": "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/604109fb-921a-444c-99c5-77d269781295/air-jordan-5-retro-shoe-x5LP1L.jpg",
    "price": 3000000,
    "stock": "5"
}
```

_Response (201 - Created)_
```json
{
    "id": 3,
    "name": "Air Jordan 5 Retro",
    "image_url": "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/604109fb-921a-444c-99c5-77d269781295/air-jordan-5-retro-shoe-x5LP1L.jpg",
    "price": 3000000,
    "stock": "5"
}

```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal Server Error."
}
```

### GET /stocks/:id
> Get a particular stock from a given id

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Params_
```json
{
    "id": 3
}
```

_Response (200)_
```json
{
    "id": 3,
    "name": "Air Jordan 5 Retro",
    "image_url": "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/604109fb-921a-444c-99c5-77d269781295/air-jordan-5-retro-shoe-x5LP1L.jpg",
    "price": 3000000,
    "stock": "5"
}
```

_Response (404)_
```json
{
  "message": "Error. Not found."
}
```
### PUT /stocks/:id
> Update the whole attributes of a particular stock from a given id

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Params_
```json
{
    "id": 3
}
```

_Request Body_
```json
{
    "name": "Air Jordan 5 Retro Limited Edition",
    "image_url": "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/604109fb-921a-444c-99c5-77d269781295/air-jordan-5-retro-shoe-x5LP1L.jpg",
    "price": 3500000,
    "stock": "10"
}
```

_Response (200)_
```json
{
    "id": 3,
    "name": "Air Jordan 5 Retro Limited Edition",
    "image_url": "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/604109fb-921a-444c-99c5-77d269781295/air-jordan-5-retro-shoe-x5LP1L.jpg",
    "price": 3500000,
    "stock": "10"
}
```

_Response (400)_
```json
{
  "message": "Validation error."
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal Server Error."
}
```

### PATCH /stocks/:id
> Update only 'status' attributes of a particular todo from a given id

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Params_
```json
{
    "id": 3
}
```

_Request Body_
```json
{
    "stock": "15"
}
```

_Response (200)_
```json
{
    "id": 3,
    "name": "Air Jordan 5 Retro Limited Edition",
    "image_url": "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/604109fb-921a-444c-99c5-77d269781295/air-jordan-5-retro-shoe-x5LP1L.jpg",
    "price": 3500000,
    "stock": "15"
}
```

_Response (400)_
```json
{
  "message": "Validation error."
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal Server Error."
}
```

### DELETE /stocks/:id
> Delete a particular todo from a given id

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Params_
```json
{
    "id": 3
}
```

_Response (200)_
```json
{
    "message": "A stock has been deleted successfully."
}
```

_Response (404)_
```json
{
  "message": "Error. Not found."
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal Server Error."
}
```