# RESTful endpoints
`-POST /login`
`-GET /product`
`-POST /product`
`-PUT /product/:id`
`-DELETE /product/:id`




## POST /login
### _Request Header_
```
{

}
```  
### _Request Params_
```       
{
    
}
```
### _Request Body_
```       
{
    "email:"<email>",
    "password:"<password>"
}
```
### _Response (201)_
```
{
    "access_token":"<access_token>"
}
```
### _Response (400)_
```
{
    "message":"Email/Password Cannot be empty"
}
```
### _Response (401)_
```
{
    "message":"Wrong Email/Password"
}
```
### _Response (404)_
```
{
    "message":"Email Not Found !"
}
```
### _Response (500)_
```
{
    "message":"Internal Server Error"
}

```

## GET /product 

> Mengambil semua data product
### _Request Header_
```
{
    "access_token":"<your access_token>"    
}
```
### _Request Body_
```
{
    not needed
}
```
### _Response (201)_
```
[
    {
        "id":1,
        "name":"<name>",
        "image_url":"<image_url>",
        "price":<price>,
        "stock":<stock>,
        "createdAt":"2020-09-28T12:17:16.572Z",
        "updatedAt":"2020-09-28T12:17:16.572Z"
    }
]
```
### _Response (401)_
```
{
    "message":"login first"
}

```
### _Response (500)_
```
{
    "message":"Internal Server Error"
}

```

## POST /product 
> Membuat product
### _Request Header_
```
{
    "access_token":"<your access_token>"    
}
```    
### _Request Body_
```       
{
   "name":"<name>",
    "image_url":"<image_url>",
    "price":<price>,
    "stock":<stock>
}

```
### _Response (201 - Created)_
```
{
    "id":"<id>",
    "name":"<name>",
    "image_url":"<image_url>",
    "price":<price>,
    "stock":<stock>
}
```
### _Response (400)_
```
{
    "message":"<Invalid Request Message>"
}
```
### _Response (401)_
```
{
    "message":"<Authorization / Authentication Message>"
}
```
### _Response (500)_
```
{
    "message":"Internal Server Error"
}

```

## PUT /product/:id 
> Mengedit product
### _Request Header_
```
{
    "access_token":"<your access_token>"    
}
```    
### _Request Body_
```       
{
    "name":"<name>",
    "image_url":"<image_url>",
    "price":<price>,
    "stock":<stock>
}

```
### _Request Params_
```       
{
   "id":"<id>"
}

```
### _Response (200 - Updated)_
```
{
    "message":"<messages>"
}
```
### _Response (400)_
```
{
    "message":"<Invalid Request Message>"
}
```
### _Response (401)_
```
{
    "message":"<Authorization / Authentication Message>"
}
```
### _Response (500)_
```
{
    "message":"Internal Server Error"
}

```

## DELETE /product/:id
> Delete product
### _Request Header_
```
{
    "access_token":"<your access_token>"    
}
```   

### _Request Params_
```       
{
   "id":"<id>"
}

```
### _Response (200)_
```
{
   "message":"delete product id = <id> successfully"
}
```
### _Response (401)_
```
{
    "message":"<Authorization / Authentication Message>"
}
```
### _Response (500)_
```
{
    "message":"Internal Server Error"
}

```