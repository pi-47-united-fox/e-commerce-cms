# KANBAN APP
Kanban App is an application to manage your Working. This app has : 
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints
### POST /task
### GET /task
### PUT /task/:id
### DELETE /task/:id
### POST /login

#### POST /task
> Create New Asset

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json

{
    "name" : "arabica",
    "image_url" : "https://imgur.com/AU2NT88",
    "price" : 10000,
    "stock" : 20 ,
}


```

_Response (201)_
```json

  {
    "id" : 1,
    "name" : "arabica",
    "image_url" : "https://imgur.com/AU2NT88",
    "price" : 10000,
    "stock" : 20 ,
  },
  

```

_Response (400 - Invalid Input)_
```
{
  "message": "Invalid validation errors"
}
```

_Response (500 - Bad Request)_
```
{
  "message": "Server Errors"
}
```



### GET /task
> Get all Asset

_Request Header_
```
{
  "access_token": "<your access token>"
}
```



_Response (201)_
```json
[
  {
    "id" : 1,
    "name" : "arabica",
    "image_url" : "https://imgur.com/5XHKQuL",
    "price" : 10000,
    "stock" : 20 ,
  },
  {
    "id" : 2,
    "name" : "blackcoffe",
    "image_url" : "https://imgur.com/8pdn5dH",
    "price" : 12000,
    "stock" : 20 ,
  },
  {
    "id" : 3,
    "name" : "espresso",
    "image_url" : "https://imgur.com/zGarX1Z",
    "price" : 15000,
    "stock" : 20 ,
  },
  {
    "id" : 4,
    "name" : "machiato",
    "image_url" : "https://imgur.com/HFmsZMT",
    "price" : 18000,
    "stock" : 20 ,
  },
  {
    "id" : 5,
    "name" : "icelate",
    "image_url" : "https://imgur.com/AU2NT88",
    "price" : 18000,
    "stock" : 20 ,
  },
]

```

_Response (500 - Bad Request)_
```json
{
  "message": "Server Errors"
}
```


#### PUT /task/:id
> Edit Asset by Id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json

{
     
    "name" : "arabica",
    "image_url" : "https://imgur.com/5XHKQuL",
    "price" : 12000,
    "stock" : 20 ,
},

```

_Response (200)_
```json

  {
    "id" : "1",
    "name" : "arabica",
    "image_url" : "https://imgur.com/5XHKQuL",
    "price" : 12000,
    "stock" : 20 ,
  },
  

```

_Response (400 - Invalid Input)_
```json
{
  "message": "Invalid validation errors"
}
```
_Response (404 - not found)_
```json
{
  "message": "error not found"
}
```

_Response (500 - Bad Request)_
```json
{
  "message": "Server Error"
}
```


#### DELETE /task/:id
> Delete Asset by Id
_Request Header_
```
{
  "access_token": "<your access token>"
}
```


_Response (200)_
```json

  {
    "message" : "delete success"
  },
  

```

_Response (400 - Invalid Input)_
```json
{
  "message": "Invalid validation errors"
}
```
_Response (404 - not found)_
```json
{
  "message": "error not found"
}
```

_Response (500 - Bad Request)_
```json
{
  "message": "Server Error"
}
```

--


---
#### POST /login

> Login to App

_Request Body_
```json

{
    "email" : "<your_email>",
    "password":"<your_password>"  
}

```

_Response (201)_
```json

{
    "accesToken" : "<your access token>"
},


```

_Response (400 )_
```json
{
  "message": "error"
}
```



