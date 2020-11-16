# hacktiv-garden-server

​
List of available endpoints:
​
- `POST /register`
- `POST /login`
- `POST /products`
- `GET /products`
- `PUT /products/:id`
- `DELETE /products/:id`

### POST /register

Request:

- data:

```json
{
  "email": "string",
  "password": "string"
}
```

Response:

- status: 201
- body:
  ​

```json
{
  "id": "integer",
  "email": "string",
  "access_token": "jwt string"
}
}
```

### POST /login

Request:

- data:

```json
{
  "email": "string",
  "password": "string"
}
```

Response:

- status: 200
- body:
  ​

```json
{
    "email": "string",
    "access_token": "jwt string"
}
```
- status: 401
- body:
  ​

```json
{
    "message": "email/password is wrong."
}
```
- status: 401
- body:
  ​

```json
{
    'message':"email and password must be filled"
}
```

### POST /prducts

description: 
  Add product to databasae
Request:
- headers: access_token (string)
```json
{
    "name": "Goalkeeper",
    "image_url": "https://ae01.alicdn.com/kf/HTB1P2GlSXXXXXbEapXXq6xXFXXXT/24cm-Height-Soccer-Football-Resin-Goalkeeper-Gloves-De-Golden-Award-World-Cup-Trophy-Goalkeeper-Award-Fans.jpg_640x640.jpg",
    "price": 130000000,
    "stock": 1,
    "category": "Key Player"
},
```

Response:

- status: 201
- body:

```json
{
    "name": "Goalkeeper",
    "image_url": "https://ae01.alicdn.com/kf/HTB1P2GlSXXXXXbEapXXq6xXFXXXT/24cm-Height-Soccer-Football-Resin-Goalkeeper-Gloves-De-Golden-Award-World-Cup-Trophy-Goalkeeper-Award-Fans.jpg_640x640.jpg",
    "price": 130000000,
    "stock": 1,
    "category": "Key Player"
}
```

### GET /products

description: 
  get all products from database

Request:

- headers: access_token (string)

Response:

- status: 200
- body:

```json
[
    {
        "name": "Cristiano Ronaldo",
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg",
        "price": 130000000,
        "stock": 1,
        "category": "Forward",
    },
    {
        "name": "Alison Becker",
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/4/4f/20180610_FIFA_Friendly_Match_Austria_vs._Brazil_850_1625.jpg",
        "price": 80000000,
        "stock": 1,
        "category": "Goalkeeper",
    },
    {
        "name": "David De Gea",
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/6/68/David_de_Gea_2017.jpg",
        "price": 50000000,
        "stock": 1,
        "category": "Goalkeeper",
    },
    {
        "name": "Sergio Ramos",
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/7/7a/Sergio_Ramos_entrenando_%28cropped%291.jpg",
        "price": 45000000,
        "stock": 1,
        "category": "Defender",
    },
    {
        "name": "Lionel Messi",
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/c/c1/Lionel_Messi_20180626.jpg",
        "price": 450000000,
        "stock": 1,
        "category": "Forward",
    },
    {
        "name": "Son Heung-Min",
        "image_url": "https://gmsrp.cachefly.net/images/19/05/01/491a83f0eca32dbb2c017f207dd3b716/690.jpg",
        "price": 100000000,
        "stock": 1,
        "category": "Middfielder",
    }
  ] 

```

### PUT /products/:id

description: 
  add a product

Request:

- headers: access_token (string)
- params: 
    - id: "integer" required
 ```json
{
    "name": "string",
    "image_url": "string",
    "price": "integer",
    "stock": "integer",
    "category": "string"
},
```


Response:

- status: 200
- body:

```json
{
    "name": "string",
    "image_url": "string",
    "price": "integer",
    "stock": "integer",
    "category": "string"
},
```

### DELETE /favorites

description: 
  delete product

Request:

- headers: access_token (string)
- params: 
  - id: "integer" required

Response:

- status: 200
- body:

```json
{
    "msg":"Product has been deleted."
}
```
