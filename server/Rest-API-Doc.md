# RESTAPI DOCs CMS E-Commerce App
### Bagus Rizki Setiawan - United Fox
---

This cms App has:
1. Restful endpoint for Product's CRUD operation
2. Restful endpoint for User's R operation
3. JSON formated responses

---

&nbsp;

## HTTP Status Code
---
```
    200 - OK	Everything worked as expected.
    201 - Created	Everything worked as expected.
    403 - Forbidden	The access_token key doesn't have permissions to perform the request.
    --- 
    401 - Unauthorized	No valid access_token key provided.
    400 - Bad Request	The request was unacceptable, often due to missing a required parameter.
    404 - Not Found	The requested resource doesn't exist.
    500 - Server Errors	Something went wrong on Stripe's end. (These are rare.)
```

&nbsp;

## EndPoints
---

#### User (Role Admin) Endpoints:
  1. POST /login

#### Product Endpoints:
  1. GET /products
  2. GET /products/:id
  3. POST /products/
  4. PUT /products/:id
  5. DELETE /products/:id

&nbsp;

## User Endpoints
---
### 1. POST /login
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
    ```json
    {
        "access_token": "jwt string",
    }
    ```

## Product Endpoints
---
### 1. GET /products
description: 
  show all products

Request:
- headers: access_token (string)

Response:
- status: 200
- body:
```json
[
    {
    "id": 2,
    "name": "Tas",
    "image_url": "https://cdn.elevenia.co.id/g/2/9/3/9/8/5/20293985_B.jpg",
    "price": 300000,
    "stock": 15,
    "CategoryId": 1,
    "createdAt": "2020-10-14T05:19:52.475Z",
    "updatedAt": "2020-10-14T05:19:52.475Z",
    "Category": {
      "id": 1,
      "categoryName": "Uncategorized",
      "createdAt": "2020-10-14T05:19:52.468Z",
      "updatedAt": "2020-10-14T05:19:52.468Z"
    }
  },{
    "id": 1,
    "name": "Sepatu",
    "image_url": "https://cdn.elevenia.co.id/g/2/9/3/9/8/5/20293985_B.jpg",
    "price": 700000,
    "stock": 20,
    "CategoryId": 2,
    "createdAt": "2020-10-14T05:19:52.475Z",
    "updatedAt": "2020-10-14T05:19:52.475Z",
    "Category": {
      "id": 2,
      "categoryName": "Sepatu",
      "createdAt": "2020-10-14T05:19:52.468Z",
      "updatedAt": "2020-10-14T05:19:52.468Z"
    }
  }
]
```

### 2. GET /products/:id
description:
  show product by id

Request:
- headers: access_token (string)
- params: 
  - id: "integer" required

Response:
- status: 200
- body:

```json
{
  "id": 3,
  "name": "Kaos Polos",
  "image_url": "https://www.konveksipadang.com/wp-content/uploads/2018/08/GROSIR-KAOS-POLOS-DI-PADANG-MURAH-DENGAN-KUALITAS-TERJAMIN-705x705.jpg",
  "price": 80000,
  "stock": 200,
  "CategoryId": 3,
  "createdAt": "2020-10-14T05:19:52.475Z",
  "updatedAt": "2020-10-14T05:19:52.475Z",
  "Category": {
    "id": 3,
    "categoryName": "Baju",
    "createdAt": "2020-10-14T05:19:52.468Z",
    "updatedAt": "2020-10-14T05:19:52.468Z"
  }
}
```

### 3. POST /products
description: 
  add product (only admin) 

Request:
- headers: access_token (string)
- body: 
```json
{
    "name": "<product_name:String>",
    "image_url": "<product_img_url:String>",
    "price": "<product_price:Integer>",
    "stock": "<product_stock:Integer>",
    "categoryName": "<product_category_name:String>"
}
```

Response:

- status: 201
- body:

```json
{
    "id": 1,
    "name": "Sepatu",
    "image_url": "https://cdn.elevenia.co.id/g/2/9/3/9/8/5/20293985_B.jpg",
    "price": 700000,
    "stock": 20,
    "CategoryId": 2,
    "createdAt": "2020-10-14T05:19:52.475Z",
    "updatedAt": "2020-10-14T05:19:52.475Z",
    "Category": {
      "id": 2,
      "categoryName": "Sepatu",
      "createdAt": "2020-10-14T05:19:52.468Z",
      "updatedAt": "2020-10-14T05:19:52.468Z"
    }
}
```

## 4. PUT /products/:id
description: 
  edit/update products (only admin)

Request:
- headers: access_token (string)
- params: 
  - id: "integer" required
- body: 
```json 
{
    "name": "<product_name:String>",
    "image_url": "<product_img_url:String>",
    "price": "<product_price:Integer>",
    "stock": "<product_stock:Integer>",
    "categoryName": "<product_category_name:String>"
}
```

Response:

- status: 201
- body:

```json
{
    "id": 1,
    "name": "Sepatu",
    "image_url": "https://cdn.elevenia.co.id/g/2/9/3/9/8/5/20293985_B.jpg",
    "price": 700000,
    "stock": 20,
    "CategoryId": 2,
    "createdAt": "2020-10-14T05:19:52.475Z",
    "updatedAt": "2020-10-14T05:19:52.475Z",
    "Category": {
      "id": 2,
      "categoryName": "Sepatu",
      "createdAt": "2020-10-14T05:19:52.468Z",
      "updatedAt": "2020-10-14T05:19:52.468Z"
    }
}
```
```
- status: 403
- body:
```json
{
  "message": "You dont have access"
}
```

### 5. DELETE /todos/:id
description:
  delete products by id

Request:
- headers: access_token (string)
- params: 
  - id: "integer" required

Response:
- status: 200
- body:

```json
{
    "id": "<deleted product id>",
    "message": "Product: success deleted"
}
```

- status: 403
- body:
```json
{
    "message": "You dont have access"
}
```